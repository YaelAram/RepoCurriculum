/*
  Esta funcion permite agregar una clase de CSS a aque link cuyo atributo href coincida con la ruta actual en la que
  se encuentra el usuario

  Recibe como parametro el elemento LI al cual se le agrega o elimina la clase CSS y path que contiene el contenido 
  del atributo HREF del link
*/
export const linkHandler = (li: HTMLLIElement, path: string) => {
  /*
    Retornamos una funcion que cumple con el tipo Observer<string>, el cual es una funcion que retorna void y recibe como
    unico parametro un string que indica la ruta actual del usuario
  */
  return (currentPath: string) => {
    // Si la ruta actual no coincide con la ruta del link eliminamos la clase CSS active
    if (currentPath !== path) li.classList.remove("active");
    // Si la ruta actual coincide con la ruta del link agregamos la clase CSS active
    else if (currentPath === path && !li.classList.contains("active"))
      li.classList.add("active");
  };
};
