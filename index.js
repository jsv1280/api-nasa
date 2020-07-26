const config = require('./config')

// EXPRESS
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');



// UTILS
const { join } = require('path')

const httpsRequest = require('./utils/httpsRequest');
const normalize = require('./utils/normalize');
const connectDb = require('./lib/mongodb');

// INITALIZE EXPRESS APP
const app = express();
const rest = require('./routes/rest')
const graphql = require('./routes/graphql')

// ADD LAYERS OF SECURITY
app.use(cors())
app.use(helmet());

// LOAD REST API
rest(app)

// LOAD GRAPHQL API
graphql(app)

// STATIC FILES
app.use('/static', express.static(join(__dirname,"public")))


app.get('/rest/nasa_neo',function(req,res){
    
    const {page,size,api_key_nasa} = process.env

    httpsRequest({page,size,api_key_nasa},async function(data){

        const normalized_data = normalize(JSON.parse(data))

        try {
            db = await connectDb()
            neo = await db.collection('neo').findOne({ neo_reference_id : normalized_data[0].neo_reference_id})

            if(neo){
                res.status(409).json({
                    title: 'Duplicated Resources',
                    error: 'Neos Object was created previously'
                }) 
            }
            else {
                
                neos = await db.collection('neo').insertMany(normalized_data)
                res.json(neos.ops)
            }
           
        } catch (error) {
            console.error(error)

            res.status(500).json({
                title: error.title,
                error: error.message
            })
        }
        
        
    })
})

// START SERVER
app.listen(config.express_api.port, () => {
    console.log(`Server is listening at http://localhost:${config.express_api.port}`)
})