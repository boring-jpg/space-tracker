import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import { connectDB, sessionStore } from './config/db.js';
import authRoutes from './routes/auth.route.js'

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 24 hours
        }
    })
);

// allow express to parse body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// endpoints
app.use('/api/auth/', authRoutes);

// error handling
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        success: false,
        message: "unexpected error has occured"
    });

    next();
});

app.listen(port, async () => {
    
    try{

        console.log("Establishing conection to MongoDB...");
        await connectDB();

    } catch (err) {

        console.error(err.message);

    };

    console.log(`\nServer successfully started. Listning on http://localhost:${port}`);
});