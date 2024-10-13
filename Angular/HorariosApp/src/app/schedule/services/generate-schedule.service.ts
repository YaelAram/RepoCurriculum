import { inject, Injectable } from '@angular/core';
import { SelectedSubjectsService } from './selected-subjects.service';

import product from 'just-cartesian-product';

import type {
  DayKey,
  Preferences,
  Schedule,
  ScheduleByDay,
  Subject,
} from '@schedule/interfaces/types';

/*
  Este es un servicio de Angular, los servicios proporcionan un mecanismo para separar logica del negocio que puede
  ser utilizada por mas de un componente lo que nos evita duplicar el codigo. Angular sigue el patron de Inyeccion de
  dependencias por lo que los servicios que en su decorador Injectable tiene la propiedad providedIn: "root" lo que
  provoca que los servicios esten disponibles globalmente. Adicionalmente los servicios siguen el patron Singleton
  por lo que los componentes pueden acceder a la misma informacion o estado.

  Este servicio se encarga de generar los horarios de clases a partir de las materias y grupos seleccionados
  por el usuario.
*/
@Injectable({
  providedIn: 'root',
})
export class GenerateScheduleService {
  // Inyectamos el servicio que contiene las materias seleccionadas por el usuario
  private selectedSubjects = inject(SelectedSubjectsService);
  // Definimos una variable destinada a almacenar los horarios generados
  private _schedules?: Schedule[];

  private numberOfOptatives = 0; // Contiene el numero de optativas que el usuario desea cursar
  private preferedStart = '07:00'; // Contiene la hora a la que desea entrar a clases
  private preferedEnd = '13:00'; // Contiene la hora a la que desea salir de clases
  private minPreference = 8; // Contiene la calificacion minima que debe tener un horario para ser mostrado

  // Este getter se encarga de devolver la configuracion de preferencias actual
  get preferences() {
    return {
      start: this.preferedStart,
      end: this.preferedEnd,
      optatives: this.numberOfOptatives,
      preference: this.minPreference,
    };
  }

  // Este metodo se encarga de establecer las preferencias del usuario
  setPreferences({ start, end, optatives, preference }: Preferences) {
    this.numberOfOptatives = optatives;
    this.preferedStart = start;
    this.preferedEnd = end;
    this.minPreference = preference;
  }

  /*
    Este getter se encarga de devolver el arreglo de horarios generados ordenados por la calificacion
    que obtuvieron en orden descendente.
  */
  get schedules() {
    // Si la variable con los horarios generados no ha sido inicializada (no se ha ejecutado el metodo generate)
    if (!this._schedules) {
      console.error('Generate method was not called yet'); // Se envia un mensaje de error
      return []; // Se retorna un arreglo vacio
    }
    // Sino se retornar el contenido del arreglo ordenado por preferencia en forma descendente
    return this._schedules.sort((s1, s2) => s2.preference - s1.preference);
  }

  /*
    Este metodo se encarga de mandar a llamar los metodos necesarios para generar los horarios y validar que
    sean validos (que no tengan materias repetidas, filtrar horarios duplicados, filtrar los horarios
    que tienen colisiones de clases, etc).
  */
  generate() {
    // Generamos todas las combinaciones posibles
    let schedules = this.getScheduleCombinations();
    // Filtramos las combinaciones que no cumplen con la calificacion minima
    schedules = this.filterCombinationsLowPreference(schedules);
    // Filtramos las combinaciones repetidas
    schedules = this.filterRepeatedCombinations(schedules);
    // Filtramos los horarios que contienen la misma materia varias veces
    schedules = this.filterCombinationsWithRepeatedSubjects(schedules);
    // Filtramos los horarios que tienen colisiones de clases
    schedules = this.filterCombinationWithCollisions(schedules);

    this._schedules = schedules; // Inicializamos la variable con los horarios generados
  }

