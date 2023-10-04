//To define routes for client requests

//1)Import express
const express=require('express');

//4)Import product controller
const ProductController=require('../controllers/productController')
const wishlistController=require('../controllers/wishlistController')
const cartController=require('../controllers/cartController')

//2)Using express create object for router class inorder to setup path
const router=new express.Router()

//3)Use router object to resolve client request

    //Get all products api request

router.get('/products/all-products',ProductController.getAllproducts)


//Get a particular product details
router.get('/products/view-product/:id',ProductController.viewProduct)

//Add a new product to the wishlist
router.post('/wishlists/add-to-wishlist',wishlistController.addToWishlist)

//View all wishlist items
router.get('/wishlists/view-all-wishlists',wishlistController.getWishlistItems)

//Delete a particular wishlist item
router.delete('/wishlists/delete-wishlist-product/:id',wishlistController.deleteProduct)

//Add to cart
router.post('/carts/add-to-cart',cartController.addToCart)

//Get cart products
router.get('/carts/get-cart',cartController.getCart)

//Delete cart products
router.delete('/carts/delete-cart/:id',cartController.deleteCartProduct)

//Increment cart quantity
router.get('/carts/increment-product/:id',cartController.incrementProductCount)

//Decrement cart quantity
router.get('/carts/decrement-product/:id',cartController.decrementProductCount)

//5)export routes
module.exports=router
