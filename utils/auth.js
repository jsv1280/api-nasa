const jwt = require('jsonwebtoken');
const config = require('../config');

function sign(data){
    return jwt.sign(data,config.jwt.secret)
}

function verify(token){
    return jwt.verify(token,config.jwt.secret)
}

module.exports = {
    sign,
    verify
}