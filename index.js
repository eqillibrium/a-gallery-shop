const express = require('express')
const handlebars = require('express-handlebars')
const homeRoute = require('./routes/home')
const addRoute = require('./routes/add')
const galleryRoute = require('./routes/gallery')
const cartRoute = require('./routes/cart')
const path = require("path");

const app = express()

const hbs = handlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
    extended: false
}))
app.use('/', homeRoute)
app.use('/add', addRoute)
app.use('/gallery', galleryRoute)
app.use('/cart', cartRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Starting on ${PORT}`)
})
