import mongoose from "mongoose";

interface ConnectionOptions {
  dbName: string;
  mongoUrl: string;
}

const connect = async ({ dbName, mongoUrl }: ConnectionOptions) => {
  const connectionUrl = `${mongoUrl}/${dbName}`;

  try {
    await mongoose.connect(mongoUrl, { dbName });
    console.log("Connected to database");

    return true;
  } catch (error: any) {
    console.error(`Could not connect to ${connectionUrl}: ${error.message}`);
    return false;
  }
};

export const MongoDatabase = { connect };
