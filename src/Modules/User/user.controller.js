import * as userServices from "./user.service.js"
import { Router } from "express"
import { StatusCodes } from "http-status-codes"
import { successResponse } from './../../Utils/success.response.js';
import { auth } from "../../middleware/auth.middleware.js";

export const routes = {
    base: "/users",
    signUp: "/signup", //post
    login: "/login", //post
    profile: "/profile", //get
    refreshToken:"/refresh-token" //post
}
export const router = Router()


router.post(routes.signUp, async (req, res) => {
    const { data } = await userServices.signUpService(req.body)
    return successResponse({
        msg: "New user created",
        statuscode: StatusCodes.CREATED,
        res,
        data
    })
})

router.post(routes.login, async (req, res) => {
    const { data } = await userServices.loginService(req.body)
    return successResponse({
        msg: "Logged in successfully",
        data,
        res,
        statuscode: StatusCodes.ACCEPTED
    })
})

router.get(routes.profile, auth, (req, res) => {
    const user = req.user
    successResponse({ res, data: { user } })
})

router.post(routes.refreshToken,async(req,res)=>{
    const {data}=await userServices.refreshTokenService(req.headers.authorization)
    return successResponse({res,data})
})