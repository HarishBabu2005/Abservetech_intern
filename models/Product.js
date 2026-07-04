const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    p_name:{
        type:String,
        required:true,

    },
    p_price:{
        type:Number,
        required:true
    },
    p_description:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
    
}
,{
timestamps:true
})
module.exports=mongoose.model("Product",productSchema)