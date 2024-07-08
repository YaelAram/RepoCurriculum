import { Clase } from "../interfaces/types";

export const ordenarMaterias = (materias: Clase[]): Clase[][] => {
  const materiasNombre = new Map<string, Clase[]>();

  for (const materia of materias) {
    if (materiasNombre.has(materia.nombre)) {
      materiasNombre.set(materia.nombre, [
        ...(materiasNombre.get(materia.nombre) ?? []),
        materia,
      ]);
    } else materiasNombre.set(materia.nombre, [materia]);
  }

  return Array.from(materiasNombre.values());
};
