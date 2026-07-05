const profile=(req,res)=>{
    res.status(201).json({
        message:"welcome",
        user:req.user
    })
}
module.exports=profile;