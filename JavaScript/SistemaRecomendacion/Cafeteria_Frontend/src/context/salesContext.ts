import { Alert } from "../components";
import { Sale } from "../interfaces/sales";
import { Observable } from "../utils";

/*
  Creamos un objeto observable, el cual contiene un arreglo de ventas, este observador almacena los registros de
  ventas que la aplicacion muestra en la pagina de historial de ventas

  Se inicializa con un array vacio, cuando termine la primer peticion de datos este array vacio sera actualizado
*/
export const sales: Observable<Sale[]> = new Observable<Sale[]>([]);

/*
  Creamos un objeto observable, contiene la pagina actual de la consulta de registros de ventas, se utiliza para
  saber el numero de registros a omitir cuando se realice la peticion al servidor por mas registros de ventas

  Se inicializa con un cero, ya que al cargarse pro primera vez la pagina interesa cargar los primeros registros
  de sistemas, es decir, no saltar ningun registro
*/
export const page: Observable<number> = new Observable<number>(0);

/*
  Creamos un objeto observable, indica si la pagina de Hitorial de Ventas esta realizando una peticion a la base de 
  datos, true si esta haciendo una peticion, se utiliza para inhabilitar los botones 'Anterior Pagina' y
  'Siguiente Pagina' y asi evitar que un usario provoque peticiones al servidor sin control
*/
export const isLoading: Observable<boolean> = new Observable<boolean>(false);

/*
  La funcion Alert retorna dos elementos, alert que es el div que funciona como cuadro de notificacion y showDialog
  que es un funcion que muestra el cuadro de notificacion
*/
export const { alert, showDialog } = Alert();
