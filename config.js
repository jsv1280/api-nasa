// LOAD ENVIRONMENT VARIABLES 
require('dotenv').config()

module.exports = {
    environment: {
        env: process.env.NODE_ENV || 'production'
    },
    express_api: {
        port: process.env.PORT || 8090
    },
    mongodb: {
        mongo_uri : `mongodb://${process.env.DB_HOST}:${process.env.DB_HOST}/` ,
        database : process.env.DB_NAME
    },
    jwt: {
        secret: process.env.JWT_SECRET
    }
}