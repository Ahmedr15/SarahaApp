import jwt from "jsonwebtoken"
import { userModel } from "../../DB/Models/user.model.js";
import { fail_res } from './../../Utils/fail_res.js';
import { StatusCodes } from "http-status-codes";


export const signup=async(user_data)=>{
    const [user_email,user_name]=await Promise.all([
        await userModel.findOne({email:user_data.email}),
        await userModel.findOne({userName:user_data.userName})
    ])

    if(user_email||user_name){
        fail_res({msg:`${user_email?"Email":"Username"} already exists`,statusCode:StatusCodes.BAD_REQUEST})
    }
    else{
        const user=await userModel.create(user_data)
        return{
            data:{
                user
            }
        }
    }
}


export const login=async(identifier,password)=>{
    const [user_email,user_name]=await Promise.all([
        await userModel.findOne({email:identifier}),
        await userModel.findOne({userName:identifier})
    ])
        if(!user_email||!user_name){
        fail_res({msg:"Invalid credentials",statusCode:StatusCodes.BAD_REQUEST})
    }
    else if(user_email.password!=password || user_name.password!=password){
        fail_res({msg:"Invalid credentials",statusCode:StatusCodes.BAD_REQUEST})
    }

    const accesssToken=jwt.sign({
        _id:user_email?user_email._id:user_name._id,
        email:user_email?user_email.email:user_name.email
    },"asjdfaasfkjgfaskqg")

    return{
        data:{
            accessToken
        }
    }
}