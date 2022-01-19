const {Router} = require('express')
const router = Router()
const Cart = require('../models/Cart')
const Painting = require('../models/Painting')

router.post('/add', async (req, res) => {
    const painting = await Painting.getByID(req.body.id)
    try {
        await Cart.add(painting)
        res.redirect('/cart')
    } catch (e) {
        throw e
    }
})

router.get('/', async (req, res) => {
    const cart = await Cart.fetch()
    res.render('cart', {
        title: 'Корзина',
        isCart: true,
        cart
    })
})

router.delete('/remove/:id', async (req, res) => {
    await Cart.remove(req.params.id)
    const cart = await Cart.fetch()
    res.json(cart)
})

module.exports = router
