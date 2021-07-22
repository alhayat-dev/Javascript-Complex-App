const express = require('express');
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')

const app = express()

let sessionOptions = session({
    secret: "mudasser",
    store:  MongoStore.create({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true }
})

app.use(sessionOptions)
app.use(flash())

app.use(function(req, res, next){
    // make all errors and success flash messages available from all templates
    // req.locals.errors = req.flash("errors")
    // req.locals.success = req.flash("success")

    // make current user id available on the request object
    if (req.session.user) { req.visitorId = req.session.user._id }else{ req.visitorId = 0 }

    // make user session data available from within view templates
    res.locals.user = req.session.user
    next()
})

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