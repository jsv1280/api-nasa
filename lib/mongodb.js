const config = require('../config')
const { MongoClient } = require('mongodb')

let connection 

async function connectDB(){
    if(connection) return connection

    let client
    try {
        client = await MongoClient.connect(config.mongodb.mongo_uri,{
            useNewUrlParser : true
        })

        connection = client.db(config.mongodb.database)

    } catch (error) {
        console.error('Could not connect to db',mongoUrl,error)
        process.exit(1)
    }

    return connection
    
}

module.exports = connectDB