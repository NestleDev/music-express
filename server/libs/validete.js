module.exports = (fields, files) => {
    if (!fields.name) {
        return { error: new Error('Укажите название') }
    } else if (!fields.price) {
        return { error: new Error('Укажите цену') }
    } else if (!files.photo.name || !files.photo.size) {
        return { error: new Error('Картинка не загружена') }
    }

    return { mes: 'Продукт успешно загружен', error: null }
}