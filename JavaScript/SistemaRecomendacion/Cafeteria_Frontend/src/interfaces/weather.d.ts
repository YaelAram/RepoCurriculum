// Esta interfaz describe las coordenadas del lugar donde esta el cliente (latitud y longitud)
export interface Coord {
  lat: number;
  lon: number;
}

/*
  Esta interfaz describe la respuesta enviada por el servidor cuando se hace una peticion al servicio de clima
  Donde temp describe la temperatura actual del lugar donde se encuentra el cliente y location contiene el nombre
  del lugar
*/
export interface WeatherResp {
  temp: number;
  location: string;
}
