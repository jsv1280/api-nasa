const response = require('../response');

function errors(err,req,res,next){
    console.error(err);
    response(500,err.message,res)
}

module.exports = errors