// const { validationResult } = require("express-validator");
const User = require("../models/User");

const followUser = async (req, res) => {
  const userId = req.params.uid;
  try {
    const user = await User.findById(userId);
    //check if user is already followed
    if (
      user.followers.find((follower) => follower.toString() === req.userData.id)
        .length !== undefined
    ) {
      res.status(400).send("Bad Request");
    }
    user.followers.push(req.userData.id);
    await user.save();
    res.send(user.followers).status(200);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
const unfollowUser = async (req, res) => {
  const userId = req.params.uid;
  try {
    const user = await User.findById(userId);
    //check if user is among followed
    if (
      user.followers.find((follower) => follower.toString() === req.userData.id)
        .length === undefined
    ) {
      res.status(400).send("Bad Request");
    }
    user.followers = user.followers.filter(
      (follower) => follower.toString() !== req.userData.id
    );
    await user.save();
    res.send(user.followers).status(200);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
const deleteFollower = async (req, res) => {
  const followerId = req.params.uid;
  try {
    const user = await User.findById(req.userData.id);
    user.followers = user.followers.filter(
      (follower) => follower.toString() !== followerId
    );
    await user.save();
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
const addItemToTravelWishlist = async (req, res) => {
  const wishId = req.params.pid;
  try {
    const user = await User.findById(req.userData.id);
    const newWish = {
      wish: wishId,
      isVisited: false,
    };
    user.wishlist.push(newWish);
    res.status(200).send(user.wishlist);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
const updateItemInTravelWishlist = async (req, res) => {
  const wishId = req.params.pid;
  try {
    const user = await User.findById(req.userData.id);
    const wish = user.wishlist.find((wish) => wish.wish.toString() === wishId);
    wish.isVisited = req.body.isVisited;
    await user.save();
    res.status(200).send(user.wishlist);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
const deleteItemFromTravelWishlist = async (req, res) => {
  const wishId = req.params.pid;
  try {
    const user = await User.findById(req.userData.id);
    const removeIndex = user.wishlist
      .map((wish) => wish.wish.toString())
      .indexOf(wishId);
    // remove the comment
    user.wishlist.splice(removeIndex, 1);
    await user.save();
    res.status(200).send(user.wishlist);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  followUser,
  unfollowUser,
  deleteFollower,
  addItemToTravelWishlist,
  updateItemInTravelWishlist,
  deleteItemFromTravelWishlist,
};
