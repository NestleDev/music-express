const fs = require('fs')
const path = require('path')
const validete = require('../helpers/validete')
const db = require('../model/db')
const config = require('../config.json')

module.exports = (ctx) => {
    const fields = ctx.request.body
    const file = ctx.request.files

    const isValid = validete(fields, file)

    if (isValid.error) {
        fs.unlinkSync(file.photo.path)

        return isValid
    }

    try {
        fs.renameSync(file.photo.path,
            path.join(config.upload.path, file.photo.name))

        const data = {
            src: `./${config.upload.file}/${file.photo.name}`,
            name: fields.name,
            price: fields.price
        }

        db.get('products')
            .push(data)
            .write()

        return isValid
    } catch (error) {
        return { mes: 'При загрузке картинки произошла ошибка', error: true }
    }
}