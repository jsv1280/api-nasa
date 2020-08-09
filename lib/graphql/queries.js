const errorHandler = require('../../utils/errorHandler')

const NeoService = require('../../services/neos')
const UserService = require('../../services/users')

const neoService = new NeoService();
const userService = new UserService();

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
    },
    getUsers: async (root,{ first = 0 ,skip = 0 }) => {
        let users = []        
        try {
            users = await userService.getUsers(first,skip);
        } catch (error) { 
            errorHandler(error)
        }
        return users
    },
    getUser: async (root,{id}) => {
        let user
        try {
            user = await userService.getUser(id);
        } catch (error) {
            errorHandler(error)
        }
        return user
    },
}