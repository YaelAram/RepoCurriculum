import type { Document } from "mongoose";

export interface ITicket extends Document {
  ticketNumber: string;
  createdAt: Date;
  completed: boolean;
  handleAtDesk: string;
  handleAt?: Date;
}

export type TicketCreate = Pick<ITicket, "ticketNumber">;

export interface TicketsRepository {
  getTickets: () => Promise<ITicket[]>;
  getTicketsByCompletedStatus: (completed: boolean) => Promise<ITicket[]>;
  getLastTicket: () => Promise<ITicket | null>;
  getWorkingOnTickets: () => Promise<ITicket[]>;
  createTicket: (ticket: TicketCreate) => Promise<ITicket>;
  assignTicketToDesk: (desk: string) => Promise<ITicket>;
  completeTicket: (id: string) => Promise<ITicket>;
}
