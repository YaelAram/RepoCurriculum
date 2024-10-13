import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { GeneratedScheduleComponent } from '@schedule/components/generated-schedule/generated-schedule.component';
import { FavoriteService } from '@schedule/services/favorite.service';

/*
  Un componente de Angular consta de los sigueintes archivos:
  - Un archivo TypeScript: Que contiene la logica del componente.
  - Un archivo HTML: Que contiene la estructura HTML del componente y muestra al usuario la informacion
    generada por la logica del componente.
  - Un archivo CSS (Opcional): Contienen los estilos CSS del componente, estos estilos unicamente modifican los 
    elementos HTML del componente.

  Este componente se encarga de renderizar la pagina de la aplicacion que muestra los horarios marcados como 
  favoritos, asi como de permitir al usuario eliminarlos.
*/
@Component({
  selector: 'schedule-favorite-page',
  standalone: true,
  imports: [NgIf, GeneratedScheduleComponent],
  templateUrl: './favorite-schedules-page.component.html',
})
export default class FavoriteSchedulesPageComponent {
  // Inyectamos el servicio que contiene los horarios favoritos.
  private favouriteService = inject(FavoriteService);

  // Este getter se encarga de obtener y devolver la lista de horarios favoritos
  get favourites() {
    return this.favouriteService.favourites;
  }
}
