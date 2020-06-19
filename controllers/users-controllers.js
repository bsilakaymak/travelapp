const { validationResult } = require("express-validator");
const User = require("../models/User");

const getUser = async(req, res,next) => {
  
};
const getUsers = async(req,res, next) => {};
const addUser = async(req,res, next) => {};
const updateUser = async(req, res, next) => {};
const login = async(req, res, next) => {};
const signup = async(req, res, next) => {};
const confirmAccount = async(req, res, next) => {};
const forgotPassword = async(req, res, next) => {};
const resetPassword = async(req, res, next) => {};
const setPrivacy = async(req, res, next) => {};
const deleteUser = async(req, res, next) => {};

module.exports = {
  getUser,
  getUsers,
  addUser,
  updateUser,
  login,
  signup,
  confirmAccount,
  forgotPassword,
  resetPassword,
  setPrivacy,
  deleteUser,
};
