import type { ITicket, TicketCreate, TicketsRepository } from "../../types/tickets.types";
import type { ISocketsService } from "../sockets/sockets.service";

export class TicketsService {
  constructor(
    private readonly ticketsRepository: TicketsRepository,
    private readonly socketsService: ISocketsService,
  ) {}

  getAllTickets(): Promise<ITicket[]> {
    return this.ticketsRepository.getTickets();
  }

  getTicketsByCompleteStatus(completed: boolean): Promise<ITicket[]> {
    return this.ticketsRepository.getTicketsByCompletedStatus(completed);
  }

  getLastTicket(): Promise<ITicket | null> {
    return this.ticketsRepository.getLastTicket();
  }

  getWorkingOnTickets(): Promise<ITicket[]> {
    return this.ticketsRepository.getWorkingOnTickets();
  }

  async createTicket(ticket: TicketCreate): Promise<ITicket> {
    const mongoTicket = await this.ticketsRepository.createTicket(ticket);
    await this.#notifyPendingTicketsChange();

    return mongoTicket;
  }

  async assignTicket(desk: string): Promise<ITicket> {
    const ticket = await this.ticketsRepository.assignTicketToDesk(desk);
    await this.#notifyWorkingOnTicketsChange();
    await this.#notifyPendingTicketsChange();

    return ticket;
  }

  completeTicket(id: string): Promise<ITicket> {
    return this.ticketsRepository.completeTicket(id);
  }

  async #notifyPendingTicketsChange() {
    const tickets = await this.ticketsRepository.getTicketsByCompletedStatus(false);
    const data = JSON.stringify({
      type: "ticket-pending-count-change",
      numberOfPendingTickets: tickets.length,
    });

    this.socketsService.broadcast(data);
  }

  async #notifyWorkingOnTicketsChange() {
    const tickets = await this.ticketsRepository.getWorkingOnTickets();
    const data = JSON.stringify({
      type: "ticket-working-on-change",
      tickets,
    });

    this.socketsService.broadcast(data);
  }
}
