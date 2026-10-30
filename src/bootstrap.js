import exp from "express"
import chalk from "chalk"
import { router as userRouter,routes as userRoutes } from "./Modules/User/user.controller.js"
import { test_DB_connection } from "./DB/DB.connection.js"
export const Boostrap=async()=>{
const app=exp()
app.use(exp.json())
await test_DB_connection()

app.use(userRoutes.base,userRouter)

app.use((err,req,res,next)=>{
    const status=err.cause?.statuscode||500
    res.status(status).json({
        errmsg:err.message,
    })
})
app.listen(process.env.PORT,()=>{
    console.log(chalk.greenBright("Server is runnig"))
})
}