const express = require('express');

function restApi(app){
    const router = express.Router();
    app.use('/api/rest',router);

    router.get('/', async function(req,res,next){

      
        try {
           
            res.status(200).json({
                message: "Movies Listed"
            })
        } catch (error) {
            console.log(error)
        }
    });

    router.post('/', async function(req,res,next){

        try {
            res.status(201).json({
                message: "Movie Created"
            })
        } catch (error) {
            console.log(error)
            
        }
    });
    
}

module.exports = restApi;