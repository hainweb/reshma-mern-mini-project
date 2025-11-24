const Product =require("../models/product");
// add product
exports.addProduct =async(req,res)=>{
    try{
        console.log("BODY:", req.body);       // debug
    console.log("FILE:", req.file);       // debug
        const{name,price,category}=req.body;
        const newproduct = new Product({
            name,price,category,image:req.file.path,
        });
        const savedProduct =await newproduct.save();
        res.json(savedProduct);

    }catch(err){
        res.status(500).json({message:err.message});
    }

};

//get all products

exports.getProducts =async(req,res)=>{
    try{
        const products=await Product.find();
        res.json(products);
    }catch{
        res.status(500)({message:err,message});
    }
};

//update
exports.updateProduct=async(req,res)=>{
    try{
        const {name,price,category}=req.body;
        const updateData ={name,price,category};
        if(req.file)updateData.image=req.file.path;
        
        const update =await Product.findByIdAndUpdate(req.params.id,
            updateData,
            {new:true}
        );
        res.json(update);
    
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

//delete
exports.deleteProduct=async(req,res)=>{
    try{
        await product.findByIdAndDelete(req.params.id);
        res.json({message:"Product delete"});

    }catch(err){
        res.status(500).json({message:err.message});
    }
}