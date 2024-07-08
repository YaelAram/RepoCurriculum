import cors from "cors";
import express from "express";

import { conectToDataBase } from "../database";
import { guessRouter, salesRouter, weatherRouter } from "../routes";

/*
  Esta clase nos permite centralizar todos los procesos de nuestro servidor, aqui lo configuramos, agregamos los routers
  que contienen todos los endpoints, conectamos el server con la base de datos y exponemos un metodo para que el server
  comience a funcionar (el metodo listen)
*/
export class Server {
  /*
    La variable app contiene una instancia de Express (biblioteca) la cual se nos facilita crear y configurar
    nuestro servidor, a esta variable agregamos los routers que definen los endpoints de nuestra API REST, el servicio
    de CORS (habilita que aplicaciones externas realicen peticiones a la API), etc
  */
  private app;
  // La variable PORT indica el puerto en el cual nuestro servidor se monta
  private PORT: number;
  // Establece parte del path para los endpoints de ventas (router de ventas)
  private salesPath: string = "/api/sales";
  // Establece parte del path para los endpoints de sugerir (router del modelo de inferencia)
  private guessPath: string = "/api/guess";
  // Establece parte del path para los endpoints de clima (router de clima)
  private weatherPath: string = "/api/weather";

  constructor() {
    // Crea una nueva instancia de una aplicación de Express
    this.app = express();
    // Lee las variables de entorno en busca de un puerto, en caso de no haberlo inicia por defecto en el puerto 8080
    this.PORT = Number(process.env.PORT ?? "8080");

    // Conecta el servidor con la base de datos
    this.conectDB();
    // Agrega los middlewares (plugins) a nuestro servidor
    this.middlewares();
    // Agrega las rutas de endpoints a nuestro servidor
    this.routes();
  }

  // Este metodo manda a llamar la función que establece la conexión entre la base de datos y el servidor
  private async conectDB() {
    conectToDataBase();
  }

  // Agrega algunas funcionalidades a nuestro servidor (similares a un plugin en un navegador)
  private middlewares(): void {
    // Configuramos el uso de CORS en nuestro servidor
    this.app.use(cors());

    /*
      Configuramos el convertidor a JSON, este se encarga de automatizar el proceso de convertir la información
      de un formato binario a formato JSON, formato facil de usar en JavaScript
    */
    this.app.use(express.json());
  }

  // Agrega las rutas de endpoints a nuestro servidor
  private routes(): void {
    // Agregamos el router con los endpoints de ventas a nuestro servidor Express
    this.app.use(this.salesPath, salesRouter);
    // Agregamos el router con los endpoints de sugerir (modelo de inferencia) a nuestro servidor Express
    this.app.use(this.guessPath, guessRouter);
    // Agregamos el router con los endpoints de clima a nuestro servidor Express
    this.app.use(this.weatherPath, weatherRouter);
  }

  // Este metodo pone en funcionamiento nuestro servidor Express
  public listen(): void {
    // Ejecuta nuestro servidor e imprime el puerto en el cual esta montado
    this.app.listen(this.PORT, () =>
      console.log(`Listening at port ${this.PORT}`)
    );
  }
}
