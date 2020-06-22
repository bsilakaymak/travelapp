const express = require('express');
//const {check} = require('express-validator');
const route = express.Router();
const placeListControllers = require("../controllers/placeList-controllers");

//get placelists
route.get('/', placeListControllers.getPlaceLists)

//get placelist
route.get('/:plid', placeListControllers.getPlaceList)

//add placelist
route.post('/', placeListControllers.addPlaceList)

//update placelist
route.put('/:plid', placeListControllers.updatePlaceList)

//add place to placelist
route.post('/:plid/places/:pid', placeListControllers.addPlaceToPlaceList)

//remove place from placelist
route.delete('/:plid/places/:pid', placeListControllers.removePlaceFromPlaceList)

//delete placelist
route.delete('/:plid', placeListControllers.deletePlaceList)

//follow placelist
route.post('/:plid/followers', placeListControllers.followPlaceList)

//unfollow placelist
route.delete('/:plid/followers', placeListControllers.unfollowPlaceList)

module.exports = route