import express from "express";
import { connectDB } from "./db.js";

const app = express();

app.get('/', (req, res) => {
    res.status(200).json("Sucess!");
});

app.listen(3000, async () => {
    await connectDB();
    console.log("Server started on port 3000.");
});

