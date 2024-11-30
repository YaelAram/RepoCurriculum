# REST Server

Contiene el código fuente de una API REST que permite al usuario interactuar con varios tipos de colecciones,
por ejemplo, una lista de usuarios, productos y categorias sobre las cuales podra realizar consultas paginadas,
consultas por ID, crear, actualizar y eliminar elementos.

Este server almacena la información en una base de datos alojada en Mongo Atlas.

Tambien es capaz de soportar la carga de imagenes y subirlas a un servicio externo (Cloudinary), a su vez permite
editar la imagen de un producto o eliminar la imagen en caso de que el registro de producto sea eliminado.

Para la creación de nuevo usuario se ofrecen dos alternativas, la primera permite al usuario hacer uso de la autenticación
de Google y la segunda es mediante un correo electronico y contraseña. Las contraseñas de usuario son procesadas por el
algoritmo Bcrypt y se les añade un salt antes de ser alamcenadas en la base de datos.

Todos los endpoints de la aplicación pasan por un proceso de validación de parámetros y _body_ de la petición.

Por último, esta aplicación cuenta con endpoints de autenticación, los cuales son capaces de generar y verificar la
validez de un JWT (Json Web Token).

## Tecnologias Utilizadas

- NodeJS 20.15.0
- NPM 10.8.0
- Bcrypt 2.4.3
- Cloudinary 1.30.0
- Cors 2.8.5
- Dotenv 16.0.0
- Express 4.17.3
- Express-fileupload 1.4.0
- Express-validator 6.14.0
- Google-auth-library 8.1.0
- Jsonwebtoken 8.5.1
- Mongoose 6.2.7
- Uuid 8.3.2

## ¿Comó utilizar la aplicación?

1. Clonar el repositorio

```
git clone https://github.com/YaelAram/RepoCurriculum.git
```

2. Navegar a la carpeta del proyecto
3. Instalar las dependencias de Node

```
npm i
```

4. Reconstruir el archivo .env con la siguiente estructura:

```
MongoDB_Atlas=""
CLOUDINARY_URL=""
```

5. Iniciar el servidor de desarrollo

```
npm run start
```
