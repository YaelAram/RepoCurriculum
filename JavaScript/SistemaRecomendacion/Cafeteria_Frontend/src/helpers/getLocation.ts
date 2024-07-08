import { coords, showDialog } from "../context";

/*
  Esta funcion es llamada siempre y cuando el proceso de localizacion haya tenido exito, como parametro recibe
  un objeto tipo GeolocationPosition el cual contiene la latitud y longitud del usuario
*/
const success = (position: GeolocationPosition) => {
  // Obtenemos la latitud y longitud
  const { latitude, longitude } = position.coords;

  // Actualizamos el estado global con la nueva informacion de localizacion
  coords.updateState({ lat: latitude, lon: longitude });
};

/*
  Esta funcion se ejecuta cuando el proceso de localizacion no tuvo exito, es decir, si el usuario no permitio
  obtener su localizacion, si el proceso tardo demasiado o si ocurrio algun error, como parametro recibe un objeto
  tipo GeolocationPositionError que contiene un mensaje indicando el tipo de error
*/
const error = ({ message }: GeolocationPositionError) => {
  // Abrimos una ventana de notificacion para indicar al usuario que no se pudo obtener su localizacion
  showDialog("Error", message);
};

// Esta funcion comienza con el proceso de obtener la localizacion del cliente
export const getLocation = () => {
  // Si el navegador no cuenta con el servicio de localizacion se mostrara al usuario un mensaje indicandole esto
  if (!navigator.geolocation) {
    showDialog("Lo sentimos", "El servicio geolocalizacion no disponible");
  }

  // Comenzamos el proceso de localizacion del cliente, enviando las funciones de exito (success) y error
  navigator.geolocation.getCurrentPosition(success, error);
};
