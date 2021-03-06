const config = require('../config')
const { MongoClient,ObjectID } = require('mongodb')

class MongoLib {
    constructor(){
        this.client = new MongoClient(config.mongodb.mongo_uri, { useNewUrlParser: true });
        this.dbName = config.mongodb.database;
    }

    connect() {
        if (!MongoLib.connection) {
          MongoLib.connection = new Promise((resolve, reject) => {
            this.client.connect((err) => {
              if (err) {
                reject(err);
              }
              console.log("Connected succesfully to Mongo");
              resolve(this.client.db(this.dbName));
            });
          });
        }
    
        return MongoLib.connection;
    }

    getAll(collection, query, first,skip) {

        return this.connect().then((db) => {
          return db.collection(collection).find(query).limit(first).skip(skip).toArray();
        });
    }

    get(collection,id) {
        return this.connect().then((db) => {
          return db.collection(collection).findOne({ _id: ObjectID(id) });
        });
    }

    getField(collection,field,value) {
      return this.connect().then((db) => {
        return db.collection(collection).find({ [field] : value }).toArray();
      });
  }

    createMany(collection,data){
      return this.connect()
        .then((db) => {
          return db.collection(collection).insertMany(data);
        })
      .then((result) => result.ops);
     
    }

    getDuplicatesNeos(collection){
      return this.connect().then((db) => {

          return db.collection(collection).aggregate([  
            { 
                $group: { 
                    _id: {name: "$name"},
                    uniqueIds: {$addToSet: "$_id"},
                    count: {$sum: 1}
                } 
            }, 
            {
                $match: { 
                    count: {"$gt": 1}
                }
            }
          ]).toArray()

        })
    }

    deleteMany(collection,neos){

      return this.connect().then((db) => {

        return db.collection(collection).deleteMany({_id: { $in: neos}});

      });
    }

    insertOne(collection,element){

      return this.connect().then((db) => {

        return db.collection(collection).insertOne(element);

      });
    }

    getOneBy(collection,prop,query){

      return this.connect().then((db) => {

        return db.collection(collection).findOne({ [prop] : query });

      });

    }
  
}

module.exports = MongoLib