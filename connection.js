//Connection node and mongodb 
//1)Import mongoose
const mongoose=require('mongoose');

//Add connection from .env
const DB=process.env.DATABASE

//3)connection code
mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
}).then(()=>{
    console.log('Database connection established');
}).catch((err)=>{
    console.log(err);
})