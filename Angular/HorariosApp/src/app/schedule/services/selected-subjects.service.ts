import { Injectable } from '@angular/core';
import { Subject } from '@schedule/interfaces/types';

interface SelectedSubjects {
  [key: string]: Subject[];
}

/*
  Este es un servicio de Angular, los servicios proporcionan un mecanismo para separar logica del negocio que puede
  ser utilizada por mas de un componente lo que nos evita duplicar el codigo. Angular sigue el patron de Inyeccion de
  dependencias por lo que los servicios que en su decorador Injectable tiene la propiedad providedIn: "root" lo que
  provoca que los servicios esten disponibles globalmente. Adicionalmente los servicios siguen el patron Singleton
  por lo que los componentes pueden acceder a la misma informacion o estado.

  Este servicio se encarga de recolectar aquellas materias que el usuario selecciono como candidatas para generar sus
  horarios, ademas de hacer persistente la informacion en el localStorage del navegador por lo que el usuario puede
  cerrar el navegador y continuar con su proceso de seleccion de materias en otro momento.
*/
@Injectable({
  providedIn: 'root',
})
export class SelectedSubjectsService {
  /*
    Esta variable de tipo Map se encarga de almacenar las materias seleccionadas por el usuario, donde la clave es
    el nombre la materia y el valor es un arreglo con las opciones para cursar la materia. Esto nos permite mantener
    ordenado por nombre de materia las opciones del usuario que es de especial ayuda durante el proceso de generar
    los horarios de clase.
  */
  private _subjects = new Map<string, Subject[]>();
  /*
    Dado que las materias optativas tienen una gran variedad de nombres, se utiliza "optativas" como clave para 
    registrarlas dentro del Map _subjects
  */
  private optSubject = 'optativas';
  /*
    Dado que los laboratorios de redes son los unicos provistos por la jefatura de carreta en lugar del L3, se creo
    esta llave para identificarlos.
  */
  private labSubject = 'laboratorios';
  // Esta llave se utiliza para el almacenamiento de la informacion en el localStorage
  private storeKey = 'HorariosApp-Store-SelectedSubjects';

  constructor() {
    /*
      Durante la construccion del servicio mandamos a llamar el metodo restoreFromStore para inicializar la 
      informacion ofrecida por el servicio en caso de ser necesario.
    */
    this.restoreFromStore();
  }

  /*
    Este getter retornar la informacion contenida por el Map _subjects en forma de un objeto de JavaScript,
    se realiza de esta forma ya que los Map esta optimizados para acciones de escritura mientras que los objetos
    estan optimizados para operaciones de lectura.
  */
  get selectedSubjects() {
    /*
      El metodo entries se encarga de retornar un arreglo compuesto por arreglos de dimension dos, donde el primer
      elemento corresponde a la clave y el segundo al valor. Por ejemplo, el Map { "a": 1, "b": 2 } devuelve
      [["a", 1], ["b", 2]].

      El metodo estatico fromEntries de Object toma un arreglo de entradas y crea un objeto.
    */
    return Object.fromEntries(this._subjects.entries()) as SelectedSubjects;
  }

  // Esta funcion sirve para guardar la ultima version del Map _subjects en el localStorage
  private saveToStore() {
    /*
      El localStorage es un almacenamiento tipo clave valor, donde ambas deben ser strings por lo que debemos 
      convertir nuestro Map en un string, para lo cual comenzamos por obtener el arreglo de entrada mediante 
      el metodo entries, dato que lo que retorna es un Iterable debemos convertirlo a un arreglo usando el 
      metodo Array.from y utilizando el metodo JSON.stringify convertimos el arreglo en un string.
    */
    const subjects = JSON.stringify(Array.from(this._subjects.entries()));
    /*
      Establecemos una nueva entrada al localStorage usando como clave el string almacenado en la propiedad de clase
      storeKey y como valor el string generado en el paso anterior.
    */
    localStorage.setItem(this.storeKey, subjects);
  }

