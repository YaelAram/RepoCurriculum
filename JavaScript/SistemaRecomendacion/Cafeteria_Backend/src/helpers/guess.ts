import { Drink } from "../interfaces";

/*
  Este metodo genera un objeto el cual contiene claves tipo EdadTemperaturaBebida y a estas se les asigna un valor
  numerico con la probabilidad de que dada una edad y un temperatura el cliente elija comprar una bebida fria

  Este metodo solo calcula las probabilidades de que dada una edad y temperatura cualquiera el cliente elija
  una bebida fria, ya que la probabilidad de que elija una bebida caliente puede calcularse facilmente con:
    1.0 - probabilidad de bebida fria
  
  Y ademas permite reducir a la mitad el numero de consultas a la base de datos, este metodo reduce a la mitad el
  numero de valores sobre los que itera y el tamaño de la respuesta del servidor tambien se reduce

  Parametros:
    drinkP: es un Map cuya clave es el tipo de bebida, estas contienen la probabilidad de que el cliente elija una
    una bebida fria o una caliente independientemente de la edad del cliente o temperatura ambiente
    ageTempP: es un Map cuyas claves son del tipo EdadTemperatura, estas contienen la probabilidad de todas las 
    combinaciones entre las variables de edad y temperatura
    likelihoodP: es un Map cuyas claves son del tipo EdadTemperaturaBebida estas contienen la probabilidad de todas las 
    combinaciones entre las variables de edad y temperatura y donde el cliente elijio una bebida fria
*/
export const guess = (
  drinkP: Map<string, number>,
  ageTempP: Map<string, number>,
  likelihoodP: Map<string, number>
) => {
  /*
    Creamos un Map donde temporalmente guardaremos los resultados, se usa un map ya que es mucho mas rapido al 
    agregarle nuevas propiedades que un objeto literal
  */
  const guessModel = new Map<string, number>();

  // Obtenemos el key de la bebida fria
  const { key: cold } = Drink.COLD;

  // Iteramos sobre todas las claves del map ageTempP, en la constante ageTemp guardamos la clave actual del loop
  for (const ageTemp of ageTempP.keys()) {
    // Creamos la clave unica, esta es del tipo EdadTemperaturaBebida
    const guessCold = `${ageTemp}${cold}`;
    /*
      Calculamos la probabilidad con ayuda del teorema de Bayes, aplicando la formula:
      P (Bebida fria | Edad ∩ Temperatura) = (P(Bebida fria) * P (Edad ∩ Temperatura | Bebida Fria)) / P(Edad ∩ Temperatura)
    */
    const ageTempColdP =
      (drinkP.get(cold)! * likelihoodP.get(guessCold)!) /
      ageTempP.get(ageTemp)!;

    // Agregamos el nuevo par clave y valor al Map
    guessModel.set(guessCold, Number(ageTempColdP.toFixed(8)));
  }

  /*
    Convertimos el Map a un objeto literal, ya que este si puede ser serializado y por ende ser enviado como respuesta
    de una peticion HTTP
  */
  return Object.fromEntries(guessModel.entries());
};
