import { createServer } from "node:http";
import { envs } from "./config/envs";
import { MongoDatabase } from "./database/mongo.database";

import { AppRoutes } from "./presentation/app.routes";
import { Server } from "./presentation/server";
import { createWss } from "./presentation/sockets/sockets.service";

async function main() {
  const { mongoDbName, mongoUrl, port } = envs;
  await MongoDatabase.connect({ mongoDbName, mongoUrl });

  const server = Server();
  const httpServer = createServer(server.app);

  createWss(httpServer, "/ws").start();
  server.setRoutes(AppRoutes.routes());

  httpServer.listen(port, () => console.log(`Listening at http://localhost:${port}`));
}

(async () => {
  main();
})();
