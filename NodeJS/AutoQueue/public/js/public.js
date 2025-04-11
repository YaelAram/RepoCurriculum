const ticketLabels = document.querySelectorAll(".ticket");

const updateTicketLabels = (tickets) => {
  if (!ticketLabels || ticketLabels.length !== 4) return;
  if (!tickets || !Array.isArray(tickets)) return;

  tickets.reverse();

  for (let index = 0; index < tickets.length; index++) {
    const ticketLabel = ticketLabels.item(index);

    ticketLabel.firstElementChild.innerText = `Ticket ${tickets[index].ticketNumber}`;
    ticketLabel.lastElementChild.innerText = tickets[index].handleAtDesk;
  }
};

const getWorkingOnTickets = async () => {
  if (!ticketLabels || ticketLabels.length !== 4) return;

  const resp = await fetch("http://localhost:8080/api/tickets/working-on");
  const data = await resp.json();

  if (!resp.ok) {
    console.error(data);
    return;
  }

  const tickets = data.tickets;
  updateTicketLabels(tickets);
};

getWorkingOnTickets();

const connectToWebSockets = () => {
  const socket = new WebSocket("ws://localhost:8080/ws");

  socket.onopen = () => console.log("Connected to Socket Server");

  socket.onclose = () => {
    console.log("Disconnected to Socket Server");
    setTimeout(() => {
      console.log("Trying to reconnect to Socket Server");
      connectToWebSockets();
    }, 1500);
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "ticket-working-on-change") {
      updateTicketLabels(data.tickets);
    }
  };
};

connectToWebSockets();
