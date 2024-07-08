/*
  Esta interfaz describe como luce una sugerencia de bebida, donde coldP indica la probabilidad de que el cliente elija
  una bebida fria, icons contiene un arreglo con los iconos a mostrar (icono de bebida fria o caliente), drink es un 
  string que indica el tipo de bebida y age contiene la edad del cliente 
*/
export interface Suggestion {
  coldP: number;
  icons: string[];
  drink: string;
  age: number;
}

/*
  Describe como luce el modelo de inferencia que utiliza la aplicacion, sales indica el numero de ventas con las cuales
  se construyo el modelo, createdAt es un numero que indica la fecha y hora en la que el modelo fue creado (este numero
  debe ser convertido a un tipo de dato Date para poder obtener la fecha y hora de creacion) y model contiene las 
  probabilidades que indican que bebida sugerir
*/
export interface Model {
  sales: number;
  createdAt: number;
  model: { [key: string]: number };
}
