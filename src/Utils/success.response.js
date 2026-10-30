export const successResponse = ({ msg = "Done", data = {}, res, statuscode = 200 }) => {
   return res.status(statuscode).json({
      msg, data, timestamp: new Date().toISOString()
   })
}