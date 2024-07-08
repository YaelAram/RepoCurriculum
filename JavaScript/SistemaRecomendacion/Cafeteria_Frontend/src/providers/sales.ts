import type { Sale, Sales } from "../interfaces/sales";

// Definimos la URL base a nuestra API REST, especificando nuestro servicio de gestion de ventas
const url = "https://cafeteriabackend-dev-xbcr.1.ie-1.fl0.io/api/sales";

/*
  Esta funcion nos permite realizar la consulta de nuestros registros de ventas de forma paginada, esta recibe como
  parametros
    limit: El numero de registros que contendra nuestra pagina
    offset: El numero de registros a omitir (ya que pertenecen a paginas anteriores)
*/
export const getSales = async (
  limit: number,
  offset: number
): Promise<Sale[]> => {
  /*
    Preparamos una instancia de URLSearchParams, nos permite manejar los query parameters que necesita esta 
    peticion HTTP de forma sencilla
  */
  const params = new URLSearchParams();
  // Adjuntamos el parametro limit
  params.set("limit", String(limit));
  // Adjuntamos el parametro offset
  params.set("offset", String(offset));

  // Realizamos la peticcion HTTP, utilizamos la URL base y adjuntamos los query parameters de la variable params
  const resp = await fetch(`${url}?${params.toString()}`);

  // Convertimos a formato JSON la respuesta del servidor
  const { sales }: Sales = await resp.json();

  // Retornamos la respuesta del servidor (un arreglo de registros de ventas)
  return sales;
};

/*
  Esta funcion nos permite realizar una peticion de eliminacion de un registro de venta, recibe como parametros:
    uid: El id unico del registro de venta
*/
export const deleteSale = async (uid: string) => {
  // Iniciamos la peticion HTTP, concatenamos la URL base y el id unico del registro a eliminar, usamos el metodo DELETE
  const resp = await fetch(`${url}/${uid}`, {
    method: "DELETE",
  });

  // Convertimos a formato JSON la respuesta del servidor
  const data: { sale: Sale } = await resp.json();

  // Retornamos el atributo ok de tipo boolean (true si se elimino con exito) y la informacion del registro eliminado
  return {
    ok: resp.ok,
    sale: data.sale,
  };
};

// Esta interfaz define como luce un registro de venta que aun no tiene un id unico generado por MongoDB
interface Drink {
  age: number;
  temperature: number;
  drink: number;
}

// Esta interfaz contiene todos los atributos de la interfaz Drink, pero si cuenta con el id unico generado por MongoDB
interface DrinkResp extends Drink {
  uid: string;
}

// Esta interfaz describe la forma que tiene la respuesta que el servidor envia luego de crear un registro de venta
interface Resp {
  sale: DrinkResp;
}

/*
  Esta funcion se encarga de realizar la peticion HTTP para crear un nuevo registro de venta, como parametro recibe:
    drink: Contiene la informacion necesaria para crear una nueva venta (menos el id unico, ya qu ese lo genera
    MongoDB en el servidor)
*/
export const createSale = async (drink: Drink) => {
  /*
    Iniciamos la peticion HTTP para crear un nuevo registro de venta, usamos el metodo POST, usamos la
    URL base, adjuntamos al body la informacion de la bebida y establecemos que el formato de la informacion
    que enviamos es JSON
  */
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(drink),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  // Convertimos en formato JSON la respuesta del servidor
  const sale: Resp = await resp.json();

  /*
    Retornamos la informacion de la respuesta, ok indica si el registro fue creado con exito y sale contiene la informacion
    del registro de venta (incluyendo el id unico generado por MongoDB)
  */
  return {
    ok: resp.ok,
    sale: sale.sale,
  };
};
