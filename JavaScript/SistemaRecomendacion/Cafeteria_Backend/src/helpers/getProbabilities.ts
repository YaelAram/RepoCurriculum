import { getTempByAge, getTempDrinkByAge } from "../helpers";
import { Age, Drink } from "../interfaces";
import { Sale } from "../model";

/*
  Obtiene la probabilidad de que un cliente elija una bebida fria sin importar la edad del cliente o la temperatura
  ambiente en ese momento, P(Bebida fria)

  Recibe como parametro numberOfSales el cual contiene el numero de ventas registradas
*/
export const getColdDrinkP = async (numberOfSales: number) => {
  // Creamos un Map el cual contiene como clave el tipo de bebida y como valor la probabilidad calculada
  const drinkP = new Map<string, number>();

  /*
    Obtenemos del tipo de dato Drink.COLD, la clave (key) del tipo de bebida fria y el filtro a utilizar durante la
    consulta a la coleccion de Ventas en la base de datos, en este caso solo usamos la clave y filtro para
    las bebidas frias
  */
  const { key, filter: drink } = Drink.COLD;
  // Realizamos la consulta a la base de datos y nos retorna un array con todas las ventas que cumplen con el filtro
  const coldDrinkPeople = await Sale.find({ drink });
  // P(Bebida fria) = Ventas de bebida fria / Total de ventas
  const coldDrinkP = coldDrinkPeople.length / numberOfSales;

  // Agregamos la clave y la probabilidad calculada al Map
  drinkP.set(key, coldDrinkP);

  // Retornamos el Map
  return drinkP;
};

/*
  Obtiene la probabilidad de que una venta sea realizada dada la edad de un cliente y la temperatura ambiente
  en ese momento, P(Edad ∩ Temperatura)

  Recibe como parametro numberOfSales el cual contiene el numero de ventas registradas
*/
export const getAgeTemperatureP = async (numberOfSales: number) => {
  /*
    Mandamos a llamar al metodo getTempByAge siete veces cada una clasificacion de edad diferente, con ello obtenemos
    todas las posibles combinaciones entre las clasificaciones de edad y de temperatura, con el metodo Promise.all
    logramos una mejora de rendimiento ya que ejecutamos en paralelo las siete llamadas a la funcion

    results es un arreglo de arreglos, donde estos arreglos tienen la forma [clave unica, arreglo con las ventas que
    cumplen con el filtro de edad y temperatura]

    Nota: Cada llamada al metodo getTempByAge hace 6 llamadas, al llamarse 7 veces da un total de 42 consultas
  */
  let results = await Promise.all([
    getTempByAge(Age.CHILD),
    getTempByAge(Age.TEEN),
    getTempByAge(Age.YOUNG),
    getTempByAge(Age.MIDDLE),
    getTempByAge(Age.ADULT),
    getTempByAge(Age.RETIRED),
    getTempByAge(Age.OLDER),
  ]);

  const entries = results.flat(1).map(([key, sales]): [string, number] => {
    /*
      Calculamos la probabilidad obteniendo la longitud del arreglo de ventas que cumplieron el filtro de edad y 
      temperatura entre el numero total de vental registradas, es decir:

      P(Edad ∩ Temperatura) = Ventas donde Edad y Temperatura / Total de ventas
    */
    const probability = sales.length / numberOfSales;

    // Retornamos un array de la forma [clave, probabilidad]
    return [key, probability];
  });

  // Convertimos el arreglo de arreglos en un Map
  return new Map<string, number>(entries);
};

/*
  Obtiene la probabilidad de que una venta sea realizada dada la edad de un cliente y la temperatura ambiente
  en ese momento, ademas donde el cliente elijio una bebida fria, P (Edad ∩ Temperatura ∩ Bebida Fria)

  Recibe como parametro numberOfSales el cual contiene el numero de ventas registradas
*/
export const getAgeTemperatureDrinkP = async (numberOfSales: number) => {
  /*
    Mandamos a llamar al metodo getTempDrinkByAge siente veces cada una clasificacion de edad diferente, con ello obtenemos
    todas las posibles combinaciones entre las clasificaciones de edad, temperatura y bebida, con el metodo Promise.all
    logramos una mejora de rendimiento ya que ejecutamos en paralelo las siete llamadas a la funcion

    results es un arreglo de arreglos, donde estos arreglos tienen la forma [clave unica, arreglo con las ventas que
    cumplen con el filtro de edad, temperatura y bebida]

    Cada llamada al metodo getTempDrinkByAge hace 6 llamadas, al llamarse 7 veces da un total de 42 consultas
  */
  const results = await Promise.all([
    getTempDrinkByAge(Age.CHILD),
    getTempDrinkByAge(Age.TEEN),
    getTempDrinkByAge(Age.YOUNG),
    getTempDrinkByAge(Age.MIDDLE),
    getTempDrinkByAge(Age.ADULT),
    getTempDrinkByAge(Age.RETIRED),
    getTempDrinkByAge(Age.OLDER),
  ]);

  /*
    Calculamos la probabilidad obteniendo la longitud del arreglo de ventas que cumplieron el filtro de edad, 
    temperatura y bebida entre el numero total de vental registradas, es decir:

    P (Edad ∩ Temperatura ∩ Bebida Fria) = Ventas donde Edad y Temperatura y Bebida / Total de ventas
  */
  const entries = results.flat(1).map(([key, sales]): [string, number] => {
    const probability = sales.length / numberOfSales;

    // Retornamos un array de la forma [clave, probabilidad]
    return [key, probability];
  });

  // Convertimos el arreglo de arreglos en un Map
  return new Map<string, number>(entries);
};

/*
  Calcula la probabilidad condicional P (Edad ∩ Temperatura | Bebida Fria)

  Recibe como parametro el resultado del metodo getColdDrinkP en el parametro llamado drinkP y en el parametro
  ageTempDrinkP el resultado del metodo getAgeTemperatureDrinkP
*/
export const getLikelihood = (
  drinkP: Map<string, number>,
  ageTempDrinkP: Map<string, number>
) => {
  /*
    Creamos un nuevo Map, en este guardamos las probabilidades calculadas, modificar un Map es mas rapido que modificar
    un objeto literal
  */
  const likelihood = new Map<string, number>();

  // Iteramos sobre cada par clave valor del Map ageTempDrinkP
  for (const [key, value] of ageTempDrinkP.entries()) {
    /*
      Para calcular la probabilidad P (Edad ∩ Temperatura | Bebida Fria) utilizamos la siguiente formula
      P (Edad ∩ Temperatura | Bebida Fria) = P (Edad ∩ Temperatura) / P (Bebida fria)
    */
    const likelihoodP = value / drinkP.get(Drink.COLD.key)!;

    // Agregamos el valor calculado al Map, reutilizamos la clave sobre la que estamos iterando
    likelihood.set(key, likelihoodP);
  }

  // Retornamos el Map
  return likelihood;
};
