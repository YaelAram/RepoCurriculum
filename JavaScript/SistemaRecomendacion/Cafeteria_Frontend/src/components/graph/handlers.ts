import { Model } from "../../interfaces/model";

/*
  graphHandler es una funcion que recibe como parametro la instancia a nuestra grafica, se encarga
  de actualizar los datos a mostrar cada vez que el modelo de inferencia sea modificado
*/
export const graphHandler = (chart: ApexCharts) => {
  return (model: Model) => {
    // Obtenemos la informacion de las probabilidades para una bebia fria
    const cold = Object.values(model.model).map(
      (p) => Number((p * 100).toFixed(2)) // Reducimos a 2 el numero de decimales
    );
    // Obtenemos la informacion de las probabilidades para bebida caliente a partir de la probabilidad de bebida fria
    const hot = cold.map((p) => Number((100 - p).toFixed(2)));

    // Actualizamos la informacion mostrada por la tabla
    chart.updateSeries([{ data: cold }, { data: hot }]);
  };
};
