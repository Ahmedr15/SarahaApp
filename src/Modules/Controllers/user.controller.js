import { Router } from "express";
import * as userServices from "../Services/user.service.js"
import { success_res } from './../../Utils/success_res.js';
import { StatusCodes } from "http-status-codes";
import { authorization, userAuth, userValdition } from "../../Middlewares/userAuth.middleware.js";
import { userSignupSchema } from "../Validations/user.validation.js";
import { fail_res } from "../../Utils/fail_res.js";

export const routes={
    base:"/users",
    sign:"/signup",
    login:"/login",
    profile:"/profile",
    refreshToken:"/refreshtoken"
}
export const userRouter=Router()


userRouter.post(routes.sign,userValdition(userSignupSchema),async(req,res)=>{
    await userServices.signup(req.body)
    return success_res({res,msg:"User created successfully",statusCode:StatusCodes.CREATED})
})


userRouter.post(routes.login,async(req,res)=>{
    const {identifier,password}=req.body
    const {data}=await userServices.login(identifier,password)
    return success_res({res,msg:"You are logged successfully",data,statusCode:StatusCodes.ACCEPTED})
})


userRouter.get(routes.profile,userAuth,authorization(roleEnum),async(req,res)=>{

    const user=req.user
    return success_res({res,msg:"Done",data:{user},statusCode:StatusCodes.ACCEPTED})

})

userRouter.post(routes.refreshToken,auth,async(req,res)=>{
    const authorization=req.headers.authorization
    const {data}=await userServices.refreshToken(authorization)

    return success_res({res,msg:"Done",data,statusCode:StatusCodes.ACCEPTED})
})