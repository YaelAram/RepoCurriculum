import type { WeatherResp } from "../interfaces";

// Contiene la URL del endpoint de OpenWeather para obtener el clima actual
const url = "https://api.openweathermap.org/data/2.5/weather";

/*
  Esta función asincrona realiza la peticion al servicio de clima de OpenWeather, recibe como argumentos la latitud 
  y longitud que utilizan OpenWeather para obtener el clima de la ubicacion
*/
export const weather = async (lat: number, lon: number) => {
  // URLSearchParams nos permite gestionar los parametros de consulta que necesita la petición
  const params = new URLSearchParams();

  // Agregamos el parametro donde adjuntamos el token de autenticación requerido por OpenWeather
  params.append("appid", process.env.Weather ?? "");
  // Agregamos el parametro de latitud
  params.append("lat", String(lat));
  // Agregamos el parametro de longitud
  params.append("lon", String(lon));
  // Indicamos que la temperatura sea enviada en grados celcius o centigrados
  params.append("units", "metric");
  // Indicamos que la información sea enviada en español
  params.append("lang", "es");

  // Comenzamos la petición HTTP concatenando la url base y los parametros
  const resp = await fetch(`${url}?${params.toString()}`);

  // Convertimos la respuesta recibida en un objeto de tipo WeatherResp
  const weatherResp: WeatherResp = await resp.json();

  // Retornamos la temperatura y el nombre del lugar
  return {
    temp: Math.round(weatherResp.main.temp),
    location: weatherResp.name,
  };
};
