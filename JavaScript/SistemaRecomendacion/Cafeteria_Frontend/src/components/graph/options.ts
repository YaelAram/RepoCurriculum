/*
  El objeto options contiene la informacion de configuracion que utiliza la libreria ApexCharts para crear
  la grafica de nuestro modelo de inferencia
*/
export const options = {
  chart: {
    type: "bar",
    height: 1800,
    width: 1000,
  },
  series: [
    {
      name: "Fria",
      data: [],
    },
    {
      name: "Caliente",
      data: [],
    },
  ],
  plotOptions: {
    bar: {
      horizontal: true,
      dataLabels: {
        position: "top",
      },
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
    marker: {
      show: true,
    },
  },
  colors: ["#192655", "#D71313"],
  title: {
    text: "Modelo de Inferencia (%)",
    align: "center",
  },
  xaxis: {
    categories: [
      "Niño Clima Gelido",
      "Niño Clima Frio",
      "Niño Clima Fresco",
      "Niño Clima Calido",
      "Niño Clima Caliente",
      "Niño Clima Caluloro",

      "Adolescente Gelido",
      "Adolescente Frio",
      "Adolescente Fresco",
      "Adolescente Calido",
      "Adolescente Caliente",
      "Adolescente Caluloro",

      "Joven Gelido",
      "Joven Frio",
      "Joven Fresco",
      "Joven Calido",
      "Joven Caliente",
      "Joven Caluloro",

      "Adulto Medio Gelido",
      "Adulto Medio Frio",
      "Adulto Medio Fresco",
      "Adulto Medio Calido",
      "Adulto Medio Caliente",
      "Adulto Medio Caluloro",

      "Adulto Gelido",
      "Adulto Frio",
      "Adulto Fresco",
      "Adulto Calido",
      "Adulto Caliente",
      "Adulto Caluloro",

      "Retirado Gelido",
      "Retirado Frio",
      "Retirado Fresco",
      "Retirado Calido",
      "Retirado Caliente",
      "Retirado Caluloro",

      "Adulto Mayor Gelido",
      "Adulto Mayor Frio",
      "Adulto Mayor Fresco",
      "Adulto Mayor Calido",
      "Adulto Mayor Caliente",
      "Adulto Mayor Caluloro",
    ],
  },
};
