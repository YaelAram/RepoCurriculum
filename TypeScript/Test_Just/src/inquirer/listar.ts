import inquirer from "inquirer";

import { Opcion } from "../interfaces/types";

export const listar = async <T>(
  tipo: string,
  mensaje: string,
  opciones: Opcion[]
) => {
  const { data } = await inquirer.prompt([
    {
      type: tipo,
      name: "data",
      message: mensaje,
      choices: opciones,
      pageSize: 15,
    },
  ]);

  return data as T;
};
