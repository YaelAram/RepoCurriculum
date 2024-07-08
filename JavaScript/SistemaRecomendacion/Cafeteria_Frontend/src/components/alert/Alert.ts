import { createElement } from "../../utils";
import { hideDialog, showDialog } from "./handlers";

/*
  Esta funcion se encarga de crear el componente Alert, el cual es un cuadro de dialogo que se encarga de dar informacion
  relevante al usuario
*/
export const Alert = () => {
  // Creamos un elemento H1 el cual sera el titulo de cuadro de dialogo
  const title = createElement<HTMLHeadingElement>({ tag: "h1" });
  // Creamos un elemento P el cual contendra la informacion que debe conocer el usuario
  const p = createElement<HTMLParagraphElement>({ tag: "p" });
  // Creamos un boton que nos permite ocultar el cuadro de dialogo
  const button = createElement<HTMLButtonElement>({
    tag: "button",
    innerText: "Ok", // Indicamos el titulo del boton
    options: { type: "button" },
  });

  // Creamos un elemento DIV, el cual se comportara como el cuadro de dialogo
  const alert = createElement<HTMLDivElement>({
    tag: "div",
    nodes: [title, p, button], // Agregamos el titulo, texto a informar y el boton para ocultar el cuadro de dialogo
    /*
      Agregamos las clases CSS para que se vea como un cuadro de dialogo, hiddenBox oculta el cuadro de dialogo
      este es su estado por defecto
    */
    style: ["box", "hiddenBox"],
  });

  // Agregamos un evento click al boton del cuadro de dialogo, este permite ocultar el cuadro de dialogo
  button.addEventListener("click", hideDialog(alert));

  /*
    Retornamos alert que contiene el HTML del cuadro de dialogo y showDialog una funcion que permite mostrar el cuadro de 
    dialogo y especificar el titulo e informacion que debe mostrar
  */
  return {
    alert,
    showDialog: showDialog(alert, title, p),
  };
};
