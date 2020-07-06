/* eslint-disable no-unused-vars */

const { validationResult } = require('express-validator')
const Notification = require('../models/Notification')

const getNotifications = async (req, res, next) => {}
const addNotification = async (req, res, next) => {}
const deleteNotification = async (req, res, next) => {}
const deleteAllNotifications = async (req, res, next) => {}

module.exports = {
    getNotifications,
    addNotification,
    deleteNotification,
    deleteAllNotifications,
}
