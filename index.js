//1)Automatically load .env file into the application
require('dotenv').config()

//2)Import express
const express=require('express')

//6)Import cors
const cors=require('cors')

//Import connection.js
require('./connection')
//Import router
const router=require('./routes/router')

//3)Create  an application using the express
const server=express()

//4)Define the port number
const PORT=5000

//7)Use cors in server app
server.use(cors())
server.use(express.json())
server.use(router)

//5)Run the application 
server.listen(PORT,()=>{
    console.log('listening on port'+PORT);
})

//8)Define routes
server.get('/',(req,res)=>{
    res.status(200).json('Ecommerce service started');
})
