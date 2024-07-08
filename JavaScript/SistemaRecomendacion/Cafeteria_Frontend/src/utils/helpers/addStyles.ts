import { createElement } from ".";

/*
  Nos permite crear un elemento STYLE el cual puede contener reglas CSS, recibe como parametro styles el cual es un
  string con reglas CSS

  Se utiliza para poder inyectar reglas CSS dentro de los Web Components
*/
export const addStyles = (styles: string) =>
  createElement<HTMLStyleElement>({ tag: "style", textContent: styles });
