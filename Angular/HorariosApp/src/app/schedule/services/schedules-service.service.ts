import { Injectable } from '@angular/core';

import groups from '@assets/groups.json';
import groupsInfo from '@assets/groupsInfo.json';
import type { GroupKey, GroupList } from '@interfaces/types';

/*
  Este es un servicio de Angular, los servicios proporcionan un mecanismo para separar logica del negocio que puede
  ser utilizada por mas de un componente lo que nos evita duplicar el codigo. Angular sigue el patron de Inyeccion de
  dependencias por lo que los servicios que en su decorador Injectable tiene la propiedad providedIn: "root" lo que
  provoca que los servicios esten disponibles globalmente. Adicionalmente los servicios siguen el patron Singleton
  por lo que los componentes pueden acceder a la misma informacion o estado.

  Este servicio se encarga de proveer la informacion almacenada en los archivos JSON de la carpeta assets.
*/
@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  // Esta variable contiene la lista grupos disponibles para el semestre
  private _groups = groups as GroupList;
  // Esta variable contiene la informacion de los grupos y materias para el semestre
  private _groupsInfo = groupsInfo;

  // Este getter se encarga de devolver el arreglo de strings con los grupos para el semestre
  get groups() {
    return this._groups.groups;
  }

  /*
    Esta funcion se encarga de devolver la lista de grupos que coincidan con los terminos de busqueda del usuario.
    Parametros:
    - shift: Contiene la expresion regular del turno que desea consultar el usuario.
    - semester: Contiene la expresion regular del semestre que desea consultar el usuario.
    Retorna:
    - La lista de gruspos que coinciden con las expresiones regulares.
  */
  getGroups(shift: string, semester: string) {
    // Si ambos parametros son iguales a '[0-9]' entonces devolvemos la lista de grupos sin ningun filtro
    if (shift === '[0-9]' && semester === '[0-9]') return this.groups;

    const regex =
      semester !== 'lab' // Verificamos si el usuario no esta buscando los grupos de laboratorios de redes
        ? new RegExp(`^1${semester}${shift}[0-9]$`) // Devolvemos la expresion regular segun el turno y semestre
        : new RegExp(`^8`); // Devolvemos la expresion regular que busca los grupos de laboratorios de redes

    return this.groups.filter((g) => regex.test(g)); // Filtramos la lista de grupos y la retornamos
  }

  /*
    Esta funcion se encarga de devolver la informacion de la clave de grupo recibida por parametro.
    Parametros:
    - group: Es un string que contiene la clave del grupo que se desea consultar.
    Retorna:
    - Un arreglo de objetos de tipo Subject que contiene la informacion relevante sobre las materias impartidas
    en el grupo.
  */
  getGroupInfo(group: GroupKey) {
    return this._groupsInfo[group];
  }
}
