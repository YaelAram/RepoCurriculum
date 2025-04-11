import { Router } from "express";
import { TicketsRoutes } from "./tickets/tickets.routes";

const routes = () => {
  const router = Router();
  router.use("/api/tickets", TicketsRoutes.routes());

  return router;
};

export const AppRoutes = { routes };
