const express = require('express')
const { check } = require('express-validator')
const route = express.Router()

const placesControllers = require('../controllers/places-controllers')
const multerUploads = require('../middleware/file-upload')
const checkAuth = require('../middleware/auth')

//get place
route.get('/:pid', placesControllers.getPlace)

//get places
route.get('/', placesControllers.getPlaces)

//get comments
route.get('/:pid/comments', placesControllers.getComments)

route.use(checkAuth)

//add place
route.post(
    '/',
    multerUploads(500, 500),
    [
        check('title', 'Title is required').not().isEmpty(),
        check('address', 'Address is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('tags', 'Tags are required').not().isEmpty(),
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

//add comment
route.post(
    '/:pid/comments',
    [check('comment', 'Text is required').not().isEmpty()],
    placesControllers.addComment
)
//add update
route.patch(
    '/:cid/comments',
    [check('comment', 'Text is required').not().isEmpty()],
    placesControllers.updateComment
)

//delete comment
route.delete('/comments/:cid', placesControllers.deleteComment)

module.exports = route
