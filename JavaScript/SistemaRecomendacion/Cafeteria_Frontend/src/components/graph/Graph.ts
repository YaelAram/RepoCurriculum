import ApexCharts from "apexcharts";

import { model } from "../../context";
import { createElement } from "../../utils";
import { graphHandler } from "./handlers";
import { options } from "./options";

export const Graph = () => {
  // Cremos el elemento SECTION que contendra los elementos HTML creados
  const graphSection = createElement<HTMLElement>({
    tag: "section",
    style: ["shadow", "rounded", "vertical", "mt-20", "mb-20"], // Agregamos clases CSS
  });

  // Creamos una instancia de ApexCharts, esta es una libreria que nos permite crear graficas
  const chart = new ApexCharts(graphSection, options);

  // Enlazando del estado model
  // Creamos la clave unica para el suscriptor
  const graphSuscriber = "model-graph-observer-guess";

  model.subscribe({
    key: graphSuscriber, // Agregamos la clave unica
    /*
      observer contiene la funcion que se ha de ejecutar cada vez que el estado sales cambie
      
      graphHandler es una funcion que recibe como parametro la instancia a nuestra grafica, se encarga
      de actualizar los datos a mostrar cada vez que el modelo de inferencia sea modificado

      A su vez graphHandler retorna una funcion que es compatible con el tipo de funcion que requiere el
      atributo observer, es decir, una funcion que retorne void y cuyo unico parametro sea de tipo Model
    */
    observer: graphHandler(chart),
  });

  // Retornamos el elemento SECTION donde se muestra la grafica y un metodo llamado render que dibuja la grafica
  return {
    graphSection,
    render: () => chart.render(),
    graphSuscribers: [graphSuscriber],
  };
};
