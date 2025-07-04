import { Router } from "express";
import { getUsers, userLogin, userSignup, verifyUser } from "../controllers/user-controller.js";
import user from "../models/user.js";
import {signupValidator,validate,loginValidator} from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.post("/signup",validate(signupValidator),userSignup);

userRouter.post("/login",validate(loginValidator),userLogin);



userRouter.get("/auth-status",verifyToken,verifyUser);
export default userRouter;