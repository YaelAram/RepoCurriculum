import type { Request, Response } from "express";
import { DeskDto } from "../../domain/dtos/desk.dto";
import { MongoIdDto } from "../../domain/dtos/mongoId.dto";
import { TicketDto } from "../../domain/dtos/tickets.dto";
import type { CustomHttpError } from "../../domain/models/custom-error";
import type { TicketsService } from "./tickets.service";

export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  getTickets = (req: Request, res: Response) => {
    this.ticketsService
      .getAllTickets()
      .then((tickets) => res.status(200).json({ tickets }))
      .catch((error: CustomHttpError) => res.status(error.httpCode).json(error.getJson()));
  };

  getLastTicket = (req: Request, res: Response) => {
    this.ticketsService
      .getLastTicket()
      .then((ticket) => res.status(200).json({ ticket }))
      .catch((error: CustomHttpError) => res.status(error.httpCode).json(error.getJson()));
  };

  getPendingTickets = (req: Request, res: Response) => {
    this.ticketsService
      .getTicketsByCompleteStatus(false)
      .then((tickets) => res.status(200).json({ tickets }))
      .catch((error: CustomHttpError) => res.status(error.httpCode).json(error.getJson()));
  };

  getWorkingOnTickets = (req: Request, res: Response) => {
    this.ticketsService
      .getWorkingOnTickets()
      .then((tickets) => res.status(200).json({ tickets }))
      .catch((error: CustomHttpError) => res.status(error.httpCode).json(error.getJson()));
  };

  createTicket = (req: Request, res: Response) => {
    const result = TicketDto.create(req.body);
    if (!result.ok) return res.status(400).json({ issues: result.issue });

    this.ticketsService
      .createTicket(result.ticket)
      .then((ticket) => res.status(200).json({ ticket }))
      .catch((error: CustomHttpError) => res.status(error.httpCode).json(error.getJson()));
  };

  assignTicket = (req: Request, res: Response) => {
    const result = DeskDto.create(req.params);
    if (!result.ok) return res.status(400).json({ issues: result.issue });

    this.ticketsService
      .assignTicket(result.desk)
      .then((ticket) => res.status(200).json({ ticket }))
      .catch((error: CustomHttpError) => res.status(error.httpCode).json(error.getJson()));
  };

  completeTicket = (req: Request, res: Response) => {
    const result = MongoIdDto.create(req.params);
    if (!result.ok) return res.status(400).json({ issue: result.issue });

    this.ticketsService
      .completeTicket(result.id)
      .then((ticket) => res.status(200).json({ ticket }))
      .catch((error: CustomHttpError) => res.status(error.httpCode).json(error.getJson()));
  };
}
