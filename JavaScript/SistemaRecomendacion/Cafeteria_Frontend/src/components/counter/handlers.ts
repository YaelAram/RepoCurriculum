import { isLoading, sales } from "../../context";
import { getSales } from "../../providers";

/*
  Esta funcion permite actualizar el valor actual del contador dentro de un elemento SPAN

  Recibe como parametro el elemento SPAN dentro del cual se isnertara el valor actualizado del contador
*/
export const spanObserverFn = (span: HTMLSpanElement) => {
  /*
    Retornamos una funcion que es compatible con el tipo de funcion que requiere el atributo observer,
    es decir, una funcion que retorne void y cuyo unico parametro sea de tipo number

    El parametro de tipo number, contiene la informacion actualizada del observable page
  */
  return (page: number) => {
    // Actualizamos el valor de contador que muestra el elemento SPAN
    span.innerText = String(page + 1);
  };
};

/*
  Esta funcion permite realizar la peticion HTTP apenas cambie la pagina actual

  Recibe como parametro numberOfSales, indica el nuemro de ventas a incluir por cada pagina
*/
export const fetchObserverFn = (numberOfSales: number) => {
  /*
    Retornamos una funcion que es compatible con el tipo de funcion que requiere el atributo observer,
    es decir, una funcion que retorne void y cuyo unico parametro sea de tipo number

    El parametro de tipo number, contiene la informacion actualizada del observable page
  */
  return (page: number) => {
    // Cambiamos el valor del observable isLoading (Deshabilitamos los botones)
    isLoading.updateState(true);
    // Realizamos la peticion HTTP con el valor de pagina actualizado
    getSales(numberOfSales, numberOfSales * page)
      // La funcion then se ejecuta cuando la peticion ha sido exitosa
      .then((salesList) => sales.updateState(salesList)) // Actualizamos los registros de ventas a mostrar
      .finally(() => isLoading.updateState(false)); // Cambiamos el valor del observable isLoading (Habilitamos los botones)
  };
};

/*
  Esta funcion permite habilitar o deshabilitar un boton dependiendo el valor actualizado del estado isLoading

  Como parametro recibe el boton que debe habilitar o deshabilitar
*/
export const btnObserverFn = (btn: HTMLButtonElement) => {
  /*
    Retornamos una funcion que es compatible con el tipo de funcion que requiere el atributo observer,
    es decir, una funcion que retorne void y cuyo unico parametro sea de tipo boolean

    El parametro de tipo boolean, contiene la informacion actualizada del observable isLoading
  */
  return (isBtnDisabled: boolean) => {
    // Si isLoagind es true entonces el sistema se encuentra realizando una peticion HTTP, el boton se deshabilita
    if (isBtnDisabled) btn.setAttribute("disabled", "");
    // Si isLoagind es false entonces el sistema no se encuentra realizando una peticion HTTP, el boton se habilita
    else btn.removeAttribute("disabled");
  };
};
