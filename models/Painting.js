const { v4: uuidv4 } = require('uuid');
const { readFile, writeFile } = require('fs/promises');
const path = require('path')

const DB = path.join(__dirname, '..', 'db', 'paintings.json')

class Painting {
    constructor(title, price, image) {
        this.id = uuidv4()
        this.title = title
        this.price = price
        this.image = image
    }

    async save() {
        const paintings = await Painting.getAll()
        paintings.push({
            id: this.id,
            title: this.title,
            price: this.price,
            image: this.image,
        })
        try {
            await writeFile(
                DB,
                JSON.stringify(paintings)
            )
        } catch (err) {
            throw err
        }
    }

    static async getAll() {
        try {
            const data = await readFile(DB)
            return JSON.parse(data)
        } catch (err) {
            throw err
        }
    }

    static async getByID(id) {
        const gallery = await Painting.getAll()
        const painting = gallery.find(el => el.id === id)
        return painting
    }

    static async update(painting) {
        const gallery = await Painting.getAll()
        const idx = gallery.findIndex(el => el.id === painting.id)

            gallery[idx] = painting
            try {
                await writeFile(
                    DB,
                    JSON.stringify(gallery)
                )
            } catch (err) {
                throw err
            }

    }
}

module.exports = Painting
