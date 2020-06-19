const express = require('express');
const {check} = require('express-validator');
const route = express.Router();

//follow user
route.post('/follow/:uid', userControllers.sendFriendRequest)

//unfollow friend request
route.put('/follow/:uid', userControllers.cancelFriendRequest)

//delete followers
route.delete('/followers/:fid', userControllers.acceptFriendRequest)

//add item to travel wishlist
route.post('/wishlist/:uid', userControllers.addItemToTravelWishlist)

//update item in travel wishlist
route.put('/wishlist/:uid/:id', userControllers.updateItemInTravelWishlist)

//delete item from travel wishlist
route.delete('/wishlist/:uid/:id', userControllers.deleteItemFromTravelWishlist)

