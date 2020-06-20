const express = require('express');
const {check} = require('express-validator');
const route = express.Router();
const notificationControllers = require("../controllers/notification-controllers");



//get notifications
route.get('/', notificationControllers.getNotifications)
//add notification
route.post('/', notificationControllers.addNotification)
//delete notification
route.delete('/:nid', notificationControllers.deleteNotification)
//delete all notifications
route.delete('/', notificationControllers.deleteAllNotifications)

module.exports = route