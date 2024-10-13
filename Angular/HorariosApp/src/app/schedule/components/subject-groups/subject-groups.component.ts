import { KeyValuePipe, NgFor, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { Subject } from '@schedule/interfaces/types';
import { SelectedSubjectsService } from '@schedule/services/selected-subjects.service';

/*
  Un componente de Angular consta de los sigueintes archivos:
  - Un archivo TypeScript: Que contiene la logica del componente.
  - Un archivo HTML: Que contiene la estructura HTML del componente y muestra al usuario la informacion
    generada por la logica del componente.
  - Un archivo CSS (Opcional): Contienen los estilos CSS del componente, estos estilos unicamente modifican los 
    elementos HTML del componente.

  Este componente se encarga de obtener la lista de materias y grupos seleccionados por el usuario y mostratralos
  al usuario agrupandolos segun el nombre de la materia. Ademas permite al usuario eliminar una materia de la lista y
  modificar su calificacion o nivel de preferencia.
*/
@Component({
  selector: 'schedule-subject',
  standalone: true,
  imports: [NgFor, KeyValuePipe, TitleCasePipe],
  templateUrl: './subject-groups.component.html',
  styleUrl: './subject-groups.component.css',
})
export class SubjectGroupsComponent {
  // Inyectamos el Servicio que contiene la lista de materias seleccionadas por el usuario
  private selectedService = inject(SelectedSubjectsService);

  // Este getter se encarga de retornar la lista de materias seleccionadas contenidas en el servicio
  get subjects() {
    return this.selectedService.selectedSubjects;
  }

  /*
    Este metodo se encarga de generar el label para cada campo del formulario que contiene informacion
    sobre el profesor y grupo al cual el usuario estaria modificando la calificacion o nivel de preferencia.
    Parametros:
    - subject: Contiene la informacion de la materia
    Retorna:
    - Un string que contiene el nombre del profesor y clave del grupo
  */
  getSubjectLabel(subject: Subject) {
    return `${subject.profesor} (${subject.group})`;
  }

  /*
    Esta funcion se encarga de actualiza el nivel de preferencia o calificacion que el usuario da a una materia.
    Parametros:
    - subject: Contiene la informacion de la materia a actualizar.
    - preference: Contiene la nueva calificacion (en forma de string)
  */
  changePreference(subject: Subject, preference: string) {
    /*
      Mandamos a llamar la funcion de nuestro servicio que se encarga de actualizar la preferencia de una materia,
      convertimos la calificacion en un number antes de enviar a la funcion.
    */
    this.selectedService.updatePreference(subject, Number(preference));
  }

  /*
    Esta funcion manda a llamar la funcion del servicio que se encarga de eliminar una materia de la lista de materias
    seleccionadas.
    Parametros:
    - subject: Contiene la informacion de la materia a eliminar.
  */
  removeSubject(subject: Subject) {
    // Mandamos a llamar la funcion de nuestro servicio que elimina una materia de la lista.
    this.selectedService.removeSubject(subject);
  }
}
