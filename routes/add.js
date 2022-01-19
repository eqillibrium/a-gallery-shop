const { Router } = require('express')
const router = Router()
const Painting = require('../models/Painting')

router.get('/', (req, res, next) => {
    res.render('add', {
        title: 'Добавить',
        isAdd: true
    })
})

router.post('/', (req, res) => {
    const painting = new Painting(
        req.body.title,
        req.body.price,
        req.body.image
    )
    painting.save()
    res.redirect('/')
})

module.exports = router
