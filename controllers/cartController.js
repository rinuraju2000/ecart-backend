//Import carts model
const carts=require('../models/cartSchema')

//Add to cart collection
exports.addToCart=async(req,res)=>{
    //Get products details from the request
    const {id,title,price,image,quantity}=req.body

    //Logic 
    try{
        //Check if the product is already in cart
        const products=await carts.findOne({id})
        if(products){
            //Product is present in cart, Update the quantity and price accordingly
            products.quantity+=1

            //Update the grand total
            products.grandTotal=products.price*products.quantity

            //Save changes to the db
            products.save()

            //Send response back to the client
            res.status(200).json("Product details updated")
        }
        else{
            //Product is not present in the cart, Add product to cart
            const newProduct=new carts({id,title,price,image,quantity,grandTotal:price})
            
            //Save new product details
            newProduct.save()

            //Send response back to client
            res.status(200).json("Product added successfully")
            }

    }
    catch(error){
        res.status(404).json(error)
    }
}

//Get cart product
exports.getCart=async(req,res)=>{
    //Logic - get cart product from database
    try{
        const allCart=await carts.find()
        res.status(200).json(allCart)
    }
    catch(error){
        res.status(404).json(error)

    }
}

//Delete a product from the cart
exports.deleteCartProduct=async(req,res)=>{

    //get product id from cart
    const{id}=req.params

    //remove product from cart
    try{
        const deleteProduct=await carts.deleteOne({id})//Product deleted

        if(deleteProduct.deleteCount!=0){

            //Get all remaining products from cart
            const allItems=await carts.find()
            res.status(200).json(allItems)//response send back to client
        }

    }
    catch(error){
        res.status(404).json(error)
    }
}

//Increment the cart product count
exports.incrementProductCount=async(req,res)=>{
    //Find product id
    const{id}=req.params

    //If the product is already in the cart then quantity will be incremented by 1
    //then update the grand total
    try{
        const product=await carts.findOne({id})

        if(product){
            product.quantity+=1;//Increment the quantity by 1
            product.grandTotal=product.price*product.quantity
            //Save changes to the db
            await product.save()
            //After the product has been saved,Update the content into the client side
            const allCart=await carts.find()
            res.status(200).json(allCart)
        }

        else{
            res.status(401).json("Product not found")
        }


    }
    catch(error){
        res.status(404).json(error)
    }

}

//Decrement the cart product count
exports.decrementProductCount=async(req,res)=>{
    //Find product id
    const{id}=req.params
    //If the product is already in the cart then quantity will be incremented by 1
    //then update the grand total
    try{
        const product=await carts.findOne({id})

        if(product){
            product.quantity-=1;//Decrement the quantity by 1
            if(product.quantity==0){
                //remove product from the cart
                const removecartitems=await carts.deleteOne({id})
                //Remaining products will be send back to client
                const allCart=await carts.find()
                res.status(200).json(allCart)
            }
            else{
            //Update the grand total
            product.grandTotal=product.price*product.quantity
             //Save changes to the db
             await product.save()
             //After the product has been saved,Update the content into the client side
             const allCart=await carts.find()
             res.status(200).json(allCart)
            }
         }
        else{
            res.status(401).json("Product not found")
        }
    }
    catch(error){
        res.status(404).json(error)
    }
}