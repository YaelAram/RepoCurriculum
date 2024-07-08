import { weather } from "../../context";
import { formatDate, getTemp } from "../../helpers";
import { Coord, WeatherResp } from "../../interfaces/weather";
import { getWeather } from "../../providers";

/*
  weatherCardHandler es una funcion que recibe como parametro los elementos icon, location, temp y time, los
  cuales necesita para actualizar lo que estos muestran cuando la informacion del observable weather cambie
*/
export const weatherCardHandler = (
  icon: HTMLImageElement,
  location: HTMLSpanElement,
  temp: HTMLSpanElement,
  time: HTMLSpanElement
) => {
  /*
    Retornamos una funcion que cumple con el contrato que define la interfaz Observer<WeatherResp> que describe la
    forma de las funciones que son suscriptores del observable weather

    Recibe como parametro el estado actualizado
  */
  return (weatherState: WeatherResp) => {
    // Obtenemos el objeto tipo TempType correspondiente a la temperatura actual
    const tempObj = getTemp(weatherState.temp);

    // Actualizamos la descripcion del icono del clima, esta se muestra en caso de que la imagen no sea cargada con exito
    icon.alt = `Icono clima ${tempObj.label}`;
    // Actualizamos la ruta del icono que debe mostrar el elemento IMG
    icon.src = `./${tempObj.query.toLowerCase()}.svg`;

    // Actualizamos el elemento SPAN que indica el nombre del lugar donde se encuentra el cliente
    location.innerText = `Tu ubicacion actual es ${weatherState.location}`;

    // Actualizamos el elemento SPAN que indica la temperatura actual
    temp.innerText = `La temperatura actual es ${weatherState.temp} °C`;

    // Obtenemos el string que indica la fecha y hora en que se esta actualizando el reporte de clima
    time.innerText = formatDate();
  };
};

/*
  weatherHandler es una funcion que recibe como unico parametro el estado actualizado del observable coords por lo que
  cumple con la interfaz Observer<Coord> que define la forma de los suscriptores al observable coords
*/
export const weatherHandler = (coordsState: Coord) => {
  /*
    Comienza la peticion HTTP al servicio de reporte de clima, utiliza las coordenadas actualizadas para
    obtener el mejor resultado posible
  */
  getWeather(coordsState).then((weatherResp) =>
    // Cuando la aplicacion recibe el reporte de clima actualizado, actualiza el observable weather
    weather.updateState(weatherResp)
  );
};
