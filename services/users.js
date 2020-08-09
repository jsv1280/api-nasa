const MongoLib = require('../lib/mongodb')


const errorHandler = require('../utils/errorHandler')

class UserService {
    constructor(){
        this.collection = 'users'
        this.mongoDB = new MongoLib()
    }

    async getUsers(first,skip){
        let users
        
        try {
            users = await this.mongoDB.getAll(this.collection,{},parseInt(first),parseInt(skip));
        } catch (error) {
            errorHandler(error.message)
        }
        return users || [];
    }

    async getUser(id){
        let user
        try {
            user = await this.mongoDB.get(this.collection,id);
        } catch (error) {
            errorHandler(error.message)
        }
        
        return user || [];
    }

    async insertUser(newUser){
        let user
        try {
            user = await this.mongoDB.insertOne(this.collection,newUser);
        } catch (error) {
            errorHandler(error.message)
        }

        return user
    }

}

module.exports = UserService