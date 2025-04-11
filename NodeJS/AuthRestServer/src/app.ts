import { envs } from "./config/envs";
import { MongoDatabase } from "./data/mongo/mongo.database";
import { AppRoutes } from "./presentation/app.routes";
import { Server } from "./presentation/server";

async function main() {
  const { mongoDbName, mongoUrl, port, publicDirectory } = envs;
  await MongoDatabase.connect({ dbName: mongoDbName, mongoUrl: mongoUrl });
  const server = new Server({ port, publicDirectory, routes: AppRoutes.routes() });

  server.start();
}

(async () => {
  main();
})();
