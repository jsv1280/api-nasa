const express = require('express')

const connectDb = require('../lib/mongodb')

const response = require('../utils/response')
const httpsRequest = require('../utils/httpsRequest');
const normalize = require('../utils/normalize');


function restApi(app){
    const router = express.Router();
    app.use('/api/rest',router);

    router.get('/', async function(req,res,next){

        try {
            db = await connectDb()
            neos = await db.collection('neo').find().toArray()

            response(200,{
                message: "Neos listed",
                neos,
            },res)

        } catch (error) {
            console.error(error)

            response(500,{
                title: error.title,
                message: error.message,
            },res)
        }
    });

    router.post('/', async function(req,res,next){

        const {page,size,api_key_nasa} = process.env

        httpsRequest({page,size,api_key_nasa},async function(data){

            const normalized_data = normalize(JSON.parse(data))

            try {
                db = await connectDb()
                neo = await db.collection('neo').findOne({ neo_reference_id : normalized_data[0].neo_reference_id})

                if(neo){

                    response(409,{
                        message: "Duplicated neos",
                        error: 'Neos object was created previously',
                    },res)
                }
                else {
                    
                    neos = await db.collection('neo').insertMany(normalized_data)
                    
                    response(201,{
                        message: 'Neos created',
                        neos : neos.ops
                    },res)
                }
            
            } catch (error) {
                console.error(error)

                response(500,{
                    title: error.title,
                    error: error.message
                },res)
            }
        })
    });
    
}

module.exports = restApi;