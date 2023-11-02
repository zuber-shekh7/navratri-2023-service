import mongoose from "mongoose";
import dbConfig from "../configs/db.config.js";

const MONGODB_URL = dbConfig.MONGODB_URL;

export const connect = async () => {
  try {
    const database = await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Connected with Database Successfully : ${database.connection.host}`.cyan
        .bold
    );
  } catch (error) {
    console.log(`Failed to connect with Database`.red.bold);
    console.error(error);
    process.exit(1);
  }
};
