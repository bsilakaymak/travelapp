const express = require("express");
const { check } = require("express-validator");
const route = express.Router();
const checkAuth = require('../middleware/auth')

const usersControllers = require("../controllers/users-controllers");
const fileUpload = require("../middleware/file-upload");

//get a user
route.get("/:uid", usersControllers.getUser);

//get all users
route.get("/all", usersControllers.getUsers);

//login
route.post("/login", usersControllers.login);

//social login

//sign up
route.post("/signup", usersControllers.signup);

//confirm account
route.get("/confirm/:token", usersControllers.confirmAccount);

//request password reset
route.post("/forgotpassword", usersControllers.forgotPassword);

//reset password
route.post('resetpassword', usersControllers.resetPassword)

route.use(checkAuth);

//create a user
route.post("/", usersControllers.addUser);

//update a user
route.put("/:uid", usersControllers.updateUser);

//set privacy options
route.put("/privacy", usersControllers.setPrivacy);

//delete a user
route.delete("/:uid"), usersControllers.deleteUser;

