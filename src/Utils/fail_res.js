export const fail_res=({msg="Error",statusCode,options})=>{
    throw new Error(msg,{
        cause:{
            statusCode,
            options
        }
    })
}