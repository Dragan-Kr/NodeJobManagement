//9:09

// const {CustomAPIError} = require('../../errors/custom-error');
const {CustomAPIError} = require('../../errors');
const {StatusCodes} = require('http-status-codes');
const errorHandlerMiddleware = (err,req,res,next)=>{
// return res.status(500).json({msq:`Something went wrong,try again later`});
// return res.status(500).json({msq:err.message});errors\custom-error.js

let customError = {
  //set default
  statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  msg:err.message || 'Something went wrong tru again later'
};
// if(err instanceof CustomAPIError){
//     return res.status(err.statusCode).json({msg: err.message});
// }

   if(err.name === 'ValidationError'){
    console.log(Object.values(err.errors));
    customError.msg = Object.values(err.errors).map((item)=>item.message).join(',');
    customError.statusCode=400;
   }

  console.log('Nije usao u if');
  if(err.code && err.code === 11000){
    customError.msg= `Duplicate value entered for ${Object.keys(err.keyValue)} field,please choose another value`;
    customError.statusCode=400; 
  }

  if(err.name === 'CastError'){
    customError.msg=`No item found with id: ${err.value}`;
    customError.statusCode = 404;
  }
//  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err});
return res.status(customError.statusCode).json({msg:customError.msg});

};

module.exports = errorHandlerMiddleware;