/*
  En este archivo se encuentra nuestro modelo de reactividad, utilizamos el patron de diseño observador para crear
  un objeto con la informacion y una lista de observadores que modificaran el HTML de la pagina y reflejar el estado
  actual al cliente

  Observer define el tipo de nuestros observadores o suscriptores
  Observable define el tipo del objeto que contendra la informacion y una Map con los observadores o suscriptores
  a la informacion
*/

/*
  Definimos el tipo de la funciones Observer, estas son funciones con tipos genericos, las cuales se ejecutan
  cada vez que el estado de un observable es modificado

  Recibe como parametro:
    state: El cual contiene el estado actualizado del observable de tipo generico

  Retorna un valor void
*/
export type Observer<T> = (state: T) => void;

/*
  Esta clase define el tipo Observable el cual contiene la informacion que los suscriptores consumiran para modificar
  el HTML de la pagina, asi como los mecanismos necesarios para agregar o eliminar suscriptores asi como obtener y actualizar
  el estado de la informacion y notificar a los suscriptores del cambio de la informacion

  Esta es una clase generica por lo que nos permite almacenar cualquier tipo de dato como estado
*/
export class Observable<T> {
  // Esta atributo contiene el estado o informacion que los suscriptores consumen, es de tipo generico
  private state: T;
  // Esta tributo es opcional, permite definir una clave unica que nos permite almacenar informacion en el localStorage
  private localStorageKey?: string;
  /*
    Este Map contiene los suscriptores, se utilizo una estructura Map ya que permite agregar y eliminar suscriptores de una
    forma mas sencilla y eficiente, su clave es de tipo string y su valor de tipo Observer del mismo tipo de dato
    que el estado (atributo state)
  */
  private observers: Map<string, Observer<T>>;

  constructor(state: T, localStorageKey?: string) {
    // Inicializamos el estado
    this.state = state;
    // Inicializamos el Map de los suscriptores
    this.observers = new Map<string, Observer<T>>();
    // Inicializamos la clave unica para el localStorage de nuestro observable
    this.localStorageKey = localStorageKey;
  }

  // Permite obtener el estado actual (Getter)
  getState(): T {
    return this.state;
  }

  /*
    Nos permite agregar un nuevo suscriptor a la informacion
    
    Recibe como parametro:
      key: Una clave unica del suscriptor
      observer: La funcion a ejecutar cada vez que el estado cambie
      call: Indica si la funcion observer debe ejecutarse con el estado actual, permite inicializar el HTML
      con el estado actual del observable (true si debe ser ejecutada la funcion Observer) (opcional)
  */
  subscribe({
    key,
    observer,
    call = true,
  }: {
    key: string;
    observer: Observer<T>;
    call?: boolean;
  }) {
    // Agregamos el observer a nuestro Map
    this.observers.set(key, observer);
    // Ejecutamos la funcion observer si es necesario
    if (call) observer(this.state);
  }

  // Permite eliminar la suscripcion de un observador, recibe como parametro la clave unica del observador a eliminar
  unsubscribe(key: string) {
    this.observers.delete(key);
  }

  // Permite actualiza el estado del observable, recibe como parametro el nuestro estado
  updateState(newState: T) {
    // Actualizamos el estado interno del observable
    this.state = newState;
    // Si la clave unica de localStorage no es null o undefined, guarda el estado actual
    if (this.localStorageKey)
      localStorage.setItem(this.localStorageKey, JSON.stringify(newState));
    // Aqui comienza el proceso para notificar a todos los Observers que el estado a caba de cambiar
    // Obtenemos un array con todas las funciones Observer y las convertimos en un arreglo de Promesas
    const tasks = Array.from(this.observers.values()).map((observer) => {
      return new Promise<void>(() => {
        observer(newState);
      });
    });
    /*
      Al convertir el arreglo de funciones Observer a un arreglo de Promesas (Promesas que por dentro ejecutan las
      funciones Observer) y utilizar el metodo Promise.all nos permite que los cambios al HTML de la pagina se realicen
      todos en paralelo y no de forma secuencial si nos dedicaramos a iterar el arreglo de Observers y ejcutarlos uno a la vez
    */
    Promise.all(tasks);
  }
}
