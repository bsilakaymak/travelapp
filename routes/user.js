const express = require('express')
const { check } = require('express-validator')
const route = express.Router()
const userControllers = require('../controllers/user-controllers')
const checkAuth = require('../middleware/auth')

route.use(checkAuth)

//get current user
route.get('/me', userControllers.getCurrentUser)

//update a user
route.put(
    '/me',
    [check('name', 'Please provide a name').not().isEmpty()],
    userControllers.updateUser
)

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
