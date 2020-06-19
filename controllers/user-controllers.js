const { validationResult } = require("express-validator");
const User = require("../models/User");

const followUser = async(req, res, next) => {};
const unfollowUser = async(req, res, next) => {};
const deleteFollower = async(req, res, next) => {};
const addItemToTravelWishlist = async(req, res, next) => {};
const updateItemInTravelWishlist = async(req, res, next) => {};
const deleteItemFromTravelWishlist = async(req, res, next) => {};


module.exports = {
  followUser,
  unfollowUser,
  deleteFollower,
  addItemToTravelWishlist,
  updateItemInTravelWishlist,
  deleteItemFromTravelWishlist
}