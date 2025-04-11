import mongoose from "mongoose";

interface ConnectionOptions {
  mongoDbName: string;
  mongoUrl: string;
}

const connect = async ({ mongoDbName, mongoUrl }: ConnectionOptions) => {
  try {
    await mongoose.connect(mongoUrl, { dbName: mongoDbName });
    console.log("Connected to database");

    return true;
  } catch (error: any) {
    console.error(`Could not connect to ${mongoUrl}/${mongoDbName}: ${error.message}`);
    return false;
  }
};

export const MongoDatabase = { connect };
