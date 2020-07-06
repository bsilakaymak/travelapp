const express = require('express')
const connectDB = require('./config/db')

const app = express()
// connect db
connectDB()

//middleware initialization
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE'
    )
    next()
})
//routes
app.use('/api/places', require('./routes/places'))
app.use('/api/users', require('./routes/users'))
app.use('/api/user', require('./routes/user'))
~app.use('/api/boards', require('./routes/placeslists'))
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
