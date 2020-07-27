const MongoLib = require('../lib/mongodb')

const { convertToDateFormat, isGreater} = require('../utils/dateHandler')
const errorHandler = require('../utils/errorHandler')

class NeoService {
    constructor(){
        this.collection = 'neo'
        this.mongoDB = new MongoLib()
    }

    async getNeos(first,skip){
        let neos
        try {
            neos = await this.mongoDB.getAll(this.collection,{},parseInt(first),parseInt(skip));

        } catch (error) {
            errorHandler(error.message)
        }
        return neos || [];
    }

    async getNeo(id){
        let neo
        try {
            neo = await this.mongoDB.get(this.collection,id);
        } catch (error) {
            errorHandler(error.message)
        }
        
        return neo || [];
    }

    async getNeosByDate(firstDate,secondDate,firstPaginator,skip){
        let neos
        const firstDateFormat = convertToDateFormat(firstDate);
        const secondDateFormat = convertToDateFormat(secondDate);

        if(isNaN(firstDateFormat) || isNaN(secondDateFormat)){
            errorHandler('Send a date with valid format yyyy-mm-dd ')
        }

        if(!isGreater(secondDateFormat,firstDateFormat)){
            errorHandler('Logical Error','secondDate must be equal or greater than firstDate')
        }

        const query = {
            "close_approach_data.close_approach_date" : { $gte: firstDate, $lte:secondDate }
        }

        try {
            neos = await this.mongoDB.getAll(this.collection,query,parseInt(firstPaginator),parseInt(skip))
        } catch (error) {
            errorHandler(error.message)
        }

        return neos || [];
    }

    async createNeos(neos){

        try {
            neos = await this.mongoDB.createMany(this.collection,neos)
        } catch (error) {
            errorHandler(error.message)
        }

        return neos || [];

    }

    async getNeoByReference(value){
        let neo
        try {
            neo = await this.mongoDB.getField(this.collection,"neo_reference_id",value);
        } catch (error) {
            errorHandler(error.message)
        }
        
        return neo || [];
    }
}

module.exports = NeoService