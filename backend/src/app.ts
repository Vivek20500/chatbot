import express from "express";
import {config} from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();

const app=express();
const allowedOrigins = [`${process.env.FRONTEND_URL}`];

app.use(cors({origin: allowedOrigins, 
  credentials: true,}));

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// remove later
app.use(morgan("dev"));

app.use("/api/v1",appRouter);
export default app;