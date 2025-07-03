import { Router } from "express";
import { getUsers, userLogin, userSignup } from "../controllers/user-controller.js";
import user from "../models/user.js";
import {signupValidator,validate,loginValidator} from "../utils/validators.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.post("/signup",validate(signupValidator),userSignup);

userRouter.post("/login",validate(loginValidator),userLogin);
export default userRouter;