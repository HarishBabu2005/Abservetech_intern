const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const User=require("../models/User")
const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })

        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }
        const token=jwt.sign({
            id:user._id,
            email:user.email
            
            
            
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1d"
        }
    )
    res.status(200).json({
        success:true,
        message:"Login successfully",
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    })

    }catch(err){
        res.status(500).json({
            message:"Internal server error",
           
        })
    }
}
module.exports=login;