'use strict'

const bcrypt = require('bcrypt');
const errorHandler = require('../../utils/errorHandler')


const UserService = require('../../services/users')

const userService = new UserService();

module.exports = {
    createUser : async (root, { input }) => {

        const defaults = {
            name : '',
            username: '',
            password: ''
        }

        const newUser = Object.assign(defaults,input)

        newUser.password = await bcrypt.hash(newUser.password,10);

        let user
        try {
            user = await userService.insertUser(newUser);
            newUser._id = user.insertedId
        } catch (error) { 
            errorHandler(error)
        }
        
        return newUser
    },
}