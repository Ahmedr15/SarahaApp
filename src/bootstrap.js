import exp from "express"
import chalk from "chalk"
import { test_DB_connection } from "./DB/db.connection.js"

export const Bootstrap = async () => {

    const app = exp()
    app.use(exp.json())
    app.listen(+process.env.PORT, () => {
        console.log(chalk.greenBright("Server is running"))
    })


    await test_DB_connection()



    app.use((err, req, res, next) => {
        const statuscode = err.cause?.statusCode || 500
        res.status(statuscode).json({
            errmsg: err.message,
            erroptions:err.cause?.options
        })

    })

}