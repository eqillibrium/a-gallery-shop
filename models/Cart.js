const { readFile, writeFile } = require('fs/promises');
const path = require('path')

const cartPath = path.join(
    __dirname, '..', 'db','cart.json'
)

class Cart {
    static async add(painting) {
        const cart = await Cart.fetch()

        const find = cart.paintings.find(el => el.id === painting.id)

        if(find) {
            const idx = cart.paintings.indexOf(find)
            cart.paintings[idx].count ++

        } else {
            painting.count = 1
            cart.paintings.push(painting)
        }

        cart.amount += +painting.price

        try {
            await writeFile(
                cartPath,
                JSON.stringify(cart)
            )
        } catch (err) {
            throw err
        }

    }
    static async remove(id){
        const cart = await Cart.fetch()

        const find = cart.paintings.find(el => el.id === id)
        const idx = cart.paintings.indexOf(find)

        if(find && find.count > 1) {
            cart.paintings[idx].count --
            cart.amount -= +find.price
        } else {
            cart.paintings.splice(idx, 1)
            cart.amount = 0
        }

        try {
            await writeFile(
                cartPath,
                JSON.stringify(cart)
            )
        } catch (err) {
            throw err
        }
    }
    static async fetch() {
        try {
            const data = await readFile(cartPath)
            return JSON.parse(data)
        } catch (err) {
            throw err
        }
    }
    s
}

module.exports = Cart
