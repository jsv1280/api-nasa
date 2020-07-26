const config = require('./config')

// EXPRESS
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// UTILS
const { join } = require('path')

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

// START SERVER
app.listen(config.express_api.port, () => {
    console.log(`Server is listening at http://localhost:${config.express_api.port}`)
})