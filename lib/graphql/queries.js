const connectDb = require('../mongodb')
const { ObjectID } = require('mongodb')
const errorHandler = require('../../utils/errorHandler')

module.exports = {
    getNeos: async () => {
        let db
        let neos = []
        try {
            db = await connectDb()
            neos = await db.collection('neo').find().toArray()
        } catch (error) {
            errorHandler(error)
        }
        return neos
    },
    getNeo: async (root,{id}) => {
        let db
        let neo
        try {
            db = await connectDb()
            neo = await db.collection('neo').findOne({ _id : ObjectID(id)})
        } catch (error) {
            errorHandler(error)
        }
        return neo
    }
}