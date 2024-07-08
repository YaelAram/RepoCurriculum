/*
  Valida si es necesario recalcular el modelo de inferencia, retorna un boolean, true si se requiere recalcular el
  modelo de inferencia, false en caso contrario

  Recibe como parametros un boolean llamado createModel que envia el usuario requiriendo o no recalcular el modelo y
  un numero llamado createdAt que indica la fecha y hora en la que el modelo fue creado
*/
export const checkCreateModel = (createModel: boolean, createdAt: number) => {
  // Convertimos el parametro createdAt en un tipo de dato Date
  const createdDate = new Date(createdAt);

  // Creamos otro dato tipo Date, que al recibir un constructor vacio nos devuelve la fecha y hora actual
  const currentDate = new Date();

  /*
    Si alguna de las siguientes condiciones se cumple el modelo sera recalculado:
      Si el usuario requiere recalcular el modelo de inferencia (createmodel)
      Si el modelo aun no existe (createdAt === -1)
      Si el modelo fue creado el dia anterior (createdDate.getDate() < currentDate.getDate())
      Si el modelo fue creado el mes anterior (createdDate.getMonth() < currentDate.getMonth())
      Si el modelo fue creado el año anterior (createdDate.getFullYear() < currentDate.getFullYear())
  */
  return (
    createModel ||
    createdAt === -1 ||
    createdDate.getDate() < currentDate.getDate() ||
    createdDate.getMonth() < currentDate.getMonth() ||
    createdDate.getFullYear() < currentDate.getFullYear()
  );
};
