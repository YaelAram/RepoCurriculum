/*
  Esta interfaz define los parametros que debe y puede recibir la funcion createElement
*/
interface params {
  tag: string; // Indica la etiqueta HTML a crear
  options?: any; // Es un objeto que indica atributos HTML del elemento HTML (opcional)
  innerText?: string; // Indica el contenido de texto de la etiqueta HTML (opcional)
  innerHTML?: string; // Indica el contenido HTML (en forma de string) de la etiqueta (opcional)
  textContent?: string; // Indica el contenido de texto de la etiqueta HTML, es mas estandar que innerText (opcional)
  nodes?: Node[]; // Indica el contenido HTML (nodos de JavaScript) de la etiqueta (opcional)
  style?: string[]; // Indica un arreglo con clases CSS
}

/*
  Esta funcion nos permite crear elementos HTML dependiendo el atributo tag y el tipo de dato especificado en el generico,
  nos permite crear elementos HTML de una forma mas comoda y sencilla que utilizando la funcion nativa document.createElement

  Recibe como paramatro un objeto tipo params
*/
export const createElement = <T>({
  tag,
  innerHTML = "",
  innerText = "",
  options = {},
  textContent = "",
  nodes = [],
  style = [],
}: params): T => {
  // Creamos un elemento HTML utilizando el tag especificado en los parametros
  const element = document.createElement(tag);

  // Iteramos sobre el objeto options, agregando atributos HTML al elemento
  for (const attribute in options) {
    const value: string = options[`${attribute}`];
    element.setAttribute(attribute, value);
  }

  // Si el atributo innerHTML esta definido agregamos su contenido al elemento
  if (innerHTML) element.innerHTML = innerHTML;
  // Si el atributo innerText esta definido agregamos su contenido al elemento
  if (innerText) element.innerText = innerText;
  // Si el atributo textContent esta definido agregamos su contenido al elemento
  if (textContent) element.textContent = textContent;
  // Si el atributo nodes esta definido agregamos los elementos HTML al elemento
  if (nodes.length) element.append(...nodes);
  // Si el atributo style esta definido agregamos todas las clases CSS al atributo classList que contiene las clases CSS
  if (style.length) element.classList.add(...style);

  // Retornamos el elemento creado y hacemos un cast al tipo de dato especificado en el generico
  return element as T;
};
