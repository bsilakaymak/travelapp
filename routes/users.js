const express = require('express')
const { check } = require('express-validator')
const route = express.Router()
const checkAuth = require('../middleware/auth')

const usersControllers = require('../controllers/users-controllers')
// const fileUpload = require('../middleware/file-upload')

//get all users
route.get('/all', usersControllers.getUsers)

//login
route.post(
    '/login',
    [
        check('email', 'Please enter a valid email').isEmail().notEmpty(),
        check('password', 'Password field cannot be empty').not().isEmpty(),
    ],
    usersControllers.login
)

//social login

//sign up
route.post(
    '/signup',
    [
        check('name', 'Name is required.').not().isEmpty(),
        check('email', 'Please include a valid email.').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters.'
        ).isLength({ min: 6 }),
    ],
    usersControllers.createUser
)

//confirm account
route.get('/confirm/:token', usersControllers.confirmAccount)

//request password reset
route.post('/forgotpassword', usersControllers.forgotPassword)

//reset password
route.post('resetpassword', usersControllers.resetPassword)

route.use(checkAuth)

//get a user
route.get('/:uid', usersControllers.getUser)

//set privacy options
route.put('/privacy', usersControllers.setPrivacy)

//delete a user
route.delete('/:uid'), usersControllers.deleteUser

module.exports = route
