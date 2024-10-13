import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { GeneratedScheduleComponent } from '@schedule/components/generated-schedule/generated-schedule.component';
import { GenerateScheduleService } from '@schedule/services/generate-schedule.service';

/*
  Un componente de Angular consta de los sigueintes archivos:
  - Un archivo TypeScript: Que contiene la logica del componente.
  - Un archivo HTML: Que contiene la estructura HTML del componente y muestra al usuario la informacion
    generada por la logica del componente.
  - Un archivo CSS (Opcional): Contienen los estilos CSS del componente, estos estilos unicamente modifican los 
    elementos HTML del componente.

  Este componente se encarga de renderizar la ruta que muestra los horarios generados por la aplicacion. Se llega
  a esta ruta una vez que el usuario ha terminado de agregar materias y ha modificado sus preferencias.
*/
@Component({
  selector: 'schedule-generated-page',
  standalone: true,
  imports: [NgIf, GeneratedScheduleComponent],
  templateUrl: './generated-schedules-page.component.html',
})
export default class GeneratedSchedulesPageComponent implements OnInit {
  // Inyectamos el servicio que permite generar los horarios de clases
  private generateSchedule = inject(GenerateScheduleService);

  /*
    Este es un metodo especia de Angular que se ejecuta cuando el componente se esta iniciando, es decir,
    se ejecuta despues del primer chequeo de deteccion de cambios pero antes de renderizar el HTML.
  */
  ngOnInit(): void {
    // Mandamos a llamar el metodo que genera los horarios a partir de la lista de materias seleccionadas
    this.generateSchedule.generate();
  }

  // Este getter se encarga de obtener la lista de horarios generada
  get schedules() {
    return this.generateSchedule.schedules;
  }
}
