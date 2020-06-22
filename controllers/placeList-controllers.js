const { validationResult } = require("express-validator");
const PlaceList = require("../models/PlaceList");

const getPlaceLists = async (req, res) => {
  try {
    const placeLists = await PlaceList.find();
    res.status(200).send(placeLists);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
const getPlaceList = async (req, res) => {
  const plid = req.params.plid;
  try {
    const placeList = await PlaceList.findById(plid);
    res.send(placeList).status(200);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
const addPlaceList = async (req, res) => {
};
const updatePlaceList = async (req, res) => {};
const addPlaceToPlaceList = async (req, res) => {};
const removePlaceFromPlaceList = async (req, res) => {};
const deletePlaceList = async (req, res) => {};
const addFollowerToPlaceList = async (req, res) => {};
const removeFollowerFromPlaceList = async (req, res) => {};

module.exports = {
  getPlaceLists,
  getPlaceList,
  addPlaceList,
  updatePlaceList,
  addPlaceToPlaceList,
  removePlaceFromPlaceList,
  deletePlaceList,
  addFollowerToPlaceList,
  removeFollowerFromPlaceList,
};
