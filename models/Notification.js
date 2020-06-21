const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  notificationType: {
    type: String,
    required: true,
  },
  notificationMessage: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("user", notificationSchema);
