import { NavBar } from "./components";
import { Guess, Sales } from "./pages";
import { LinkElement, Route, createRouter } from "./utils";

/*
  ## Tecnologias utilizadas

  - NodeJS 18.14.0 (Entorno de ejecución de JavaScript)
  - YARN 1.22.19 (Manejador de paquetes de JavaScript)
  - Vite 4.4.5 (Empaquetador de nuestra aplicacion)
  - TypeScript 5.0.2 (Super set de JavaScript)
*/

/*
  Importamos el archivo CSS que contiene algunos estilos generales como estilo de fuente y 
  centrar el contenido de la pagina
*/
import "./main.css";

/*
  Definimos los web components, los web components nos permiten definir etiquetas HTML personalizadas, estas 
  etiquetas personalizadas contienen a su vez contenido HTML, nos permite reutilizar partes de la interfaz grafica

  customElements.define nos permite definir estas etiquetas personalizadas, como primer argumento se define el nombre
  de la etiqueta (el nombre debe contener un guion medio), como segundo argumento reciben un clase que extiende de la 
  super clase HTMLElement
*/
// sales-page: Es el web component que define la pagina donde se ve el historial de ventas
customElements.define("sales-page", Sales);
// guess-page: Es el web component que define la pagina donde se sugiere una bebida y se registra una nueva venta
customElements.define("guess-page", Guess);
// link-nav: Es el web component que define un elemento 'a' con un comportamiento personalizado
customElements.define("link-nav", LinkElement);
// nav-bar: Es el web component que define la barra superior de navegacion
customElements.define("nav-bar", NavBar);

/*
  Para el desarrollo de esta aplicacion se creo desde cero una biblioteca de front end, para mayor detalle
  visite la carpeta utils, esta contiene todo el codigo propio de la biblioteca.
  
  Definimos las rutas de nuestra aplicacion, esta pagina se comporta como una SPA (Single Page Aplication),
  es decir, el contenido HTML de cada ruta se dibuja todo sobre el mismo documento HTML (index.html)

  Para definir una ruta debemos especificar tres atributos
    path: Indica el segmento de URL en el cual se debe encontrar el usuario para mostrar el contenido de la ruta
    selector: Indica el web component a mostrar
    title: Indica el contenido de la etiqueta title de index.html
*/
const routes: Route[] = [
  /*
    Indica que el web component 'guess-page' debe mostrarse cuando la ruta sea http://localhost:8080(/), 
    donde el signo '/' que se encuentra entre parentesis es el mismo definido en el atributo path (en una direccion
    real los parentesis no se incluyen la ruta que veriamos por tanto seria 'http://localhost:8080/') y el contenido
    de la etiqueta title es "Sugerir"
  */
  {
    path: "/",
    selector: "guess-page",
    title: "Sugerir",
  },
  /*
    Indica que el web component 'sales-page' debe mostrarse cuando la ruta sea http://localhost:8080(/ventas), 
    donde el string '/ventas' que se encuentra entre parentesis es el mismo definido en el atributo path (en una direccion
    real los parentesis no se incluyen la ruta que veriamos por tanto seria 'http://localhost:8080/ventas') y el contenido
    de la etiqueta title es "Historial de Ventas"
  */
  {
    path: "/ventas",
    selector: "sales-page",
    title: "Historial de Ventas",
  },
];

/*
  Mandamos a llamar la funcion createRouter de nuestra biblioteca, esta funcion se encarga de detectar la ruta actual
  sobre la que se encuentra el cliente y mostrar la pagina apropiada

  Recibe los siguientes parametros:
    routes: Las rutas que necesitamos en nuestra aplicacion
    app: Este debe ser un contenedor en nuestro archivo index.html (div, section, main, etc), dentro de este contenedor
    el router inserta el contenido HTML de la pagina actual, es por esto que no se debe colocar contenido dentro de este
    ya que el router borra todo el contenido de este al cargar una ruta
*/
createRouter(routes, document.querySelector<HTMLDivElement>("#app")!);
