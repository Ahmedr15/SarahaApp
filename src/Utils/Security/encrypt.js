import crypto from "node:crypto"
import { fail_res } from './../fail_res.js';


const secret_key=Buffer.from("aflkjgasjfgbiageqwabvjalasgflgal")
export const encrypt=(data)=>{
    const iv=crypto.randomBytes(16) // iv size is half the secret
    const cipher=crypto.createCipheriv("aes-256-cbc",secret_key,iv) //Choose the algo.secret key length is equal to number of bytes of algo, 256 bits
    let cipherText=cipher.update(data,"utf8","hex")
    cipherText+=cipher.final()
    return `${iv.toString("hex")}:${cipherText}`
}


export const decrypt=(encrptedData)=>{
    const [iv,cipherText]=encrptedData.split(":")

    if(!iv,cipherText){
        fail_res({msg:"invalid encrypted data"})
    }
    const binaryIV=Buffer.from(iv,"hex")
    const decipher=crypto.createDecipheriv("aes-256-cbc",secret_key,binaryIV)
    let decipherText=decipher.update(cipherText,"hex","utf8")
    decipherText+=decipher.final()
    return decipherText
}