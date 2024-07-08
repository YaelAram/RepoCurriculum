// Creamos una clave unica que describa nuestro evento personalizado
export const NAVIGATION_EVENT = "pushState";

/*
  Creamos una funcion que nos permita cambiar la url del navegador sin provocar que este recargue la pagina, recibe como
  parametro la ruta a la cual debe ser modificada la url del navegador
*/
export function navigate(to: string) {
  // Agregamos la nueva ruta al historial de rutas
  window.history.pushState({}, "", to);
  // Creamos un nuevo evento utilizando la clave unica que creamos
  const navigationEvent = new Event(NAVIGATION_EVENT);
  // Disparamos el evento, este evento provoca que el router cargue una nueva pagina
  window.dispatchEvent(navigationEvent);
}
