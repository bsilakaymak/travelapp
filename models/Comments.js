const mongoose = require('mongoose')

const thisSchema = new mongoose.Schema(
    {
        placeId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'place',
        },
        creator: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'user',
        },
        comment: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Comment', thisSchema)
