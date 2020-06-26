const mongoose = require("mongoose");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  places: [{ type: mongoose.Types.ObjectId, ref: "place" }],

  followers: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
      name: {
        type: String,
      },
    },
  ],
  following: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
      name: {
        type: String,
      },
    },
  ],
  placeLists: [
    {
      placeList: {
        type: mongoose.Types.ObjectId,
        ref: "placeList",
      },
    },
  ],
  privacyOptions: {},
  social: {
    google: { type: String, default: null },
    facebook: { type: String, default: null },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyAccountToken: String,
  verifyAccountExpires: Date,
  resetPasswordExpires: Date,
  resetPasswordToken: String,
  travelWishList: [
    {
      wish: {
        type: mongoose.Types.ObjectId,
        ref: "place",
      },
      isVisited: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

userSchema.methods.generateAccountVerify = function () {
  this.verifyAccountToken = crypto.randomBytes(20).toString("hex");
  this.verifyAccountExpires = Date.now() + 3600000;
};

userSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

module.exports = mongoose.model("user", userSchema);
