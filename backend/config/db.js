import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDB = async () => {
    const mongoDB = process.env.MONGO_URI;
    try{
        console.log("attempting to connect to MongoDB...")
        const conn = await mongoose.connect(mongoDB);
        console.log(`DB sucessfully connected: ${conn.connection.host}`)

    } catch (error) {
        console.log(`Unable to connect to DB: ${error}`);
        process.exit(1);
    }
};