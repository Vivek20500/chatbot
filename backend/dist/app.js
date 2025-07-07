import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();
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
app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://chatbotbyvivek.vercel.app");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Cookie, X-Requested-With, Accept, Origin");
    res.status(200).end();
});
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// remove later
app.use(morgan("dev"));
app.use("/api/v1", appRouter);
app.get("/", (req, res) => {
    res.json({ message: "Backend is running!" });
});
export default app;
//# sourceMappingURL=app.js.map