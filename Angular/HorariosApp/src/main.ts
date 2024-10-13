import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

/*
  Proyecto Inteligencia Artificial
  Profesor Romero Ugalde Martin

  Integrantes:
  - Castillo Sanchez Yael Aram
  - Cruz Ramirez Joshua Rene
  - Quijano Cabello Axel

  Tecnologias utilizadas:
  - Angular 18.1.0: Es un framework de desarrollo frontend que utilizamos para crear una SPA, con una SPA logramos
    servir una aplicacion web sin la necesidad de tener un servidor dedicado a responder a cada ruta de la aplicacion.
  - TypeScript 5.5.2: Es el lenguaje de programacion oficial para Angular, se trata de un lenguaje que envuelve 
    JavaScript para otorgarle entre otras cosas tipado estatico.
  - Just Cartesian Product 4.2.0: Se trata de una dependencia que contiene unicamente una funcion la cual utilizamos
    para realizar un producto cartesiano entre los arreglos con las materias seleccionadas por el usuario.
  - RxJS 7.8.0: Es una libreria que nos permite a traves de Observables crear controles de flujo y reaccionar
    a cambios de estado.
  - NodeJS 21.15.1: Es el runtime de JavaScript que nos permite ejecutar un servidor de prueba, ejecutar comandos
    del Angular CLI, etc.
  - NPM 10.8.2: Es un manejador de paquetes que nos permite descargar, intalar  gestionar las librerias que incluimos
    en el proyecto.

  Editor de codigo utilizado:
  - Visual Studio Code 1.93.1: Es el editor de codigo que se utilizo para programar el proyecto, este nos permite
    instalar facilmente plugins para agregar compatibilidad con Angular, ayudarnos con el autocompletado de codigo,
    etc.
*/

// Este archivo es el punto de entrada de la aplicacion de Angular
platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true,
  })
  .catch((err) => console.error(err));
