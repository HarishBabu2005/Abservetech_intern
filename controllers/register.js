const bcrypt=require('bcryptjs');
const User=require('../models/User');
const register=async(req,res)=>{
    try{
    const {name,email,age,password}=req.body;
    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            message:"User already exists"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await User.create({
        name,
        email,
        age,
        password:hashedPassword,
    });
    res.status(201).json({
        message:"User registered successfully",
        
        data:user
    })
}catch(err){
    res.status(500).json({
        message:"Internal server error",
        error:err.message
    })
}
}
module.exports=register;