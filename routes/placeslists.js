const express = require("express");
const { check } = require("express-validator");
const route = express.Router();
const placeListControllers = require("../controllers/placeList-controllers");
const checkAuth = require("../middleware/auth");

//get placelists
route.get("/", placeListControllers.getPlaceLists);

//get placelist
route.get("/:plid", placeListControllers.getPlaceList);

route.use(checkAuth);
//add placelist
route.post(
  "/",
  [check("listName", "Please provide a name").not().isEmpty()],
  placeListControllers.addPlaceList
);

//update placelist
route.put(
  "/:plid",
  [check("listName", "Please provide a name").not().isEmpty()],
  placeListControllers.updatePlaceList
);

//add place to placelist
route.put("/:plid/places/:pid", placeListControllers.addPlaceToPlaceList);

//remove place from placelist
route.delete(
  "/:plid/places/:pid",
  placeListControllers.removePlaceFromPlaceList
);

//delete placelist
route.delete("/:plid", placeListControllers.deletePlaceList);

//follow placelist
route.put("/:plid/followers", placeListControllers.followPlaceList);

//unfollow placelist
route.delete("/:plid/followers", placeListControllers.unfollowPlaceList);

module.exports = route;
