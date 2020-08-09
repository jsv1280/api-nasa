'use strict'

const bcrypt = require('bcrypt');
const errorHandler = require('../../utils/errorHandler')
const jwt = require('../../utils/auth');


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
    login : async(root, {username, password}) => {

        // Find user
        let user
        try {
            user = await userService.getUserByUsername(username);
            
        } catch (error) { 
            errorHandler(error)
        }

        if(!user){
            errorHandler("User or password mismatch")
        }

        // Check password
        let ok;
        try {
           
            ok = await bcrypt.compare(password,user.password)

            if(!ok){
                errorHandler("User or password mismatch")
            }

        } catch (error) {
            errorHandler(error.message)
        }

        // Sign token without password
        delete user.password

        return jwt.sign(user)
    } 
}