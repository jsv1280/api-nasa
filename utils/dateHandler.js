function convertToDateFormat(date){
    return new Date(date).setHours(0,0,0,0);
}

function isGreater(secondDate,firstDate){
    return secondDate >= firstDate
}

module.exports = {
    convertToDateFormat,
    isGreater
}