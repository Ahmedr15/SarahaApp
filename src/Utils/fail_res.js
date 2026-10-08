export const fail_res=({msg="Error",statusCode})=>{
    throw new Error(msg,{
        cause:{
            statusCode
        }
    })
}