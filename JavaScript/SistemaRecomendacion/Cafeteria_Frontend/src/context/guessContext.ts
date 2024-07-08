import { Model, Suggestion } from "../interfaces/model";
import type { Coord, WeatherResp } from "../interfaces/weather";
import { Observable } from "../utils";

/*
  Creaamos un observable de tipo Coord, en este almacenamos la latitud y longitud de la localizacion actual del
  cliente

  Se inicializan ambos valores en cero en lo que el servicio de localizacion obtiene las coordenadas del cliente
*/
export const coords: Observable<Coord> = new Observable<Coord>({
  lat: 0,
  lon: 0,
});

/*
  Creamos un observable tipo WeatherResp, este almacena el estado del clima en la localizacion del cliente, donde 
  location indica el nombre del lugar donde esta el cliente y temp la temperatura del lugar
*/
export const weather: Observable<WeatherResp> = new Observable<WeatherResp>({
  location: "",
  temp: 0,
});

/*
  Creamos un observable tipo Model, el cual contiene el modelo de inferencia, donde createdAt contiene la fecha
  y hora en la cual fue creado el modelo, sales indica el numero de ventas con la que fue construido (el tamaño de la
  base de conocimientos) y model contiene el modelo de inferencia
*/
export const model: Observable<Model> = new Observable<Model>({
  createdAt: new Date().getTime(),
  sales: 0,
  model: {},
});

/*
  Creamos un observable de tipo Suggestion, la cual contiene la informacion de la sugerencia que el sistema hace al 
  usuario, donde coldP indica la probabilidad de que el cliente elija una bebida fria, drink es un string que indica
  el tipo de bebida, age representa la edad del cliente e icons es un arreglo de strings, cada string contiene la ruta
  a un icono que representa el tipo de bebida
*/
export const suggestion: Observable<Suggestion> = new Observable<Suggestion>({
  coldP: 0.5,
  icons: ["./coldDrink.svg"],
  drink: "Fria",
  age: 0,
});
