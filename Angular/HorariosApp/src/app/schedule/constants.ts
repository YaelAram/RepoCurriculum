/*
  Esta constante contiene los turnos de la FES Aragon, cada objeto contiene las siguientes propiedades:
  - label: Contiene el texto que describe el turno (legible para un ser humano).
  - regex: Contiene el segmento de una expresion regular que nos permite filtrar el arreglo de grupos y obtener
    unicamente aquellos que sean del turno seleccionado.

  Nota: La opcion "Elige un turno" tiene una expresion regular que deja pasar todos los elementos del arreglo de
  grupos. Se incluye esta opcion ya que esta constante es utilizada para generar un menu desplegable que el usuario
  puede utilizar para filtrar los grupos segun sus necesidades.
*/
export const shifts = [
  { label: 'Elige un turno', regex: '[0-9]' },
  { label: 'Matutino', regex: '[01]' },
  { label: 'Vespertino', regex: '[56]' },
];

/*
  Esta constante contiene los semestres para carrera de Ingenieria en Computacion, cada objeto contiene las 
  siguientes propiedades:
  - label: Contiene el texto que describe el semestre (legible para un ser humano).
  - regex: Contiene el segmento de una expresion regular que nos permite filtrar el arreglo de grupos y obtener
    unicamente aquellos que pertenezcan al semestre seleccionado.

  Nota: La opcion "Elige un semestre" tiene una expresion regular que deja pasar todos los elementos del arreglo de
  grupos. Se incluye esta opcion ya que esta constante es utilizada para generar un menu desplegable que el usuario
  puede utilizar para filtrar los grupos segun sus necesidades.
*/
export const semesters = [
  { label: 'Elige un semestre', regex: '[0-9]' },
  { label: 'Optativas', regex: '0' },
  { label: 'Primer Semestre', regex: '1' },
  { label: 'Segundo Semestre', regex: '2' },
  { label: 'Tercer Semestre', regex: '3' },
  { label: 'Cuarto Semestre', regex: '4' },
  { label: 'Quinto Semestre', regex: '5' },
  { label: 'Sexto Semestre', regex: '6' },
  { label: 'Séptimo Semestre', regex: '7' },
  { label: 'Octavo Semestre', regex: '8' },
  { label: 'Noveno Semestre', regex: '9' },
  { label: 'Laboratorios de Redes', regex: 'lab' },
];
