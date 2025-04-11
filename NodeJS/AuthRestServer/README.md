# Auth Rest Server

Se trata de una API Rest la cual expone operaciones CRUD sobre tres colecciones (Usuarios, productos y categorias).
Donde cada uno de los productos esta asociado al usuario que lo creo y a la categoria al que pertenece, mientras que
cada categoria esta realacionada al usuario que la creo. Cada usuario posee un arreglo de roles, email, password,
nombre, avatar (imagen de perfil), etc.

Toda la información recibida por los _endpoints_ es validada con ayuda de la librería Valibot.

Durante la creación de usuarios se verifica que el email no este registrado dentro de la base de datos, se procesa la
contraseña con el algoritmo Bcrypt y se envia un correo de confirmación al email ingresado por el usuario. Dicho
email contiene un enlace que verifica la dirección de correo electronico dentro del sistema. En ambiente de desarrollo
se puede configurar una variable de entorno con el fin de evitar el envio de correos electronicos.

Cada usuario puede iniciar y cerrar sesión, la sesión es gestionada mediante JWT, en cada inicio de sesión se genera
un JWT de sesion con un periodo de vida de aproximadamente 1h y un segundo JWT con un periodo de vida de aproximadamente
1 día, este último no es refrescado por otros _endpoints_ de la aplicación y solo puede ser generado a mediante el
endpoint de inicio de sesión. Cada uno de estos tokens son guardados en las cookies seguras del navegador y son marcadas
como HTTP only para evitar su acceso mediante JS.

Algunos de los endpoints de la aplicación son accesible solo para usuarios autenticados como para la creación de productos
y categorias, otros son de acceso publico y otros son solo accesibles para usuarios con los roles necesarios. El proceso
de autenticación y autorización son realizados mediante el uso de _middlewares_ propios, en el caso del _middleware_ de
autorización permite indicar los roles con acceso al _endpoint_ lo que lo hace muy flexible.

Este proyecto ademas soporta la carga de archivos con el fin de modificar la imagen de perfil de un usuario, se verifica
que el formato y MIME del archivo corresponda al de una imagen y posteriormente se almacena en el servicio de Cloudinary.

Por último, la aplicación se contruyo siguiente el patrón de inyección de dependencias por lo cual cambiar de proveedor de
la base de datos o libreria se vuelve una tarea sencilla.

## Tecnologias Utilizadas

- NodeJS 22.11.0
- NPM 11.1.0
- Bcryptjs 3.0.2
- Cloudinary 2.5.1
- Cookie parser 1.4.7
- Express 4.21.2
- Express file upload 1.5.1
- Express rate limit 7.5.0
- Jsonwebtoken 9.0.2
- Mongoose 8.10.1
- Nodemailer 6.10.0
- Valibot 1.0.0

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

4. Recrear el archivo .env:

```
PORT="PUERTO"
NODE_ENV="AMBIENTE"

MONGO_DB_NAME="DBNAME"
MONGO_USER="user"
MONGO_PASS="123456"
MONGO_URL="mongodb://user:123456@localhost:27017"

SECRET_JWT=""
SECRET_REFRESH=""

MAIL_SECRET=""
MAIL_ADDRESS=""

SERVER_URL=""
SEND_VERIFICATION_EMAIL="false"

CLOUDINARY_API_SECRET=""
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
```

5. Inciar el servidor de desarrollo:

```
// Archivo package.json
"dev": "tsc && node ./dist/app.js"
```
