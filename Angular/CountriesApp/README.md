# Countries App

Esta aplicación se encarga de utilizar la API REST publica de Rest Countries para mostrar al usuario
una tabla con todos los paises proporcionados por la API. Muestra algunas caracteristicas relevantes del pais como
su nombre, capital, bandera nacional, etc.

Esta aplicación consta de cuatro rutas principales:

- La ruta "/by-capital": En esta ruta permite al usuario buscar un pais según su capital.
- La ruta "/by-country": En esta ruta permite al usuario buscar un pais según su nombre.
- La ruta "/by-region": En esta ruta permite al usuario buscar un pais según la region (continente) a la
  que pertenece. A diferencia de las otras rutas esta ruta no muestra un campo de busqueda, propociona en su lugar
  un menú desplegable con todas las regiones disponibles.
- La ruta "/by/:id": En esta ruta permite al usuario ver de forma detallada la información de un pais, accede
  a este ruta cuando da click sobre la opción "View more..." en alguna de las pantallas anteriores.

**Nota: Las primeras tres rutas muestran la información en forma de tabla, donde cada renglon muestra la
información de un pais y la opción "View more..." para visualizar la información del pais de forma detallada.**

**Nota: Para la busqueda de paises, la barra de busqueda tiene un _debounce_ para reducir el número de peticiones
al servidor.**

**Nota: La API nos retorna todos aquellos paises que coincidan parcial o totalmente con el termino de busqueda
ingresado por el usuario.**

Adicionalmente la aplicación guarda un registro en el _local storage_ con los últimos terminos de busqueda ingresado por
el usuario.

## Tecnologias Utilizadas

- Angular 17.0.0
- RxJS 7.8.0
- TypeScript 5.2.2
- Bootstrap
- NodeJS 20.10.0
- NPM 10.8.1

## ¿Como utilizar el proyecto?

1. Clonar el repositorio

```
git clone https://github.com/YaelAram/RepoCurriculum.git
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
ng serve
```

7. Contruir la version de produccion del proyecto

```
ng build
```
