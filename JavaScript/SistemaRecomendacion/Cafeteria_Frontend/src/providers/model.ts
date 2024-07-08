import { Model } from "../interfaces/model";

// Creamos la URL base a nuestra API REST, especificando el servicio del modelo de inferencia
const url = "https://cafeteriabackend-dev-xbcr.1.ie-1.fl0.io/api/guess";

/*
  Esta funcion nso permite realizar una peticon HTTP para obtener el modelo de inferencia recibe como 
  parametro lo siguiente:
    newModel: Es un boolean que indica si requerimos recalcular el modelo de inferencia (true para recalcular)
    en caso de ser necesario
*/
export const getModel = async (newModel: boolean) => {
  /*
    Iniciamos la peticion HTTP con el metodo POST, adjuntamos al body el valor boolean indicamos si necesitamos o no
    recalcular el modelo de inferencia e indicamos que la informacion enviada esta en formato JSON
  */
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ newModel }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Convertimos la respuesta del servidor a formato JSON
  const model: Model = await resp.json();

  // Retornamos el JSON
  return model;
};
