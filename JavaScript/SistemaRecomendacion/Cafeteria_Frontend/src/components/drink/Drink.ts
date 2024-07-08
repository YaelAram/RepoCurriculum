import { suggestion } from "../../context";
import { createElement } from "../../utils";
import {
  buyHandler,
  drinkHandler,
  drinkIconsHandler,
  showDrinkImg,
  spanHandler,
} from "./handlers";

/*
  Esta funcion crea el componente Drink, este muestra la sugerencia de bebida que hace el sistema,
  muestra un icono y un string indicando el tipo de bebida recomendada asi como descripcion indicando el porcentaje
  de usuarios de edad similar y con un clima similar eligieron ese tipo de bebida
*/
export const Drink = () => {
  // Creamos un elemento H2, este muestra el tipo de bebida que el sistema sugiere al cliente
  const drink = createElement<HTMLHeadingElement>({
    tag: "h2",
  });
  // Creamos un DIV el cual contiene los elementos IMG que muestran el icono del tipo de bebida sugerido
  const div = createElement<HTMLDivElement>({
    tag: "div",
    nodes: showDrinkImg(suggestion.getState()), // Agregamos los elementos IMG
    style: ["horizontal"], // Agregamos la clase CSS horizontal
  });
  // Este elemento SPAN, da una breve descripcion al usuario sobre por que el usuario sugiere ese tipo de bebida
  const span = createElement<HTMLSpanElement>({
    tag: "span",
  });

  // Creamos un BUTTON el cual nos permitira registrar una nueva venta, donde la bebida sea de tipo fria
  const buyCold = createElement<HTMLButtonElement>({
    tag: "button",
    options: { type: "button" },
    innerText: "Comprar Bebida Fria", // Agregamos un titulo al boton
    style: ["buy-cold"], // Agregamos la clase CSS buy-cold, para crear espacio entre los botones
  });

  // Creamos un BUTTON el cual nos permitira registrar una nueva venta, donde la bebida sea de tipo caliente
  const buyHot = createElement<HTMLButtonElement>({
    tag: "button",
    options: { type: "button" },
    innerText: "Comprar Bebida Caliente", // Agregamos un titulo al boton
  });

  // Creamos un contenedor DIV el cual contiene ambos botones
  const buttonDiv = createElement<HTMLDivElement>({
    tag: "div",
    nodes: [buyCold, buyHot], // Agregamos ambos botones
    style: ["horizontal"], // Agregamos la clase CSS horizontal
  });

  // Cremos el elemento SECTION que contendra los elementos HTML creados
  const drinkSection = createElement<HTMLElement>({
    tag: "section",
    style: ["shadow", "rounded", "vertical", "mt-20"], // Agregamos clases CSS
    nodes: [
      // Agregamos un elemento H3 con un titulo para el tipo de bebida
      createElement<HTMLHeadingElement>({
        tag: "h3",
        innerText: "Se sugiere una bebida",
      }),
      div, // Agregamos el DIV que contiene los iconos de bebida
      drink, // Agregamos el titulo que indica el tipo de bebida
      span, // Agregamos el texto que indica la probabilidad de exito de la sugerencia
      buttonDiv, // Agregamos el DIV que contiene los botones para comprar una bebida
    ],
  });

  // Agregamos un evento click al boton buyCold, el cual inicia la peticion HTTP para la venta de una bebida fria
  buyCold.addEventListener("click", buyHandler(0, buyCold, buyHot));
  // Agregamos un evento click al boton buyHot, el cual inicia la peticion HTTP para la venta de una bebida caliente
  buyHot.addEventListener("click", buyHandler(1, buyCold, buyHot));

  // Enlazando el estado suggestion
  // Creamos una clave unica para el suscriptor que muestra el tipo de bebida sugerida
  const drinkObserverKey = "suggestion-drink-observer-key";
  // Creamos una clave unica para el suscriptor que muestra los iconos de la bebida sugerida
  const drinkIconsObserverKey = "suggestion-drinkicon-observer-key";
  // Creamos una clave unica para el suscriptor que muestra la explicacion de la sugerencia
  const drinkSpanObserverKey = "suggestion-span-observer-key";

  // Agregamos un nuevo suscriptor al observable suggestion
  suggestion.subscribe({
    key: drinkObserverKey, // Agregamos la clave unica del suscriptor
    /*
      observer contiene la funcion que se ha de ejecutar cada vez que el estado sales cambie
      
      drinkHandler es una funcion que recibe como parametro el elemento drink en el cual mostrara el tipo de bebida
      sugerida

      A su vez drinkHandler retorna una funcion que es compatible con el tipo de funcion que requiere el
      atributo observer, es decir, una funcion que retorne void y cuyo unico parametro sea de tipo Suggestion
    */
    observer: drinkHandler(drink),
  });

  // Agregamos un nuevo suscriptor al observable suggestion
  suggestion.subscribe({
    key: drinkIconsObserverKey, // Agregamos la clave unica del suscriptor
    /*
      observer contiene la funcion que se ha de ejecutar cada vez que el estado sales cambie
      
      drinkIconsHandler es una funcion que recibe como parametro el elemento div, dentro del cual insertara los elementos
      IMG que continen los iconos del tipo de bebida

      A su vez drinkIconsHandler retorna una funcion que es compatible con el tipo de funcion que requiere el
      atributo observer, es decir, una funcion que retorne void y cuyo unico parametro sea de tipo Suggestion
    */
    observer: drinkIconsHandler(div),
  });

  // Agregamos un nuevo suscriptor al observable suggestion
  suggestion.subscribe({
    key: drinkSpanObserverKey, // Agregamos la clave unica del suscriptor
    /*
      observer contiene la funcion que se ha de ejecutar cada vez que el estado sales cambie
      
      spanHandler es una funcion que recibe como parametro el elemento SPAN, en el escribira una brave descripcion
      de la probabilidad de que el usuario elija un tipo de bebida igual a la que el sistema sugiere

      A su vez spanHandler retorna una funcion que es compatible con el tipo de funcion que requiere el
      atributo observer, es decir, una funcion que retorne void y cuyo unico parametro sea de tipo Suggestion
    */
    observer: spanHandler(span),
  });

  /*
    Retornamos dos elementos, drinkSection contiene el contenido HTML mientras drinkSubscribers es un arreglo con
    todas las claves unicas de los suscriptores del componente
  */
  return {
    drinkSection,
    drinkSubscribers: [
      drinkObserverKey,
      drinkIconsObserverKey,
      drinkSpanObserverKey,
    ],
  };
};
