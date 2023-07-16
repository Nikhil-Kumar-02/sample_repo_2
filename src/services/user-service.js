const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');

const userRepository = new UserRepository();

class UserService{

    async create(data){
        try {
            const newUser = await userRepository.create(data);
            return newUser;
        } catch (error) {
            console.log("something went wrong in the service layer");
            throw error;
        }
    }


    async delete(userId){
        try {
            const newUser = await userRepository.delete(userId);
            return newUser;
        } catch (error) {
            console.log("something went wrong in the service layer");
            throw error;
        }
    }

    createToken(data){
        try {
            const token = jwt.sign(data , JWT_KEY , { expiresIn: '1d' });
            return token;
        } catch (error) {
            console.log("something went wrong while creating the jwt web token");
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token , JWT_KEY);
            return response;
        } catch (error) {
            console.log("something went wrong while token verification" , error);
            throw error;
        }
    }

    checkPassword(plainPassword , encryptedPassword){
        try {
            const isValid = bcrypt.compareSync(plainPassword, encryptedPassword);
            return isValid;
            //if he has entered valid password and username combination then we is eligible for 
            //getting a new token
        } catch (error) {
            console.log("something went wrong in the password comparison");
            throw error;
        }
    }

}

module.exports = UserService;