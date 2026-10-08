import { Router } from "express";
import * as userServices from "../Services/user.service.js"
import { success_res } from './../../Utils/success_res.js';
import { StatusCodes } from "http-status-codes";

export const routes={
    base:"/users",
    sign:"/signup",
    login:"/login"
}
export const userRouter=Router()


userRouter.post(routes.sign,async(req,res)=>{
    await userServices.signup(req.body)
    return success_res({res,msg:"User created successfully",statusCode:StatusCodes.CREATED})
})


userRouter.post(routes.login,async(req,res)=>{
    const {identifier,password}=req.body
    const {data}=await userServices.login(identifier,password)
    return success_res({res,msg:"You are logged successfully",data,statusCode:StatusCodes.ACCEPTED})
})