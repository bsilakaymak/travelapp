const { validationResult } = require('express-validator')
const Place = require('../models/Place')
const User = require('../models/User')
const PlaceList = require('../models/PlaceList')

const getPlace = async (req, res) => {
    try {
        const place = await Place.findById(req.params.pid)
        if (!place) {
            return res.send('Place not found').status(404)
        }
        res.status(200).send(place)
    } catch (error) {
        res.status(500).send('Server Error')
    }
}

const getPlaces = async (req, res) => {
    try {
        const places = await Place.find()
        if (places.length === 0) {
            return res.send('No place found').status(404)
        }
        res.status(200).send(places)
    } catch (error) {
        res.status(500).send('Server Error')
    }
}

const addPlace = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { title, address, description, categories = [] } = req.body
    try {
        const user = await User.findById(req.userData.userId)
        const formData = {
            title,
            address,
            description,
            creator: req.userData.userId,
            categories,
        }
        const place = new Place(formData)
        await place.save()

        user.places.push(place)
        await user.save()
        res.status(200).send(place)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}

const updatePlace = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { pid: placeId } = req.params
    const { title, description } = req.body
    try {
        const place = await Place.findById(placeId)
        // first check if user is authorized to update the place
        if (place.creator.toString() !== req.userData.userId) {
            return res.status(401).send('User not authorized')
        }
        place.title = title
        place.description = description
        await place.save()
        res.send(place).status(200)
    } catch (error) {
        res.send('Server Error').status(500)
    }
}

const ratePlace = async (req, res) => {
    const { pid: placeId } = req.params
    const { rating } = req.body
    let place
    try {
        place = await Place.findById(placeId)
        if (
            place.ratings.find(
                (rating) => rating.user.toString() === req.userData.userId
            ) !== undefined
        ) {
            return res.status(400).send('Already rated')
        }
        const rating = {
            rating,
            user: req.userData.userId,
        }
        place.ratings.push(rating)
        await place.save()
        res.status(200).send(place.ratings)
    } catch (error) {
        res.send('Server Error').status(500)
    }
}

const deletePlace = async (req, res) => {
    const { pid: placeId } = req.params
    try {
        const place = await Place.findById(placeId)
        const user = await User.findById(req.userData.userId)
        //check if the user is authorized to delete the place
        if (place.creator.toString() !== req.userData.userId) {
            return res.status(401).send('User not authorized')
        }

        try {
            const filteredPlaces = user.places.filter((place) => {
                return place.toString() !== placeId.toString()
            })
            console.log(filteredPlaces)
            user.places = filteredPlaces

            await user.save()
        } catch (error) {
            return res.status(500).send(error)
        }

        // //make sure to delete the place from any place list it is added
        try {
            place.placeListsAdded.map(async (pla) => {
                const placeList = await PlaceList.findById(pla.listId)
                placeList.places = placeList.places.filter(
                    (place) => place.toString() !== placeId.toString()
                )
                console.log(placeList.places)
                await placeList.save()
            })
        } catch (error) {
            return res.status(500).send(error)
        }

        await place.remove()
        res.status(200).send('Place removed')
    } catch (error) {
        res.send('Server Error').status(500)
    }
}

const getComments = async (req, res) => {
    const { pid: placeId } = req.params
    try {
        const place = await Place.findById(placeId)
        res.status(200).send(place.comments)
    } catch (error) {
        res.send('Server Error').status(500)
    }
}

const addComment = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { pid: placeId } = req.params
    const { title, text } = req.body
    try {
        const place = await Place.findById(placeId)
        const newPlace = {
            creator: req.userData.userId,
            title,
            text,
        }
        place.comments.push(newPlace)
        await place.save()
        res.send(place.comments).status(200)
    } catch (error) {
        res.send('Server Error').status(500)
    }
}

const deleteComment = async (req, res) => {
    const { pid: placeId, cid: commentId } = req.params
    try {
        const place = await Place.findById(placeId)
        //get the comment
        const comment = place.comments.find(
            (comment) => comment.id.toString() === commentId
        )
        //  Make sure post exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' })
        }
        // check if the current user is authorized
        if (comment.creator.toString() !== req.userData.userId) {
            return res.status(401).json({ msg: 'User not Authorized' })
        }
        //remove index
        const removeIndex = place.comments
            .map((comment) => comment.id.toString())
            .indexOf(commentId)
        // remove the comment
        place.comments.splice(removeIndex, 1)
        await place.save()
        res.send(place.comments).status(200)
    } catch (error) {
        res.send('Server Error').status(500)
    }
}

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
}
