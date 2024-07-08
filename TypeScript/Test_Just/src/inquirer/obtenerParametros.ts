import inquirer from "inquirer";
import { semestresOpt, turnoOpt } from "../data";
import { listar } from "./listar";

export const obtenerTurno = async () => {
  const turno = await listar<string>("list", "¿En que turno vas?", turnoOpt);
  return turno;
};

export const obtenerSemestres = async () => {
  const semestres = await listar<number[]>(
    "checkbox",
    "¿Que semestres deseas ver?",
    semestresOpt
  );
  return `(${semestres.join("|")})`;
};

export const obtenerCalificacionMinima = async () => {
  const { calificacion } = await inquirer.prompt([
    {
      type: "number",
      name: "calificacion",
      message:
        "¿Cual es la calificacion minima que deben obtener los horarios?",
      validate(value) {
        const cal = Number.parseFloat(value);

        if (isNaN(cal)) return `La cadena "${value}" no es un numero`;
        if (cal < 0 || cal > 10)
          return `El numero ${cal} no esta en el rango permitido (0 a 10)`;

        return true;
      },
    },
  ]);

  return calificacion as number;
};
