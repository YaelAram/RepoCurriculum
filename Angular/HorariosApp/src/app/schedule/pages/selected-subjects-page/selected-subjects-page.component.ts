import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { GroupComponent } from '@components/group/group.component';
import { Preferences } from '@interfaces/types';
import { SubjectGroupsComponent } from '@schedule/components/subject-groups/subject-groups.component';
import { GenerateScheduleService } from '@schedule/services/generate-schedule.service';
import { checkTimeInRange, checkTimes } from '@validators/dateValidator';

/*
  Un componente de Angular consta de los sigueintes archivos:
  - Un archivo TypeScript: Que contiene la logica del componente.
  - Un archivo HTML: Que contiene la estructura HTML del componente y muestra al usuario la informacion
    generada por la logica del componente.
  - Un archivo CSS (Opcional): Contienen los estilos CSS del componente, estos estilos unicamente modifican los 
    elementos HTML del componente.

  Este componenete se encarga de construir la pagina que muestra al usuario las materias que ha seleccionado y
  permitirle eliminarlas, ademas de modificar sus preferencias para generar horarios que se ajusten mejor a 
  sus necesidades.
*/
@Component({
  selector: 'schedule-selected-page',
  standalone: true,
  imports: [GroupComponent, ReactiveFormsModule, SubjectGroupsComponent],
  templateUrl: './selected-subjects-page.component.html',
  styleUrl: './selected-subjects-page.component.css',
})
export default class SelectedSubjectsPageComponent implements OnInit {
  /*
    Inyectamos el servicio FormBuilder que nos permite crear formularios reactivos en Angular, este tipo de 
    formularios nos facilita la tarea de validar los campos, mostrar mensajes de error ante un campo invalido y
    reaccionar a los cambios que sufran los campos del formulario.
  */
  private fb = inject(FormBuilder);
  // Este servicio de Angular nos permite entre otras cosas redirigir al usuario a otra ruta
  private router = inject(Router);
  // Inyectamos el servicio que nos permite modificar las preferencias del usuario antes de generar los horarios
  private generateSchedule = inject(GenerateScheduleService);

  /*
    Esta propiedad contiene el controlador del formulario, este formulario se encarga de recolectar las preferencias
    del usuario antes de generar los horarios, estas son:
    - preference: La calificacion minima que debe obtener un horario para poder ser mostrado al usuario.
    - optatives: Contiene el numero de optativas que el usuario desea cursar ese semestre.
    - start: La hora a la que desea entrar a clases.
    - end: La hora a la que desea salir de clases.
  */
  form = this.fb.group(
    {
      preference: [
        8,
        /*
          Agregamos tres validacion al campo preference, uno valida que el campo no este vacio, el otro que el valor
          ingresado debe ser mayor o igual a cero y el ultimo valida que el valor ingresado sea menor o igual a diez
        */
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      optatives: [
        0,
        /*
          Agregamos tres validacion al campo preference, uno valida que el campo no este vacio, el otro que el valor
          ingresado debe ser mayor o igual a cero y el ultimo valida que el valor ingresado sea menor o igual a tres
        */
        [Validators.required, Validators.min(0), Validators.max(3)],
      ],
      // Agregamos una validacion para que la hora ingresada sea entre las 07:00 y las 22:00
      start: ['07:00', [Validators.required, checkTimeInRange]],
      // Agregamos una validacion para que la hora ingresada sea entre las 07:00 y las 22:00
      end: ['13:00', [Validators.required, checkTimeInRange]],
    },
    // Agregamos una validacion para validar que la hora de entrada ocurra antes de la hora de salida
    { validators: [checkTimes('start', 'end')] }
  );

  /*
    Esta funcion especial de Angular se encarga de obtener las preferencias del usuario o las por defecto
    antes del primer renderizado.
  */
  ngOnInit(): void {
    // Reiniciamos el formulario a las preferencias devueltas por el usuario
    this.form.reset(this.generateSchedule.preferences);
  }

  // Esta funcion se encarga de manejar el evento Submit del formulario.
  handleSubmit() {
    if (this.form.invalid) return; // Si el formulario no es valido salimos de la funcion

    // Obtenemos las preferencias que el usuario ingreso del controlador del formulario
    const preferences = this.form.value as Preferences;
    // Establecemos las nuevas preferencias en el servicio que genera los horarios
    this.generateSchedule.setPreferences(preferences);
    // Navegamos a la pagina que se encarga de mostrar los horarios generados
    this.router.navigateByUrl('/horarios/horarios-creados');
  }
}
