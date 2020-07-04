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
    categories: [{ category: String }],
    comments: [
        {
            creator: {
                type: mongoose.Types.ObjectId,
                ref: 'user',
            },
            text: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
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
