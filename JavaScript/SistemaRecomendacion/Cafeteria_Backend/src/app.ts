/*
  ## Tecnologias Utilizadas

  - NodeJS 18.14.0 (Entorno de ejecución de JavaScript)
  - YARN 1.22.19 (Manejador de paquetes de JavaScript)
  - TypeScript 5.0.2 (Super set de JavaScript)
  - CORS 2.8.5 (Da acceso a sitios externos para realizar peticiones a la API)
  - DOTENV 16.3.1 (Permite leer variables de entorno localizadas en el archivo .env)
  - EXPRESS 4.18.2 (Facilita la construcción de una API REST)
  - MONGOOSE 7.4.5 (ORM que facilita la construcción de queries a la base de datos MongoDB)
  - Visual Studio Code 1.82.2 (Editor de código utilizado)
*/

import dotenv from "dotenv";
import { Server } from "./model/server";

// Inicializa la biblioteca CORS la cual lee las variables de entorno del archivo .env
dotenv.config();

// Creamos una nueva instancia de nuestro Server
const server = new Server();

// Ponemos a escuchar (recibir peticiones) la instancia de nuestro server
server.listen();
