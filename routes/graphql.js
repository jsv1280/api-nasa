const { join } = require('path')
const { readFileSync } = require('fs')

// GRAPHQL
const { makeExecutableSchema } = require('graphql-tools')
const graphqlMiddleware = require('express-graphql')
const resolvers = require('../lib/graphql/resolvers')
const secureJWT = require('../utils/middlewares/secureGraphQL');

const config = require('../config')

function graphqlApi(app){

    // LOAD GRAPHQL SCHEMA
    const typeDefs = readFileSync(
        join(__dirname,'..','lib','graphql','schema.graphql'),
        'utf-8'
    )

    const schema = makeExecutableSchema({
        typeDefs, resolvers
    })

    // Add middleware to secure query resolvers with JWT
    secureJWT(schema,'Query')

    app.use('/api/graphql',graphqlMiddleware({
        schema: schema,
        rootValue: resolvers,
        graphiql: (config.environment.env == 'development') ? true : false 
    }));
    
}

module.exports = graphqlApi;