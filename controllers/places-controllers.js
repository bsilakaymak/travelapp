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
    const formData = {
      title : req.body.title ,
      address: req.body.address,
      description: req.body.description,
      creator: req.userData.id,
      categories: req.body.categories || []
    }
    const place = new Place(formData)
    res.status(200).send(place)
  } catch (error) {
    res.status(500).send('Server Error')
  }

};
const updatePlace = async(req, res) => {
  const placeId = req.params.pid
  try {
    const place = await Place.findById(placeId); 
    // first check if user is authorized to update the place
    if(place.creator.toString()!== req.userData.id){
      return res.status(401).send('User not authorized')
    }
    place.title = req.body.title;
    place.description = req.body.description;
    await place.save();
    res.send(place).status(200)

  } catch (error) {
    res.send('Server Error').status(500)
  }
};
const ratePlace = async(req, res) => {
   const placeId = req.params.pid;
   let place;
   try {
     place = await Place.findById(placeId)
     //check if the place is not shared by the user themselves
     if(place.creator.toString() === req.userData.id){
       res.status(400).send('Bad Request')
     }
     const rating = {
       rating: req.body.rating,
       user: req.userData.id
     }
     place.ratings.push(rating);
     await place.save();
     res.status(200).send(place.ratings)
   } catch (error) {
    res.send('Server Error').status(500)

   }
};
const deletePlace = async(req, res) => {
  const placeId = req.params.pid;
  try {
    const place = await Place.findById(placeId);
    //check if the user is authorized to delete the place
    if(place.creator.toString()!== req.userData.id){
      res.status(401).send('User not authorized')
    }
    await place.remove();
    res.status(200).send('Place removed')
  } catch (error) {
    res.send('Server Error').status(500)
  }
};
const getComments = async(req, res) => {
  const placeId = req.params.pid;
  try {
    const place = await Place.findById(placeId);
    res.status(200).send(place.comments)
  } catch (error) {
    res.send('Server Error').status(500)
  }
};
const addComment = async(req, res) => {
  const placeId = req.params.pid
  try {
    const place = await Place.findById(placeId);
    const newPlace ={
      creator: req.userData.id,
      title:req.body.title,
      text:req.body.title
    }
    place.comments.push(newPlace);
    await place.save();
    res.send(place.comments).status(200)
  } catch (error) {
    res.send('Server Error').status(500)
  }
};
const deleteComment = async(req, res) => {
  const placeId = req.params.pid
  const commentId = req.params.cid
  try {
    const place = await Place.findById(placeId);
    //get the comment
    const comment = place.comments.find((comment) => comment.id.toString() === commentId);
    //  Make sure post exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // check if the current user is authorized
    if (comment.creator.toString() !== req.userData.id) {
      return res.status(401).json({ msg: 'User not Authorized' });
    }
    //remove index
    const removeIndex = place.comments
    .map((comment) => comment.id.toString())
    .indexOf(commentId);
    // remove the comment
    place.comments.splice(removeIndex, 1);   
    await place.save() 
    res.send(place.comments).status(200)
  } catch (error) {
    res.send('Server Error').status(500)
  }
};

module.exports = {
  getPlace,
  getPlaces,
  addPlace,
  updatePlace,
  ratePlace,
  deletePlace,
  getComments,
  addComment,
  deleteComment,
};
