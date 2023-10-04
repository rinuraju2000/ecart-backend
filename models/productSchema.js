//1)Import mongoose
const mongoose=require('mongoose');

//2)Define schema for product collection to store products
const productsSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true,

    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    rating:{
        rate:{
            type:Number,
            required:true
        },
        count:{
            type:Number,
            required:true
        }
    }
})

//3)Create a model to store products
const products=new mongoose.model('products',productsSchema)

//4)Export the model
module.exports=products