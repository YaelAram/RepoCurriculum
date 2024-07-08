import inquirer from "inquirer";

import { gruposOpt } from "../data";
import { Opcion } from "../interfaces/types";
import { listar } from "./listar";

const obtenerConfirmacion = async (mensaje: string) => {
  const { data } = await inquirer.prompt([
    {
      type: "confirm",
      name: "data",
      message: mensaje,
    },
  ]);

  return data as boolean;
};

export const obtenerGrupos = async (grupos: Opcion[]) => {
  const gruposElegidos = await listar<string[]>(
    "checkbox",
    "¿Que grupos que deseas ver?",
    grupos
  );

  return gruposElegidos;
};

export const obtenerOptativas = async (turno: string, periodo: number) => {
  const mostrarOptativas = await obtenerConfirmacion(
    "¿Deseas ver las materias optativas?"
  );
  const opcionesOptativas = gruposOpt.filter(({ name }) =>
    name.match(new RegExp(`^${periodo}0${turno}[0-9]$`))
  );
  const optativas = mostrarOptativas
    ? await obtenerGrupos(opcionesOptativas)
    : [];

  return optativas;
};

export const obtenerLaboratorios = async () => {
  const mostrarLaboratorios = await obtenerConfirmacion(
    "¿Deseas ver los laboratorios de Redes de Computadoras I?"
  );
  const opcionesLaboratorio = gruposOpt.filter(({ name }) =>
    name.match(new RegExp(`^87[0-9]{2}$`))
  );
  const laboratorios = mostrarLaboratorios
    ? await obtenerGrupos(opcionesLaboratorio)
    : [];

  return laboratorios;
};
