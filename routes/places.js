const express = require("express");
const { check } = require("express-validator");
const route = express.Router();

const placesControllers = require("../controllers/places-controllers");
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/auth");

//get place
route.get("/:pid", placesControllers.getPlace);

//get places
route.get("/", placesControllers.getPlaces);

route.use(checkAuth);

//add place
route.post("/", placesControllers.addPlace);

//update place
route.post("/:pid", placesControllers.updatePlace);

//rate place
route.put("/:pid", placesControllers.ratePlace);

//delete place
route.delete("/:pid", placesControllers.deletePlace);

//get comments
route.put("/:pid/comments", placesControllers.getComments);

//add comment
route.put("/:pid/comments", placesControllers.addComment);

//delete comment
route.put("/:pid/comments/:cid", placesControllers.deleteComment);

module.exports = route