import {
  DatePipe,
  DecimalPipe,
  NgFor,
  NgIf,
  TitleCasePipe,
} from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Schedule } from '@schedule/interfaces/types';
import { FavoriteService } from '@schedule/services/favorite.service';

/*
  Un componente de Angular consta de los sigueintes archivos:
  - Un archivo TypeScript: Que contiene la logica del componente.
  - Un archivo HTML: Que contiene la estructura HTML del componente y muestra al usuario la informacion
    generada por la logica del componente.
  - Un archivo CSS (Opcional): Contienen los estilos CSS del componente, estos estilos unicamente modifican los 
    elementos HTML del componente.

  Este componente se encarga de mostrar cada uno de los horarios generados por la aplicacion y habilitar
  al usuario para que pueda marcalos o desmarcarlos como favoritos.
*/
@Component({
  selector: 'schedule-gen-schedule',
  standalone: true,
  imports: [NgFor, NgIf, DecimalPipe, TitleCasePipe, DatePipe],
  templateUrl: './generated-schedule.component.html',
  styleUrl: './generated-schedule.component.css',
})
export class GeneratedScheduleComponent {
  // Inyectamos el servicio que contiene los horarios favoritos
  private favouriteService = inject(FavoriteService);

  /*
    El decorador Input nos permite enviar valores de un componente padre a un componente hijo, en este caso,
    el componente actual es el componente hijo.
    Creamos una propiedad Input que nos permite obtener los horarios generados o favoritos de la aplicacion
  */
  @Input() schedules: Schedule[] = [];

  /*
    Este metodo se encarga de detectar si un horario ya se encuentra marcado como favorito.
    Parametros:
    - id: El id del horario a verificar.
    Retorna:
    - Un boolean donde True indica que ya esta marcado como favorito y False que no lo esta.
  */
  isFavSchedule(id: string) {
    // Verificamos si el horarios ya fue marcado favorito con ayuda del servicio.
    return this.favouriteService.isFavSchedule(id);
  }

  /*
    Este metodo se encarga de agregar un horario a la lista de favoritos.
    Parametros:
    - schedule: Contiene la informacion del horario.
  */
  addSchedule(schedule: Schedule) {
    // Mandamos a llamar al servicio para agregar un nuevo horario a la lista de favoritos
    this.favouriteService.addSchedule(schedule);
  }

  /*
    Este metodo se encarga de eliminar un horario de la lista de favoritos.
    Parametros:
    - schedule: Contiene la informacion del horario.
  */
  removeSchedule(id: string) {
    // Mandamos a llamar al servicio para eliminar el horario de la lista de favoritos
    this.favouriteService.removeSchedule(id);
  }
}
