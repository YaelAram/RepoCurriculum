import { Router } from "express";
import { createModel } from "../controllers";

// Creamos un nuevo router para los endpoints del servicio que crea el modelo de inferencia
export const guessRouter = Router();

/*
  Declaramos una ruta POST, la ruta completa es: http://localhost:8080/api/guess/  (EJEMPLO)
  El apartado /api/guess esta definido en la clase Server

  createModel es una función que se encarga de atender la petición, crea el modelo de inferencia por primera vez y lo
  guarda, posteriormente envia una copia del modelo que creo (no lo recalcula) a menos que reciba un parametro que le indica
  recalcular el modelo
*/
guessRouter.post("/", createModel);
