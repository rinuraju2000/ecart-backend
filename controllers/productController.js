//Logic for getting all products from mongodb

//1)Import product collection
const products = require('../models/productSchema')
const product=require('../models/productSchema')

//2)Create a function for getting all products
exports.getAllproducts=async(req,res)=>{
    //Get all products from mongodb
    try{
        const allProducts=await products.find()
        res.status(200).json(allProducts)   //Response send back to client
    }
    catch(error){
        res.status(401).json(error) //Error msg send back to client
    }
}

//view  particular product details
exports.viewProduct=async(req,res)=>{
    //Get product id from the request

    const id=req.params.id;
    try{
        //Check if product id is present in the db
        const product=await products.findOne({id})
        if(product){
            res.status(200).json(product)//Send product details to client
        }
        else{//If product is not present
            res.status(404).json("Product not found")
        }
    }
    catch(error){
        res.status(404).json(error)
    }
}