const { validationResult } = require("express-validator");
const User = require("../models/User");

const followUser = async(req, res) => {
  const userId = req.params.uid
  try {
    const user = await User.findById(userId);
    //check if user is already followed
    if(user.followers.find(follower => follower.toString() === req.userData.id).length !==undefined){
      res.status(400).send('Bad Request')
    }
    user.followers.push(req.userData.id);
    await user.save();
    res.send(user.followers).status(200)
    
  } catch (error) {
    res.status(500).send('Server Error')
    
  }
};
const unfollowUser = async(req, res) => {};
const deleteFollower = async(req, res) => {};
const addItemToTravelWishlist = async(req, res) => {};
const updateItemInTravelWishlist = async(req, res) => {};
const deleteItemFromTravelWishlist = async(req, res) => {};


module.exports = {
  followUser,
  unfollowUser,
  deleteFollower,
  addItemToTravelWishlist,
  updateItemInTravelWishlist,
  deleteItemFromTravelWishlist
}