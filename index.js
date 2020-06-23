require('dotenv').config()

// EXPRESS
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

//GRAPHQL
const graphqlMiddleware = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./lib/graphql/resolvers')

//UTILS
const { join } = require('path')
const { readFileSync } = require('fs')


// INITALIZE EXPRESS APP
const app = express();
const port = process.env.PORT || 8080;
const isDev = (process.env.NODE_ENV !== 'production ');

// ADD LAYERS OF SECURITY
app.use(cors())
app.use(helmet());

// LOAD SCHEMA
const typeDefs = readFileSync(
    join(__dirname,'lib','graphql','schema.graphql'),
    'utf-8'
)

const schema = makeExecutableSchema({
    typeDefs, resolvers
})

// ADD MIDDLEWARE TO EXPRESS
app.use('/api/graphql', graphqlMiddleware({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}))

// START SERVER
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/api/graphql`)
})