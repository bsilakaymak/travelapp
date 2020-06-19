const { validationResult } = require("express-validator");
const PlaceList = require("../models/PlaceList");

const getPlaceLists = async(req, res, next) => {};
const getPlaceList = async(req, res, next) => {};
const addPlaceList = async(req, res, next) => {};
const updatePlaceList = async(req, res, next) => {};
const addPlaceToPlaceList = async(req, res, next) => {};
const removePlaceFromPlaceList = async(req, res, next) => {};
const deletePlaceList = async(req, res, next)=> {};
const addFollowerToPlaceList = async(req, res, next) => {};
const removeFollowerFromPlaceList = async(req, res, next) => {};

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
