let deskName = null;

const initDeskName = () => {
  const params = new URL(window.location).searchParams;
  const deskNameLabel = document.querySelector("h1");

  if (!deskNameLabel) return;

  deskName = params.get("escritorio");
  deskNameLabel.innerText = deskName;
};

initDeskName();

const pendingTicketsLabel = document.querySelector("h2");
const zeroPendingTicketsLabel = document.querySelector(".alert");
const requestTicketBtn = document.querySelector(".btn-primary");

const showPendingTickets = (tickets) => {
  if (!pendingTicketsLabel || !zeroPendingTicketsLabel || !requestTicketBtn) return;

  if (tickets) {
    pendingTicketsLabel.innerText = `${tickets}`;
    pendingTicketsLabel.classList.remove("hide");
    zeroPendingTicketsLabel.classList.add("hide");
    requestTicketBtn.disabled = false;
  } else {
    pendingTicketsLabel.classList.add("hide");
    zeroPendingTicketsLabel.classList.remove("hide");
    requestTicketBtn.disabled = true;
  }
};

const getPendingTicketsNumber = async () => {
  const resp = await fetch("http://localhost:8080/api/tickets/pending");
  const data = await resp.json();

  if (!resp.ok) {
    console.error(data);
    pendingTicketsLabel.innerText = "Error getting pending tickets";
    return;
  }

  const { tickets } = data;
  if (!tickets || !Array.isArray(tickets)) return;

  showPendingTickets(tickets.length);
};

getPendingTicketsNumber();

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
    if (data.type === "ticket-pending-count-change") {
      showPendingTickets(data.numberOfPendingTickets);
    }
  };
};

connectToWebSockets();

const ticketLabel = document.querySelector("small");
const finishTicketBtn = document.querySelector(".btn-success");
let ticketId = null;

const attendingTicket = (isAttending) => {
  requestTicketBtn.disabled = isAttending;
  finishTicketBtn.disabled = !isAttending;
};

const requestNewTicket = async () => {
  if (!ticketLabel) return;

  const resp = await fetch(
    `http://localhost:8080/api/tickets/get/${deskName.replaceAll(" ", "%20")}`,
    { method: "PATCH" },
  );
  const data = await resp.json();

  if (!resp.ok) {
    console.error(data);
    return;
  }

  ticketId = data.ticket.id;
  ticketLabel.innerText = ` ticket ${data.ticket.ticketNumber}`;
  attendingTicket(true);
};

requestTicketBtn?.addEventListener("click", requestNewTicket);

const finishTicket = async () => {
  if (ticketId === null) return;

  const resp = await fetch(`http://localhost:8080/api/tickets/complete/${ticketId}`, {
    method: "PATCH",
  });
  const data = await resp.json();

  if (!resp.ok) {
    console.error(data);
    return;
  }

  ticketLabel.innerText = "...";
  attendingTicket(false);
};

finishTicketBtn.addEventListener("click", finishTicket);

const checkAttendingTicket = async () => {
  if (!deskName) return;

  const resp = await fetch("http://localhost:8080/api/tickets/working-on");
  const data = await resp.json();

  if (!resp.ok) {
    console.error(data);
    return;
  }

  const ticket = data.tickets.find((ticket) => ticket.handleAtDesk === deskName);
  if (!ticket) return;

  ticketId = ticket.id;
  ticketLabel.innerText = ` ticket ${ticket.ticketNumber}`;
  attendingTicket(true);
};

checkAttendingTicket();
