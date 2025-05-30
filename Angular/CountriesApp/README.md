# Countries App

Esta aplicación permite al usuario buscar paises por nombre, capital o region basandose en el termino de búsqueda 
proporcionado por el usuario. Se hizo uso de la API pública _Rest Countries_ para obtener la siguiente información
de los paises: Bandera, nombre, ciudad capital, población, monedas locales, idiomas oficiales y las coordenadas del
país.

La información es mostrada al usuario en forma de una tabla, se utilizo el formato SVG de la bandera proporcionada
por la API y se carga de forma perezosa (_lazy loading_) y las coordenadas son utilizadas para construir un link a 
Google Maps con la ubicación del país.

El diseño de la página es responsive por lo cual puede ser visualizada en dispositivos moviles y PC.

Por último, la aplicación se contruyo en Angular 19 con el soporte experimental para zoneless y utilizando el modelo
de reactividad basado en _signals_ y la API experimental rxResource para el manejo de las peticiones HTTP.

Esta aplicación consta de tres rutas:

- La ruta "/by-capital": En esta ruta permite al usuario buscar un pais según su capital.
- La ruta "/by-country": En esta ruta permite al usuario buscar un pais según su nombre.
- La ruta "/by-region": En esta ruta permite al usuario buscar un pais según la region (continente) a la que 
  pertenece. A diferencia de las otras rutas esta ruta no muestra un campo de busqueda, propociona en su lugar
  un menú desplegable con todas las regiones disponibles.

**Nota: Para la busqueda de paises, la barra de busqueda tiene un _debounce_ para reducir el número de peticiones
al servidor.**

## Tecnologias Utilizadas

- Angular 19.1.5
- TypeScript 5.6.3
- NodeJS 22.11.0
- NPM 11.4.1

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
