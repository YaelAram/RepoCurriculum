/*
  Esta objeto nos permite personalizar el formato con el cual sera creado el string de la fecha y hora
  Indicamos el idioma como español de Mexico
*/
const formatter = new Intl.DateTimeFormat("es-Mx", {
  weekday: "long", // Imprime el nombre completo del dia (Lunes, Martes, Miercoles, etc)
  month: "long", // Imprime el nombre completo del mes (Enero, Febrero, Marzo, etc)
  day: "2-digit", // Imprime el dia del mes en formato de 2 digitos (01, 05, 20, 30)
  hour: "2-digit", // Imprime la hora en formato de 2 digitos (01, 04, 10, 11)
  minute: "2-digit", // Imprime los minutos en formato de 2 digitos (05, 10, 50, 59)
  second: "2-digit", // Imprime los segundos en formato de 2 digitos (01, 05, 10, 30)
  // Indicamos un formato de 12 horas, las 2 y media de la tarde sera mostrado como '2:30 p.m.' y no como '14:30'
  hour12: true,
});

// Esta funcion nos permite mostrar un string con la fecha y hora actual
export const formatDate = (date: Date = new Date()) => {
  const timeStr = formatter.format(date);
  // Ponemos en mayuscula el primer caracter del string y lo retornamos
  return `${timeStr[0].toUpperCase()}${timeStr.slice(1)}`;
};
