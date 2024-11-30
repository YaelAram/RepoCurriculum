# Fake Api Store

Esta aplicación contiene lo necesario para levantar un servidor de desarrollo el cual expone una API REST generada
por la librearia JSON-SERVER, dicha API nos sirve para probar el funcionamiento de nuestra aplicación de ReactJS.

Esta API expone los endpoints necesarios para poder crear, editar y eliminar productos, asi como realizar consultas
paginas y consultar por ID de producto. La información es almacenada de forma persistente en un archivo JSON.

Un producto de la base de datos se ve como el siguiente:

```
{
  "id": 20,
  "title": "DANVOUY Womens T Shirt Casual Cotton Short",
  "price": 12.99,
  "description": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve",
  "category": "women's clothing",
  "image": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
  "rating": {
    "rate": 3.6,
    "count": 145
  }
}
```

## Tecnologias Utilizadas

- NodeJS 18
- JsonServe 0.17.3
- Yarn 1.22.21

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

4. Ejecutar el servidor de pruebas

```
yarn start
```
