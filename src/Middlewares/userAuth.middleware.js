import { userModel } from '../DB/Models/user.model.js';
import jwt from 'jsonwebtoken';
import { fail_res } from '../Utils/fail_res.js';
import { StatusCodes } from 'http-status-codes';

export const tokenEnum = {
    access: "access",
    refresh: "refresh"
}


export const userAuth = async (req, res, next) => {
    const authorization = req.headers.authorization
    const {user}=await decodeToken(authorization)
    req.user = user
    next()
}


export const decodeToken = async ({ authorization, tokenType = tokenEnum.access }) => {
    if (!authorization || !authorization.startsWith("Bearer")) {
        fail_res({ msg: "Invalid token", statusCode: StatusCodes.BAD_REQUEST })
    }
    const Token = authorization.split(" ")[1]
    const payload = jwt.verify(Token,tokenType==tokenEnum.access?process.env.AccessTokenSercet:process.env.RefreshTokenSecret)
    const { user } = await userModel.findById(payload._id)

    if (!user) {
        fail_res({ msg: "No user found", statusCode: StatusCodes.NOT_FOUND })
    }

    return {
        user
    }
}


export const authorization=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            fail_res({
                msg:"Unauthoriazed",
                statusCode:StatusCodes.UNAUTHORIZED
            })
        }
        next()
    }
}
