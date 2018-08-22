module.exports = (fields, files) => {
    if (!fields.name) {
        return { mes: 'Укажите название', error: true }
    } else if (!fields.price) {
        return { mes: 'Укажите цену', error: true }
    } else if (!files.photo.name || !files.photo.size) {
        return { mes: 'Укажите цену', error: true }
    }

    return { mes: 'Продукт успешно загружен', err: false }
}