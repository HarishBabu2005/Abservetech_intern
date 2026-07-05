const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const User=require("../models/User")
const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"User not found"
            })

        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
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
        message:"Login sucessfully",
        token
    })

    }catch(err){
        res.status(500).json({
            message:"Internal server error",
            error:err.message
        })
    }
}
module.exports=login;