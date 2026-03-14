
const User = require('../../models/User')

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const registerUser = async (req,res)=>{
try{
   const {userName,email,password,role} = req.body;
    
     if(!userName || !email || !password){
        return res.json({
            success:false,
            message:"All fields are required"
        })
     }
    
    const existingUser = await User.findOne({
      $or: [{ userName }, { email }]
    });

    if (existingUser) {
      return res.json({
        success:false,
        message: "Username or Email already exists"
      });
    }

   const hashpassword =  await bcrypt.hash(password,12);


   // create a new user and save in a database
   const newlyCreatedUser = new User({
    userName,
    email,
    password:hashpassword,
    role : role || 'user'
   })

   await newlyCreatedUser.save();
   if(newlyCreatedUser){
     return res.status(201).json({
        success:true,
        message:"Registration successful"
     })
   }
   else{
     return res.status(400).json({
        success:false,
        message:"could not register user"
     })
   }
   
}
catch(e){
    console.error("Registration error:", e.message);
    res.status(500).json({
        success:false,
        message:"Internal error occured",
        error: e.message
    })
}
}

const loginUser = async(req,res)=>{
    try{
    const {email,password} = req.body;

    // Find if the user exists in database or not
    const user = await User.findOne({email});
    if(!user){
        return res.json({
            success:false,
            message:"User doesn't exist,Please register"
        })
    }
    // if the user is found , check for password

    const checkPassword = await bcrypt.compare(password,user.password);
    if(!checkPassword){
        return res.json({
            success:false,
            message:"Invalid Password,Please try again"
        })
    }

    // create a user token
    const token = jwt.sign({
        email : user.email,
        id : user._id,
        role:user.role,
        userName : user.userName
 },process.env.JWT_SECRET_KEY,{expiresIn:'60m'});

    res.cookie('token',token,{httpOnly:true,secure:false}).json({
        success:true,
         message:"Logged In successfully",
         user:{
            email: user.email,
            role:user.role,
            id:user._id,
            userName : user.userName
         }
    })
    
  
} 
 
 catch(e){
     console.error("Login error:", e.message);
    res.status(500).json({
        success:false,
        message:"Internal error occured",
        error: e.message
    })
 }

}

const logoutUser = (req,res)=>{
   res.clearCookie('token').json({
    success:true,
    message:"Logged out successfully"
   })
}

// auth middleware

const authMiddleware = async(req,res,next)=>{
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({
      success:false,
       message:'Unauthorized user!'
    })
  }
  try{
     const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
     req.user = decoded;
     next();
  }
  catch(error){
     res.status(401).json({
      success:false,
       message:'Unauthorized user!'
    })
  }
}



module.exports = {registerUser,loginUser,logoutUser,authMiddleware};