'use strict';

const https = require('https');

function httpsRequest(dataRequest, callback){

    let data = ''

    const {page,size,api_key_nasa} = dataRequest
    const options = {
        hostname: 'api.nasa.gov',
        port: 443,
        path:   `/neo/rest/v1/neo/browse?page=${encodeURI(page)}&size=${encodeURI(size)}&api_key=${encodeURI(api_key_nasa)}`,
        method: 'GET'
    };

    const request = https.request(options, (res) => {
      
        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {

            //console.log(data, 'DATA');
            callback(data)
            
            
        });
    });
      
    request.on('error', (e) => {
        console.error(e);
    });
    
    request.end();
}

function encodeURI(parameter){
    return encodeURIComponent(parameter)
}

module.exports = httpsRequest