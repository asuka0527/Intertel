const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const db = require('./db')
const movieRouter = require('./routes/movie-router')
const orderRouter = require('./routes/order-router')


const app = express()
const apiPort = 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World nodemon!')
})

app.use('/api', movieRouter)
app.use('/api', orderRouter)


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))