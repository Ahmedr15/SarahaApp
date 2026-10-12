import mongoose from "mongoose";
import chalk from "chalk";

export const test_DB_connection=async()=>{
    try {
        await mongoose.connect(process.env.DB_URI,{
            serverSelectionTimeoutMS:2500
        })
        console.log(chalk.greenBright("DB connected successfully"))
    } catch (error) {
        console.log(chalk.redBright("Failed to connect with DB"))
    }
}