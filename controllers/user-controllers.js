const User = require('../models/User')
const { validationResult } = require('express-validator')

const getCurrentUser = async (req, res) => {
    try {
        const currentUser = await User.findById(req.userData.userId)
        res.status(200).send(currentUser)
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name } = req.body
    try {
        const user = await User.findById(req.userData.userId)
        if (!user) {
            return res.send('User does not exist').status(422)
        }
        user.name = name
        await user.save()
        res.status(200).send(user)
    } catch (err) {
        res.send(err).status(500)
    }
}

const followUser = async (req, res) => {
    const { uid: userId } = req.params
    try {
        const user = await User.findById(userId)
        const currentUser = await User.findById(req.userData.userId)
        //check if user is already followed
        if (
            user.followers.filter(
                (flw) => flw.toString() === req.userData.userId
            ).length !== 0
        ) {
            return res.send('Bad request').status(400)
        }
        console.log(user)

        currentUser.following.push({
            user: userId,
            name: user.name,
        })
        await currentUser.save()

        user.followers.push({
            user: req.userData.userId,
            name: currentUser.name,
        })
        await user.save()
        res.send(currentUser.following).status(200)
    } catch (error) {
        res.status(500).send('Server Error')
    }
}

const unfollowUser = async (req, res) => {
    const { uid: userId } = req.params
    try {
        const user = await User.findById(userId)
        const currentUser = await User.findById(req.userData.userId)
        //check if user is among followed
        if (
            user.followers.filter(
                (follower) => follower.toString() === req.userData.userId
            ).length !== 0
        ) {
            return res.status(400).send('Bad Request')
        }
        try {
            currentUser.following = currentUser.following.filter(
                (following) => following.user.toString() !== userId
            )
            await currentUser.save()
        } catch (error) {
            return res.send(error).status(500)
        }
        user.followers = user.followers.filter(
            (follower) => follower.user.toString() !== req.userData.userId
        )
        await user.save()
        res.send(currentUser.following).status(200)
    } catch (error) {
        res.status(500).send('Server Error')
    }
}

const deleteFollower = async (req, res) => {
    const { uid: followerId } = req.params
    try {
        const user = await User.findById(req.userData.userId)
        user.followers = user.followers.filter(
            (follower) => follower.user.toString() !== followerId
        )
        await user.save()
        const followedUser = await User.findById(followerId)
        followedUser.following = followedUser.following.filter(
            (following) => following.user.toString() !== req.userData.userId
        )
        await followedUser.save()
        res.send(user.followers).status(200)
    } catch (error) {
        res.status(500).send('Server Error')
    }
}

const addItemToTravelWishlist = async (req, res) => {
    const { pid: placeId } = req.params
    console.log(placeId)
    try {
        const user = await User.findById(req.userData.userId)
        const newWish = {
            wish: placeId,
            isVisited: false,
        }
        user.travelWishList.push(newWish)
        await user.save()
        res.status(200).send(user.travelWishList)
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateItemInTravelWishlist = async (req, res) => {
    const { pid: placeId } = req.params
    const { isVisited } = req.body
    try {
        const user = await User.findById(req.userData.userId)
        const wish = user.travelWishList.find(
            (wish) => wish.wish.toString() === placeId
        )
        wish.isVisited = isVisited
        await user.save()
        res.status(200).send(user.travelWishList)
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteItemFromTravelWishlist = async (req, res) => {
    const { pid: wishId } = req.params
    try {
        const user = await User.findById(req.userData.userId)
        const removeIndex = user.travelWishList
            .map((wish) => wish.wish.toString())
            .indexOf(wishId)
        // remove the comment
        user.travelWishList.splice(removeIndex, 1)
        await user.save()
        res.status(200).send(user.travelWishList)
    } catch (error) {
        res.status(500).send('Server Error')
    }
}

module.exports = {
    getCurrentUser,
    updateUser,
    followUser,
    unfollowUser,
    deleteFollower,
    addItemToTravelWishlist,
    updateItemInTravelWishlist,
    deleteItemFromTravelWishlist,
}
