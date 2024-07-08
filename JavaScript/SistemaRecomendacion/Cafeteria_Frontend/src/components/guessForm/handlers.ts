import { model, suggestion, weather } from "../../context";
import { formatDate, getAge, getTemp } from "../../helpers";
import { Model } from "../../interfaces/model";
import { getModel } from "../../providers";

/*
  titleHandler es una funcion que recibe como parametro el elemento createdAt y numberOfSales, en estos
  muestra la informacion de creacion del modelo de inferencia
*/
export const titleHandler = (
  createdAtElement: HTMLHeadingElement,
  numberOfSales: HTMLHeadingElement
) => {
  /*
    Retornamos una funcion que es compatible con el tipo de funcion que requiere el atributo observer,
    es decir, una funcion que retorne void y cuyo unico parametro sea de tipo Model

    El parametro de tipo Model, contiene la informacion actualizada del observable model
  */
  return ({ createdAt, sales }: Model) => {
    /*
      Mostramos la fecha y hora en la cual fue creado el modelo de inferencia, formatDate retorna un string
      con la fecha y hora con un formato facil de leer por el usuario
    */
    createdAtElement.innerText = `Este modelo fue creado el ${formatDate(
      new Date(createdAt)
    )}`;
    // Mostramos el numero de ventas con las cuales fue creado el modelo de inferencia
    numberOfSales.innerText = `Con una base de conocimientos de ${sales} ventas`;
  };
};

// la funcion reloadHandler que permite realizar la peticion HTTP para obtener un nuevo modelo de inferencia
export const reloadHandler = (evt: MouseEvent) => {
  // Obtenemos la referencia al boton para recalcular el modelo de inferencia
  const btn = evt.target as HTMLButtonElement;
  // Desabilitamos el boton mientras se realiza la peticion al servidor
  btn.disabled = true;
  // Iniciamos la peticion HTTP para recalcular el modelo de inferencia
  getModel(true).then((newModel) => {
    // Esta funcion se ejecuta cuando la pagina recibe el modelo de inferencia actualizado
    // Actualizamos el observable model con el nuevo modelo de inferencia
    model.updateState(newModel);
    // Habilitamos el boton para recalcular el modelo de inferencia
    btn.disabled = false;
  });
};

/*
  La funcion guessHandler sera la encargada de obtener la edad del cliente, consultar el modelo y actualizar
  el observable suggestion

  Recibe como parametro el elemento INPUT donde se ingresa la edad del usuario, lo unico que hace con este parametro
  es vaciar su contenido una vez el usuario oprime la tecla ENTER o da click sobre el boton de sugerir
*/
export const guessHandler = (input: HTMLInputElement) => {
  // Retornamos una funcion que recibe como argumento un objeto que contiene la informacion del evento submit
  return (evt: SubmitEvent) => {
    // Evitamos que el evento submit recargue la pagina
    evt.preventDefault();
    // Obtenemos la informacion del formulario
    const data = new FormData(evt.target as HTMLFormElement);

    // Si por alguna razon no se obtiene el campo edad, abortamos el proceso
    if (!data.has("age")) return;

    // Obtenemos el objeto tipo AgeType a partir de la edad del cliente
    const age = getAge(Number(data.get("age")));
    // Obtenemos el objeto tipo TempType a partir de la temperatura actual
    const temp = getTemp(weather.getState().temp);

    // Contruimos la clave unica, que nos permite consultar el modelo de inferencia, obtenemos la probabilidad
    const coldP = model.getState().model[`${age.query}${temp.query}Cold`];

    // Obtenemos el icono a mostrar y el tipo de bebida a sugerir
    const [icons, drink] =
      coldP >= 0.5
        ? [["./coldDrink.svg"], "Fria"]
        : [["./hotDrink.svg"], "Caliente"];

    // Actualizamos el observable suggestion
    suggestion.updateState({
      coldP, // Enviamos la probabilidad de que el cliente elija una bebida fria
      icons, // Enviamos el arreglo con los iconos a mostrar
      drink, // Enviamos el mensaje con el tipo de bebida sugerida
      age: Number(data.get("age")), // Enviamos la edad del cliente
    });

    // Eliminamos el contenido del elemento INPUT con la edad del cliente
    input.value = "";
  };
};
