const Product=require("../models/Product");
exports.createProduct= async(req,res)=>{
    try{
         if(!req.body.p_name || !req.body.p_price){
            return res.status(400).json({
                message:"product name and price are required"
            })
        }
        const product=await Product.create(req.body);
       
        res.status(201).json(product);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })}
}
exports.getProducts=async(req,res)=>{
    try{
        const products=await Product.find().populate("user","name email");
        res.json(products);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })}
}
exports.getproduct=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
      
        console.log(productQ);
        console.log(req.params.id);
        console.log(product);
        if(!product){
            return res.status(404).json({
                message:"Product not found"
            })
           
        }
        res.json(product);

    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}
exports.updateProduct=async(req,res)=>{
    try{
        const product=await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}


        );
        if(!product){
            return res.status(404).json({
                message:"Product not found"
            })
        }
        res.json(product);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
exports.deleteProduct=async(req,res)=>{
    try{
        const product=await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(404).json({
                message:"Product not found"
            })
        }
        res.json({message:"Product deleted successfully"});
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
