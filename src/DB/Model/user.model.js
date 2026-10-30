import { model, Schema } from "mongoose";
import { genderEnum, providerEnum, roleEnum } from "../../Modules/User/user.type.js";
import { errorResponse } from './../../Utils/error.response.js';
import { StatusCodes } from 'http-status-codes';
const userSchema = new Schema(
    {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone:{
        type:String
    },
    password: {
        type: String,
        required: true
    },
    age: Number,
    profileImage: {
        type: String
    },
    gender:{
        type:Number,
        enum:Object.values(genderEnum),
        default:genderEnum.male
    },
    provider:{
        type:Number,
        enum:Object.values(providerEnum),
        default:providerEnum.system
    },
    role:{
        type:Number,
        enum:Object.values(roleEnum),
        default:roleEnum.user
    },
    bio:String,
    userName:{
        type:String,
        required:true
    },
    confirmedAt:Date,
    blockedAt:Date
},{
    timestamps:true,
    strict:true,
    strictQuery:true,
    optimisticConcurrency:true,
    toJSON:{
        virtuals:true,
        getters:true,
        transform(doc,ret){
            delete ret.id
            delete ret.password
            return ret
        }
    },
    toObject:{
        virtuals:true,
        getters:true
    },
    virtuals:{
        fullName:{
            get(){
                return this.firstName+" "+this.lastName
            },
            set(value){
                const [firstName,lastName]=value.split(" ")
                if(!firstName || !lastName){
                    errorResponse({msg:"In valid name",statuscode:StatusCodes.BAD_REQUEST})
                }
                this.set("firstName",firstName)
                this.set("lastName",lastName)
            }
        }
    }

})


export const userModel=model("Users",userSchema)