# Pokemon SSR SSG

Esta aplicación se encarga de mostrar los primeros 400 pokemon de forma paginada (20 pokemon en cada página) donde
cada _card_ muestra el nombre y una imagen del pokemon. Si el usuario hace click sobre alguna de las _cards_ esta lo
redirigen a un pestaña que muestra la misma información y el sonido que este hace ese pokemon.

Esta aplicación tiene soporte para SSR (sin las caracteristicas experimentales introducidas en Angular 19), ademas
se creo un _script_ que permite al desarrollador generar el archivo _routes.txt_ el cual se utiliza para indicarle a
Angular que páginas de nuestra aplicación queremos prerenderizar. Dicho _script_ le permite al desarrollador indicar
el número de páginas del indice de pokemon y el número de páginas de pokemon que desea prerenderizar.

## Tecnologias Utilizadas

- Angular 19.0.0
- NodeJS 22.11.0
- NPM 11.0.0

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

7. Contruir la version de produccion del proyecto utilizando el _script_ que genera el archivo _routes.txt_ con las rutas
   a prerenderizar.

```
ng build:ssg
```

8. Ejecutar el servidor de la _build_ de producción

```
npm run serve:ssr:pokemon
```
