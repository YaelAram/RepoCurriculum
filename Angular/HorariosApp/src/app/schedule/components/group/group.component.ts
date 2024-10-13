import { DatePipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, inject, Input, OnChanges } from '@angular/core';

import { GroupKey, Subject } from '@interfaces/types';
import { SelectedSubjectsService } from '@schedule/services/selected-subjects.service';
import { SchedulesService } from '@services/schedules-service.service';

/*
  Un componente de Angular consta de los sigueintes archivos:
  - Un archivo TypeScript: Que contiene la logica del componente.
  - Un archivo HTML: Que contiene la estructura HTML del componente y muestra al usuario la informacion
    generada por la logica del componente.
  - Un archivo CSS (Opcional): Contienen los estilos CSS del componente, estos estilos unicamente modifican los 
    elementos HTML del componente.

  Este componente se encarga de crear la tabla que muestra al usuario las materias disponibles en un grupo asi
  como los botones para agregar o eliminar de la lista de materias seleccionadas.
*/
@Component({
  selector: 'schedule-group-info',
  standalone: true,
  imports: [NgFor, NgIf, TitleCasePipe, DatePipe],
  templateUrl: './group.component.html',
})
export class GroupComponent implements OnChanges {
  // Inyectamos el servicio que nos permite obtener la informacion del grupo
  private schedulesService = inject(SchedulesService);
  // Inyectamos el servicio que nos permite agregar o eliminar de la lista de materias seleccionadas
  private selectedService = inject(SelectedSubjectsService);

  /*
    El decorador Input nos permite enviar valores de un componente padre a un componente hijo, en este caso,
    el componente actual es el componente hijo.
    Creamos una propiedad Input que nos permite obtener la clave del grupo que el usuario desea consultar.
  */
  @Input() public group?: GroupKey;
  // Esta propiedad contiene la informacion del grupo actual
  public groupInfo?: Subject[];

  /*
    Este es un metodo especial en Angular y se ejecuta cada vez que el valor de la propiedad Input
    es modificado por el componente padre.
  */
  ngOnChanges(): void {
    if (!this.group) return; // Si el grupo es null o undefined salimos del metodo
    // Sino entonces obtenemos la informacion del grupo
    this.groupInfo = this.schedulesService.getGroupInfo(this.group);
  }

  /*
    Este metodo nos permite convertir un numero entero y positivo en su equivalente en el tipo Date
    Parametros:
    - time: Contiene una fecha y hora codificada en forma de numero
    Retorna:
    - Un objeto tipo Date
  */
  toDate(time: number) {
    return new Date(time);
  }

  /*
    Esta funcion detecta si la materia actual ya se encuentra en la lista de materias seleccionadas.
    Parametros:
    - subject: Contiene la informacion de la materia a consultar.
    Retorna:
    - Un boolean indicando si la materia ya se encuentra en lista de materias seleccionadas, True si ya lo esta o
      False si no
  */
  isSelected(subject: Subject) {
    // Consultamos con el servicio si la materia ya se encuentra registrada
    return this.selectedService.isSelected(subject);
  }

  /*
    Este metodo se encarga de agregar una materia a la lista de materias seleccionadas.
    Parametros:
    - subject: Contiene la informacion de la materia a agregar
  */
  addSubject(subject: Subject) {
    // Mandamos a llamar al servicio para agregar una nueva materia
    this.selectedService.addSubject(subject);
  }

  /*
    Este metodo se encarga de eliminar una materia a la lista de materias seleccionadas.
    Parametros:
    - subject: Contiene la informacion de la materia a eliminar
  */
  removeSubject(subject: Subject) {
    // Mandamos a llamar al servicio para eliminar la materia
    this.selectedService.removeSubject(subject);
  }
}
