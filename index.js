// LOAD ENVIRONMENT VARIABLES 
require('dotenv').config()

// EXPRESS
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// GRAPHQL
const graphqlMiddleware = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./lib/graphql/resolvers')

// UTILS
const { join } = require('path')
const { readFileSync } = require('fs')
const httpsRequest = require('./utils/httpsRequest');
const normalize = require('./utils/normalize');

// INITALIZE EXPRESS APP
const app = express();
const port = process.env.PORT || 8090;
const isDev = (process.env.NODE_ENV !== 'production');

// ADD LAYERS OF SECURITY
app.use(cors())
app.use(helmet());

// STATIC FILES
app.use('/static', express.static(join(__dirname,"public")))

// LOAD SCHEMA
const typeDefs = readFileSync(
    join(__dirname,'lib','graphql','schema.graphql'),
    'utf-8'
)

const schema = makeExecutableSchema({
    typeDefs, resolvers
})

app.get('/rest/nasa_neo',function(req,res){
    
    const {page,size,api_key_nasa} = process.env

    httpsRequest({page,size,api_key_nasa},function(data){

        const normalized_data = normalize(JSON.parse(data))

        res.json(normalized_data)
    })
})

// ADD MIDDLEWARE TO EXPRESS
app.use('/api/graphql', graphqlMiddleware({
    schema: schema,
    rootValue: resolvers,
    graphiql: isDev
}))

// START SERVER
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})