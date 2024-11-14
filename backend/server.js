import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.route.js'

dotenv.config();

const app = express();

app.use('/api/user/', userRoutes)


app.listen(3000, async () => {
    await connectDB();
    console.log('listning on port 3000');
});