import {
  Link,
  Observable,
  addStyles,
  createElement,
  getCurrentPath,
} from "../../utils";
import { linkHandler } from "./handlers";

// Importamos los estilos para los elementos A y los guardamos en la variable linkStyles en forma de string
import linkStyles from "./link.css?inline";
// Importamos los estilos para el componente NavBar y los guardamos en la variable styles en forma de string
import styles from "./navbar.css?inline";

/*
  Esta clase define un nuevo web component el cual contiene la barra de navegacion superior,
  este debe extender de HTMLElement para ser considerado un web component y ser agregado a nuestro index.html
*/
export class NavBar extends HTMLElement {
  /*
    Los web components utilizan un su propia instancia del DOM por lo que tanto el CSS como el JavaScript que se ejecuta
    dentro de ellos esta encapsulado y no puede ser accedido desde afuera
  */
  private shadow = this.attachShadow({ mode: "open" });

  // Contiene el elemento A que permite al usuario navegar a la pagina para sugerir una bebida al usuario
  private mainLink: HTMLLIElement;
  // Contiene el elemento A que permite al usuario navegar a la pagina que contiene la lista de registro de ventas
  private salesLink: HTMLLIElement;

  // Creamos un estado observable de tipo string que contiene la pagina actual en la que se encuentra el usuario
  private currentPage = new Observable<string>(getCurrentPath());

  constructor() {
    // Llamamos al constructor de la clase HTMLElement
    super();

    // Creamos el elemento LI que contiene el elemento A que permite navegar al usuario
    this.mainLink = createElement<HTMLLIElement>({
      tag: "li",
      /*
        Mandamos a llamar la funcion Link que crear un web component el cual contiene un A con un funcionamiento
        personalizado, como parametros enviamos el texto que debe mostrar el elemento A, la ruta a la cual debe redireccionar
        al usuario y enviamos los estilos personalizados para el elemento A
      */
      nodes: [Link({ text: "Sugerir", to: "/", styles: linkStyles })],
    });

    // Creamos el elemento LI que contiene el elemento A que permite navegar al usuario
    this.salesLink = createElement<HTMLLIElement>({
      tag: "li",
      /*
        Mandamos a llamar la funcion Link que crear un web component el cual contiene un A con un funcionamiento
        personalizado, como parametros enviamos el texto que debe mostrar el elemento A, la ruta a la cual debe redireccionar
        al usuario y enviamos los estilos personalizados para el elemento A
      */
      nodes: [Link({ text: "Ventas", to: "/ventas", styles: linkStyles })],
    });

    // Creamos el titulo para la barra de navegacion, contiene un icono y un texto
    const title = createElement<HTMLDivElement>({
      tag: "div", // Este dive nos permite agrupar el elemento IMG y el elemento SPAN
      style: ["flex-row"], // Alineamos los elementos dentro del DIV
      nodes: [
        createElement<HTMLImageElement>({
          tag: "img", // Creamos el elemento IMG que contiene el icono de la pagina
          options: {
            alt: "Coffee icon", // Agregamos una descripcion del icono
            src: "./coffee-svgrepo-com.svg", // Agregamos la ruta del icono
          },
        }),
        createElement<HTMLSpanElement>({ tag: "span", innerText: "Cafeteria" }), // Creamos el elemento SPAN
      ],
    });

    // Creamos el elemento NAV
    const nav = createElement<HTMLElement>({
      tag: "nav",
      style: ["flex-row"], // Alineamos los elemento dentro del NAV en forma de fila
      nodes: [
        title, // Agregamos el DIV con el icono y titulo
        createElement<HTMLUListElement>({
          tag: "ul", // Agregamos una lista para los elementos A
          style: ["flex-row"],
          nodes: [this.mainLink, this.salesLink], // Agregamos los elementos links personalizados
        }),
      ],
    });

    // Agregamos todos los elementos HTML al show DOM propio del web component, agregamos los estilos y el elemento NAV
    this.shadow.append(addStyles(styles), nav);
  }

  // Esta funcion se ejecuta cuando el web component es agregado al HTML
  connectedCallback() {
    // Agregamos un nuevo suscriptor al estado interno currentPage del web component
    this.currentPage.subscribe({
      key: "nav-bar-main-link", // Agregamos la clave unica del suscriptor
      /*
        observer contiene la funcion que se ha de ejecutar cada vez que el estado currentPage cambie
      
        linkHandler es una funcion que recibe como parametro el elemento LI con el link a la pagina principal y 
        el path a valida para aplicar o no un estilo al link

        A su vez linkHandler retorna una funcion que es compatible con el tipo de funcion que requiere el
        atributo observer, es decir, una funcion que retorne void y cuyo unico parametro sea de tipo string
      */
      observer: linkHandler(this.mainLink, "/"),
    });

    // Agregamos un nuevo suscriptor al estado interno currentPage del web component
    this.currentPage.subscribe({
      key: "nav-bar-sales-link", // Agregamos la clave unica del suscriptor
      /*
        observer contiene la funcion que se ha de ejecutar cada vez que el estado currentPage cambie
      
        linkHandler es una funcion que recibe como parametro el elemento LI con el link a la pagina con el historial
        de ventas y el path a valida para aplicar o no un estilo al link

        A su vez linkHandler retorna una funcion que es compatible con el tipo de funcion que requiere el
        atributo observer, es decir, una funcion que retorne void y cuyo unico parametro sea de tipo string
      */
      observer: linkHandler(this.salesLink, "/ventas"),
    });

    // Agregamos un evento click al elemento LI con el link a la pagina principal, este actualiza el estado interno currentPage
    this.mainLink.addEventListener("click", () =>
      this.currentPage.updateState("/")
    );

    // Agregamos un evento click al elemento LI con el link a la pagina de ventas, este actualiza el estado interno currentPage
    this.salesLink.addEventListener("click", () =>
      this.currentPage.updateState("/ventas")
    );
  }
}
