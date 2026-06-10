
const adminMiddleware = async(req,res,next)=>{
 
  try{
     if(req.user?.role === 'admin'){
        return next();
     }
    
     else{
        return res.status(403).json({
            success:false,
            message : "Not authorised to do this action"
        })
     }
  }
  catch(error){
     res.status(401).json({
      success:false,
       message:'Unauthorized user!'
    })
  }
}
module.exports = adminMiddleware;