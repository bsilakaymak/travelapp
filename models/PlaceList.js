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
      type: mongoose.Types.ObjectId,
      ref: "place",
    },
  ],
  followers: [
    {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
  ],
});

module.exports = mongoose.model("placeList", placeListSchema);
