import { Counter, SalesTable } from "../../components";
import { alert, isLoading, page, sales } from "../../context";
import { addStyles, createElement } from "../../utils";

// Con este import obtenemos los estilos globales y los guardamos en globalStyle en forma de string
import globalStyle from "../../styles/global.css?inline";
// Con este import obtenemos los estilos propio de la pagina y los guardamos en salesStyle en forma de string
import salesStyle from "./sales.css?inline";

/*
  Esta clase define un nuevo web component el cual contiene nuestra pagina de 'Historial de Ventas',
  este debe extender de HTMLElement para ser considerado un web component y ser agregado a nuestro index.html
*/
export class Sales extends HTMLElement {
  /*
    Los web components utilizan un su propia instancia del DOM por lo que tanto el CSS como el JavaScript que se ejecuta
    dentro de ellos esta encapsulado y no puede ser accedido desde afuera
  */
  private shadow: ShadowRoot = this.attachShadow({ mode: "open" });
  // Contiene las claves unicas de todos los suscriptores a los estados de contexto
  private subscribers: string[] = [];
  // Contiene el numero de registros de ventas a mostrar por cada pagina
  private numberOfSales: number = 8;

  constructor() {
    // Llamamos al constructor de la clase HTMLElement
    super();

    /*
      Mandamos a llamar la funcion que crea el componente Counter el cual contiene los controles
      para cargar la pagina anterior o la siguiente y elemento SPAN que indica la pagina actual

      Enviamos como parametro el numero de registros de ventas que debe contener cada pagina

      Recibimos dos elementos, controlSection es el el contenido HTML y subscribers es un array con todas
      las claves unicas de los suscriptores
    */
    const { controlSection, subscribers } = Counter(this.numberOfSales);

    /*
      Mandamos a llamar la funcion que crea el componente SalesTable este contiene la tabla que muestra
      los registros de ventas

      Enviamos como parametro el numero de registros de venta que contiene cada pagina

      Recibimos dos elementos, salesTable que contiene el HTML del componente y tableSubscribeKey que es un string
      con el unico suscriptor del componente
    */
    const { salesTable, tableSubscribeKey } = SalesTable(this.numberOfSales);

    // Agregamos todos los suscriptores creados por los componentes Counter y SalesTable a la lista de suscriptores
    this.subscribers.push(tableSubscribeKey, ...subscribers);

    // Agregamos todos los elementos HTML al show DOM propio del web component
    this.shadow.append(
      addStyles(globalStyle), // Agregamos los estilos CSS globales que comparten ambas paginas
      addStyles(salesStyle), // Agregamos los estilos CSS unicos para esta pagina
      // Creamos y agregamos un elemento H1 con el texto Historial de ventas
      createElement<HTMLHeadingElement>({
        tag: "h1",
        innerText: "Historial de Ventas",
      }),
      controlSection, // Agregamos el HTML generado por el componente Counter
      salesTable, // Agregamos el HTML generado por el componente SalesTable
      alert // Agregamos el HTML que contiene el cuadro de notificacion
    );
  }

  // Esta funcion se ejecuta cuando el web component es removido del HTML
  disconnectedCallback() {
    /*
      Iteramos sobre la lista de suscriptores y dependiendo del inicio de su clave unica lo eliminamos de la lista
      de suscriptores del contexto indicado, con ello evitamos que el contexto (el observable) tenga suscriptores que
      ya no estan activos o fueron eliminados
    */
    this.subscribers.forEach((subscriber) => {
      if (subscriber.startsWith("sales")) sales.unsubscribe(subscriber);
      else if (subscriber.startsWith("page")) page.unsubscribe(subscriber);
      else isLoading.unsubscribe(subscriber);
    });
  }
}
