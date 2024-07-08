import { addStyles, createElement, navigate } from "../helpers";

/*
  Esta clase define un nuevo web component el cual contiene nuestro elemento A con un funcionamiento modificado,
  este debe extender de HTMLElement para ser considerado un web component y ser agregado a nuestro index.html
*/
export class LinkElement extends HTMLElement {
  /*
    Los web components utilizan un su propia instancia del DOM por lo que tanto el CSS como el JavaScript que se ejecuta
    dentro de ellos esta encapsulado y no puede ser accedido desde afuera
  */
  private shadow = this.attachShadow({ mode: "open" });
  // Creamos el elemento A que va a mostrar nuestro web component
  private a = createElement<HTMLAnchorElement>({ tag: "a" });
  // Guardamos la referencia a la funcion que se ejcutara cuando el elemento A reciba un click
  private handleClick: (evt: MouseEvent) => void;

  constructor() {
    // Llamamos al constructor de la clase HTMLElement
    super();

    // Agregamos el elemento A al DOM del web component
    this.shadow.append(this.a);
  }

  /*
    Esta funcion se encarga de crear la funcion que controla el funcionamiento de nuestro elemento A

    Recibe dos parametros:
      to: La ruta a la cual el usuario quiere navegar
      target: Este parametro indica si el usuario quiere que la pagina a la que quiere ir se despligue en la misma
      pestaña del navegador en la que esta, en una nueva pestaña o en una nueva ventana del negador
  */
  private createHandleClick(to: string, target: string) {
    // Inicializamos la referencia a nuestra funcion handleClick
    this.handleClick = (evt: MouseEvent) => {
      /*
        Comprueba que el elemento A recibio un click del boton principal del mouse, por defecto el click principal
        del mouse es el izquierdo, aunque algunos usuarios lo configuran para que sea el derecho
      */
      const isMainEvent = evt.button === 0;
      /*
        Comprueba si al dar click sobre el elemento A el usuario esta oprimiendo teclas especiales como ALT, CTRL, SHIFT o
        la tecla de Windows o Command (esta ultima puede variar segun el navegador en el que se encuentre el cliente, por 
        ejemplo, Firefox no considera una metaKey la tecla Windows)
      */
      const isModified =
        evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey;
      // Comprueba si la pestaña actual es la que contendra la pagina a la que desea ir el cliente
      const isManageableEvent = target === undefined || target === "_self";

      /*
        Si el usuario da click con el boton principal (el izquierpo por default), la pagina ha de mostrarse en la pestaña
        actual del navegador y no esta presionando ninguna de las teclas especiales, es bajo estas condiciones bajo las cuales
        modificamos el funcionamiento normal de un elemento A
      */
      if (isMainEvent && isManageableEvent && !isModified) {
        // Evitamos el comportamiento por defecto del elemento A
        evt.preventDefault();
        /*
          Realizamos el cambio de la url del navegador sin provocar que el navegador recargue la pagina y notificando al
          router sobre el cambio de la url del navegador, para que este realice la carga de la nueva pagina
        */
        navigate(to);
      }

      /*
        Si no entramos en la sentencia IF el elemento A se comporta como cualquier otro elemento A en HTML, con ello logramos
        mantener funciones como abrir una nueva pestaña, abrir una nueva ventana del navegador con la pagina a la cual
        queremos ir utilizando las teclas especiales o dando click derecho sobre el elemento A y seleccionando la opcion
        correspondiente en el menu contextual
      */
    };
  }

  // Esta funcion se ejcuta cuando el web component es agregado al HTML
  connectedCallback() {
    // Atravez de la funcion this.getAttribute podemos obtener los atributos HTML que recibe el web component
    /*
      Obtenemos el atributo to, el cual indica la pagina a la cual desea ir el usuario si esta no fue definida
      el valor por defecto sera la ruta raiz de la aplicacion
    */
    const to = this.getAttribute("to") ?? "/";
    /*
      Obtenemos el atributo target, el cual indica si la nueva ruta debe ser desplegada en la misma pestaña del
      navegador, en otra pestaña del navegador o en otra ventana del navegador, si este atributo no fue definido
      por defecto mostrara la nueva ruta en la misma pestaña del navegador
    */
    const target = this.getAttribute("target") ?? "_self";
    /*
      Obtenemos el atributo text, el cual indica el texto que debe mostrar el elemento A, si no es definido tomara
      el valor por defecto 'Go'
    */
    const text = this.getAttribute("text") ?? "Go";
    /*
      Obtenemos el atributo styles, el cual contiene los estilos CSS que el elemento A debe utilizar, si no esta definido
      el elemento utiliza un string vacio equivalente a no utilizar ningun estilo CSS
    */
    const styles = this.getAttribute("styles") ?? "";

    // Agregamos el atributo innerText al elemento A, enviamos como parametro el atributo text de nuestro web component
    this.a.innerText = text;
    // Agregamos el atributo href al elemento A, enviamos como parametro el atributo to de nuestro web component
    this.a.setAttribute("href", to);
    // Agregamos el atributo target al elemento A, enviamos como parametro el atributo target de nuestro web component
    this.a.setAttribute("target", target);
    // Agregamos los estilos CSS a nuestro web component
    this.shadow.append(addStyles(styles));

    /*
      Inicializamos la referecnia a nuestra funcion handleCLick, enviamos como parametro la ruta a la cual nuestro
      elemento A apunta y el atributo target que indica donde despliega la ruta destino
    */
    this.createHandleClick(to, target);

    // Agregamos el evento click a nuestro elemento A, adjuntamos la funcion handleClick
    this.a.addEventListener("click", this.handleClick);
  }

  // Esta funcion se ejecuta cuando el web component es eliminado del HTML
  disconnectedCallback() {
    // Elimina el suscriptor al evento click sobre el elemento A
    this.a.removeEventListener("click", this.handleClick);
  }
}

// Esta interfaz describe el objeto que recibe como parametro la funcion Link
interface params {
  to: string; // Indica la ruta destino de nuestro elemento A
  text: string; // Indica el texto que debe mostrar el elemento A
  target?: string; // Indica donde despliega la ruta destino (opcional)
  styles?: string; // Indica los estilos CSS que debe adoptar el elemento A (opcional)
}

/*
  Esta funcion se encarga de crear un nuevo elemento LinkElement (nuestro web component definido en este archivo),
  al hacerlo mediante esta funcion facilitamos su creacion, ya que al ser una tecnologia aun en desarrollo, los web 
  components no ofrecen una forma sencilla de incrustar web components dentro de otros web components
*/
export const Link = ({ to, text, target = "_self", styles = "" }: params) => {
  // Creamos un elemento DIV auxiliar, el cual contiene nuestro web component LinkElement
  const div = createElement<HTMLDivElement>({
    tag: "div",
    // Agregamos el string con el HTML de nuestro web component y enviamos los atributos que este necesita
    innerHTML: `<link-nav to='${to}' text='${text}' target='${target}' styles='${styles}'></link-nav>`,
  });

  /*
    Retornamos el contenido HTML que contiene nuestro DIV auxiliar (enviamos una referencia HTML de nuestro web component)

    Nota el elemento DIV no es enviado, el atributo firstChild contiene nuestro web component, el cual es retornado por la
    funcion
  */
  return div.firstChild!;
};
