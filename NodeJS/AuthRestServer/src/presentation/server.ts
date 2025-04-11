import express, { type Router } from "express";

import compression from "compression";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

interface ServerOptions {
  port: number;
  publicDirectory: string;
  routes: Router;
}

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly publicDirectory: string;
  private readonly routes: Router;
  private serverListener?: any;

  constructor({ port, publicDirectory, routes }: ServerOptions) {
    this.port = port;
    this.publicDirectory = publicDirectory;
    this.routes = routes;
    // Middlewares
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());
    this.app.use(express.static(this.publicDirectory));
    this.app.use(fileUpload({ useTempFiles: true }));

    // Routes
    this.app.use(this.routes);
  }

  get serverApp() {
    return this.app;
  }

  async start() {
    this.serverListener = this.app.listen(this.port, () =>
      console.log(`Listening at http://localhost:${this.port}`),
    );
  }

  stop() {
    this.serverListener?.close();
  }
}
