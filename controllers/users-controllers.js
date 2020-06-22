const { validationResult } = require("express-validator");
const User = require("../models/User");

const getUser = async(req, res) => {
  const userId = req.params.uid
  try {
    const user = await User.findById(userId);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send('Server Error')
  }
};
const getUsers = async(req,res) => {
  try {
    const users = await User.find();
    res.status(200).send(users)
  } catch (error) {
    res.status(500).send('Server Error')
  }
};
const createUser = async(req,res) => {};
const updateUser = async(req, res) => {};
const login = async(req, res) => {};
const signup = async(req, res) => {};
const confirmAccount = async(req, res) => {};
const forgotPassword = async(req, res) => {};
const resetPassword = async(req, res) => {};
const setPrivacy = async(req, res) => {};
const deleteUser = async(req, res) => {};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  login,
  signup,
  confirmAccount,
  forgotPassword,
  resetPassword,
  setPrivacy,
  deleteUser,
};
