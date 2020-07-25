function errorHandler(title,description){
    throw new Error(`[${title}] ${description}`)
}

module.exports = errorHandler