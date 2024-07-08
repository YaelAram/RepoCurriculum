import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";

import { Clase, Dias } from "../interfaces/types";

dayjs.extend(objectSupport);
const url =
  "https://www.aragon.unam.mx/horarios/horarios/index_archivos/php/queysA.php?tipo=2&sem=30&carr=12&grupo=";

// Generated by https://quicktype.io

export interface HorarioResp {
  nomb_prof: string;
  clv_materia: string;
  nomb_cmateria: string;
  grupo: string;
  LU: string;
  MA: string;
  MI: string;
  JU: string;
  VI: string;
  SA: string;
  clv_salon: string;
  cupo: string;
  tipoclase: string;
}

const obtenerDiasHora = (dias: string[]) => {
  const hora = dias.find((dia) => dia)!.split("<br />");
  const diasClase: Dias[] = [];

  for (let i = 0; i < dias.length; i++) {
    if (dias.at(i)) {
      if (i === 0) diasClase.push(Dias.LUNES);
      else if (i === 1) diasClase.push(Dias.MARTES);
      else if (i === 2) diasClase.push(Dias.MIERCOLES);
      else if (i === 3) diasClase.push(Dias.JUEVES);
      else diasClase.push(Dias.VIERNES);
    }
  }

  const [horaInicio, minutosInicio] = hora.at(0)!.split(":");
  const inicio = dayjs({
    years: 2030,
    months: 7,
    day: 20,
    hours: horaInicio,
    minutes: minutosInicio,
  });

  const [horaFin, minutosFin] = hora.at(1)!.split(":");
  const fin = dayjs({
    years: 2030,
    months: 7,
    day: 20,
    hours: horaFin,
    minutes: minutosFin,
  });

  return {
    dias: diasClase,
    inicio,
    fin,
  };
};

export const obtenerHorario = async (grupo: string): Promise<Clase[]> => {
  const resp = await fetch(`${url}${grupo}`);
  const horario: HorarioResp[] = await resp.json();

  return horario.map((clase) => {
    const { dias, inicio, fin } = obtenerDiasHora([
      clase.LU,
      clase.MA,
      clase.MI,
      clase.JU,
      clase.VI,
    ]);

    return {
      nombre: clase.nomb_cmateria,
      profesor: clase.nomb_prof,
      salon: clase.clv_salon,
      grupo: clase.grupo,
      inicio,
      fin,
      cupo: Number(clase.cupo),
      dias,
      calificacion: 0,
    };
  });
};
