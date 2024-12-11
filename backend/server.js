import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
import { connectDB, sessionStore } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import launchRoutes from "./routes/launch.route.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT;
const domain = process.env.DOMAIN;

app.use(
  cors({
    origin: domain,
    credentials: true,
  }),
);

app.use(
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  }),
);

// allow express to parse body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// endpoints
app.use("/api/auth/", authRoutes);
app.use("/api/launch/", launchRoutes);

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: "unexpected error has occured",
  });

  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"));
  app.get("*", (req, res) => {
    res.sendFile("public/index.html", { root: __dirname });
  });
}

app.listen(port, async () => {
  try {
    console.log("Establishing conection to MongoDB...");
    await connectDB();
  } catch (err) {
    console.error(err.message);
  }

  console.log(
    `\nServer successfully started. Listning on http://localhost:${port}`,
  );
});
