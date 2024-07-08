import { coords, weather } from "../../context";
import { getLocation } from "../../helpers";
import { createElement } from "../../utils";
import { weatherCardHandler, weatherHandler } from "./handlers";

/*
  Esta funcion crea el componente Weather, este contiene un icono e informacion general sobre el clima
  el lugar donde esta el cliente asi como un boton que permite actualizar la informacion
*/
export const Weather = () => {
  // icon es un elemento IMG el cual contiene un icono relacionado a la temperatura actual
  const icon = createElement<HTMLImageElement>({
    tag: "img",
    style: ["weather-icon"], // Agrega la clase CSS weather-icon
  });

  // location es un elemento SPAN que indica el nombre del lugar donde se encuentra el usuario
  const location = createElement<HTMLSpanElement>({ tag: "span" });

  // temp es un elemento SPAN que muestra al usuario la temperatura actual
  const temp = createElement<HTMLSpanElement>({ tag: "span" });

  // time indica cuando se actualizo por ultima vez el estado del clima (muestra la fecha y hora)
  const time = createElement<HTMLSpanElement>({ tag: "span" });

  // reload es un boton que permite al usuario actualizar el reporte del clima
  const reload = createElement<HTMLButtonElement>({
    tag: "button",
    innerText: "Actualizar", // Indica el texto que muestra el boton
    options: { type: "button" },
    style: ["reload-btn"], // Agrega la clase CSS reload-btn
  });

  /*
    Al hacer click sobre el boton para actualizar el estado del clima, el sistema vuelve a calcular la
    localizacion del cliente, al actualizar la localizacion se vuelve a realizar una peticion al servidor
    por un reporte de clima nuevo
  */
  reload.addEventListener("click", getLocation);

  // Creamos un elemento div que contendra todlos los elementos HTML creados en los pasos anteriores
  const div = createElement<HTMLDivElement>({
    tag: "div",
    nodes: [location, temp, time, reload], // Adjuntamos los elementos HTML
  });

  // Creamos un elemento SECTION el cual envolvera el elemento DIV creado y el elemento IMG
  const section = createElement<HTMLElement>({
    tag: "section",
    nodes: [icon, div], // Adjuntamos el elemento IMG y DIV
    style: ["rounded", "shadow", "horizontal"], // Agregamos la clase CSS rounded, shadow y horizontal
  });

  // Enlazamos el estado weather, el cual contiene el reporte de clima
  // Creamos una clave unica para el suscriptor que vamos a crear
  const weatherObserverKey = "weather-observer-guess";

  // Agregamos un suscriptor al observable weather
  weather.subscribe({
    key: weatherObserverKey, // key indica la clave unica del suscriptor
    /*
      observer contiene la funcion que se ha de ejecutar cada vez que el estado weather cambie
      
      weatherCardHandler es una funcion que recibe como parametro los elementos icon, location, temp y time, los
      cuales necesita para actualizar lo que estos muestran cuando la informacion del observable weather cambie

      A su vez weatherCardHandler retorna una funcion que es compatible con el tipo de funcion que requiere el
      atributo observer, es decir, una funcion que retorne void y cuyo unico parametro sea de tipo WeatherResp
    */
    observer: weatherCardHandler(icon, location, temp, time),
  });

  // Enlazamos el estado coords
  // Creamos una clave unica para el suscriptor que vamos a crear
  const coordsObserverKey = "coords-observer-guess";

  // Agregamos un suscriptor al observable coords
  coords.subscribe({
    key: coordsObserverKey, // key indica la clave unica del suscriptor
    /*
      observer contiene la funcion que se ha de ejecutar cada vez que el estado coords cambie
      
      weatherHandler es una funcion que es compatible con el tipo de funcion que requiere el
      atributo observer, es decir, una funcion que retorne void y cuyo unico parametro sea de tipo Coord
    */
    observer: weatherHandler,
  });

  /*
    Retornamos dos elementos, section contiene el contenido HTML mientras weatherSubscribers es un arreglo con
    todas las claves unicas de los suscriptores del componente
  */
  return {
    section,
    weatherSubscribers: [weatherObserverKey, coordsObserverKey],
  };
};
