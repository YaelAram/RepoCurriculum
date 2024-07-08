import { Request, Response } from "express";

import {
  checkCreateModel,
  getAgeTemperatureDrinkP,
  getAgeTemperatureP,
  getColdDrinkP,
  getLikelihood,
  guess,
} from "../helpers";
import { Sale } from "../model";

/*
  En esta variable almacenamos el modelo de inferencia, en caso de que no se requiera recalcular el modelo, el modelo
  almacenado en esta variable sera enviado al cliente
*/
let response: {
  sales: number;
  createdAt: number;
  model?: any;
  drinkP?: any;
  ageTemperatureP?: any;
} = {
  sales: -1,
  createdAt: -1,
};

/*
  Esta funcion maneja la peticion de creacion del modelo de inferencia

  El parametro req es de tipo Request (un tipo definido por la biblioteca Express), este contiene la informacion de la
  peticion
  El parametro res es de tipo Response (un tipo definido por la biblioteca Express), este nos permite realizar el
  envio de un respuesta al cliente, especificar su contenido y codigo de estado
*/
export const createModel = async (req: Request, res: Response) => {
  // Obtenemos el valor boolean que envia el cliente, indica si requiere recalcular el modelo o no
  const { newModel = false } = req.body;

  // Ejecutamos la funcion checkCreateModel para comprobar si es necesario recalcular el modelo
  if (checkCreateModel(newModel, response.createdAt)) {
    // Realizamos una peticion a la base de datos para obtener el numero de ventas registradas
    const numberOfSales = await Sale.countDocuments();
    /*
      Ejecutamos el calculo las funciones en paralelo, donde:
        getColdDrinkP: Calcula P(Bebida fria)
        getAgeTemperatureP: Calcula P(Edad ∩ Temperatura)
        getAgeTemperatureDrinkP: Calcula P(Edad ∩ Temperatura ∩ Bebida Fria)
    */
    const [drinkP, ageTemperatureP, ageTemperatureDrinkP] = await Promise.all([
      getColdDrinkP(numberOfSales),
      getAgeTemperatureP(numberOfSales),
      getAgeTemperatureDrinkP(numberOfSales),
    ]);

    // Con los resultados anteriores, calculamos P(Edad ∩ Temperatura | Bebida Fria)
    const likelihoodP = getLikelihood(drinkP, ageTemperatureDrinkP);

    /*
      Actualizamos la variable response, enviamos el numero de ventas registradas actual, actualizamos la
      fecha y hora de creacion, recalculamos el modelo de inferencia con la funcion guess
    */
    response = {
      sales: numberOfSales,
      createdAt: new Date().getTime(),
      model: guess(drinkP, ageTemperatureP, likelihoodP),
    };
  }

  // Enviamos el modelo
  res.status(200).json(response);
};
