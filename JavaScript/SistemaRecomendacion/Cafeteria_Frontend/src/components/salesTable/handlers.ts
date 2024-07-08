import { page, sales, showDialog } from "../../context";
import { getAge, getDrink, getTemp } from "../../helpers";
import { Sale } from "../../interfaces/sales";
import { deleteSale, getSales } from "../../providers";
import { createElement } from "../../utils";

/*
  Esta funcion se encarga de crear el elemento TR que contienen la informacion del registro de venta

  Recibe como parametro la informacion del registro de venta
*/
const createSaleItem = ({ uid, age, drink, temperature }: Sale) => {
  // Creamos un elemento BUTTON el cual se encarga de ejecutar la peticion HTTP para eliminar un registro de venta
  const btn = createElement<HTMLButtonElement>({
    tag: "button",
    innerText: "Eliminar",
    options: { type: "button" },
  });

  /*
    Agregamos la funcion que ejecuta la peticion HTTP para eliminar un registro en la base de datos al elemento
    BUTTON cuando el usuario de click a este
  */
  btn.addEventListener("click", async () => {
    // Ejecutamos la peticion HTTP, enviamos como parametro el id unico del registro a eliminar
    const { ok, sale } = await deleteSale(uid);

    // La variable ok nos indica si el registro se elimino con exito, true si se elimino el registro
    if (ok) {
      // Ejecutamos la peticion HTTP para obtener una lista de registros de venta actualizada
      getSales(8, 8 * page.getState()).then((salesList) =>
        sales.updateState(salesList)
      );

      // Mostramos el cuadro de notificacion indicandole al usuario que el registro se elimino con exito
      showDialog("Venta Eliminada con Exito", `Venta eliminada: ${sale.uid}`);
    }
  });

  // Retornamos el elemento TR con la informacion del registro de venta
  return createElement<HTMLTableRowElement>({
    tag: "tr", // Creamos el elemento TR (Table Row)
    nodes: [
      createElement<HTMLTableCellElement>({
        tag: "td", // Creamos un elemento TD (Table Cell)
        innerHTML: uid, // Insertamos el id unico como contenido
      }),
      createElement<HTMLTableCellElement>({
        tag: "td", // Creamos un elemento TD (Table Cell)
        innerText: getAge(age).label, // Insertamos el string con la edad del cliente
      }),
      createElement<HTMLTableCellElement>({
        tag: "td", // Creamos un elemento TD (Table Cell)
        innerText: getTemp(temperature).label, // Insertamos el string con la temperatura ambiente
      }),
      createElement<HTMLTableCellElement>({
        tag: "td", // Creamos un elemento TD (Table Cell)
        innerText: getDrink(drink).label, // Insertamos el string con el tipo de bebida
      }),
      createElement<HTMLTableCellElement>({
        tag: "td", // Creamos un elemento TD (Table Cell)
        nodes: [btn], // Insertamos el BUTTON para eliminar el registro de venta actual
      }),
    ],
  });
};

/*
  tableObserverFn es una funcion que recibe como parametro el elemento tbody, en el cual agregara
  los elementos TR con los registros de ventas
*/
export const tableObserverFn = (table: HTMLTableSectionElement) => {
  /*
    retornamos una funcion que es compatible con el tipo de funcion que requiere el
    atributo observer, es decir, una funcion que retorne void y cuyo unico parametro sea de tipo Sale[]
  */
  return (salesList: Sale[]) => {
    // Vaciamos el contenido actual de la tabla
    table.textContent = "";
    /*
      Insertamos los registros de ventas actualizados, iteramos sobre la lista de registros y mandamos a llamar
      la funcion que crea el elemento TR con la informacion del registro
    */
    table.append(...salesList.map((sale) => createSaleItem(sale)));
  };
};
