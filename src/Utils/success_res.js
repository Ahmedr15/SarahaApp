
export const success_res=({res,msg="Done",data={},statusCode})=>{
    return res.status(statusCode).json({
        msg,
        data,
        timestamp:new Date().toISOString
    })
}