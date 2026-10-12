import z from "zod"
import { genderEnum } from "../Modules/Types/user.type.js"

export const userSignupSchema = {
    body: z.strictObject({
        fullname: z.string(),
        email: z.email(),
        password: z.string().min(10).max(15),
        age: z.number().optional(),
        gender: z.enum(genderEnum),
        phone: z.string(),
        bio: z.string().optional(),
        userName: z.string()
    }),
    query:z.strictObject({
        id:z.string()
    })

}

const res = userSignupSchema.safeParse({
    email: "ahmed005@gmail.com",
    name: "Ahmed Reda",
    password: "83t12",
    age: 21,
    gender: 0,
    phone: "01125658270"
})