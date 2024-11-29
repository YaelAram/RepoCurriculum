# Maps App

Esta aplicación utilizando los servicios de Mapbox despliega un mapa interactivo similar al de Google Maps, ademas
permite al usuario hacer zoom y desplazarse por el mapa arrastrando el mapa. El usuario puede guardar ubicaciones
las cuales son guardadas en el _local storage_, estas son mostradas en un menú lateral que muestra el nombre de la
ubicación, un boton para eliminarla y si es usuario hace click sobre un elemento traslada el mapa a la ubicación.

Se utiliza la API de geolocalización del navegador para obtener la ubicación actual del usuario y establecerla como
la ubicación inicial. Y el servicio de geolocalización inversa de Mapbox para obtener el nombre del lugar segun las
coordenadas enviadas.

## Tecnologias Utilizadas

- Angular 18.1.0
- RxJS 7.8.0
- TypeScript 5.5.2
- NodeJS 20.15.1
- NPM 10.8.1
- Mapbox GL 3.5.2

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

4. En la carpeta _environments_ se debe crear un archivo con el mismo nombre y el siguiente contenido:

```
export const Environments = {
  MAPBOX_KEY: "",
} as const;
```

**Nota: Dentro del _string_ se debe ingresar el token de Mapbox del usuario que descargo el repositorio.**

5. Instalar el Angular CLI

```
npm install -g @angular/cli
```

6. Verificar que el Angular CLI este instalado correctamente

```
ng version
```

7. Ejecutar el servidor de prueba

```
ng serve
```

8. Contruir la version de produccion del proyecto

```
ng build
```
