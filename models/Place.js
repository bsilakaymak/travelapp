const mongoose = require('mongoose')

const Schema = mongoose.Schema

const placeSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    imageId: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    location: {
        lat: {
            type: String,
        },
        lon: {
            type: String,
        },
    },
    ratings: [
        {
            rating: {
                type: Number,
            },
            user: {
                type: mongoose.Types.ObjectId,
                ref: 'user',
            },
        },
    ],
    tags: {
        type: [
            {
                type: String,
            },
        ],
        default: [],
    },

    placeListsAdded: [
        {
            listName: {
                type: String,
            },
            listId: {
                type: mongoose.Types.ObjectId,
                ref: 'placeList',
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('place', placeSchema)
