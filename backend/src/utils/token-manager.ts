import { Request,Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from './cosntants.js';
export const createToken=(id:string,email:string, expiresIn)=>{
    const payload={id,email};
    const token=jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn });
    return token;
}

export const verifyToken=async (
    req:Request,res:Response,next:NextFunction
)=>{
    const token=req.signedCookies[`${COOKIE_NAME}`];
    console.log("Token:", token);
    if(!token ||token.trim()===""){;
        return res.status(401).json({message:"Token not found"});
    }
    return new Promise<void>((resolve,reject)=>{
        return jwt.verify(token,process.env.JWT_SECRET as string,(error,success)=>{
            if(error){
                reject(error.message);
                return res.status(401).json({message:"Token Expired"});
            }else{
                console.log("Token verified successfully");
                resolve();
                res.locals.jwtData=success;
                return next();
            }
        })
    })
}