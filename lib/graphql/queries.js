const connectDb = require('../mongodb')
const { ObjectID } = require('mongodb')
const errorHandler = require('../../utils/errorHandler')

const NeoService = require('../../services/neos')

const neoService = new NeoService();

module.exports = {
    getNeos: async (root,{ first = 0 ,skip = 0 }) => {
        let neos = []        
        try {
            neos = await neoService.getNeos(first,skip);
        } catch (error) { 
            errorHandler(error)
        }
        return neos
    },
    getNeo: async (root,{id}) => {
        let neo
        try {
            neo = await neoService.getNeo(id);
        } catch (error) {
            errorHandler(error)
        }
        return neo
    },
    getNeosByDate: async (root,{firstDate,secondDate,first = 0 ,skip = 0}) => {
        let neos
    
        neos = await neoService.getNeosByDate(firstDate,secondDate,first,skip);
        
        return neos
    }
}