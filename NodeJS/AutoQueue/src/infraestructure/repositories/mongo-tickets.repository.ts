import { TicketModel } from "../../database/models/ticket.model";
import { CustomHttpError } from "../../domain/models/custom-error";
import type { ITicket, TicketCreate, TicketsRepository } from "../../types/tickets.types";

export class MongoTicketsRepositories implements TicketsRepository {
  getTickets = async (): Promise<ITicket[]> => {
    try {
      const tickets = await TicketModel.find();
      return tickets;
    } catch (error: any) {
      throw this.#handleError(error, "Error getting all tickets");
    }
  };

  getTicketsByCompletedStatus = async (completed: boolean): Promise<ITicket[]> => {
    try {
      const tickets = await TicketModel.find({ completed, handleAtDesk: "" });
      return tickets;
    } catch (error: any) {
      const status = completed ? "completed" : "uncompleted";
      throw this.#handleError(error, `Error getting all ${status} tickets`);
    }
  };

  getLastTicket = async (): Promise<ITicket | null> => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0);

      const [ticket] = await TicketModel.find({ createdAt: { $gte: today } })
        .sort({ createdAt: -1 })
        .limit(1);
      if (!ticket) null;

      return ticket;
    } catch (error: any) {
      throw this.#handleError(error, "Error getting last ticket created");
    }
  };

  getWorkingOnTickets = async (): Promise<ITicket[]> => {
    try {
      const tickets = await TicketModel.find({ completed: false, handleAtDesk: { $ne: "" } });
      return tickets;
    } catch (error: any) {
      throw this.#handleError(error, "Error getting working on tickets");
    }
  };

  createTicket = async (ticket: TicketCreate): Promise<ITicket> => {
    try {
      const newTicket = await TicketModel.create(ticket);
      return newTicket;
    } catch (error: any) {
      throw this.#handleError(error, `Error creating ticket: ${ticket.ticketNumber}`);
    }
  };

  assignTicketToDesk = async (desk: string): Promise<ITicket> => {
    try {
      const workingOnTickets = await this.getWorkingOnTickets();
      if (workingOnTickets.length >= 4) {
        throw CustomHttpError.BadRequest("Maximum working on tickets reached (4)");
      }

      const [mongoTicket] = await TicketModel.find({ completed: false, handleAtDesk: "" })
        .sort({ createdAt: 1 })
        .limit(1);
      if (!mongoTicket) throw CustomHttpError.BadRequest("No pending tickets");

      mongoTicket.handleAtDesk = desk;
      await mongoTicket.save();

      return mongoTicket;
    } catch (error: any) {
      throw this.#handleError(error, `Error assigning ticket to ${desk}`);
    }
  };

  completeTicket = async (id: string): Promise<ITicket> => {
    try {
      const mongoTicket = await TicketModel.findById(id);
      if (!mongoTicket) throw CustomHttpError.NotFound(`Ticket with ID ${id} not found`);

      mongoTicket.completed = true;
      mongoTicket.handleAt = new Date();
      await mongoTicket.save();

      return mongoTicket;
    } catch (error: any) {
      throw this.#handleError(error, `Error marking as complete ticket: ${id}`);
    }
  };

  #handleError = (error: any, serverErrorMessage: string): CustomHttpError => {
    console.error(`AuthService [ERROR]: ${error.message}`);

    if (error instanceof CustomHttpError) return error;
    if (error.name === "MongoNetworkError")
      return CustomHttpError.ServerError("Not connected to DB");

    return CustomHttpError.ServerError(serverErrorMessage);
  };
}
