import { Drink, Graph, GuessForm, Weather } from "../../components";
import { alert, coords, model, suggestion, weather } from "../../context";
import { getLocation } from "../../helpers";
import { addStyles, createElement } from "../../utils";

// Con este import obtenemos los estilos globales y los guardamos en globalStyle en forma de string
import globalStyle from "../../styles/global.css?inline";
// Con este import obtenemos los estilos propio de la pagina y los guardamos en guessStyle en forma de string
import guessStyle from "./guess.css?inline";

/*
  Esta clase define un nuevo web component el cual contiene nuestra pagina de 'Sugerir',
  este debe extender de HTMLElement para ser considerado un web component y ser agregado a nuestro index.html
*/
export class Guess extends HTMLElement {
  /*
    Los web components utilizan un su propia instancia del DOM por lo que tanto el CSS como el JavaScript que se ejecuta
    dentro de ellos esta encapsulado y no puede ser accedido desde afuera
  */
  private shadow: ShadowRoot = this.attachShadow({ mode: "open" });
  // Contiene las claves unicas de todos los suscriptores a los estados de contexto
  private subscribers: string[] = [];

  constructor() {
    // Llamamos al constructor de la clase HTMLElement
    super();

    // Mandamos a llamar a nuestro servicio de localizacion
    getLocation();

    /*
      Esta funcion crea el componente Weather, este contiene un icono e informacion general sobre el clima
      del lugar donde esta el cliente asi como un boton que permite actualizar la informacion

      Retorna dos elementos, section contiene el contenido HTML mientras weatherSubscribers es un arreglo con
      todas las claves unicas de los suscriptores del componente
    */
    const { section, weatherSubscribers } = Weather();

    /*
      Esta funcion crea el componente GuessForm, este contiene un formulario que permite ingresar la edad del cliente

      Retorna dos elementos, guessSection contiene el contenido HTML mientras formSubscribers es un arreglo con
      todas las claves unicas de los suscriptores del componente
    */
    const { guessSection, formSubscribers } = GuessForm();

    /*
      Esta funcion crea el componente Drink, este muestra la sugerencia de bebida que hace el sistema,
      muestra un icono y un string indicando el tipo de bebida recomendada asi como descripcion indicando el porcentaje
      de usuarios de edad similar y con un clima similar eligieron ese tipo de bebida

      Retorna dos elementos, drinkSection contiene el contenido HTML mientras drinkSubscribers es un arreglo con
      todas las claves unicas de los suscriptores del componente
    */
    const { drinkSection, drinkSubscribers } = Drink();

    /*
      Esta funcion crea el componente Graph miestra una grafica con nuestro modelo de inferencia

      Retorna tres elementos, graphSection contiene el contenido HTML mientras graphSuscribers es un arreglo con
      todas las claves unicas de los suscriptores del componente y render una funcion que se encarga de dibuja
      la grafica del modelo de inferencia
    */
    const { graphSection, render, graphSuscribers } = Graph();

    // Agregamos todos los suscriptores creados por los componentes Weather, Drink y GuessForm a la lista de suscriptores
    this.subscribers.push(
      ...weatherSubscribers,
      ...formSubscribers,
      ...drinkSubscribers,
      ...graphSuscribers
    );

    // Agregamos todos los elementos HTML al show DOM propio del web component
    this.shadow.append(
      addStyles(globalStyle), // Agregamos los estilos CSS globales que comparten ambas paginas
      addStyles(guessStyle), // Agregamos los estilos CSS unicos para esta pagina
      // Creamos y agregamos un elemento H1 con el texto Sugerir Bebida
      createElement<HTMLHeadingElement>({
        tag: "h1",
        innerText: "Sugerir Bebida",
      }),
      section, // Agregamos el HTML generado por el componente Weather
      guessSection, // Agregamos el HTML generado por el componente GuessForm
      drinkSection, // Agregamos el HTML generado por el componente Drink
      graphSection, // Agregamos el HTML generado por el componente Graph
      alert // Agregamos el HTML que contiene el cuadro de notificacion
    );

    // Dibujamos la grafica del modelo de inferencia
    render();
  }

  // Esta funcion se ejecuta cuando el web component es removido del HTML
  disconnectedCallback() {
    /*
      Iteramos sobre la lista de suscriptores y dependiendo del inicio de su clave unica lo eliminamos de la lista
      de suscriptores del contexto indicado, con ello evitamos que el contexto (el observable) tenga suscriptores que
      ya no estan activos o fueron eliminados
    */
    this.subscribers.forEach((subscriber) => {
      if (subscriber.startsWith("coords")) coords.unsubscribe(subscriber);
      else if (subscriber.startsWith("model")) model.unsubscribe(subscriber);
      else if (subscriber.startsWith("suggestion"))
        suggestion.unsubscribe(subscriber);
      else weather.unsubscribe(subscriber);
    });
  }
}