  // Esta funcion sirve para recuperar los datos almacenados en el localStorage en caso de haberlos
  private restoreFromStore() {
    // Consultamos en el localStoage si hay informacion alamacenada
    const subjects = localStorage.getItem(this.storeKey);

    if (!subjects) return; // Si no hay informacion previa entonces finalizamos la ejecucion de la funcion.
    /*
      Sino entonces utilizamos el metodo JSON.parse para convertir el string en un arreglo de entradas y lo
      enviamos como parametro para la creacion de un nuevo Map el cual asignamos a la variable _subjects.
    */
    this._subjects = new Map<string, Subject[]>(JSON.parse(subjects));
  }

  /*
    Esta funcion sirve para crear un arreglo con todos los valores del Map _subjects y lo retorna tomando en 
    cuenta el numero de materias optativas requerido por el usuario.
    Parametros:
    - numberOfOptatives: Contiene el numero de materias optativas requerido por el usuario.
    Retorna:
    - Un arreglo con los valores del Map _subjects.
  */
  getSubjectsList(numberOfOptatives: number) {
    // Obtenemos la lista de materias optativas si las hay
    const optativesSubjects = this._subjects.get(this.optSubject);
    /*
      Obtenemos los valores del Map utilizando la funcion values, por ejemplo, el Map {"a": [1, 2], b: [3, 4]}
      retorna [[1, 2], [3, 4]] y convertimos el Iterable en un arreglo
    */
    const subjects = Array.from(this._subjects.values());

    /*
      Si el usuario no selecciono materias optativas o solo requiere cursar una materia optativa devolvemos
      el arreglo de listas de materias tal como esta.
    */
    if (!optativesSubjects || numberOfOptatives === 1) return subjects;
    // Si el usuario ingreso un numero negativo o mayor a 3 entonces retornamos un arreglo vacio
    if (numberOfOptatives < 0 || numberOfOptatives > 3) return [];

    /*
      Si el numero de optativas es 2 o 3 entonces agregamos el arreglo de optativas 1 o 2 veces mas al 
      arreglo de materias.
    */
    for (let i = 1; i < numberOfOptatives; i++)
      subjects.push(optativesSubjects);

    return subjects; // Retornamos el arreglo de listas de materias
  }

  /*
    Esta funcion sirve para crear la clave utilizada para agregar una nueva entrada en el Map.
    Parametros:
    - subject: Contiene la informacion de la materia seleccionada por el usuario.
    Retorna:
    - Un string con la clave para la nueva entrada del Map
  */
  private createKey(subject: Subject) {
    /*
      Si el grupo inicia con un '8' significa que se selecciono un grupo de laboratorio de redes y
      devolvemos la clave adecuada para esa materia.
    */
    if (subject.group.startsWith('8')) return this.labSubject;
    /*
      Si el grupo inicia con un "10" significa que se selecciono un grupo de materias optativas por lo que
      devolvemos la clave adecuada.
    */ else if (subject.group.startsWith('10')) return this.optSubject;
    // Si no entonces devolvemos el nombre de la materia como clave.
    return subject.subject;
  }

  /*
    Esta funcion sirve para verificar si dos objetos tipo Subject son el mismo, es decir, hacen referencia a la 
    misma materia en el mismo grupo. Dado que en JavaScript los objetos se comparan utilizando la referencia en 
    memoria debemos implementar nuestro porpio metodo de comparacion.
    Parametros:
    - s1: Contiene la informacion de la primera materia.
    - s2: Contiene la informacion de la segunda materia.
    Retorna:
    - Un boolean donde True indica que ambas materias hacen referencia a la misma clase, False en caso contrario.
  */
  private compare(s1: Subject, s2: Subject) {
    /*
      Para ambas materia creamos un string que contiene el nombre de la materia y el grupo en el que es impartida
      y posteriormente comparamos ambos strings, retornamos el resultado de la comparacion.
    */
    return `${s1.subject}-${s1.group}` === `${s2.subject}-${s2.group}`;
  }

