const { validationResult } = require("express-validator");
const Place = require("../models/Place");

const getPlace = async(req, res) => {
  try {
    const place = await Place.findById(req.params.pid);
    res.status(200).send(place)
  } catch (error) {
    res.status(500).send('Server Error')
  }

};
const getPlaces = async(req, res) => {
  try {
    const places = await Place.find();
    res.status(200).send(places);
  } catch (error) {
    res.status(500).send('Server Error')
  }

};
const addPlace = async(req, res) => {
  try {
    
  } catch (error) {
    
  }

};
const updatePlace = async(req, res, next) => {};
const ratePlace = async(req, res, next) => {};
const deletePlace = async(req, res, next) => {};
const getComments = async(req, res, next) => {};
const addComment = async(req, res, next) => {};
const updatePlace = async(req, res, next) => {};
const deleteComment = async(req, res, next) => {};

module.exports = {
  getPlace,
  getPlaces,
  addPlace,
  updatePlace,
  ratePlace,
  deletePlace,
  getComments,
  addComment,
  updateComment,
  deleteComment,
};
