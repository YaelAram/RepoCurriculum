import { model } from "../../context";
import { getModel } from "../../providers";
import { createElement } from "../../utils";
import { guessHandler, reloadHandler, titleHandler } from "./handlers";

/*
  Mandamos a llamar la funcion que crea el componente GuessForm este contiene el formulario con el cual podemos
  indicar al sistema la edad del cliente, asi como informacion sobre cuando fue creado el modelo de inferencia y el
  tamaño de la base de conocimientos utilizada para crearlo, ademas permite recalcular el modelo de inferencia
*/
export const GuessForm = () => {
  // Este elemento BUTTON nos permite comenzar una peticion HTTP al servidor para que recalcule el modelo de inferencia
  const reloadBtn = createElement<HTMLButtonElement>({
    tag: "button",
    innerText: "Recrear", // Establecemos el titulo de boton
    // Con el atributo disabled, deshabilitamos el boton mientras la pagina esta cargando el modelo de inferencia
    options: { type: "button", disabled: "" },
  });

  // Este elemento BUTTON nos permite crear la sugerencia de bebida para un usuario
  const guessBtn = createElement<HTMLButtonElement>({
    tag: "button",
    innerText: "Sugerir", // Establecemos el titulo de boton
    // Con el atributo disabled, deshabilitamos el boton mientras la pagina esta cargando el modelo de inferencia
    options: { type: "submit", disabled: "" }, //
  });

  /*
    Creamos un string, este lo usaremos como ID para el elemento INPUT y para el atributo for del elemento LABEL,
    estos dos deben tener el mismo contenido para ayudar al navegador con la accesibilidad para personas con alguna
    discapacidad
  */
  const inputKey = "age";
  // Creamos el elemento INPUT donde el usuario debe ingresar la edad del cliente
  const input = createElement<HTMLInputElement>({
    tag: "input",
    options: {
      type: "number", // Indicamos que nuestro campo de texto solo debe permitir al usuario escribir numeros
      min: "0", // Indicamos un valor minimo de cero años
      max: "100", // Indicamos un valor maximo de cien años
      id: inputKey, // Agegamos la clave unica
      name: "age", // Indicamos el nombre del atributo
    },
    style: ["rounded"], // Agregamos la clase CSS rounded
  });

  // Creamos el elemento FORM (el formulario)
  const form = createElement<HTMLFormElement>({
    tag: "form",
    nodes: [
      createElement<HTMLLabelElement>({
        // Agregamos el elemento LABEL
        tag: "label",
        innerText: "Edad", // Indicamos que el campo de texto es para la edad del cliente
        options: { for: inputKey }, // Agregamos la clave que enlaza el elemento LABEL con el INPUT
      }),
      input, // Agregamos el elemento INPUT
      createElement<HTMLDivElement>({
        // Agregamos un elemento DIV envuelve y nos permite acomodor los botones del formulario
        tag: "div",
        nodes: [reloadBtn, guessBtn], // Agregamos los botones
        style: ["horizontal", "btn-div"], // Agregamos la clase CSS horizontal y btn-div
      }),
    ],
    style: ["vertical"], // Agregamos la clase CSS vertical
  });

  // En este elemento H4 mostramos al cliente cuando fue creado el modelo de inferencia
  const createdAt = createElement<HTMLHeadingElement>({ tag: "h4" });
  // En este elemento H4 mostramos al cliente el numero de ventas con las cuales se creo el modelo de inferencia
  const numberOfSales = createElement<HTMLHeadingElement>({ tag: "h4" });

  // Creamos el elemento SECTION que contendra todo el HTML
  const guessSection = createElement<HTMLElement>({
    tag: "section",
    // Agregamos los elementos H4 que contiene la informacion de creacion del modelo de inferencia y el formulario
    nodes: [createdAt, numberOfSales, form],
    style: ["rounded", "shadow", "vertical", "mt-20"], // Agregamos las clases CSS
  });

  // Enlazando del estado model
  // Creamos la clave unica para el suscriptor
  const titleObserverKey = "model-title-observer-guess";

  // Agregamos el suscriptor al observable model
  model.subscribe({
    key: titleObserverKey, // Agregamos la clave unica
    /*
      observer contiene la funcion que se ha de ejecutar cada vez que el estado sales cambie
      
      titleHandler es una funcion que recibe como parametro el elemento createdAt y numberOfSales, en estos
      muestra la informacion de creacion del modelo de inferencia

      A su vez titleHandler retorna una funcion que es compatible con el tipo de funcion que requiere el
      atributo observer, es decir, una funcion que retorne void y cuyo unico parametro sea de tipo Model
    */
    observer: titleHandler(createdAt, numberOfSales),
  });

  /*
    Agregamos el controlador del evento click sobre el boton para recalcular el modelo de inferencia, enviamos como
    parametro la funcion reloadHandler que permite realizar la peticion HTTP para obtener un nuevo modelo de inferencia
  */
  reloadBtn.addEventListener("click", reloadHandler);

  // Realizamos la peticion inicial al servidor por el modelo de inferencia, esta peticion inicializa el modelo de inferencia
  getModel(false).then((newModel) => {
    // Esta funcion se ejecuta cuando la pagina obtiene una respuesta exito del servidor (cuando recibe el modelo)
    reloadBtn.disabled = false; // Activamos el boton para recalcular el modelo (en caso de que el usuario lo necesite)
    guessBtn.disabled = false; // Activamos el boton que nos permite obtener una nueva sugerencia de bebida
    model.updateState(newModel); // Actualizamos el observable model con el modelo de inferencia que envio el servidor
  });

  /*
    Agregamos un controlador para el evento submit sobre el formulario, la funcion guessHandler sera la encargada
    de obtener la edad del cliente, consultar el modelo y actualizar el observable suggestion

    Recibe como parametro el elemento INPUT donde se ingresa la edad del usuario, lo unico que hace con este parametro
    es vaciar su contenido una vez el usuario oprime la tecla ENTER o da click sobre el boton de sugerir
  */
  form.addEventListener("submit", guessHandler(input));

  // Retornamos el elemento SECTION con todo el HTML del componente y una lista con las claves unicas de los suscriptores
  return {
    guessSection,
    formSubscribers: [titleObserverKey],
  };
};
