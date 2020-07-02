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

            neos = await db.collection('neo').find({close_approach_data: {$elemMatch: { close_approach_date: '2020-07-02' }}}).toArray()
            // neos = await db.collection('neo').find({close_approach_data: {$elemMatch: { close_approach_date: '2020-07-02' }}},{name:1,close_approach_date:{$elemMatch: { close_approach_date: '2020-07-02' }}}).toArray()

        } catch (error) {
            errorHandler(error)
        }
        return neos
    }
}
git config --global user.email "jairosalazar1280@gmail.com"
it config --global user.name "Jairo Salazar"