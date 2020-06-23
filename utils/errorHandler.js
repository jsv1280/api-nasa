function errorHandler(error){
    console.error(error)
    throw new Error('Fallo en la operación del servidor')
}

module.exports = errorHandler