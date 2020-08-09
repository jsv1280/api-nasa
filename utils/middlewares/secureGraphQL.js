const { addMiddleware } = require('graphql-add-middleware');
const errorHandler = require('../errorHandler')
const auth = require('../auth')


function middlewareGraphQL(schema,resolver){

    return addMiddleware(schema, resolver, async function (root, args, context, info, next) {

        const authorization = context.headers.authorization
    
        if(!authorization){
            next(errorHandler('Authorization Failed'))
        }
        
        const checkToken = auth.verify(authorization)
        
        if(!checkToken){
            next(errorHandler('Authorization Failed'))
        }
        
        result = await next();
    
        return result
    
    })

}

module.exports = middlewareGraphQL;