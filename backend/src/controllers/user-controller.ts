import { NextFunction ,Response,Request} from "express";
import User from "../models/user.js";
import { hash,compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/cosntants.js";

export const getUsers = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    //get all users from the database
    try {
        const users = await User.find();

        return res.status(200).json({message:"OK",users});
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(200).json({message:"Error",cause:error.message});
    }
}
export const userSignup = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    //user signup
    try {
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(401).json({message:"User already exists"});
        }


        const hashedpassword = await hash(password, 10);

        const user = new User({name,email,password :hashedpassword});

        await user.save();

        const token = createToken(user._id.toString(), user.email, "7d");
        res.clearCookie(COOKIE_NAME,{
            path:"/",
            domain:"localhost",
            httpOnly:true, 
            signed:true 
        }); // Clear any existing cookie with the same name

        const expires = new Date();
        expires.setDate(expires.getDate() + 7); // Set expiration to 7 days from now
        res.cookie(COOKIE_NAME,token,{
            path:"/",
            domain:"localhost",
            expires, 
            httpOnly:true, 
            signed:true
        });


        return res.status(201).json({message:"OK",id:user._id.toString(),name:user.name, email:user.email});
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(200).json({message:"Error",cause:error.message});
    }
}
export const userLogin = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    //user login
    try {
        const {email, password} = req.body;
        const user=await User.findOne({email});
        if (!user) {
            return res.status(401).json({message:"User does not exist"});
        }
        const isPasswordCorrect =await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({message:"Incorrect password"});
        }
        

        const token = createToken(user._id.toString(), user.email, "7d");
        // Set the cookie with the token
        // Clear any existing cookie with the same name
        res.clearCookie(COOKIE_NAME,{
            path:"/",
            domain:"localhost",
            httpOnly:true, 
            signed:true 
        }); // Clear any existing cookie with the same name

        const expires = new Date();
        expires.setDate(expires.getDate() + 7); // Set expiration to 7 days from now
        res.cookie(COOKIE_NAME,token,{
            path:"/",
            domain:"localhost",
            expires, 
            httpOnly:true, 
            signed:true
        });

        return res.status(200).json({message:"OK",id:user._id.toString(),name:user.name, email:user.email});
        
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(200).json({message:"Error",cause:error.message});
    }
}