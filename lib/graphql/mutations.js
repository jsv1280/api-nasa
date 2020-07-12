'use strict'

const connectDb = require('../mongodb');

module.exports = {
    createSubscriber: async(root,{ input }) => {
        const defaults = {
            name: '',
            email: ''
        }

        const newSubscriber = Object.assign(defaults,input)
        let db
        let subscriber
        try {
            db = await connectDb()

            subscriber = await db.collection('suscripciones').insertOne(input)
            newSubscriber._id = subscriber.insertedId
        } catch (error) {
            console.error(error)
        }

        return newSubscriber
    }
}