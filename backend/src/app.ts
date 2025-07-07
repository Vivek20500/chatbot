import express from "express";
import {config} from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();

const app=express();

const corsOptions = {
  origin: [
    "https://chatbotbyvivek.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type", 
    "Authorization", 
    "Cookie",
    "X-Requested-With",
    "Accept",
    "Origin"
  ],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://chatbotbyvivek.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Cookie, X-Requested-With, Accept, Origin");
  
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});



app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// remove later
app.use(morgan("dev"));

app.use("/api/v1",appRouter);
export default app;
