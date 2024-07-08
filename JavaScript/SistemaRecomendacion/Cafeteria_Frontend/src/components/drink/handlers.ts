import { showDialog, suggestion, weather } from "../../context";
import { Suggestion } from "../../interfaces/model";
import { createSale } from "../../providers";
import { createElement } from "../../utils";

/*
  Esta funcion permite crear los elementos IMG que contienen los iconos segun el tipo de bebida

  Como parametro recibe el observable suggestion, el cual contiene los iconos a mostrar
*/
export const showDrinkImg = ({ drink, icons }: Suggestion) => {
  // Retornamos un arreglo de elementos IMG con los iconos
  return icons.map((icon) =>
    createElement<HTMLImageElement>({
      tag: "img",
      style: ["drink-icon"], // Agregamos la clase CSS drink-icon
      options: { alt: `${drink} drink icon`, src: icon },
    })
  );
};

// Esta funcion permite agregar los iconos de bebidas al elemento DIV que recibe la funcion como parametro
export const drinkIconsHandler = (div: HTMLDivElement) => {
  /*
    Retornamos una funcion que es compatible con el tipo de funcion que requiere el atributo observer,
    es decir, una funcion que retorne void y cuyo unico parametro sea de tipo Suggestion

    El parametro de tipo Suggestion, contiene la informacion actualizada del observable suggestion
  */
  return (suggestionState: Suggestion) => {
    // Eliminamos los elementos IMG de la sugerencia anterior
    div.textContent = "";
    // Agregamos al elemento DIV los elementos IMG con los iconos de bebida
    div.append(...showDrinkImg(suggestionState));
  };
};

// drinkHandler es una funcion que recibe como parametro el elemento drink en el cual mostrara el tipo de bebida sugerida
export const drinkHandler = (title: HTMLHeadingElement) => {
  /*
    Retornamos una funcion que es compatible con el tipo de funcion que requiere el atributo observer,
    es decir, una funcion que retorne void y cuyo unico parametro sea de tipo Suggestion

    Dentro del elemento title escribirmos el tipo de bebida
  */
  return ({ drink }: Suggestion) => (title.innerText = drink);
};

/*
  spanHandler es una funcion que recibe como parametro el elemento SPAN, en el escribira una brave descripcion
  de la probabilidad de que el usuario elija un tipo de bebida igual a la que el sistema sugiere
*/
export const spanHandler = (span: HTMLSpanElement) => {
  /*
    Retornamos una funcion que es compatible con el tipo de funcion que requiere el atributo observer,
    es decir, una funcion que retorne void y cuyo unico parametro sea de tipo Suggestion
  */
  return ({ coldP }: Suggestion) => {
    // Obtenemos la probabilidad de bebida fria y la redondeamos a 2 decimales
    const cold = (coldP * 100).toFixed(2);
    // Obtenemos la probabilidad de bebida caliente y la redondeamos a 2 decimales
    const hot = ((1.0 - coldP) * 100).toFixed(2);

    // Escribimos dentro de titulo que la bebida fria es mas probable
    if (coldP >= 0.5)
      span.innerText = `Usuarios similares eligieron una bebida fria en el ${cold}% de las ocaciones`;
    // Escribimos dentro de titulo que la bebida caliente es mas probable
    else
      span.innerText = `Usuarios similares eligieron una bebida caliente en el ${hot}% de las ocaciones`;
  };
};

/*
  Esta funcion permite realizar una peticion HTTP al servidor para crear un nuevo registro de venta

  Recibe como parametro:
    drink: El tipo de bebida elegida por el cliente
    buyCold: La referencia al boton que registra una venta de bebida fria
    buyHot: La referencia al boton que registra una venta de bebida caliente
*/
export const buyHandler = (
  drink: number,
  buyCold: HTMLButtonElement,
  buyHot: HTMLButtonElement
) => {
  // Retorna una funcion que no recibe parametros y retorna void
  return () => {
    // Deshabilitamos ambos botones para evitar que el usuario pueda desencadenar varias peticiones a la vez
    buyCold.disabled = true;
    buyHot.disabled = true;

    // Obtenemos la temperatura actual
    const { temp: temperature } = weather.getState();
    // Obtenemos la edad del cliente
    const { age } = suggestion.getState();

    // Iniciamos la peticion HTTP para realizar el registro, enviando el tipo de bebida, edad del cliente y temperatura
    createSale({ drink, age, temperature })
      .then(({ ok, sale }) => {
        // Este IF comprueba si el registro fue exitoso
        if (ok) {
          // Mostramos un mensaje indicando al usuario que el registro fue exitoso
          showDialog(
            "Venta exitosa",
            `Se ha creado con exito la venta con el id ${sale.uid}`
          );
        }
      })
      .finally(() => {
        // Por ultimo, habilitamos de nuevo los botones para crear una nueva venta de bebida fria o bebida caliente
        buyCold.disabled = false;
        buyHot.disabled = false;
      });
  };
};
