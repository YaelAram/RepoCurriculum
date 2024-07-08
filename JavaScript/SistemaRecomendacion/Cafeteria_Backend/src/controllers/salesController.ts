import { Request, Response } from "express";
import { Sale } from "../model";

/*
  Esta funcion maneja la peticion de consulta de ventas, nos permite paginar las ventas registradas

  El parametro req es de tipo Request (un tipo definido por la biblioteca Express), este contiene la informacion de la
  peticion
  El parametro res es de tipo Response (un tipo definido por la biblioteca Express), este nos permite realizar el
  envio de un respuesta al cliente, especificar su contenido y codigo de estado
*/
export const getAllSales = async (req: Request, res: Response) => {
  /*
    limit indica el numero de registros que la peticion debe retornar
    offset indica la pagina o el numero de registros a ignorar
  */
  const { limit = 5, offset = 0 } = req.query;

  /*
    Hace dos consultas a la base de datos, la primera retorna el numero total de ventas registradas mientras
    la segunda retorna la lista de ventas con la longitud indicada y habiendo omitido el nuemro de registros indicado
  */
  const [salesCount, sales] = await Promise.all([
    Sale.countDocuments(),
    Sale.find().skip(Number(offset)).limit(Number(limit)),
  ]);

  // Enviamos la informacion al cliente
  res.status(200).json({
    salesCount,
    sales,
  });
};

/*
  Esta funcion maneja la peticion de creacion de ventas

  El parametro req es de tipo Request (un tipo definido por la biblioteca Express), este contiene la informacion de la
  peticion
  El parametro res es de tipo Response (un tipo definido por la biblioteca Express), este nos permite realizar el
  envio de un respuesta al cliente, especificar su contenido y codigo de estado
*/
export const createSale = async (req: Request, res: Response) => {
  // Obtenemos la informacion de venta del body de la peticion
  const { age, temperature, drink } = req.body;

  // Creamos una nueva instancia tipo venta
  const sale = new Sale({ age, temperature, drink });
  // Guardamos en la base de datos la instancia creada en el paso anterior
  await sale.save();

  // Enviamos el nuevo registro al cliente, este objeto contiene el id unico
  res.status(201).json({ sale });
};

/*
  Esta funcion maneja la peticion actualizacion de registros de venta

  El parametro req es de tipo Request (un tipo definido por la biblioteca Express), este contiene la informacion de la
  peticion
  El parametro res es de tipo Response (un tipo definido por la biblioteca Express), este nos permite realizar el
  envio de un respuesta al cliente, especificar su contenido y codigo de estado
*/
export const updateSale = async (req: Request, res: Response) => {
  // Obtenemos el id del registro a actualizar
  const { id } = req.params;
  // Obtenemos la informacion actualizada
  const { age, temperature, drink } = req.body;

  // Buscamos el registro de venta y lo actualizamos
  const sale = await Sale.findByIdAndUpdate(
    id,
    { age, temperature, drink },
    { new: true }
  );

  // Enviamos el registro con la informacion actualizada
  res.status(200).json({ sale });
};

/*
  Esta funcion maneja la peticion de eliminacion de registros de venta

  El parametro req es de tipo Request (un tipo definido por la biblioteca Express), este contiene la informacion de la
  peticion
  El parametro res es de tipo Response (un tipo definido por la biblioteca Express), este nos permite realizar el
  envio de un respuesta al cliente, especificar su contenido y codigo de estado
*/
export const deleteSale = async (req: Request, res: Response) => {
  // Obtenemos el id del registro a eliminar
  const { id } = req.params;

  // Buscamos el registro y lo eliminamos
  const sale = await Sale.findByIdAndDelete(id);

  // Enviamos el la informacion del registro eliminado
  res.status(200).json({ sale });
};

// Esta funcion nos permite crea un numero entero aleatorio dentro de un rango de numeros
const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

/*
  Esta funcion maneja la peticion creacion de ventas, esta nos permite crear volumenes grandes de ventas a la vez

  El parametro req es de tipo Request (un tipo definido por la biblioteca Express), este contiene la informacion de la
  peticion
  El parametro res es de tipo Response (un tipo definido por la biblioteca Express), este nos permite realizar el
  envio de un respuesta al cliente, especificar su contenido y codigo de estado
*/
export const createSales = async (req: Request, res: Response) => {
  /*
    Obtenemos el numero de ventas a crear, el valor de temperatura minimo y maximo, el valor de edad minimo y
    maximo y la probabilidad de que el usuario elija una bebida fria
  */
  const { sales, minAge, maxAge, minTemp, maxTemp, coldP } = req.body;
  // Creamos un array que contendra las ventas creadas
  const createdSales = [];

  // Iteramos (numero de ventas a crear) veces
  for (let i = 0; i < sales; i++) {
    // Obtenemos el tipo de bebida de la venta, con un Math.random simulamos la eleccion de un cliente
    const drink = Math.random() < coldP ? 0 : 1;
    // Creamos una nueva instancia de Venta
    const sale = new Sale({
      age: getRandomInt(minAge, maxAge),
      temperature: getRandomInt(minTemp, maxTemp),
      drink,
    });
    // Guardamos la venta en la base de datos
    await sale.save();
    // Guardamos la venta dentro del array de ventas
    createdSales.push(sale);
  }

  // Enviamos el array con las ventas creadas por el metodo
  res.status(201).json({ createdSales });
};
