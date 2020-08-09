const auth = require('../auth')
const errorHandler = require('../errorHandler')


function secureJWT(req,res,next){

    const authorization = req.headers.authorization

    if(!authorization){
        next(errorHandler('Authorization Failed'))
    }
    
    const checkToken = auth.verify(authorization)
    
    if(!checkToken){
        next(errorHandler('Authorization Failed'))
    }
    
    next()
}

module.exports = secureJWT