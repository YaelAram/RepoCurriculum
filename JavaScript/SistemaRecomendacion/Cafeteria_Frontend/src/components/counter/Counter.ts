import { isLoading, page } from "../../context";
import { createElement } from "../../utils";
import { btnObserverFn, fetchObserverFn, spanObserverFn } from "./handlers";

/*
  Esta funcion permite crear el componente Counter, el cual contiene los controles basicos para navegar a la
  siguiente pagina de registros, la anterior pagina de registros y un contador que sirve para indicar al usuario
  la pagina actual

  Recibe como parametro numberOfSales el indica el numero de registros que cada pagina debe contener
*/
export const Counter = (numberOfSales: number) => {
  // Creamos el boton prevBtn el cual se encarga de cargar la pagina anterior de registros
  const prevBtn = createElement<HTMLButtonElement>({
    tag: "button",
    innerText: "Página Anterior",
    options: { type: "button" },
  });
  // Creamos un elemento SPAN el cual muestra la pagina actual
  const span = createElement<HTMLSpanElement>({ tag: "span", innerText: "0" });
  // Creamos el boton nextBtn el cual se encarga de cargar la pagina siguiente de registros
  const nextBtn = createElement<HTMLButtonElement>({
    tag: "button",
    innerText: "Siguiente Página",
    options: { type: "button" },
  });

  // Creamos un elemento SECTION el cual contiene los dos botones y el elemento SPAN
  const controlSection = createElement<HTMLElement>({
    tag: "section",
    nodes: [prevBtn, span, nextBtn], // Agregamos los elementos HTML
    style: ["rounded", "shadow"], // Agregamos las clases CSS
  });

  // Adjuntamos el estado isLoading
  // Creamos una clave unica para el suscriptor del boton prevBtn
  const prevBtnSuscribeKey = "isloading-prev-observer-sales";
  // Creamos una clave unica para el suscriptor del boton nextBtn
  const nextBtnSuscribeKey = "isloading-next-observer-sales";

  // Agragamos un nuevo suscriptor al observable isLoading
  isLoading.subscribe({
    key: prevBtnSuscribeKey, // Especificamos la clave unica del suscriptor
    /*
      observer contiene la funcion que se ha de ejecutar cada vez que el estado sales cambie
      
      btnObserverFn es una funcion que recibe como parametro el elemento prevBtn, se encarga de habilitar el boton cuando
      el sistema no este realizando una peticion HTTP al servidor en busca mas registros de ventas y de inhabilitarlo
      cuando se este realizando una peticion HTTP al servidor

      A su vez btnObserverFn retorna una funcion que es compatible con el tipo de funcion que requiere el
      atributo observer, es decir, una funcion que retorne void y cuyo unico parametro sea de tipo boolean
    */
    observer: btnObserverFn(prevBtn),
  });

  // Agragamos un nuevo suscriptor al observable isLoading
  isLoading.subscribe({
    key: nextBtnSuscribeKey, // Especificamos la clave unica del suscriptor
    /*
      observer contiene la funcion que se ha de ejecutar cada vez que el estado sales cambie
      
      btnObserverFn es una funcion que recibe como parametro el elemento nextBtn, se encarga de habilitar el boton cuando
      el sistema no este realizando una peticion HTTP al servidor en busca mas registros de ventas y de inhabilitarlo
      cuando se este realizando una peticion HTTP al servidor

      A su vez btnObserverFn retorna una funcion que es compatible con el tipo de funcion que requiere el
      atributo observer, es decir, una funcion que retorne void y cuyo unico parametro sea de tipo boolean
    */
    observer: btnObserverFn(nextBtn),
  });

  // Adjuntamos el estado page
  // Creamos una clave unica para el suscriptor que se encarga de realizar la peticion HTTP en busca de registros de venta
  const fetchSuscribeKey = "page-fetch-observer-sales";
  // Creamos una clave unica para el suscriptor que se encarga de mostrar al usuario la pagina actual
  const spanSuscribeKey = "page-span-observer-sales";

  // Agragamos un nuevo suscriptor al observable page
  page.subscribe({
    key: fetchSuscribeKey, // Especificamos la clave unica del suscriptor
    /*
      observer contiene la funcion que se ha de ejecutar cada vez que el estado sales cambie
      
      fetchObserverFn es una funcion que recibe como parametro la variable numberOfSales que contiene el numero de
      registros de ventas a mostrar en cada pagina

      A su vez fetchObserverFn retorna una funcion que es compatible con el tipo de funcion que requiere el
      atributo observer, es decir, una funcion que retorne void y cuyo unico parametro sea de tipo number
    */
    observer: fetchObserverFn(numberOfSales),
  });

  // Agragamos un nuevo suscriptor al observable page
  page.subscribe({
    key: spanSuscribeKey, // Especificamos la clave unica del suscriptor
    /*
      observer contiene la funcion que se ha de ejecutar cada vez que el estado sales cambie
      
      spanObserverFn es una funcion que recibe como parametro el elemento SPAN, dentro del cual insertara la pagina
      actual en que se encuentra el cliente

      A su vez spanObserverFn retorna una funcion que es compatible con el tipo de funcion que requiere el
      atributo observer, es decir, una funcion que retorne void y cuyo unico parametro sea de tipo number
    */
    observer: spanObserverFn(span),
  });

  // Adjuntamos el evento click a nuestro boton para cargar la pagina anterior de registros
  prevBtn.addEventListener("click", () => {
    // El valor minimo que esta variable puede tomar es 1, por lo que no permitimos al usuario ir a una pagina menor a 1
    if (page.getState() - 1 < 0) return;
    // Realizamos la peticion HTTP con el numero de pagina actual menos uno (pagina anterior)
    page.updateState(page.getState() - 1);
  });

  // Adjuntamos el evento click a nuestro boton para cargar la pagina siguiente de registros
  nextBtn.addEventListener("click", () =>
    // Realizamos la peticion HTTP con el numero de pagina actual mas uno (pagina siguiente)
    page.updateState(page.getState() + 1)
  );

  /*
    Retornamos el elemento controlSection el cual contiene el HTML del componente y suscribers el cual es un arreglo
    con todas las claves unicas de los suscriptores
  */
  return {
    controlSection,
    subscribers: [
      prevBtnSuscribeKey,
      nextBtnSuscribeKey,
      fetchSuscribeKey,
      spanSuscribeKey,
    ],
  };
};
