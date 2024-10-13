import { Injectable } from '@angular/core';
import { Schedule } from '@schedule/interfaces/types';

/*
  Este es un servicio de Angular, los servicios proporcionan un mecanismo para separar logica del negocio que puede
  ser utilizada por mas de un componente lo que nos evita duplicar el codigo. Angular sigue el patron de Inyeccion de
  dependencias por lo que los servicios que en su decorador Injectable tiene la propiedad providedIn: "root" lo que
  provoca que los servicios esten disponibles globalmente. Adicionalmente los servicios siguen el patron Singleton
  por lo que los componentes pueden acceder a la misma informacion o estado.

  Este servicio se encarga de almacenar los horarios marcados como favoritos por el usuario y de guardarlos de forma
  persistente en el localStorage asi como de recuperarlos al iniciar la aplicacion.
*/
@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  // Esta propiedad contiene los horarios marcados como favoritos por parte del usuario
  private _favourites = new Map<string, Schedule>();
  // Esta propiedad contiene la clave usada para guardar los horarios favoritos en el localStorage
  private storeKey = 'HorariosApp-Store-FavouriteSchedules';

  constructor() {
    // Al crear la instancia del servicio revisamos si hay informacion guardada en el localStorage
    this.restoreFromStore();
  }

  /*
    Este getter se encarga de obtener los horarios favoritos, convertirlos a un arreglo y ordenarlos en forma 
    descendente segun la calificacion del horario.
  */
  get favourites() {
    return Array.from(this._favourites.values()).sort(
      (s1, s2) => s2.preference - s1.preference
    );
  }

  // Este metodo se encarga de almacenar la informacion de los horarios favoritos en el localStorage
  private saveToStore() {
    // Obtenemos el arreglo de entradas del Map, lo convertimos a un arreglo y posteriormente a un string
    const schedules = JSON.stringify(Array.from(this._favourites.entries()));
    // Almacenamos la informacion en el localStorage
    localStorage.setItem(this.storeKey, schedules);
  }

  // Esta funcion se encarga de restaurar la informacion guardada en el localStorage, si la hay
  private restoreFromStore() {
    // Obtenemos la informacion almacenada
    const schedules = localStorage.getItem(this.storeKey);

    if (!schedules) return; // Si no la hay entonces salimos de funcion
    /*
      Convertimos la informacion en un arreglo de entradas y la enviamos al constructor del Map para
      igualarlo a la propiedad del servicio que almacena los horarios favoritos
    */
    this._favourites = new Map<string, Schedule>(JSON.parse(schedules));
  }

  /*
    Este metodo se encarga de detectar si un horario ya se encuentra marcado como favorito.
    Retorna:
    - Un boolean donde True indica que el horario ya se encuentra marcado como favorito, False si no lo esta
  */
  isFavSchedule(id: string) {
    return this._favourites.has(id);
  }

  /*
    Este metodo se encarga de agregar un nuevo horario al Map de horarios favoritos.
    Parametros:
    - schedule: Contiene la informacion del nuevo horario a agregar.
  */
  addSchedule(schedule: Schedule) {
    // Si el horario ya se encuentra dentro del Map entonces salimos del metodo
    if (this._favourites.has(schedule.id)) return;
    this._favourites.set(schedule.id, schedule); // Sino lo esta entonces agregamos el horarios al Map
    this.saveToStore(); // Guardamos el nuevo estado en el localStorage
  }

  /*
    Este metodo se encarga de remover un horario del Map de horarios favoritos.
    Parametros:
    - id: El id del horario a remover.
  */
  removeSchedule(id: string) {
    if (!this._favourites.has(id)) return; // Si el id no existe dentro del Map salimos del metodo
    this._favourites.delete(id); // Sino entonces eliminamos la entrada del Map
    this.saveToStore(); // Guardamos el nuevo estado en el localStorage
  }
}
