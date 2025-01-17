import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import logger from "../utils/logger.js";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    logger.info(`MongoDB connected!! DB Host: ${connect.connection.host}`);
  } catch (error) {
    logger.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
