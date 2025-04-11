import { get } from "env-var";
process.loadEnvFile();

export const envs = {
	port: get("PORT").required().asPortNumber(),
	mongoUrl: get("MONGO_URL").required().asString(),
	mongoDbName: get("MONGO_DB_NAME").required().asString(),
};
