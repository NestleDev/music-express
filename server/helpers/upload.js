const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const validete = require('../helpers/validete')
const db = require('../model/db')
const config = require('../config.json')

module.exports = (req, res, cb) => {
    const form = new formidable.IncomingForm()

    form.uploadDir = path.join(process.cwd(), config.upload.path)
    form.parse(req, (err, fields, files) => {
        if (err) {
            return cb({ msg: 'Возникла ошибка при загрузке данных' }, null)
        }

        const isValid = validete(fields, files)

        if (isValid.error) {
            fs.unlinkSync(files.photo.path)

            return cb({ msg: isValid.mes }, null)
        }

        fs.rename(files.photo.path, path.join(config.upload.path, files.photo.name), (error) => {
            if (error) {
                return cb({ msg: 'Возникла ошибка при загрузке изображения' }, null);
            }

            const data = {
                src: `./${config.upload.file}/${files.photo.name}`,
                name: fields.name,
                price: fields.price
            }

            db.get('products')
                .push(data)
                .write()

            return cb(null, 'Продукт успешно загружен')
        })
    })
}