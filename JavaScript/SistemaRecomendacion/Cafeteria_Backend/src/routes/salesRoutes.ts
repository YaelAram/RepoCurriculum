import { Router } from "express";
import {
  createSale,
  deleteSale,
  getAllSales,
  updateSale,
} from "../controllers";

// Creamos un nuevo router para los endpoints del servicio de Ventas
export const salesRouter = Router();

/*
  Declaramos una ruta GET, la ruta completa es: http://localhost:8080/api/sales/  (EJEMPLO)
  El apartado /api/sales esta definido en la clase Server

  getAllSales es una función que se encarga de atender la petición, envia la lista de ventas paginada
*/
salesRouter.get("/", getAllSales);

/*
  Declaramos una ruta POST, la ruta completa es: http://localhost:8080/api/sales/  (EJEMPLO)
  El apartado /api/sales esta definido en la clase Server

  createSale es una función que se encarga de atender la petición, crea un nuevo registro de venta
*/
salesRouter.post("/", createSale);

/*
  Declaramos una ruta PUT, la ruta completa es: http://localhost:8080/api/sales/id  (EJEMPLO)
  El apartado /api/sales esta definido en la clase Server
  El apartado /id es propio del endpoint, id debe ser un id de MongoDB valido

  updateSale es una función que se encarga de atender la petición, actualiza la información de un registro de venta
*/
salesRouter.put("/:id", updateSale);

/*
  Declaramos una ruta DELETE, la ruta completa es: http://localhost:8080/api/sales/id  (EJEMPLO)
  El apartado /api/sales esta definido en la clase Server
  El apartado /id es propio del endpoint, id debe ser un id de MongoDB valido

  deleteSale es una función que se encarga de atender la petición, elimina un registro de venta
*/
salesRouter.delete("/:id", deleteSale);

/*
  Declaramos una ruta GET, la ruta completa es: http://localhost:8080/api/sales/create  (EJEMPLO)
  El apartado /api/sales esta definido en la clase Server
  El apartado /create es propio del endpoint

  NOTA: Este endpoint esta comentado ya que se utilizo para crear registros para la base de conocimientos inicial
  y de dejarse activado alguien podria usarlo para crear registros de forma descontrolada y perjudiciales para el modelo de
  inferencia

  createSales es una función que se encarga de atender la petición, sirve para simular varias compras a la vez
*/
// salesRouter.get("/create", createSales);
