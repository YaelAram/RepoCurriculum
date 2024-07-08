/*
  Definimos un metodo recientemente añadido a JavaScript pero que TypeScript aun no tiene definido,
  al definirlo de la siguiente manera obtenemos que el compilador de TypeScript no nos indique un error en el codigo
*/
declare global {
  interface Document {
    startViewTransition(callback: () => void): void;
  }
}

/*
  Esta interfaz describe la respuesta que se recibe del servidor al hacer la consulta de ventas, donde salesCount
  indica el numero de registros de ventas y sales es un array de objetos tipo Venta
*/
export interface Sales {
  salesCount: number;
  sales: Sale[];
}

/*
  Esta interfaz describe como luce un registro de venta, donde age describe la edad del cliente, drink describe el tipo
  de la bebida (0 para fria y 1 para caliente), temperature indica la temperatura ambiente en ese momento y uid es el
  id unico generado por MongoDB
*/
export interface Sale {
  age: number;
  temperature: number;
  drink: number;
  uid: string;
}