  /*
    Esta funcion se encarga de convertir un arreglo de Subject (de materias) en un tipo de dato Schedule (horario).
    Parametros:
    - subjects: La lista de materias que componen el horario
    Retorna:
    - Un objeto tipo Schedule
  */
  private mapSubjectsToSchedule(subjects: Subject[]) {
    // Calculamos la calificacion del horario basados en el nivel de preferencia de las materias que lo componen
    const preference =
      subjects
        .map(({ preference }) => preference) // Iteramos sobre las materias y extraemos la preferencia
        /*
          Iteramos sobre el arreglo de calificaciones y las vamos sumando por ultimo la dividimos entre
          el numero de materias para asi obtener la calificacion promedio.
        */
        .reduce((prev, next) => prev + next, 0) / subjects.length;
    /*
      Calculamos el identificador unico del horario, este es un string que contiene el nombre de las materias en
      orden alfabetico sin espacios y el grupo al que pertenecen. Este es de especial utilidad para identificar
      horarios duplicados y para verificar que un horario no contenga mas de una vez la misma materia. Se ordena
      en forma alfabetica para evitar que horarios duplicados pero cuyo orden no sea el mismo pasen como horarios
      distintos.
    */
    const id = subjects
      /*
        Iteramos sobre el arreglo de materias y creamos un string que contiene el nombre de la materia sin
        espacios y el grupo al que pertenece.
      */
      .map(({ group, subject }) => `${subject.replaceAll(' ', '')}-${group}`)
      // Ordenamos los string generados en orden alfabetico
      .sort((id1, id2) => id1.localeCompare(id2))
      // Unimos los elementos del arreglo separado por un espacio
      .join(' ');

    // Devolvemos el objeto tipo Schedule
    return {
      id,
      preference,
      subjects,
    };
  }

  /*
    Esta funcion se encarga de generar todos los posibles horarios que se pueden crear a partir de la lista
    de materias seleccionadas por el usuario.
    Retorna:
    - Un arreglo de objetos tipo Schedule (un arreglo de horarios)
  */
  private getScheduleCombinations() {
    /*
      La funcion product realiza el producto cartesiano entre los arreglos de materias considerando el numero
      de materias optativas que el usuario desea cursar. Cada arreglo contiene todos los posibles grupos 
      seleccionados por el usuario para cursar una materia, por lo que si el usuario desea cursar tres materias
      y 2 optativas la funcion getSubjectsList retorna cinco arreglos tres con las materias obligatorias y dos
      con las materias optativas.
    */
    const schedules = product(
      this.selectedSubjects.getSubjectsList(this.numberOfOptatives)
    ) as Subject[][];

    // Iteramos sobre las combinaciones y las convertirmos al tipo de dato Schedule
    return schedules.map((subjects) => this.mapSubjectsToSchedule(subjects));
  }

  /*
    Esta funcion se encarga de filtrar las combinaciones que no cumplen con la calificacion minima.
    Parametros:
    - schedules: El arreglo con los horarios generados.
    Retorna:
    - Un arreglo de Schedule sin las combinaciones que obtuvieron una calificacion por debajo de la calificacion
      minima.
  */
  private filterCombinationsLowPreference(schedules: Schedule[]) {
    // Mediante la funcion filter iteramos sobre el arreglo y verificamos que cumplan la condicion
    return schedules.filter(
      // Verificamos si la calificacion del horario es mayor o igual a la calificacion minima
      ({ preference }) => preference >= this.minPreference
    );
  }

  /*
    Esta funcion se encarga de filtrar aquellas combinaciones que estan repetidas y dejar solo una.
    Parametros:
    - schedules: El arreglo con los horarios generados.
    Retorna:
    - Un arreglo de Schedule sin horarios repetidos.
  */
  private filterRepeatedCombinations(schedules: Schedule[]) {
    const ids = new Set<string>(); // Creamos un Set de strings para verificar si la combinacion es unica
    return schedules.filter(({ id }) => {
      if (ids.has(id)) return false; // Si el id ya fue usado retornamos False (omitimos el elemento)

      ids.add(id); // Sino entonces registramos el id en el Set
      return true; // Retornamos True (incluimos el elemento)
    });
  }

