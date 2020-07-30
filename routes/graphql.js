const { join } = require('path')
const { readFileSync } = require('fs')

// GRAPHQL
const { makeExecutableSchema } = require('graphql-tools')
const graphqlMiddleware = require('express-graphql')
const resolvers = require('../lib/graphql/resolvers')

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

    // ADD ROUTE
    app.use('/api/graphql',graphqlMiddleware({
        schema: schema,
        rootValue: resolvers,
        graphiql: (config.environment.env == 'development') ? true : false 
    }));
    
}

module.exports = graphqlApi;