import express from "express";
import { Mongoose } from "mongoose";
import { connectDB } from "./config/db.js";
import Launch from "./models/launches.model.js";
import launchRoutes from './routes/launch.route.js'
import userRoutes from './routes/user.route.js'

const app = express();
const PORT = 3001

app.use(express.json());

app.use('/api/launch', launchRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, async () => {
    // await connectDB();
    console.log(`Server started: Http://localhost:${PORT}`);
});

