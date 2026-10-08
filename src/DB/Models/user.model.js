import { model, Schema } from "mongoose"
import { genderEnum, providerEnum, roleEnum } from "../../Modules/Types/user.type.js"

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
            required: true,
            unique: true
        },
        password: {
            type: string,
            required: true
        },
        age: Number,
        profileImage: String,
        gender: {
            type: Number,
            enum: Object.values(genderEnum)
        },
        provider: {
            type: Number,
            enum: Object.values(providerEnum),
            default: providerEnum.system
        },
        role: {
            type: Number,
            enum: Object.values(roleEnum),
            default: roleEnum.user
        },
        bio: String,
        userName: {
            type: String,
            required: true,
            unique: true
        },
        confirmedAt: Date,
        blockedAt: Date,
        phone: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true,
        strict: true,
        optimisticConcurrency: true,
        strictQuery: true,
        toJSON: {
            virtuals: true,
            getters: true,
            transform(doc, ret) {
                delete ret.id
                return ret
            }
        },
        toObject: {
            virtuals: true,
            getters: true,
            transform(doc, ret) {
                delete ret.id
                return ret
            }
        },
        virtuals: {
            fullname: {
                get() {
                    return this.firstName + " " + this.lastName
                },
                set(value) {
                    const [firstname, lastname] = value.split(" ")
                    if (!firstname || !lastname) {
                        throw new Error("invalid fullname")
                    }
                    this.set("firstName", firstname),
                        this.set("lastName", lastname)
                }
            }
        }
    }

)
export const userModel = model("Users", userSchema)