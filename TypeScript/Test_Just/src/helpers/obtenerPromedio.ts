export const obtenerPromedio = (calificaciones: number[]) => {
  return (
    calificaciones.reduce((prev, next) => prev + next, 0) /
    calificaciones.length
  );
};
