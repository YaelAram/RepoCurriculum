import { sales } from "../../context";
import { getSales } from "../../providers";
import { createElement } from "../../utils";
import { tableObserverFn } from "./handlers";

/*
  Mandamos a llamar la funcion que crea el componente SalesTable este contiene la tabla que muestra
  los registros de ventas

  Enviamos como parametro el numero de registros de venta que contiene cada pagina
*/
export const SalesTable = (numberOfSales: number) => {
  // Creamos un elemento TBODY en el cual se alojaran los registros de ventas
  const tbody = createElement<HTMLTableSectionElement>({
    tag: "tbody",
  });

  // Creamos la primer fila de nuestra tabla, en la cual se encuentran los titulos de las columnas
  const theadRow = createElement<HTMLTableRowElement>({
    tag: "tr",
    nodes: [
      // Titulo de la columna que contiene los id unicos de los registros
      createElement<HTMLTableCellElement>({ tag: "th", innerText: "ID" }),
      // Titulo de la columna que contiene la edad de los clientes
      createElement<HTMLTableCellElement>({ tag: "th", innerText: "Edad" }),
      // Titulo de la columna que contiene la temperatura ambiente en el momento de la venta
      createElement<HTMLTableCellElement>({
        tag: "th",
        innerText: "Temperatura",
      }),
      // Titulo de la columna que contiene el tipo de bebida que el cliente compro
      createElement<HTMLTableCellElement>({ tag: "th", innerText: "Bebida" }),
      // Titulo de la columna que contiene el boton que permite eliminar un registro
      createElement<HTMLTableCellElement>({ tag: "th", innerText: "Acciones" }),
    ],
  });

  // Creamos el elemento TABLE
  const salesTable = createElement<HTMLTableElement>({
    tag: "table",
    nodes: [
      // Agregamos el elemento THEAD
      createElement<HTMLTableSectionElement>({
        tag: "thead",
        nodes: [theadRow], // Agregamos el elemento TR (Table Row) con todos los titulos de columnas
      }),
      tbody, // Agregamos el elemento TBODY
    ],
    style: ["rounded", "shadow"], // Agregamos las clases CSS rounded y shadow
  });

  // Adjuntamos el estado sales
  // Creamos la clave unica para el suscriptor que se va a crear
  const tableSubscribeKey = "sales-table-observer-sales";

  // Agregamos un suscriptor al observable sales
  sales.subscribe({
    key: tableSubscribeKey, // key indica la clave unica del suscriptor
    /*
      observer contiene la funcion que se ha de ejecutar cada vez que el estado sales cambie
      
      tableObserverFn es una funcion que recibe como parametro el elemento tbody, en el cual agregara
      los elementos TR con los registros de ventas

      A su vez tableObserverFn retorna una funcion que es compatible con el tipo de funcion que requiere el
      atributo observer, es decir, una funcion que retorne void y cuyo unico parametro sea de tipo Sale[]
    */
    observer: tableObserverFn(tbody),
  });

  // Comenzamos la peticion HTTP para obtener la primer pagina de registros de ventas y actualizamos el observable sales
  getSales(numberOfSales, 0).then((salesList) => sales.updateState(salesList));

  /*
    Retornamos dos elementos, salesTable que contiene el HTML del componente y tableSubscribeKey que es un string
    con el unico suscriptor del componente
  */
  return {
    salesTable,
    tableSubscribeKey,
  };
};
