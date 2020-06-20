const express = require('express');
const {check} = require('express-validator');
const route = express.Router();
const userControllers = require("../controllers/user-controllers");


//follow user
route.post('/follow/:uid', userControllers.followUser)

//unfollow friend request
route.put('/follow/:uid', userControllers.unfollowUser)

//add item to travel wishlist
route.post('/wishlist/:uid', userControllers.addItemToTravelWishlist)

//update item in travel wishlist
route.put('/wishlist/:uid/:id', userControllers.updateItemInTravelWishlist)

//delete item from travel wishlist
route.delete('/wishlist/:uid/:id', userControllers.deleteItemFromTravelWishlist)

module.exports = route