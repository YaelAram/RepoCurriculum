import type { TicketCreate } from "../../types/tickets.types";

type CreateTicketDtoResult = { ok: false; issue: string } | { ok: true; ticket: TicketCreate };

const create = (body: { [key: string]: any }): CreateTicketDtoResult => {
  const { ticketNumber } = body;

  if (typeof ticketNumber !== "string") {
    return { ok: false, issue: "Ticket number must be a string" };
  }
  if (!ticketNumber) return { ok: false, issue: "Ticket number must be a non empty string" };

  return { ok: true, ticket: { ticketNumber } };
};

export const TicketDto = { create };
