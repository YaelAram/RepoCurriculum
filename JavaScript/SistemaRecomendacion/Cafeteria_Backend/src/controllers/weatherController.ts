import { Request, Response } from "express";
import { weather } from "../services";

/*
  Esta funcion maneja la peticion de reporte de clima

  El parametro req es de tipo Request (un tipo definido por la biblioteca Express), este contiene la informacion de la
  peticion
  El parametro res es de tipo Response (un tipo definido por la biblioteca Express), este nos permite realizar el
  envio de un respuesta al cliente, especificar su contenido y codigo de estado
*/
export const getWeather = async (req: Request, res: Response) => {
  // Obtenemos el dato lat (latitud) y lon (longitud) del body de la peticion del cliente
  const { lat, lon } = req.body;
  // Llamamos al metodo weather que realiza la peticcion HTTP al servicio de OpenWeather
  const currentWeather = await weather(lat, lon);
  // El reporte de clima recibido lo enviamos al cliente
  res.status(200).json(currentWeather);
};
