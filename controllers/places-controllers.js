const { validationResult } = require('express-validator')
const cloudinary = require('../uploads/cloudinary')
const Place = require('../models/Place')
const Comment = require('../models/Comments')
const User = require('../models/User')
const PlaceList = require('../models/PlaceList')
const getCoordsForAddress = require('../utils/location')
const escapeRegex = require('../utils/escapeRegex')

const getPlace = async (req, res) => {
    try {
        const place = await Place.findById(req.params.pid).populate(
            'comments.creator',
            'name'
        )
        if (!place) {
            return res
                .status(404)
                .json({ errors: [{ msg: 'Place not found' }] })
        }
        res.status(200).send(place)
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}

const getPlaces = async (req, res) => {
    const search = req.query.search
    const tagFilter = req.query.tagFilter
    let places
    try {
        places = await Place.find()

        if (tagFilter) {
            places = await Place.find({
                tags: { $in: tagFilter.split(',') },
            })

            return res.status(200).send(places)
        }
        if (search) {
            const regex = new RegExp(escapeRegex(search), 'gi')
            places = await Place.find({ title: regex })

            res.status(200).send(places)
        } else {
            res.status(200).send(places)
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}

const addPlace = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { title, address, description, tags } = req.body
    const tagsSplitted = tags.split(',')

    try {
        const user = await User.findById(req.userData.userId)
        const coordinates = await getCoordsForAddress(address)
        const formData = {
            title,
            address,
            description,
            location: {
                lat: coordinates[1],
                lon: coordinates[0],
            },
            creator: req.userData.userId,
            image: req.file.path,
            imageId: req.file.filename,
            tags: tagsSplitted,
        }
        const place = new Place(formData)
        await place.save()

        user.places.push(place)
        await user.save()
        res.status(200).send(place)
    } catch (error) {
        console.error(error.message)
        if (error.message.includes('Could not find')) {
            return res.status(404).json({
                errors: [
                    {
                        msg:
                            'Could not find location for the specified address.',
                    },
                ],
            })
        }
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}

const updatePlace = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { pid: placeId } = req.params
    const updates = Object.keys(req.body)

    try {
        const place = await Place.findById(placeId)
        // first check if user is authorized to update the place
        if (place.creator.toString() !== req.userData.userId) {
            return res
                .status(401)
                .json({ errors: [{ msg: 'User Not Authorized' }] })
        }
        updates.forEach((update) => (place[update] = req.body[update]))

        await place.save()

        res.send(place).status(200)
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}

const ratePlace = async (req, res) => {
    const { pid: placeId } = req.params
    const { rating } = req.body
    let place

    try {
        place = await Place.findById(placeId)
        const ratedUser = place.ratings.find(
            (rating) => rating.user.toString() === req.userData.userId
        )
        if (ratedUser) {
            ratedUser.rating = rating
        } else {
            const newRating = {
                rating: rating,
                user: req.userData.userId,
            }
            place.ratings.push(newRating)
        }

        await place.save()

        res.status(200).send(place)
    } catch (error) {
        console.error(error)
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}

const deletePlace = async (req, res) => {
    const { pid: placeId } = req.params
    try {
        const place = await Place.findById(placeId)
        const user = await User.findById(req.userData.userId)
        //check if the user is authorized to delete the place
        if (place.creator.toString() !== req.userData.userId) {
            return res
                .status(401)
                .json({ errors: [{ msg: 'User not authorized' }] })
        }

        const filteredPlaces = user.places.filter((place) => {
            return place.toString() !== placeId.toString()
        })
        user.places = filteredPlaces
        await user.save()

        // //make sure to delete the place from any place list it is added

        place.placeListsAdded.map(async (placeListAdded) => {
            const placeList = await PlaceList.findById(placeListAdded.listId)
            placeList.places = placeList.places.filter(
                (place) => place.toString() !== placeId.toString()
            )

            await placeList.save()
        })
        // Remove the image from cloudinary by id before add the new image
        if (place.imageId) {
            const public_id = place.imageId
            cloudinary.uploader.destroy(public_id, function (result) {
                console.log(result)
            })
        }

        await place.remove()
        res.status(200).send('Place removed')
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ placeId: req.params.pid })
            .populate({
                path: 'creator',
                select: 'name image',
            })
            .sort('-createdAt')
            .exec()
        res.json(comments)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}

const addComment = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const placeId = req.params.pid
        const creator = req.userData.userId
        const comment = req.body.comment

        const createdComment = await Comment.create({
            placeId,
            creator,
            comment,
        })
        const comments = await Comment.findOne(createdComment)
            .populate({
                path: 'creator',
                select: 'name image',
            })
            .exec()
        res.json(comments)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}

const deleteComment = async (req, res) => {
    const comment = await Comment.findById(req.params.cid).exec()
    //  Make sure post exists
    if (!comment) {
        return res.status(404).json({ errors: [{ msg: 'Comment not found' }] })
    }

    // check if the current user is authorized
    if (comment.creator._id.toString() !== req.userData.userId) {
        return res
            .status(401)
            .json({ errors: [{ msg: ' User not Authorized' }] })
    }

    await Comment.deleteOne(comment)

    res.json({ message: 'Deleted' })
}
const updateComment = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const comment = await Comment.findById(req.params.cid)
        .populate({
            path: 'creator',
            select: 'name image',
        })
        .exec()
    //  Make sure post exists
    if (!comment) {
        return res.status(404).json({ errors: [{ msg: 'Comment not found' }] })
    }

    // check if the current user is authorized
    if (comment.creator._id.toString() !== req.userData.userId) {
        return res
            .status(401)
            .json({ errors: [{ msg: ' User not Authorized' }] })
    }
    comment.comment = req.body.comment
    await comment.save()
    res.json(comment)
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
    updateComment,
}
