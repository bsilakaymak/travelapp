const express = require('express');
const {check} = require('express-validator');
const route = express.Router();

//get placelists
route.get('/', placeListControllers.getPlaceLists)

//get placelist
route.get('/:plid', placeListControllers.getPlaceList)

//add placelist
route.post('/', placeListControllers.addPlaceList)

//update placelist
route.put('/:plid', placeListControllers.updatePlaceList)

//add place to placelist
route.post('/:plid/places', placeListControllers.addPlaceToPlaceList)

//remove place from placelist
route.delete('/:plid/places/:pid', placeListControllers.removePlaceFromPlaceList)

//delete placelist
route.delete('/:plid', placeListControllers.deletePlaceList)

//add follower to placelist
route.post('/:plid/followers', placeListControllers.addFollowerToPlaceList)

//remove follower from placelist
route.delete('/:plid/followers/:fid', placeListControllers.removeFollowerFromPlaceList)
