import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO);
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export const sessionStore = new MongoStore({
  mongoUrl: process.env.MONGO,
  collectionName: "sessions",
});
