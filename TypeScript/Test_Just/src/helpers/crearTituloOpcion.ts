import { Clase } from "../interfaces/types";

export const crearTituloOpcion = ({
  nombre,
  profesor,
  dias,
  grupo,
  inicio,
  fin,
  cupo,
  salon,
}: Clase) => {
  const diasSemana = new Intl.ListFormat("es-MX", {
    style: "long",
    type: "conjunction",
  }).format(dias.map((dias) => String(dias)));

  return `${nombre} - ${profesor} - Grupo: ${grupo}\n     Salon: ${salon} - Dias: ${diasSemana} - ${inicio.format(
    "HH:mm"
  )} a ${fin.format("HH:mm")} - Cupo: ${cupo}`;
};
