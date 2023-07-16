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

    async signIn(email , plainPassword){
        try {
            //now i have the user sent email and plainPassword
            //first get the password corrosponding to the input email
            const userDetails = await userRepository.getByEmail(email);
            console.log(userDetails);
            //now we have all user details with the corrosponding email
            //now check if the incoming password is same as the password while registering

            //also it is possible that incoming email does not exists in the database
            //will do some other day
            
            const isValidUser = this.checkPassword(plainPassword , userDetails.password);
            console.log("is he a valid user ",isValidUser);
            //if he is a valid user then we will create a token and send it to the frontend
            if(!isValidUser){
                console.log("you have entered a wrong password please try again");
                throw {error : "you have entered a wrong password please try again"};
            }

            return this.createToken({ email : userDetails.email , id : userDetails.id });
        } catch (error) {
            console.log("something went wrong while signing in at the service layer");
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
    //also checkPassword and create token is used by some class methods only so we can 
    //also make them private
}

module.exports = UserService;