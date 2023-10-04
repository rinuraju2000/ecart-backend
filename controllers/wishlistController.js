//Logic for wishlist

//Import wishlists from model
const wishlists=require('../models/wishlistSchema')

//Logic for add wishist
exports.addToWishlist=async(req,res)=>{
    //Get wishlist details

    // req.body={
    //     id:9879,
    //     title:req,
    //     price:678
    // }

    // Destructuring
    const {id,title,price,image}=req.body;

    //Logic

    try{

    //Check if the product is already available in wishlist
    const item=await wishlists.findOne({id})
    if(item){
        res.status(403).json("Product is already available in wishlists")
    }
    else{
        //Add a new product to the wishlists
        const newProduct=new wishlists({id,title,price,image})

        //To store the new product in the wishlists
        await newProduct.save()

        //Send response back to the client
        res.status(200).json("Product added successfully")
    }
    }
    catch(error){
        res.status(401).json(error)
    }
}
//


//Get all wishlists products
exports.getWishlistItems=async(req,res)=>{
    //Logic
    try{
        const allWishlist=await wishlists.find()
        res.status(200).json(allWishlist)//wishlists products details
    }
    catch(error){
        res.status(404).json(error)
    }

}

//delete a Particular product from the wishlist
exports.deleteProduct=async(req,res)=>{
    //Logic - id get - delete - remaining products details

    //get id from path parameter
    const{id}=req.params
    try{
        const removeProduct=await wishlists.deleteOne({id})
        //get remaining products details after deleting a particular product
        if(removeProduct){
            const allItems=await wishlists.find()
            res.status(200).json(allItems)
        }

    }
    catch(error){
        res.status(404).json(error)
    }
}