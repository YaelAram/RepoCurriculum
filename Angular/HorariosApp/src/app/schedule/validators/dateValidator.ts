import { AbstractControl } from '@angular/forms';

/**
 * Esta funcion se encarga de convertir un string que contiene una hora, en un numero decimal, por ejemplo,
 * el string "17:30" es convertido a 17.5
 * Parametros:
 * - time: El string que contiene la hora.
 * Retorna:
 * - Un numero decimal equivalente a la hora.
 */
const toNumber = (time: string) => {
  // Obtenermos la hora y minuto separando el string con la hora buscando el simbolo ":" y los convertimos a un numero
  const [hour, minute] = time.split(':').map((v) => Number(v));
  return hour + minute / 60; // Retornamos la suma de la hora y obtenemos la porcion de minutos transcurridos
};

/*
  Esta funcion crea una funcion de validacion que se utiliza para verificar que el usuario ingreso una hora de
  entrada anterior a la hora de salida, es decir, que la hora de entrada ocurra antes que la hora de salida.
  Parametros:
  - f1: Contiene el string que identifica al campo de la hora de entrada
  - f2: Contiene el string que identifica al cmapo de la hora de salida.
  Retorna:
  - Una funcion que obtiene las claves de ambos campos, obtiene los valores de ambos campos del formulario y
    verifica que la hora de entrada ocurra antes que la hora de salida.
*/
export const checkTimes = (f1: string, f2: string) => {
  /*
    Se retorna una funcion de tipo ValidationFn, este tipo de funciones pueden ser enviadas como parametro al
    crear un formulario reactivo de Angular y se encargan de validar las entradas del formulario y generar un arreglo
    con los errores de validacion encontrados, entre otras cosas.
    Parametros:
    - control: Contiene el controlador del formulario, lo que nos da acceso a la informacion del formulario, 
      eventos, estado de validacion, etc.
    Retorna:
    - Este tipo de funciones ueden retornar dos posibles valores:
      - null: Indica que la validacion fue exitosa y no se encontraron errores.
      - Un objeto: Este objeto contiene un mensaje indicando el error de validacion encontrado.
  */
  return (control: AbstractControl) => {
    const field1 = control.get(f1); // Obtenemos el controlador del campo con la hora de entrada
    const field2 = control.get(f2); // Obtenemos el controlador del campo con la hora de salida

    // Sialguno de los identificadores de los campos no existen dentro del formulario enviamos un mensaje error
    if (!field1) return { noFieldFound: { msg: `Field ${f1} not found` } };
    if (!field2) return { noFieldFound: { msg: `Field ${f2} not found` } };

    const time1: string | null = field1.value; // Obtenemos la hora de entrada
    const time2: string | null = field2.value; // Obtenemos la hora de salida

    // Si algunos de los campos contiene un valor nulo enviamos un mensaje de error
    if (!time1) return { nullField: { msg: `Field ${f1} is null` } };
    if (!time2) return { nullField: { msg: `Field ${f2} is null` } };

    /*
      Convertimos los valores de ambos campos a su representacion numerica y verificamos si la hora de entrada
      ocurre al mismo tiempo o despues de la hora de salida
    */
    if (toNumber(time1) >= toNumber(time2)) {
      // Si es el caso entonces enviamos un mensaje de error
      return { times: { msg: `Field ${f2} should be greater than ${f1}` } };
    }

    return null; // Si pasa todas las verificaciones enviamos un null que significa que no hay errores de validacion
  };
};

/*
    Esta es una funcion de tipo ValidationFn, este tipo de funciones pueden ser enviadas como parametro al
    crear un formulario reactivo de Angular y se encargan de validar las entradas del formulario y generar un arreglo
    con los errores de validacion encontrados, entre otras cosas.
    En este caso la funcion valida si la hora ingresada por el usuario cumple con el periodo de tiempo en el que 
    hay clases dentro de la FES Aragon de 07:00 a 22:00.
    Parametros:
    - control: Contiene el controlador del formulario, lo que nos da acceso a la informacion del formulario, 
      eventos, estado de validacion, etc.
    Retorna:
    - Este tipo de funciones ueden retornar dos posibles valores:
      - null: Indica que la validacion fue exitosa y no se encontraron errores.
      - Un objeto: Este objeto contiene un mensaje indicando el error de validacion encontrado.
  */
export const checkTimeInRange = (control: AbstractControl) => {
  const field: string | null = control.value; // Obtenemos la hora ingresada
  // Si contiene un valor nulo entonces enviamos un mensaje indicando el error
  if (!field) return { nullField: { msg: 'Time field is null' } };

  const time = toNumber(field); // Obtenemos su representacion numerica

  // Verificamos si la hora ingresada esta fuera de los limites
  if (time > 22 || time < 7) {
    // Si lo esta entonces enviamos un error indicando el error
    return { notInRange: { msg: 'Time field is not in range' } };
  }

  return null; // Si las validaciones fueron exitosas entonces enviamos null
};
