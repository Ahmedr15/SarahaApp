import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../../Utils/error.response.js";
import { userModel } from './../../DB/Model/user.model.js';
import { decodeToken } from "../../middleware/auth.middleware.js";
import jwt from "jsonwebtoken"


export const signUpService = async ({ fullName, email, password, bio, gender, phone, age, userName }) => {
    const [checkEmail, checkUserName] = await Promise.all([
        userModel.findOne({email}),
        userModel.findOne({userName})
    ])
    if (checkEmail, checkUserName) {
        errorResponse({
            msg: `${checkEmail ? "Email" : "Username"} already exists`,
            statuscode: StatusCodes.BAD_REQUEST
        })
    }
    const user = await userModel.create({ fullName, email, password, bio, gender, phone, age, userName })
    return {
        data: {
            user
        }
    }
}

export const loginService = async (userData) => {
    const [checkEmail, checkUserName] = await Promise.all([
        userModel.findOne({ email: userData.identifier }),
        userModel.findOne({ userName: userData.identifier })
    ])
    const user = checkEmail || checkUserName
    if (!user) {
        errorResponse({ msg: "In valid credentials", statuscode: StatusCodes.NOT_FOUND })
    }
    if (user.password != userData.password) {
        errorResponse({ msg: "In valid credentials", statuscode: StatusCodes.NOT_FOUND })
    }
    const accessToken = jwt.sign({
        _id: user._id,
        email: user.email
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3Min"
    })
    const refreshToken = jwt.sign({
        _id: user._id,
        email: user.email
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "2D"
    })
    return {
        data: {
            accessToken,
            refreshToken
        }
    }
}

export const refreshTokenService=async(authorization)=>{
    const {user}=await decodeToken({authorization,tokenType:"refresh"})
    const accessToken=jwt.sign({
        _id:user._id,
        email:user.email
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"3Min"
    })
    return {
        data:{
            accessToken
        }
    }
}