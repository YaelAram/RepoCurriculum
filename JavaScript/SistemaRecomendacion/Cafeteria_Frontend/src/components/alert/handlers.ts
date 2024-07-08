/*
  Esta funcion construye una funcion para mostrar el cuadro de texto y especificar el contenido que debe mostrar

  Recibe como parametro:
    alert: El elemento DIV que actua como cuadro de dialogo
    titleHTML: La referencia al elemento H1 del cuadro de texto
    p: La referencia al elemento P del cuadro de texto
*/
export const showDialog = (
  alert: HTMLDivElement,
  titleHTML: HTMLHeadingElement,
  p: HTMLParagraphElement
) => {
  /*
    Retorna una funcion que permite mostrar el cuadro de dialogo

    Recibe como parametro:
      title: El titulo que el cuadro de texto debe mostrar
      message: El texto informativo que debe mostrar
  */
  return (title: string, message: string) => {
    // Elimina la clase que oculta el cuadro de dialogo
    alert.classList.remove("hiddenBox");
    // Agrega la clase que muestra el cuadro de dialogo
    alert.classList.add("visibleBox");

    // Indicamos el nuevo titulo del cuadro de dialogo
    titleHTML.innerText = title;
    // Indicamos el nuevo mensaje informativo del cuadro de dialogo
    p.innerText = message;
  };
};

/*
  Esta funcion permite ocultar el cuadro de dialogo, recibe como parametro la referencia al elemento DIV que actua
  como cuadro de dialogo
*/
export const hideDialog = (alert: HTMLDivElement) => {
  return () => {
    // Elimina la clase que muestra el cuadro de dialogo
    alert.classList.remove("visibleBox");
    // Agrega la clase que oculta el cuadro de dialogo
    alert.classList.add("hiddenBox");
  };
};
