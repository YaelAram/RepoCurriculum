import { Coord, WeatherResp } from "../interfaces/weather";

// Definimos como constante la URL base a nuestra API REST, especificando el servicio de clima
const url = "https://cafeteriabackend-dev-xbcr.1.ie-1.fl0.io/api/weather";

/*
  Esta funcion nos permite realizar la peticion HTTP a nuestro servicio de clima, recibe un argumento llamado
  coord de tipo Coord, este tipo de dato contiene dos atributos de tipo number, la latitud y longitud del usuario,
  estos datos se utilizan para localizar al usuario y poder obtener un reporte del clima del lugar donde esta
*/
export const getWeather = async (coord: Coord): Promise<WeatherResp> => {
  /*
    Dado que el objeto coord corresponde a un estado global, esta inicializado por defecto con un valor de
    latitud y longitud igual a cero, es por ello que evitamos hacer la peticion HTTP, que consume recursos del
    servidor, para una localizacion que pronto va a cambiar (unos cuantos milisegundos)
  */
  if (coord.lat === 0 && coord.lon === 0) return { location: "", temp: 0 };

  /*
    Comenzamos la peticion HTTP, especificamos el metodo POST, adjuntamos al body las coordenadas del usuario y
    especificamos que la informacion que estamos enviando esta en formato JSON
  */
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(coord),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  /*
    Convertimos la respuesta del servidor a formato JSON, esta contiene el nombre del lugar donde se encuentra el cliente
    asi como un numero entero que representa la temperatura del lugar en grados centigrados
  */
  const data: WeatherResp = await resp.json();

  // Retornamos la informacion en formato JSON
  return data;
};
