const express = require('express');
const app = express()

// Include the router file
const router = require('./router');

// Attach user submitted daata with the request object
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'ejs')

app.use('/', router)


module.exports = app