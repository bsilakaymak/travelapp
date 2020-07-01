const express = require('express')
const { check } = require('express-validator')
const route = express.Router()

const placesControllers = require('../controllers/places-controllers')
const fileUpload = require('../middleware/file-upload')
const checkAuth = require('../middleware/auth')

//get place
route.get('/:pid', placesControllers.getPlace)

//get places
route.get('/', placesControllers.getPlaces)

route.use(checkAuth)

//add place
route.post(
    '/',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('address', 'Address is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
    ],
    placesControllers.addPlace
)

//update place
route.post(
    '/:pid',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
    ],
    placesControllers.updatePlace
)

//rate place
route.put('/:pid', placesControllers.ratePlace)

//delete place
route.delete('/:pid', placesControllers.deletePlace)

//get comments
route.get('/:pid/comments', placesControllers.getComments)

//add comment
route.put(
    '/:pid/comments',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('text', 'Text is required').not().isEmpty(),
    ],
    placesControllers.addComment
)

//delete comment
route.put('/:pid/comments/:cid', placesControllers.deleteComment)

module.exports = route
