const gravatar = require('gravatar')
const { validationResult } = require('express-validator')
const User = require('../models/User')
const JWT_KEY = 'sila_secret_key'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { forgetPasswordEmail, resetPasswordEmail } = require('../emails/account')
const getUser = async (req, res) => {
    const { uid: userId } = req.params
    try {
        const user = await User.findById(userId)
            .select('-password')
            .populate('places')
        if (!user) {
            return res.status(404).json({
                errors: [{ msg: 'User not found.' }],
            })
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').populate('places')
        if (!users) {
            return res.status(422).json({
                errors: [{ msg: 'No Users Found' }],
            })
        }
        res.status(200).send(users)
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}

const createUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body
    let createdUser
    try {
        const secureUrl = gravatar.url(
            email,
            { s: '200', r: 'x', d: 'retro' },
            true
        )

        const existingUser = await User.findOne({ email: email })

        if (existingUser) {
            return res.status(422).json({
                errors: [{ msg: 'User already exists, please login instead.' }],
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        createdUser = new User({
            name,
            email,
            image: secureUrl,
            password: hashedPassword,
        })

        await createdUser.save()

        const token = jwt.sign(
            { userId: createdUser.id, email: createdUser.email },
            JWT_KEY,
            {
                expiresIn: '1h',
            }
        )
        res.json({
            userId: createdUser.id,
            email: createdUser.email,
            token,
        }).status(200)
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}

const login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body

    let existingUser
    try {
        existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res
                .status(401)
                .json({ errors: [{ msg: 'Invalid Credentials' }] })
        }

        const isMatch = await bcrypt.compare(password, existingUser.password)

        if (!isMatch) {
            return res
                .status(401)
                .json({ errors: [{ msg: 'Invalid Credentials' }] })
        }

        const token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email },
            JWT_KEY,
            {
                expiresIn: '1h',
            }
        )

        res.status(201).json({
            userId: existingUser.id,
            email: existingUser.email,
            token,
        })
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}
/* eslint-disable no-unused-vars */
const confirmAccount = async (req, res) => {}
const forgotPassword = async (req, res) => {
    console.log(`test`)
    const { email } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res
                .status(401)
                .json({ errors: [{ msg: 'Invalid Email, Please signup' }] })
        }
        user.generatePasswordReset()
        await user.save()

        let link =
            'http://localhost:3000' +
            '/resetpassword/' +
            user.resetPasswordToken

        forgetPasswordEmail(user.name, user.email, link)
        res.status(200).json({
            message: 'A reset e-mail has been sent to ' + user.email + '.',
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}
const resetPassword = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
        })

        if (!user) {
            return res.status(401).json({
                errors: [
                    {
                        msg: 'Password reset token is invalid or has expired.',
                    },
                ],
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        user.password = hashedPassword

        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined

        await user.save()

        resetPasswordEmail(user.name, user.email)

        res.status(200).json({ message: 'Your password has been updated.' })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }
}
const setPrivacy = async (req, res) => {}
const deleteUser = async (req, res) => {}

module.exports = {
    getUser,
    getUsers,
    createUser,
    login,
    confirmAccount,
    forgotPassword,
    resetPassword,
    setPrivacy,
    deleteUser,
}
