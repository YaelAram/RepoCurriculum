import compression from "compression";
import express, { type Router } from "express";

export const Server = () => {
  const app = express();

  // Middlewares
  app.use(express.json());
  app.use(compression());
  app.use(express.static("public"));

  const setRoutes = (router: Router) => app.use(router);

  return { app, setRoutes };
};
