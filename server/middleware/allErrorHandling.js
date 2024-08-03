const allErrorHandler = (err,req,res,next)=>{
   const customError = {
    statusCode: err.statusCode || 400,
    message: err.message || "something went wrong! try later"
   };
 
  return res.status(customError.statusCode).json({success: 'false',message: customError.message});
}

module.exports = allErrorHandler;