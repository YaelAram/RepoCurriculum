const lastTicketLabel = document.querySelector("span");
let lastTicketNumber = null;

const getLastTicket = async () => {
  if (!lastTicketLabel) {
    console.error("Last ticket label is not defined");
    return;
  }

  const resp = await fetch("http://localhost:8080/api/tickets/last");
  const data = await resp.json();

  if (!resp.ok) {
    console.error(data);
    lastTicketLabel.innerText = "Error getting last ticket info";
    return;
  }

  const { ticket } = data;

  if (!ticket) lastTicketNumber = 0;
  else lastTicketNumber = Number(ticket.ticketNumber);

  lastTicketLabel.innerText = `Ticket ${lastTicketNumber}`;
};

getLastTicket();

const generateNewTicket = async () => {
  if (lastTicketNumber === null) {
    lastTicketLabel.innerText = "Unable to create a new ticket";
    return;
  }

  lastTicketNumber += 1;

  const resp = await fetch("http://localhost:8080/api/tickets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ticketNumber: `${lastTicketNumber}` }),
  });
  const data = await resp.json();

  if (!resp.ok) {
    console.error(data);
    lastTicketLabel.innerText = "Error creating new ticket";
    return;
  }

  lastTicketLabel.innerText = `Ticket ${lastTicketNumber}`;
};

document.querySelector("button").addEventListener("click", generateNewTicket);
