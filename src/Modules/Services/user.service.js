import jwt from "jsonwebtoken"
import { userModel } from "../../DB/Models/user.model.js";
import { fail_res } from './../../Utils/fail_res.js';
import { StatusCodes } from "http-status-codes";
import { decodeToken, tokenEnum } from "../../Middlewares/userAuth.middleware.js";
import { compareHash } from "../../Utils/Security/hash.js";


export const signup = async (user_data) => {
    const [user_email, user_name] = await Promise.all([
        await userModel.findOne({ email: user_data.email }),
        await userModel.findOne({ userName: user_data.userName })
    ])

    if (user_email || user_name) {
        fail_res({ msg: `${user_email ? "Email" : "Username"} already exists`, statusCode: StatusCodes.BAD_REQUEST })
    }
    else {
        const user = await userModel.create(user_data)
        return {
            data: {
                user
            }
        }
    }
}


export const login = async (identifier, password) => {
    const [user_email, user_name] = await Promise.all([
        userModel.findOne({ email: identifier }),
        userModel.findOne({ userName: identifier })
    ])
    if (!user_email && !user_name) {
        fail_res({ msg: "Invalid credentials", statusCode: StatusCodes.BAD_REQUEST })
    }
    const isMatchPassword = await compareHash(password, user_email?.password || user_name.password)
    if (!isMatchPassword) {
        fail_res({ msg: "Invalid credentials", statusCode: StatusCodes.BAD_REQUEST })
    }

    const accessToken = jwt.sign({
        _id: user_email?._id || user_name._id,
        email: user_email?.email || user_name.email
    }, process.env.AccessTokenSecret, {
        expiresIn: "30M"
    })

    const refreshToken = jwt.sign({
        _id: user_email?._id || user_name._id,
        email: user_email?.email || user_name.email
    },
        process.env.RefreshAccessToken, {
        expiresIn: "7d"
    }
    )

    return {
        data: {
            accessToken,
            refreshToken
        }
    }
}



export const refreshToken = async (authorization) => {
    const { user } = await decodeToken({ authorization, tokenType: tokenEnum.refresh })
    const accessToken = jwt.sign({
        _id: user._id,
        email: user.email
    }, process.env.AccessTokenSecret, {
        expiresIn: "30M"
    })

    return {
        data: {
            accessToken
        }
    }
}