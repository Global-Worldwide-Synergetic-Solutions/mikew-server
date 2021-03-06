require('dotenv').config()
const config = require('./mongoSettings');
const mongoose = require('mongoose')
const express= require('express')

const app = express()

// middleware
const bodyParser = require('body-parser')
const cors = require('cors')
const { initializePassport } = require('./middleware/authentication')


app.use(bodyParser.json())
app.use(cors())
app.use(initializePassport)

const bookings = require('./routes/bookings')
const users = require('./routes/users')
const contact = require('./routes/contact')

// routing
app.use('/bookings', bookings)
app.use('/users', users)
app.use('/contact', contact)

// db connection
mongoose.connect(config.mongoURI[app.settings.env],{ useNewUrlParser: true } ,(err)=>{
    if(err){
        console.log('Error:', err.message)
    }else{
        console.log('Connected to db')
    }
})


app.listen(process.env.PORT || 8080, ()=> console.log('listening on 8080'))

module.exports = app