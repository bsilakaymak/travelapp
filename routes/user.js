const express = require('express')
const route = express.Router()
const userControllers = require('../controllers/user-controllers')
const checkAuth = require('../middleware/auth')

route.use(checkAuth)
//follow user
route.post('/follow/:uid', userControllers.followUser)

//unfollow friend request
route.put('/follow/:uid', userControllers.unfollowUser)

//add item to travel wishlist
route.post('/wishlist/:pid', userControllers.addItemToTravelWishlist)

//delete follower
route.delete('/follow/:uid', userControllers.deleteFollower)

//update item in travel wishlist
route.put('/wishlist/:pid', userControllers.updateItemInTravelWishlist)

//delete item from travel wishlist
route.delete('/wishlist/:pid', userControllers.deleteItemFromTravelWishlist)

module.exports = route
