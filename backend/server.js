import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.route.js'

dotenv.config();

const app = express();
const port = process.env.PORT;

// allow express to parse body
app.use(express.json());

// endpoints
app.use('/api/user/', userRoutes)


app.listen(port, async () => {
    
    try{

        console.log("Establishing conection to MongoDB...");
        await connectDB();

    } catch (err) {
        console.error(err.message);
    }

    console.log(`\nServer successfully started. Listning on http://localhost:${port}`);
});