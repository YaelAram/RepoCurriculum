import { AgeType, Drink, DrinkType, Temp, TempType } from "../interfaces";
import { Sale } from "../model";

/*
  Realiza una consulta a MongoDB, con la cual se obtienen todos los registros de ventas que concuerden con el filtro
  de edad y temperatura que recibe por parametro.

  Retorna una promesa (un proceso asincrono) la cual al terminar retorna un arreglo de la forma
  [string, array de registros que cumplieron con los filtros]
*/
const getAgeTempP = async (
  key: string,
  { filter: age }: AgeType,
  { filter: temperature }: TempType
) => {
  return Promise.all([Promise.resolve(key), Sale.find({ age, temperature })]);
};

/*
  Utiliza el metodo getAgeTempP por dentro, recibe como parametro un valor de tipo AgeType, con el cual se crea
  parte de la clave unica y se envia a la funcion getAgeTempP como parametro (contiene el filtro de edad a utilizar)

  Ya que necesitamos los registros que coincidan con la edad y a su vez con cada una de las categorias de temperatura
  mandamos a llamar el metodo getAgeTempP seis veces, todos con el mismo filtro de edad pero distinto filtro de
  temperatura

  Retorna una promesa (un proceso asincrono) la cual al terminar retorna un arreglo compuesto de arreglos de la forma
  [string, array de registros que cumplieron con los filtros]
*/
export const getTempByAge = (age: AgeType) => {
  /*
    La clave unica tiene la forma EdadTemperatura, por ejemplo, en una consulta donde el filtro de edad es
    CHILD (niño) y el filtro de temperatura es COLD (Frio) la clave es "ChildCold"
  */
  return Promise.all([
    getAgeTempP(`${age.key}${Temp.FREEZE.key}`, age, Temp.FREEZE),
    getAgeTempP(`${age.key}${Temp.COLD.key}`, age, Temp.COLD),
    getAgeTempP(`${age.key}${Temp.COOL.key}`, age, Temp.COOL),
    getAgeTempP(`${age.key}${Temp.MILD.key}`, age, Temp.MILD),
    getAgeTempP(`${age.key}${Temp.HOT.key}`, age, Temp.HOT),
    getAgeTempP(`${age.key}${Temp.BOILING.key}`, age, Temp.BOILING),
  ]);
};

/*
  Realiza una consulta a MongoDB, con la cual se obtienen todos los registros de ventas que concuerden con el filtro
  de edad, temperatura y tipo de bebida que recibe por parametro.

  Retorna una promesa (un proceso asincrono) la cual al terminar retorna un arreglo donde la primer valor es
  un string (una clave unica) y como segundo valor un array con todos los registros que cumplieron con los filtros 
*/
const getAgeTempDrink = async (
  key: string,
  { filter: age }: AgeType,
  { filter: temperature }: TempType,
  { filter: drink }: DrinkType
) => {
  return Promise.all([
    Promise.resolve(key),
    Sale.find({ age, temperature, drink }),
  ]);
};

/*
  Utiliza el metodo getAgeTempDrink por dentro, recibe como parametro un valor de tipo AgeType, con el cual se crea
  parte de la clave unica y se envia a la funcion getAgeTempDrink como parametro (contiene el filtro de edad a utilizar)

  Ya que necesitamos los registros que coincidan con la edad y a su vez con cada una de las categorias de temperatura
  mandamos a llamar el metodo getAgeTempDrink seis veces, todos con el mismo filtro de edad pero distinto filtro de
  temperatura, el filtro de tipo de bebida tambien se mantiene igual para todas las consultas

  Retorna una promesa (un proceso asincrono) la cual al terminar retorna un arreglo compuesto de arreglos de la forma
  [string, array de registros que cumplieron con los filtros]
*/
export const getTempDrinkByAge = (age: AgeType) => {
  /*
    La clave unica tiene la forma EdadTemperaturaBebida, por ejemplo, en una consulta donde el filtro de edad es
    CHILD (niño), el filtro de temperatura es COLD (Frio) y donde el filtro de bebida siempre es COLD (Fria)
    la clave es "ChildColdCold"
  */
  return Promise.all([
    getAgeTempDrink(
      `${age.key}${Temp.FREEZE.key}${Drink.COLD.key}`,
      age,
      Temp.FREEZE,
      Drink.COLD
    ),

    getAgeTempDrink(
      `${age.key}${Temp.COLD.key}${Drink.COLD.key}`,
      age,
      Temp.COLD,
      Drink.COLD
    ),

    getAgeTempDrink(
      `${age.key}${Temp.COOL.key}${Drink.COLD.key}`,
      age,
      Temp.COOL,
      Drink.COLD
    ),

    getAgeTempDrink(
      `${age.key}${Temp.MILD.key}${Drink.COLD.key}`,
      age,
      Temp.MILD,
      Drink.COLD
    ),

    getAgeTempDrink(
      `${age.key}${Temp.HOT.key}${Drink.COLD.key}`,
      age,
      Temp.HOT,
      Drink.COLD
    ),

    getAgeTempDrink(
      `${age.key}${Temp.BOILING.key}${Drink.COLD.key}`,
      age,
      Temp.BOILING,
      Drink.COLD
    ),
  ]);
};
