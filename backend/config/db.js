import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO);
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

