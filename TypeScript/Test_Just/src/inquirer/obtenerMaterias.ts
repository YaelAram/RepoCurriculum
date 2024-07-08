import inquirer from "inquirer";

import { crearTituloOpcion } from "../helpers";
import { Clase } from "../interfaces/types";
import { obtenerHorario } from "../providers";
import { listar } from "./listar";

const obtenerMateriasClase = async (materias: Clase[]) => {
  const data = await listar<Clase[]>(
    "checkbox",
    "Elige las materias que te interesan: ",
    materias.map((materia) => ({
      name: crearTituloOpcion(materia),
      value: materia,
    }))
  );

  return data;
};

const obtenerCalificacion = async (materia: Clase) => {
  const { data } = await inquirer.prompt([
    {
      type: "number",
      name: "data",
      message: `Del 0 al 10 ¿Que tanto te gustaria cursar con este profesor?\n     ${crearTituloOpcion(
        materia
      )}\n     Calififacion: `,
      validate(value) {
        const cal = Number.parseFloat(value);

        if (isNaN(cal)) return `La cadena "${value}" no es un numero`;
        if (cal < 0 || cal > 10)
          return `El numero ${cal} no esta en el rango permitido (0 a 10)`;

        return true;
      },
    },
  ]);

  return data as number;
};

export const obtenerMaterias = async (grupos: string[]) => {
  const materiasSeleccionadas: Clase[] = [];

  for (const grupo of grupos) {
    const horario = await obtenerHorario(grupo);
    const materias = await obtenerMateriasClase(horario);

    for (const materia of materias) {
      const calificacion = await obtenerCalificacion(materia);
      materia.calificacion = calificacion;
    }

    materiasSeleccionadas.push(...materias);
  }

  return materiasSeleccionadas;
};
