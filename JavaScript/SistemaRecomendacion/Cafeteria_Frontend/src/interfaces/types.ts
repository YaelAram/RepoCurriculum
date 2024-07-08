/*
  Define un objeto cuyas propiedades (COLD y HOT) no pueden ser modificadas y al cual no se le pueden añadir nuevas
  propiedades, con este objeto logramos un funcionamiento similar al de un ENUM, si bien TypeScript soporta el uso de
  ENUM, esta forma de definirlos es más flexible

  COLD y HOT son propiedades las cuales definen un objeto con dos propiedades:
    label: Es el texto que mostramos al usuario (en español)
    query: Nos permite construir la clave unica de la estructura Map que contiene el modelo de inferencia
*/
export const Drink = {
  COLD: { label: "Fria", query: "Cold" },
  HOT: { label: "Caliente", query: "Hot" },
} as const;

/*
  El tipo de dato DrinkType se basa en la definicion de la variable Drink (similar a un ENUM), este tipo de dato
  permite unicamente asignar valores de la forma:
    const drink: DrinkType = Drink.COLD
    const drink: DrinkType = COLD: { label: "Fria", query: "Cold" }
  
  Como se puede observar nos permite asignar un valor utilizando la variable Drink como el objeto literal con las
  propiedades label y query, esto nos da mayor flexibilidad que el uso de un ENUM convencional que solo nos permitiria
  el primer tipo de asignación
*/
export type DrinkType = (typeof Drink)[keyof typeof Drink];

/*
  Define un objeto cuyas propiedades (FREEZE, COLD, COOL, MILD, HOT BOILING) no pueden ser modificadas y al cual
  no se le pueden añadir nuevas propiedades, con este objeto logramos un funcionamiento similar al de un ENUM,
  si bien TypeScript soporta el uso de ENUM, esta forma de definirlos es más flexible

  Las propiedades definen un objeto con dos propiedades:
    label: Es el texto que mostramos al usuario (en español)
    query: Nos permite construir la clave unica de la estructura Map que contiene el modelo de inferencia
*/
export const Temp = {
  FREEZE: { label: "Gelido", query: "Freeze" },
  COLD: { label: "Frio", query: "Cold" },
  COOL: { label: "Fresco", query: "Cool" },
  MILD: { label: "Calido", query: "Mild" },
  HOT: { label: "Caliente", query: "Hot" },
  BOILING: { label: "Caluroso", query: "Boiling" },
} as const;

/*
  El tipo de dato TempType se basa en la definicion de la variable Temp (similar a un ENUM), este tipo de dato
  permite unicamente asignar valores de la forma:
    const temp: TempType = Temp.COLD
    const temp: TempType = { label: "Frio", query: "Cold" }
  
  Como se puede observar nos permite asignar un valor utilizando la variable Temp como el objeto literal con las
  propiedades label y query, esto nos da mayor flexibilidad que el uso de un ENUM convencional que solo nos permitiria
  el primer tipo de asignación
*/
export type TempType = (typeof Temp)[keyof typeof Temp];

/*
  Define un objeto cuyas propiedades (CHILD, TEEN, YOUNG, MIDDLE, ADULT, RETIRED, OLDER) no pueden ser modificadas y al cual
  no se le pueden añadir nuevas propiedades, con este objeto logramos un funcionamiento similar al de un ENUM,
  si bien TypeScript soporta el uso de ENUM, esta forma de definirlos es más flexible

  Las propiedades definen un objeto con dos propiedades:
    label: Es el texto que mostramos al usuario (en español)
    query: Nos permite construir la clave unica de la estructura Map que contiene el modelo de inferencia
*/
export const Age = {
  CHILD: { label: "Niño", query: "Child" },
  TEEN: { label: "Adolescente", query: "Teen" },
  YOUNG: { label: "Joven", query: "Young" },
  MIDDLE: { label: "Adulto Medio", query: "Middle" },
  ADULT: { label: "Adulto", query: "Adult" },
  RETIRED: { label: "Retirado", query: "Retired" },
  OLDER: { label: "Adulto Mayor", query: "Older" },
} as const;

/*
  El tipo de dato AgeType se basa en la definicion de la variable Age (similar a un ENUM), este tipo de dato
  permite unicamente asignar valores de la forma:
    const age: AgeType = Age.CHILD
    const age: AgeType = { label: "Niño", query: "Child" }
  
  Como se puede observar nos permite asignar un valor utilizando la variable Age como el objeto literal con las
  propiedades label y query, esto nos da mayor flexibilidad que el uso de un ENUM convencional que solo nos permitiria
  el primer tipo de asignación
*/
export type AgeType = (typeof Age)[keyof typeof Age];
