import jwt from "jsonwebtoken"
import {UserModel} from "../Models/TeacherModel"
import{RequestWithToken} from "../Types/Interfaces/dto/reqDto"
import { Request, Response, NextFunction } from "express";  
import "dotenv/config"
import TokenPayload from "../Types/Interfaces/tokenPayload";

const onlyCommanders = async (request: RequestWithToken| Request, res: Response , next: NextFunction) : Promise<void> => {
    try {
        const req = request as RequestWithToken
        const token = req.cookies.token
        if (!token) {
             res.status(401).json({ message: "No token provided", error: true });
             return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload
        if(decoded.role != "commander") {
             res.status(401).json({message: "only commanders are allowed to perform this action shtzchhhhhhhhhhhhhh...."})
             return
            }

        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
              res.status(401).json({ message: "Token has expired please login again", error: true });
              return
        }

        const user = await UserModel.findOne({ user_name: decoded.user_name });
        
        if (!user) {
            res.status(401).json({ message: "User no longer exists", error: true });
            return
        }

        req.user = decoded

        next()
    } catch (error : any) {
        console.log(error)
         res.status(401).json({message: "Unauthorized", 'error': true ,"details":error.message})
    } 
}


const onlySoldiersAndCommanders = async (request: RequestWithToken | Request, res: Response , next: NextFunction): Promise<void> => {
    try {
        const req = request as RequestWithToken
        const token = req.cookies.token
        if (!token) {
             res.status(401).json({ message: "No token provided", error: true });
             return
        }

        const decoded  = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload
        console.log(decoded)
        if(decoded.role != "commander" && decoded.role != "soldier") {
             res.status(401).json({message: "only soldiers and commanders are allowed to perform this action shtzchhhhhhhhhhhhhh...."})
             return
        }

        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
              res.status(401).json({ message: "Token has expired please login again", error: true });
              return
        }

        const user = await UserModel.findOne({ user_name: decoded.user_name });
        
        if (!user) {
            res.status(401).json({ message: "User no longer exists", error: true });
            return
        }

        req.user = decoded

        next()
    } catch (error : any) {
        console.log(error)
        res.status(401).json({message: "Unauthorized", 'error': true ,"details":error.message})
    } 
}

export {
    onlyCommanders,
    onlySoldiersAndCommanders
}   