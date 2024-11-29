# Socket Queue

Esta aplicación pretende simular el funcionamiento de una pantalla de turnos en un banco. Se cuentan con dos páginas
HTML una encargada de agregar y eliminar tickets de la fila (para los empleados del banco) y otra que muestra el ticket
actual (para los usuarios del banco).

Para la comunicación entre el servidor y las páginas HTML se utilizaron sockets, lo que nos permite actualizar el
estado de las pantallas en tiempo real.

## Tecnologias Utilizadas

- NodeJS 20.15.0
- NPM 10.8.0
- Cors 2.8.5
- Dotenv 16.0.1
- Express 4.18.1
- Socket.IO 4.5.1

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

4. Iniciar el servidor de desarrollo

```
npm run start
```