  /*
    Este metodo sirve para verificar si la materia ya se encuentra dentro del Map.
    Parametros:
    - subject: Contiene la informacion de la materia.
    Retorna:
    - Un boolean que retorna True si la materia ya se encuentra en el Map y False si no lo esta.
  */
  isSelected(subject: Subject) {
    // Obtenemos la clave del Map donde deberemos buscar si el subject ya esta presente
    const key = this.createKey(subject);
    // Obtenemos el arreglo de materia correspondiente a la clave generada en el paso anterior
    const subjects = this._subjects.get(key);
    /*
      Si el arreglo no existe, es decir, no se ha registrado ninguna materia con el mismo nombre que el 
      parametro subject, entonces devolvemos False.
    */
    if (!subjects) return false;
    /*
      Si existe entonces interamos sobre el arreglo y utilizando el metodo compare verificamos si la materia
      del parametro subject y el elemento actual de la iteracion son iguales. Devolvemos el resultado del metodo 
      some el cual retorna un boolean indicando si alguno de los elementos del arreglo cumplio con la condicion, 
      en este caso True si alguno de los objetos del arreglo es igual al recibido por parametro.
    */
    return subjects.some((s) => this.compare(s, subject));
  }

  /*
    Esta funcion sirve para agregar una nueva materia al Map
    Parametros:
    - subject: Contiene la informacion de la materia a agregar

    Nota: Esta funcion no verifica si la materia ya se encuentra dentro del Map ya que la interfaz de usuario
    es construida tomando en cuenta lo anterior, por lo que si la materia ya se encuentra en el Map la unica accion
    que el usuario puede llevar a cabo es la de remover.
  */
  addSubject(subject: Subject) {
    // Obtenemos la clave en la cual se va a guardar la materia dentro del Map
    const key = this.createKey(subject);
    /*
      Verificamos si hay un valor previo en esa clave y obtenemos su valor, si no lo hay inicializamos prev con un
      arreglo vacio.
    */
    const prev = this._subjects.get(key) ?? [];

    /*
      Establecemos una nueva entrada en el Map, utilizando la llave generada y creando un arreglo cuyos primeros
      elementos son los elementos del valor previo y el ultimo elemento es la materia a agregar.
    */
    this._subjects.set(key, [...prev, subject]);
    // Mandamos a llamar el metodo que guarda el estado del Map en el localStorage
    this.saveToStore();
  }

  /*
    Esta funcion sirve para remover una materia del Map
    Parametros:
    - subject: Contiene la informacion de la materia a eliminar.
  */
  removeSubject(subject: Subject) {
    // Creamos la llave del Map donde la materia deberia encontrarse
    const key = this.createKey(subject);
    // Obtenemos la lista de materias a traves del Map y la llave generada
    const prev = this._subjects.get(key);
    // Si el arreglo no existe entonces no hay nada que eliminar y salimos de la funcion
    if (!prev) return;

    // Filtramos todas aquellas materias que sean dieferentes de la materia que se busca eliminar
    const subjects = prev.filter((s) => !this.compare(s, subject));
    // Si despues del filtrado obtenemos un arreglo vacio entonces eliminamos la entrada del Map
    if (subjects.length === 0) this._subjects.delete(key);
    // Sino establecemos la entrada del map con la llave generada y los elementos del arreglo que pasaron el filtro
    else this._subjects.set(key, subjects);

    this.saveToStore(); // Mandamos a llamar el metodo que guarda en el localStorage
  }

  /*
    Esta funcion se encarga de actualizar la preferencia de un usuario por tomar la materia en ese grupo.
    Parametros:
    - subject: El objeto subject que contiene la propiedad preference.
    - preference: Contiene el nuevo nivel de preferencia del usuario por tomar esa materia.
  */
  updatePreference(subject: Subject, preference: number) {
    subject.preference = preference; // Asignamos el nuevo valor de preferencia

    this.saveToStore(); // Guardamos en el localStorage el nuevo estado del Map
  }
}
