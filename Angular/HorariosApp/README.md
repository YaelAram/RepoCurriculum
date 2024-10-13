# Proyecto para la materia de Inteligencia Artificial: HorariosApp

Este repositorio contiene el proyecto HorariosApp que es una aplicacion de Angular que se encarga de generar horarios
de clases para estudiantes de la Facultad de Estudios Superiores "Aragon" de la carrera de Ingenieria en Computacion
utilizando las materias y grupos seleccionados por el estudiante asi como tomando en cuenta el nivel de preferencia
que el usuario tiene por las materias y grupos, la cantidad de materias optativas, etc.

## Integrantes del equipo

- Castillo Sanchez Yael Aram
- Cruz Ramirez Joshua Rene
- Quijano Cabello Axel

## Tecnologias utilizadas:

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
- NPM 10.8.2: Es un manejador de paquetes que nos permite descargar, intalar gestionar las librerias que incluimos
  en el proyecto.

## ¿Como utilizar el proyecto?

1. Clonar el repositorio

```
git clone https://github.com/YaelAram/Dev.git
```

2. Navegar a la carpeta del proyecto

3. Instalar las dependencias de Node

```
npm i
```

4. Instalar el Angular CLI

```
npm install -g @angular/cli
```

5. Verificar que el Angular CLI este instalado correctamente

```
ng version
```

6. Ejecutar el servidor de prueba

```
ng server
```

## Comando utiles

- Ejecutar el servidor de prueba

```
ng server
```

- Contruir la version de produccion del proyecto

```
ng build
```
