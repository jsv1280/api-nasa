const express = require('express')
const { ObjectID } = require('mongodb')

const connectDb = require('../lib/mongodb')

const response = require('../utils/response')
const httpsRequest = require('../utils/httpsRequest');
const normalize = require('../utils/normalize');
const secureJWT = require('../utils/middlewares/secureRest')

const NeoService = require('../services/neos')

const neoService = new NeoService();


function restApi(app){
    const router = express.Router();
    app.use('/api/rest',router);

    router.get('/', secureJWT ,async function(req,res,next){

        try {
            neos = await neoService.getNeos(req.query.first,req.query.skip);

            response(200,{
                message: "Neos listed",
                neos,
            },res)

        } catch (error) {
            console.error(error)

            response(500,{
                message: error.message,
            },res)      
        }
    });

    router.post('/',secureJWT ,async function(req,res,next){

        let neo

        const {page,size,api_key_nasa} = process.env

        httpsRequest({page,size,api_key_nasa},async function(data){

            const normalized_data = normalize(JSON.parse(data))

            try {
        
                neo = await neoService.getNeoByReference(normalized_data[0].neo_reference_id);

                if(neo.length){

                    response(409,{
                        message: "Duplicated neos",
                        error: 'Neos object was created previously',
                    },res)
                }
                else {
                    neos = await neoService.createNeos(normalized_data);
                   
                    response(201,{
                        message: 'Neos created',
                        neos
                    },res)
                }
            
            } catch (error) {
                console.error(error)

                response(500,{
                    error: error.message
                },res)
            }
        })
    });

    router.delete('/', secureJWT, async function(req,res,next){
        let message
        try {

            message = await neoService.deleteDuplicatedNeos();

            response(200,{
                message
            },res)
 
        } catch (error) {
            console.error(error)

            response(500,{
                error: error.message
            },res)
        }
    });
    
}

module.exports = restApi;