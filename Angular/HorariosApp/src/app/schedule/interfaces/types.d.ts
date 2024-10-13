import groupsInfo from '../../../assets/groupsInfo.json';

// En TypeScript las interfaces sirven para describir un tipo de dato

/*
  Esta interfaz se encarga de describir la informacion que contiene un objeto Subject, el cual contiene informacion
  relevante sobre una clase, donde:
  - classroom: Contiene la clave del salon de clases.
  - days: Contiene un string con los dias en los que la materia se imparte.
  - end: Contiene la hora a la que termina la clase.
  - group: Contiene la clave del grupo al que pertenece la materia.
  - id: Contiene la clave de la materia (dado por el plan de estudios).
  - preference: Contiene la preferencia que el usuario tiene por cursar la materia en ese grupo, donde 0 indica 
    "Nula preferencia" y 10 representa la opcion mas deseada por el usuario.
  - profesor: Contiene el nombre del profesor que imparte la materia.
  - start: Contiene la hora de inicio de la clase.
  - students: Contiene el cupo de alumnos del grupo para la materia.
  - subject: Contiene el nombre de la materia.
*/
export interface Subject {
  classroom: string;
  days: string;
  end: number;
  group: string;
  id: string;
  preference: number;
  profesor: string;
  start: number;
  students: number;
  subject: string;
}

/*
  Esta interfaz restringe los valores de un string a los grupos disponibles del semestre. Por ejemplo "1959", 
  "1007", etc.
*/
export type GroupKey = keyof typeof groupsInfo;

/*
  Esta interfaz describe como luce la informacion del archivo GroupsInfo.json, donde la clave corresponde
  a un grupo y esta igualado a un arreglo de con la informacion de las materias impartidas en el grupo.
*/
export interface GroupsInfo {
  [key: GroupKey]: Subject[];
}

/*
  Esta interfaz describe como luce la informacion del archivo Groups.json, el cual contiene una propiedad
  llamada groups que apunta a un arreglo de strings que contienen los gruspos disponibles para el semestre
*/
export interface GroupList {
  groups: GroupKey[];
}

/*
  Esta interfaz describe el objeto que contiene las preferencias del usuario para generar sus horarios de clases,
  donde:
  - start: Contiene la hora a la que el usuario le gustaria que inicie su primera clase.
  - end: Contiene la hora a la que el usuario le gustaria que termine su ultima clase.
  - optatives: Contiene el numero de optativas que desea cursar este semestre.
  - preference: Contiene la calificacion minima que un horario debe tener para ser mostrado al usuario.
*/
export interface Preferences {
  start: string;
  end: string;
  optatives: number;
  preference: number;
}

/*
  Esta interfaz define el tipo de dato que representa un horario generado donde:
  - id: Contiene el identificador unico del horario y es generado utilizando los nombres de las materias y grupos
    que componen el horario.
  - preference: Contiene la calificacion obtenida por el horario.
  - subjects: Contiene la lista de materias que componen el horario.
*/
export interface Schedule {
  id: string;
  preference: number;
  subjects: Subject[];
}

/*
  Esta interfaz contiene las materias que componen un horario generado para el usuario pero con las materias 
  clasificadas en los dias de la semana, este tipo de dato es utilizado durante el proceso de validar si las materias
  de un dia colisionan.
*/
export interface ScheduleByDay {
  Lun: Subject[];
  Mar: Subject[];
  Mie: Subject[];
  Jue: Subject[];
  Vie: Subject[];
  Sab: Subject[];
}

// Esta interfaz restringe los valores de un string a "Lun", "Mar", "Mie", "Jue", "Vie" o "Sab"
export type DayKey = keyof ScheduleByDay;
