import express from "express";
import { Mongoose } from "mongoose";
import { connectDB } from "./config/db.js";
import Launch from "./models/launches.model.js";
import launchRoutes from './routes/launch.route.js'

const app = express();

app.use(express.json());

app.use('/api/launch', launchRoutes);

app.listen(3000, async () => {
    await connectDB();
    console.log("Server started on port 3000.");
});

