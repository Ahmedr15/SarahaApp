import exp from "express"
import chalk from "chalk"
import { StatusCodes } from "http-status-codes"
import { test_DB_connection } from "./DB/db.connection.js"

export const Bootstrap=async()=>{
    await test_DB_connection()
    const app=exp()
    app.use(exp.json())



    app.use((err,req,res,next)=>{
        const statuscode=err.cause?.statusCode||500
        res.status(statuscode).json({
            errmsg:err.message
        })
        
    })
    app.listen(3000,()=>{
        console.log(chalk.greenBright("Server is running"))
    })
}