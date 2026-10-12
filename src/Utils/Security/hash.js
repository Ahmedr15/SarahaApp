import { hash,compare } from "bcrypt"
import {hash as argon2Hash,verify} from "argon2"


export const createHash=async(password,algorithm="bcrypt")=>{
    //const hashedPassword=await hash(password,10)
    const hashedPassword=await argon2Hash(password,{
        memoryCost:1024*1024
    })
    return hashedPassword
}


export const compareHash=async(password,hashedPassword,algorithm="bcrypt")=>{
    //const isMatch=await compare(password,hashedPassword)
    const isMatch=await verify(password,hashedPassword)
    return isMatch
}