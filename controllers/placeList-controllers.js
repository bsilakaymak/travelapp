const { validationResult } = require('express-validator')
const PlaceList = require('../models/PlaceList')
const User = require('../models/User')
const Place = require('../models/Place')

const getPlaceLists = async (req, res) => {
    try {
        const placeLists = await PlaceList.find()
        res.status(200).send(placeLists)
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}

const getPlaceList = async (req, res) => {
    const { plid } = req.params
    try {
        const placeList = await PlaceList.findById(plid).populate([
            'places',
            'followers',
        ])
        res.send(placeList).status(200)
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}

const addPlaceList = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { listName, description = 'No description provided' } = req.body
    try {
        const user = await User.findById(req.userData.userId)
        const newPlaceList = {
            listName,
            description,
            creator: user.id,
        }
        const placeList = new PlaceList(newPlaceList)
        await placeList.save()

        user.placeLists.push(placeList)
        await user.save()
        res.status(200).send(placeList)
    } catch (error) {
        console.error(error)
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}

const updatePlaceList = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { plid } = req.params
    const { listName, description = 'No description provided' } = req.body
    try {
        const placeList = await PlaceList.findById(plid)
        //check if the place list is created by the user
        if (placeList.creator.toString() !== req.userData.userId) {
            return res
                .status(401)
                .json({ errors: [{ msg: 'User not authorized' }] })
        }
        placeList.listName = listName
        placeList.description = description
        await placeList.save()
        res.status(200).send(placeList)
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}

const addPlaceToPlaceList = async (req, res) => {
    const { pid, plid } = req.params
    try {
        const placeList = await PlaceList.findById(plid)
        const place = await Place.findById(pid)
        //check if the place is not already in the list
        if (
            placeList.places.find((place) => place.toString() === pid) !==
            undefined
        ) {
            return res
                .status(403)
                .json({ errors: [{ msg: 'Place is already in the list' }] })
        }
        placeList.places.unshift(place)
        place.placeListsAdded.push({
            listName: placeList.listName,
            listId: plid,
        })
        await place.save()
        await placeList.save()
        res.send(placeList.places).status(200)
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}

const removePlaceFromPlaceList = async (req, res) => {
    const { plid, pid } = req.params
    try {
        const placeList = await PlaceList.findById(plid)
        const place = await Place.findById(pid)
        //check if user is authorized to remove place from the placelist
        if (placeList.creator.toString() !== req.userData.userId) {
            return res
                .status(401)
                .json({ errors: [{ msg: 'User not authorized' }] })
        }
        //remove index
        const removeIndex = placeList.places
            .map((place) => place.toString())
            .indexOf(pid)
        // remove the place
        placeList.places.splice(removeIndex, 1)
        await placeList.save()
        //also remove the place list from place model
        place.placeListsAdded = place.placeListsAdded.filter(
            (pla) => pla.listId.toString() !== plid
        )
        await place.save()
        res.send(placeList.places).status(200)
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}

const deletePlaceList = async (req, res) => {
    const { plid } = req.params
    try {
        const placeList = await PlaceList.findById(plid)
        //check if user is authorized to delete the placelist
        if (placeList.creator.toString() !== req.userData.userId) {
            return res
                .status(401)
                .json({ errors: [{ msg: 'User not authorized' }] })
        }
        //check and delete it from the place model it is added
        try {
            placeList.places.map(async (pid) => {
                const currentPlace = await Place.findById(pid)
                currentPlace.placeListsAdded = currentPlace.placeListsAdded.filter(
                    (pla) => pla.listId.toString() !== plid.toString()
                )
                await currentPlace.save()
            })
        } catch (error) {
            return res.status(500).send(error)
        }
        await placeList.remove()
        res.send('Place list removed').status(200)
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}

const followPlaceList = async (req, res) => {
    const { plid } = req.params
    try {
        const user = await User.findById(req.userData.userId)
        const placeList = await PlaceList.findById(plid).populate('followers')
        //check if the place list is already followed
        if (
            placeList.followers.find(
                (follower) => follower._id.toString() === req.userData.userId
            ) !== undefined
        ) {
            return res
                .status(403)
                .json({ errors: [{ msg: 'Board is already followed' }] })
        }
        placeList.followers.unshift(user)
        await placeList.save()
        res.send(placeList.followers).status(200)
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}

const unfollowPlaceList = async (req, res) => {
    const { plid } = req.params
    try {
        const placeList = await PlaceList.findById(plid).populate('followers')
        //check if the current user following the list
        if (
            placeList.followers.find(
                (follower) => follower._id.toString() === req.userData.userId
            ) === undefined
        ) {
            return res
                .status(403)
                .json({ errors: [{ msg: 'User is not a follower' }] })
        }
        placeList.followers = placeList.followers.filter(
            (follower) => follower._id.toString() !== req.userData.userId
        )
        console.log(placeList.followers)
        console.log(req.userData.userId)
        await placeList.save()
        res.send(placeList.followers).status(200)
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}

module.exports = {
    getPlaceLists,
    getPlaceList,
    addPlaceList,
    updatePlaceList,
    addPlaceToPlaceList,
    removePlaceFromPlaceList,
    deletePlaceList,
    followPlaceList,
    unfollowPlaceList,
}
