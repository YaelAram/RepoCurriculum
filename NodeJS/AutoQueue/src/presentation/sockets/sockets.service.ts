import type { IncomingMessage, Server } from "node:http";
import WebSocket, { WebSocketServer } from "ws";

export interface ISocketsService {
  wss: WebSocket.Server<typeof WebSocket, typeof IncomingMessage>;
  broadcast: (message: string) => void;
}

export let SocketsService: ISocketsService | null = null;

export const createWss = (server: Server, path: string) => {
  const wss = new WebSocketServer({ server, path });

  const start = () => {
    wss.on("connection", (ws: WebSocket) => {
      console.log("New client connected");
      ws.on("close", () => console.log("Client disconnected"));
    });
  };

  const broadcast = (message: string) => {
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) client.send(message);
    }
  };

  SocketsService = { wss, broadcast };
  return { start };
};
