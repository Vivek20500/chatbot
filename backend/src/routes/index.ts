import { Router } from "express";
import userRouter from "./user-routes.js";
import chatRouter from "./chat-routes.js";

const appRouter = Router();

appRouter.use("/users",userRouter);
appRouter.use("/chat",chatRouter);

export default appRouter;