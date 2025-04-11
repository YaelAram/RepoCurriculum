import { Router } from "express";

import { MongoTicketsRepositories } from "../../infraestructure/repositories/mongo-tickets.repository";
import { SocketsService } from "../sockets/sockets.service";
import { TicketsController } from "./tickets.controller";
import { TicketsService } from "./tickets.service";

const routes = () => {
  const router = Router();

  if (!SocketsService) throw new Error("Socket Service is not defined");

  const ticketsRepository = new MongoTicketsRepositories();
  const ticketsService = new TicketsService(ticketsRepository, SocketsService);
  const controller = new TicketsController(ticketsService);

  router.get("/", controller.getTickets); // Get all tickets
  router.get("/last", controller.getLastTicket); // Get last ticket
  router.get("/pending", controller.getPendingTickets); // Get all not completed tickets
  router.get("/working-on", controller.getWorkingOnTickets); // Get all working on tickets

  router.post("/", controller.createTicket); // Create a new ticket

  router.patch("/get/:desk", controller.assignTicket); // Assign ticket to desk
  router.patch("/complete/:id", controller.completeTicket); // Mark as complete a ticket

  return router;
};

export const TicketsRoutes = { routes };
