import { Router } from "express";
import { getWeather } from "../controllers";

// Creamos un nuevo router para los endpoints del servicio de clima
export const weatherRouter = Router();

/*
  Declaramos una ruta POST, la ruta completa es: http://localhost:8080/api/weather/  (EJEMPLO)
  El apartado /api/weather esta definido en la clase Server

  getWeather es una función que se encarga de atender la petición, envia la información de clima
*/
weatherRouter.post("/", getWeather);
