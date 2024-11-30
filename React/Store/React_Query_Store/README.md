# React Query Store

Esta aplicación se trata de una tienda de productos online, consume los servicios de la API REST que se encuentra en
la carpeta Store_API. Esta aplicación nos permite consultar los productos, conultar por ID, eliminar, actualizar y crear
productos.

Para el consumo de la API REST se utilizo la libreria de Tankstack Query, la cual nos permite tener un store y facilita
la realización de consultas HTTP en ReactJS. Tambien se utilizo la libreria de componentes de NextUI con el fin de tener
un diseño elegante sin la necesidad de tener que escribir demasiado código CSS.

Ademas se utilizo React Hook Form para facilitar el manejor del formulario para crear un nuevo producto y React Hot Toast
para el despliegue de mensajes de alerta al usuario.

Por último, se utilizo React Router DOM para el _rounting_ de la aplicación.

## Tecnologias Utilizadas

- NodeJS 18
- Axios 1.5.1
- React Query 4.36.1
- NextUI 2.0.5
- React 18.2.0
- React Hook Form 7.47.0
- React Hot Toast 2.4.1
- React Router DOM 6.14.2

## ¿Comó utilizar el proyecto?

1. Clonar el repositorio

```
git clone https://github.com/YaelAram/RepoCurriculum.git
```

2. Navegar a la carpeta del proyecto
3. Instalar las dependencias de Node

```
yarn
```

4. Iniciar el servidor de pruebas

```
yarn dev
```

5. Generar la _build_ de producción

```
yarn build
```
