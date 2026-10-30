import { errorResponse } from "../Utils/error.response.js"
import { userModel } from "../DB/Model/user.model.js"
import  jwt  from 'jsonwebtoken';


export const auth = async (req, res, next) => {
    const{user}=await decodeToken({authorization:req.headers.authorization})
    req.user = user
    next()
}


export const decodeToken = async ({ authorization, tokenType })=>{
    if (!authorization || !authorization.startsWith("Bearer")) {
        errorResponse({ msg: "In valid token", statuscode: StatusCodes.UNAUTHORIZED })
    }
    const token = authorization.split(" ")[1]
    let tokenSecret
    switch (tokenType) {
        case "refresh":
            tokenSecret=process.env.REFRESH_TOKEN_SECRET
            break;
    
        default:
            tokenSecret=process.env.ACCESS_TOKEN_SECRET
            break;
    }
    const payload = jwt.verify(token, tokenSecret)
    const user = await userModel.findById(payload._id)
    if (!user) {
        errorResponse({ msg: "User not found", statuscode: StatusCodes.NOT_FOUND })
    }
    return{
        user
    }
}