const { Router } = require('express')
const router = Router()
const Painting = require('../models/Painting')

router.get('/', async (req, res, next) => {
    const gallery = await Painting.getAll()
    res.render('gallery', {
        title: 'Галерея',
        isGallery: true,
        gallery
    })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    const painting = await Painting.getByID(req.params.id)

    res.render('edit', {
        title: `Редактировать: ${painting.title}`,
        painting
    })
})

router.post('/edit', async (req, res) => {
    await Painting.update(req.body)
    res.redirect('/gallery')
})

router.get('/:id', async (req, res, next) => {
    const painting = await Painting.getByID(req.params.id)
    res.render('painting', {
        title: painting.title,
        painting
    })
})

module.exports = router
