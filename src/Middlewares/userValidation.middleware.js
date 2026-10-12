import { fail_res } from "../Utils/fail_res.js"
import { StatusCodes } from "http-status-codes"



export const userValdition=(schema)=>{
    return (req,res,next)=>{
        let validationResults=[]
        Object.keys(schema).map(ele=>{
            const validationResult=schema[ele].safeParse(req[ele])
            if(!validationResult.success){
                validationResults.push({
                    [ele]:validationResult.error.issues
                })
            }
        })
        if(validationResults.length){
            fail_res({msg:"Validation error",statusCode:StatusCodes.BAD_REQUEST,options:validationResults})
        }
        next()
    }
}