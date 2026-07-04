const express=require("express");

const router=express.Router();
const {producValidation}=require("../middleware/validation");
const validateRequestion=require("../middleware/validationRequestion");
const {
    createProduct,
    getProducts,
    getproduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");
router.post("/createP",producValidation,validateRequestion,createProduct);
router.get("/getallP",getProducts);      
router.get("/getbyidP/:id",getproduct);
router.put("/updateP:id",updateProduct);
router.delete("/deleteP/:id",deleteProduct);
module.exports=router;