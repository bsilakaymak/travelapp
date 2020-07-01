const { validationResult } = require('express-validator')
const User = require('../models/User')
const JWT_KEY = 'sila_secret_key'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const getUser = async (req, res) => {
    const { uid: userId } = req.params
    try {
        const user = await User.findById(userId).select('-password')
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send('Server Error')
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
}

const createUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body
    let createdUser
    let token
    try {
        const existingUser = await User.findOne({ email: email })

        if (existingUser) {
            return res
                .send('User already exists, please login instead.')
                .status(422)
        }

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)
        createdUser = new User({
            name,
            email,
            image: '',
            password: hashedPassword,
        })

        await createdUser.save()

        token = jwt.sign(
            { userId: createdUser.id, email: createdUser.email, token },
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
        res.send(error).status(500)
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
        try {
            existingUser = await User.findOne({ email })
            if (!existingUser) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] })
            }

            const isMatch = await bcrypt.compare(
                password,
                existingUser.password
            )

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] })
            }
        } catch (error) {
            return res.send(error).status(422)
        }
        let token
        try {
            token = jwt.sign(
                { userId: existingUser.id, email: existingUser.email, token },
                JWT_KEY,
                {
                    expiresIn: '1h',
                }
            )
        } catch (error) {
            res.send('Login failed').status(500)
        }
        res.status(201).json({
            userId: existingUser.id,
            email: existingUser.email,
            token,
        })
    } catch (error) {
        res.send('Server Error').status(500)
    }
}

const confirmAccount = async (req, res) => {}
const forgotPassword = async (req, res) => {}
const resetPassword = async (req, res) => {}
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