  /*
    Esta funcion se encarga de remover aquellas combinacion que tengan mas de una vez la misma materia.
    Parametros:
    - schedules: El arreglo con los horarios generados.
    Retorna:
    - Un arreglo de Schedule sin horarios con materias repetidas.
  */
  private filterCombinationsWithRepeatedSubjects(schedules: Schedule[]) {
    return schedules.filter(({ id }) => {
      // Separamos el id en strings que contienen el nombre de la materia y el grupo
      const keys = id.split(' ');
      const uniquekeys = new Set<string>(keys); // Convertirmos el array en un Set

      /*
        Si el arreglo y el Set tienen la misma longitud entonces no habia ninguna materia duplicada por lo que
        retornamos True (incluimos el elemento), caso contrario retornamos False (omitimos el elemento)
      */
      return keys.length === uniquekeys.size;
    });
  }

  /*
    Esta funcion sirve para verificar que dos materias no colisionen.
    Parametros:
    - s1: Contiene la informacion de la primer materia
    - s2: Contiene la informacion de la segunda materia
  */
  private nocollision(s1: Subject, s2: Subject) {
    /*
      Cada objeto tipo Subject contiene dos propiedades de tipo number llamadas start y end que indican la hora de
      inicio y la hora de fin de la clase. Este numero representa el numero de milisegundos que han pasado desde el 
      1 de enero de 1970.
      Para verificar que dos materias no colisionan verificamos lo siguiente:
      - La primera materia termina antes o al mismo tiempo que inicia la segunda materia
      - La primera materia inicia despues o al mismo tiempo que finaliza la segunda materia

      Retornamos el boolean resultante de comparar ambos casos.
    */
    return s1.end <= s2.start || s1.start >= s2.end;
  }

  /*
    Esta funcion se encarga de comparar todas las materias de un dia entre si y verificar si en alguna de esas
    comparaciones las materias colisionan.
    Parametros:
    - subjects: Las materias que comparten el dia que se esta verificando.
    Retorna:
    - Un boolean donde True significa que el dia no presenta ninguna colision, False en caso contrario
  */
  private checkDay(subjects: Subject[]) {
    // Estos dos ciclos se encargar de tomar una materia y compararla con las siguientes
    for (let i = 0; i < subjects.length; i++) {
      for (let j = i + 1; j < subjects.length; j++) {
        // Si hay una colision retornamos False
        if (!this.nocollision(subjects[i], subjects[j])) return false;
      }
    }

    return true; // Si los ciclos finalizaron no hubo ninguna colision y retornamos True
  }

  /*
    Esta funcion se encarga de filtrar todas aquellas combinacion que presentan materias que colisionan.
    Parametros:
    - schedules: El arreglo con los horarios generados.
    Retorna:
    - Un arreglo de Schedule sin horarios con colisiones.
  */
  private filterCombinationWithCollisions(schedules: Schedule[]) {
    return schedules.filter(({ subjects }) => {
      /*
        Creamos un objeto que almacena arreglos de materias clasificadas segun los dias de la semena en las que
        se imparten. Por ejemplo, si una materia si imparte martes y jueves sera parte de los arreglos Mar y Jue.
      */
      const days: ScheduleByDay = {
        Lun: [],
        Mar: [],
        Mie: [],
        Jue: [],
        Vie: [],
        Sab: [],
      };

      // Iteramos sobre el arreglo de materias del horario
      subjects.forEach((subject) =>
        subject.days
          .split(',') // Separamos los dias en los que se imparte la materia
          // Iteramos sobre los dias y los agregamos al arreglo segun corresponda
          .forEach((day) => days[day as DayKey].push(subject))
      );

      // Validamos que cada dia no presente ninguna colision
      return (
        this.checkDay(days['Lun']) &&
        this.checkDay(days['Mar']) &&
        this.checkDay(days['Mie']) &&
        this.checkDay(days['Jue']) &&
        this.checkDay(days['Vie']) &&
        this.checkDay(days['Sab'])
      );
    });
  }
}
