// import {notFound , errorHandler } from './middleware/errorMiddleware.js'


const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


require('dotenv').config()

const db = require('./db')

const orderRouter = require('./routes/orderRouter')
const itemRouter = require('./routes/itemRouter')
const errorMiddleware = require('./middleware/errorMiddleware')


const app = express()
const apiPort = 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World nodemon!')
})

// app.use(errorMiddleware.notFound);
// app.use(errorMiddleware.errorHandler);


app.use('/api', orderRouter)
app.use('/api', itemRouter)




app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))