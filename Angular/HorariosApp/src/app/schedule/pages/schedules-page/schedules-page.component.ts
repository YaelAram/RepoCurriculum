import { NgFor } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { map, merge, takeWhile, tap } from 'rxjs';

import { GroupComponent } from '@components/group/group.component';
import { GroupKey } from '@interfaces/types';
import { semesters, shifts } from '@schedule/constants';
import { SchedulesService } from '@services/schedules-service.service';

/*
  Un componente de Angular consta de los sigueintes archivos:
  - Un archivo TypeScript: Que contiene la logica del componente.
  - Un archivo HTML: Que contiene la estructura HTML del componente y muestra al usuario la informacion
    generada por la logica del componente.
  - Un archivo CSS (Opcional): Contienen los estilos CSS del componente, estos estilos unicamente modifican los 
    elementos HTML del componente.

  Este componente se encarga de renderizar la pagina que muestra al usuario la informacion del grupo que desee 
  consultar, ademas de permitirle navegar a traves de los grupos permitiendole filtrar grupos dependiendo del
  turno o semestre que el usuario haya establecido.
*/
@Component({
  selector: 'schedule-page',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, GroupComponent],
  templateUrl: './schedules-page.component.html',
  styleUrl: './schedules-page.component.css',
})
export default class SchedulesPageComponent implements OnInit, OnDestroy {
  // Inyectamos el servicio que nos permite consultar informacion de los grupos
  private schedulesService = inject(SchedulesService);
  /*
    Inyectamos el servicio FormBuilder que nos permite crear formularios reactivos en Angular, este tipo de 
    formularios nos facilita la tarea de validar los campos, mostrar mensajes de error ante un campo invalido y
    reaccionar a los cambios que sufran los campos del formulario.
  */
  private fb = inject(FormBuilder);
  // Creamos un flag que utilizamos para detectar si la pagina esta o no activa.
  private isActivePage = true;
  // Creamos un string que sirve como clave para guardar informacion en el sessionStorage
  private storeKey = 'HorariosApp-Store-SelectMenu';

  /*
    Esta propiedad contiene el controlador del formulario, este formulario se encarga de recolectar los filtros
    que el usuario aplica a la lista de grupos asi como de obtener el grupo que el usuario desea consultar.
    - shift: Esecifica el filtro de turno que debe ser aplicado a la lista de grupos
    - semester: Esecifica el filtro de semestre que debe ser aplicado a la lista de grupos
    - group: Contiene el grupo que el usuario desea consultar
  */
  public form = this.fb.group({
    shift: ['[0-9]'],
    semester: ['[0-9]'],
    group: ['1007'],
  });

  public shifts = shifts; // Contiene la lista con las opciones de turno
  public semesters = semesters; // Contiene la lista con las opciones de semestre
  public groups = this.schedulesService.groups; // Obtiene la lista de grupos del servicio

  // Esta funcion especial de Angular se ejecuta antes del primer renderizado del componente
  ngOnInit(): void {
    this.onSelectorChange(); // Agregamos los eventos de cambio al formulario
    this.restoreFormState(); // Restauramos el estado del formulario en caso de que lo haya
  }

  // Esta funcion especial de Angular se ejecuta mientras el componente se esta destruyendo
  ngOnDestroy(): void {
    this.isActivePage = false; // Cmabiamos el flag para indicar que el usuario esta abandonando la ruta actual
  }

  // Este getter se encarga de obtener el grupo seleccionado actualmente
  get group() {
    return this.form.controls.group.value! as GroupKey;
  }

  /*
    Esta funcion se encarga de guardar el estado actual del formulario y almacenarlo en el sessionStorage,
    este se diferencia del localStorage en que cuando el usuario cierra la pestaña este se borra mientras que el
    localStorage no se borra.
  */
  private saveFormState() {
    const formState = this.form.value; // Obtenemos el estado actual del formulario
    // Convertimos el estado a un string y lo guardamos en el sessionStorage
    sessionStorage.setItem(this.storeKey, JSON.stringify(formState));
  }

  // Esta funcion se encarga de recuperar del sessionStorage y establecerlo al formulario
  private restoreFormState() {
    // Obtenemos el valor almacenado en el sessionStorage
    const store = sessionStorage.getItem(this.storeKey);

    if (!store) return; // Si no lo hay entonces salimos de la funcion
    // Si lo hay entonces recuperarmos el estado y lo establecemos en el formulario
    this.form.reset(JSON.parse(store));
  }

  /*
    Esta funcion se encarga de obtener la lista de grupos segun los filtros aplicados por el usuario.
    Parametros:
    - shift: Contiene la expresion regular para buscar los grupos de un turno en especifico
    - semester: Contiene la expresion regular para buscar los grupos de un semestre en especifico
  */
  private getGroupOptions(shift: string | null, semester: string | null) {
    // Si alguno de los filstros es nulo entonces retornamos un arreglo vacio
    if (!shift || !semester) return [];
    // Si no entonces retornamos la lsita de grupos retornada por el servicio
    return this.schedulesService.getGroups(shift, semester);
  }

  /*
    Esta funcion se encarga de agregar eventos al formulario detectando cuando el filtro de turno y
    semestre son modificados por el usuario.
  */
  private onSelectorChange() {
    // Obtenemos el controlador de formulario para el filtro de turno
    const shiftC = this.form.controls.shift;
    // Obtenemos el controlador de formulario para el filtro de semestre
    const semesterC = this.form.controls.semester;

    /*
      El operador merge de RxJS nos permite unificar en un solo Observable las emisiones de ambos Observables
      del evento valueChanges, este evento se dispara cada vez que el campo de formulario es modificado.
    */
    merge(shiftC.valueChanges, semesterC.valueChanges)
      .pipe(
        // Con este operador mantenemos activa la suscripcion mientras la pagina este activa
        takeWhile(() => this.isActivePage),
        // Obtenemos los valores de ambos campos y los retornamos en forma de un arreglo
        map(() => [shiftC.value, semesterC.value]),
        // Obtenemos los filtros aplicados por el usuario y obtenemos la lista de grupos
        map(([shift, semester]) => this.getGroupOptions(shift, semester)),
        // Reiniciamos el menu desplegable con la lista de grupos a la primer opcion
        tap((options) =>
          this.form.controls.group.setValue(options.at(0) ?? '')
        ),
        // Guardamos el nuevo estado del formulario
        tap(() => this.saveFormState())
      )
      // Establecemos la nueva lista de grupos a la propiedad del componente
      .subscribe((options) => (this.groups = options));
  }
}
