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
    },
    getNeosByDate: async (root,{firstDate,secondDate}) => {
        let db
        let neos
        try {
            db = await connectDb()

            neos = await db.collection('neo').find({ "close_approach_data.close_approach_date": { $gte: firstDate, $lt:secondDate}  }).toArray()

        
        } catch (error) {
            errorHandler(error)
        }
        return neos
    },
    getSubscribers: async () => {
        let db
        let subscribers = []
        try {
            db = await connectDb()
            subscribers = await db.collection('suscripciones').find().toArray()
        } catch (error) {
            errorHandler(error)
        }
        return subscribers
    },
    getSubscriber: async (root,{email}) => {
        let db
        let subscriber
        try {
            db = await connectDb()
            subscriber = await db.collection('suscripciones').findOne({ email : email})
        } catch (error) {
            errorHandler(error)
        }
        return subscriber
    },
    getMemoramas: async () => {
        let db
        let memos = []
        try {
            db = await connectDb()
            memos = await db.collection('memorama').find().toArray()
        } catch (error) {
            errorHandler(error)
        }
        return memos
    },
    getMemorama: async (root,{id}) => {
        let db
        let memo
        try {
            db = await connectDb()
            memo = await db.collection('memorama').findOne({ _id : ObjectID(id)})
        } catch (error) {
            errorHandler(error)
        }
        return memo
    },
}