export const errorResponse=({msg="Error",statuscode})=>{
    throw new Error(msg,{
        cause:{
            statuscode
        }
    })
}