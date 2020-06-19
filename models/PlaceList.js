const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeListSchema = new Schema({
  listName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  places: [
    {
      place: {
        type: mongoose.Types.ObjectId,
        ref: "place",
      },
    },
  ],
  followers: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    },
  ],
});

module.exports = PlaceList = mongoose.model("placeList", placeListSchema);
