/*
  Define un objeto cuyas propiedades (COLD y HOT) no pueden ser modificadas y al cual no se le pueden añadir nuevas
  propiedades, con este objeto logramos un funcionamiento similar al de un ENUM, si bien TypeScript soporta el uso de
  ENUM, esta forma de definirlos es más flexible

  COLD y HOT son propiedades las cuales definen un objeto con dos propiedades:
    key: La cual se utiliza para generar la clave con la cual se guardara dentro de una estructura de datos Map,
    estas estructuras se utilizan en el endpoint que genera el modelo de inferencia
    filter: Se utiliza para guardar el predicado que evaluara mongoose (la biblioteca que interactua con MongoDB)
    para realizar consultas de datos que cumplan con ciertas caracteristicas
*/
export const Drink = {
  COLD: { key: "Cold", filter: 0 },
  HOT: { key: "Hot", filter: 1 },
} as const;

/*
  El tipo de dato DrinkType se basa en la definicion de la variable Drink (similar a un ENUM), este tipo de dato
  permite unicamente asignar valores de la forma:
    const drink: DrinkType = Drink.COLD
    const drink: DrinkType = { key: "Cold", filter: 0 }
  
  Como se puede observar nos permite asignar un valor utilizando la variable Drink como el objeto literal con las
  propiedades key y filter, esto nos da mayor flexibilidad que el uso de un ENUM convencional que solo nos permitiria
  el primer tipo de asignación
*/
export type DrinkType = (typeof Drink)[keyof typeof Drink];

/*
  Define un objeto cuyas propiedades (FREEZE, COLD, COOL, MILD, HOT, BOILING) no pueden ser modificadas y al cual 
  no se le pueden añadir nuevas propiedades, con este objeto logramos un funcionamiento similar al de un ENUM, 
  si bien TypeScript soporta el uso de ENUM, esta forma de definirlos es más flexible

  Cada propiedad define un objeto con dos propiedades:
    key: La cual se utiliza para generar la clave con la cual se guardara dentro de una estructura de datos Map,
    estas estructuras se utilizan en el endpoint que genera el modelo de inferencia
    filter: Se utiliza para guardar el predicado que evaluara mongoose (la biblioteca que interactua con MongoDB)
    para realizar consultas de datos que cumplan con ciertas caracteristicas

  Nota: Mongoose utiliza abreviaturas para definir los predicados a aplicar sobre campos de tipo number, su significado
  es el siguiente:
    $lt: Less Than (Menor que)
    $lte: Less Than Equal (Menor o igual que)
    $gt: Greater Than (Mayor que)
    $gte: Greater Than Equal (Mayor o igual que)
*/
export const Temp = {
  FREEZE: { key: "Freeze", filter: { $lte: 0 } },
  COLD: { key: "Cold", filter: { $gt: 0, $lte: 10 } },
  COOL: { key: "Cool", filter: { $gt: 10, $lte: 20 } },
  MILD: { key: "Mild", filter: { $gt: 20, $lte: 30 } },
  HOT: { key: "Hot", filter: { $gt: 30, $lte: 40 } },
  BOILING: { key: "Boiling", filter: { $gt: 40 } },
} as const;

/*
  El tipo de dato TempType se basa en la definicion de la variable Temp (similar a un ENUM), este tipo de dato
  permite unicamente asignar valores de la forma:
    const temp: TempType = Temp.COLD
    const temp: TempType = { key: "Cold", filter: { $gt: 0, $lte: 10 } }
  
  Como se puede observar nos permite asignar un valor utilizando la variable Temp como el objeto literal con las
  propiedades key y filter, esto nos da mayor flexibilidad que el uso de un ENUM convencional que solo nos permitiria
  el primer tipo de asignación
*/
export type TempType = (typeof Temp)[keyof typeof Temp];

/*
  Define un objeto cuyas propiedades (CHILD, TEEN, YOUNG, MIDDLE, ADULT, RETURED, OLDER), no pueden ser
  modificadas y al cual no se le pueden añadir nuevas propiedades, con este objeto logramos un funcionamiento similar
  al de un ENUM, si bien TypeScript soporta el uso de ENUM, esta forma de definirlos es más flexible

  Cada propiedad define un objeto con dos propiedades:
    key: La cual se utiliza para generar la clave con la cual se guardara dentro de una estructura de datos Map,
    estas estructuras se utilizan en el endpoint que genera el modelo de inferencia
    filter: Se utiliza para guardar el predicado que evaluara mongoose (la biblioteca que interactua con MongoDB)
    para realizar consultas de datos que cumplan con ciertas caracteristicas

  Nota: Mongoose utiliza abreviaturas para definir los predicados a aplicar sobre campos de tipo number, su significado
  es el siguiente:
    $lt: Less Than (Menor que)
    $lte: Less Than Equal (Menor o igual que)
    $gt: Greater Than (Mayor que)
    $gte: Greater Than Equal (Mayor o igual que)
*/
export const Age = {
  CHILD: { key: "Child", filter: { $gte: 0, $lte: 12 } },
  TEEN: { key: "Teen", filter: { $gt: 12, $lte: 20 } },
  YOUNG: { key: "Young", filter: { $gt: 20, $lte: 30 } },
  MIDDLE: { key: "Middle", filter: { $gt: 30, $lte: 40 } },
  ADULT: { key: "Adult", filter: { $gt: 40, $lte: 60 } },
  RETIRED: { key: "Retired", filter: { $gt: 60, $lte: 80 } },
  OLDER: { key: "Older", filter: { $gte: 80 } },
} as const;

/*
  El tipo de dato AgeType se basa en la definicion de la variable Age (similar a un ENUM), este tipo de dato
  permite unicamente asignar valores de la forma:
    const temp: AgeType = Age.CHILD
    const temp: AgeType = { key: "Child", filter: { $gte: 0, $lte: 12 } }
  
  Como se puede observar nos permite asignar un valor utilizando la variable Age como el objeto literal con las
  propiedades key y filter, esto nos da mayor flexibilidad que el uso de un ENUM convencional que solo nos permitiria
  el primer tipo de asignación
*/
export type AgeType = (typeof Age)[keyof typeof Age];
