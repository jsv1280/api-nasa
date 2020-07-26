function response(status,message,res){
    res.status(status).json({
        data : message
    })
}

module.exports = response
