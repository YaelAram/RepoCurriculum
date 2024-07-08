import { Dayjs } from "dayjs";

export enum Dias {
  LUNES = "Lun",
  MARTES = "Mar",
  MIERCOLES = "Mier",
  JUEVES = "Jue",
  VIERNES = "Vie",
}

export interface Clase {
  nombre: string;
  profesor: string;
  salon?: string;
  grupo: string;
  inicio: Dayjs;
  fin: Dayjs;
  cupo?: number;
  dias: Dias[];
  calificacion: number;
}

export interface Opcion {
  name: string;
  value: string | number | Clase;
}
