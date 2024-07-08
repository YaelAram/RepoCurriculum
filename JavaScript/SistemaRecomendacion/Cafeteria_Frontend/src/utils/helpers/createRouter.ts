import { NAVIGATION_EVENT } from "./";
import { getCurrentPath } from "./getCurrentPath";

// Definimos el tipo de dato para un ruta
export interface Route {
  path: string; // Indicamos la ruta en la cual debe mostrarse el elemento
  selector: string; // Indicamos el nombre de la etiqueta a mostrar
  title: string; // Indicamos el contenido del elemento TITLE
}

// Actualizamos el contenido del elemento DIV con el nuevo selector HTML
const updatePage = (app: HTMLDivElement, selector: string) => {
  app.innerHTML = `<${selector}></${selector}>`;
};

/*
  Esta funcion nos permite crear el router de nuestra aplicacion, se encarga de cargar la pagina correspondiente
  segun la ruta actual del navegador

  Recibe como parametro:
    routes: Un arreglo de objetos tipo Route, el cual contiene las rutas a las cuales el router debe reaccionar para cargar
    un nuevo elemento
    app: El elemento DIV dentro del cual debe introducir la pagina a cargar
*/
export const createRouter = (routes: Route[], app: HTMLDivElement) => {
  /*
    Definimos una funcion que nos permita reaccionar al evento popstate (el cual sucede al dar click sobre la flecha hacia
    atras del navegador) y nuestro evento personalizado pushState (el cual sucede al dar click sobre la flecha hacia adelante
    o al cambiar la url del navegador sin provocar que este recargue la pagina), cuando uno de estos eventos ocurre
    provoca que el router busque una ruta dentro del array routes que coincida con la ruta actual del navegador, al
    encontrarla este carga el contenido de la ruta
  */
  const changePage = () => {
    // Obtenemos la ruta actual del navegador
    const currentPath = getCurrentPath();
    // Buscamos una ruta dentro del array routes que coincida con la ruta actual, extraemos el selector y el titulo
    const { selector, title } = routes.find(
      ({ path }) => path === currentPath
    )!;
    // Modificamos el contenido del elemento TITLE de nuestra pagina HTML
    document.title = title;

    /*
      La funcion startViewTransition nos permite dar una pequeña transicion al cambio de una pagina a otra en nuestra
      pagina, este IF comprueba si el navegador soporta esta nueva tecnologia, si no lo soporta utiliza la funcion
      updatePage directamente (sin usar startViewTransition)
    */
    if (!document.startViewTransition) {
      updatePage(app, selector);
      return;
    }

    /*
      El el navegador soporta startViewTransition, manda a llamar startViewTransition y esta a su vez a la funcion
      updatePage, al utilizar startViewTransition el navegador agrega por defecto una animacion
    */
    document.startViewTransition(() => updatePage(app, selector));
  };

  // Ejecutamos el metodo changePage para inicializar la pagina la primera vez que esta carga
  changePage();

  // Agregamos una suscripcion al evento pushState, la funcion changePage es llamada cada vez que este evento suceda
  window.addEventListener(NAVIGATION_EVENT, changePage);
  // Agregamos una suscripcion al evento popstate, la funcion changePage es llamada cada vez que este evento suceda
  window.addEventListener("popstate", changePage);
};
