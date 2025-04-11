# Proyecto Auto Queue

Este proyecto implementa un servidor para una API Rest y conexiones de tipo socket. El servidor Rest fue implementado
utilizando Express mientras que el servidor de sockets utiliza _ws_.

El servidor de Express tiene la tarea de exponer _endpoints_ que permitan realizar operaciones CRUD sobre la base de
datos MongoDB que contiene toda la información relacionada a los tickets generados por la aplicación. Cada ticket
contiene un ID único, un número de ticket, la ventanilla en el que esta siendo atendido, fecha y hora de creación y
la fecha y hora de finalización. Además el servidor de Express se encarga de exponer las paginas HTML con la UI.

Por otro lado, el servidor de sockets se encarga de notificar en tiempo real a las paginas HTML ante ciertos eventos
como la creación de nuevos tickets, actualizar la pantalla de espera, etc.

Ambos servicios se comunican entre si con el fin, el servidor Express tiene acceso al servidor de sockets con el fin
de emitir notificaciones según la operación que realizo. Por ejemplo, cuando un _endpoint_ crea un nuevo ticket este
notifica a los sockets conectados el total de clientes en espera. Cuando una ventanilla finaliza y toma un nuevo ticket
mediante los sockets se actualiza la pantalla que muestra los tickets que estan siendo atendidos y se resta uno al
contador de clientes sin atender.

Las paginas HTML expuestas por el sevidor de Express son:

- Tickets en proceso: Esta pagina muestra los tickets que estan siendo atendidos en ese momento, indicando el número
  del ticket y la ventanilla en la que esta.
- Generador: Permite al usuario generar un nuevo ticket.
- Ventanilla: Permite al usuario observar el total de clientes sin atender, tomar un nuevo ticket y posteriormente
  marcarlo como completado.
- Incio: Es la pagina de inicio de la aplicación permite navegar al resto de paginas.

## Tecnologias Utilizadas

- NodeJS 22.11.0
- NPM 11.1.0
- WS 8.18.1
- Mongoose 8.12.2
- Express 4.21.2

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

4. Recrear el archivo de variables de entorno. Con la información del puerto del servidor y conexión a base de datos.

```
PORT=""

MONGO_DB_NAME=""
MONGO_USER=""
MONGO_PASS=""
MONGO_URL=""
```

5. Ejecutar el servidor de desarrollo.

```
// Comando en el package.json
"dev": "tsc && node ./dist/app.js"
```
