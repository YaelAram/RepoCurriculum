import { Schema, model } from "mongoose";
import type { ITicket } from "../../types/tickets.types";

const ticketSchema = new Schema<ITicket>({
  ticketNumber: {
    type: String,
    required: [true, "Ticket number is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  handleAtDesk: {
    type: String,
    default: "",
  },
  handleAt: {
    type: Date,
  },
});

ticketSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  // biome-ignore lint/complexity/useArrowFunction: <explanation>
  transform: function (_, ret, options) {
    ret._id = undefined;
  },
});

export const TicketModel = model<ITicket>("Ticket", ticketSchema);
