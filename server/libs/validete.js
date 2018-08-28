module.exports = (fields, files) => {
    if (!fields.name) {
        return { error: new Error('Укажите название'), mes: null }
    } else if (!fields.price) {
        return { error: new Error('Укажите цену'), mes: null }
    } else if (!files.photo.name || !files.photo.size) {
        return { error: new Error('Картинка не заргужена'), mes: null }
    }

    return { error: null, mes: 'Продукт успешно загружен' }
}