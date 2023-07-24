const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');
const AppErrors = require('../utils/error-handlers');
const userRepository = new UserRepository();


class UserService{

    async create(data){
        try {
            // console.log('incoming password is : ', data.password);
            const newUser = await userRepository.create(data);
            //here in the service layer i want to add the logic that whenever someone
            //signs up then he should automatically login as well
            //since he has just made the account so we need not to cross check the email
            //and password rather we can directly generate token for him
            //but the thing is that the incoming password is encrypted so we first have to 
            //decrypt it then generate the token?
            //no the incoming password is raw it will be encrypted before making entry in database

            const token = this.#createToken({ email : newUser.email , id : newUser.id });
            newUser.dataValues.token = token;
            //but this newUser object also has password feild and we dont want to send the password
            //deleting password key value pair from the object
            delete newUser.dataValues.password;
            return newUser;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw error;
            }
            console.log("something went wrong in the service layer");
            // throw new AppErrors(
            //     'serverError',
            //     'something went wrong in the service',
            //     'logical issue found',
            //     500
            // );
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
            console.log('details of the user who is about to sign in : ',userDetails);
            //now we have all user details with the corrosponding email
            //now check if the incoming password is same as the password while registering

            //also it is possible that incoming email does not exists in the database
            //will do some other day //done
            
            const isValidUser = this.#checkPassword(plainPassword , userDetails.password);
            console.log("is he a valid user ",isValidUser);
            //if he is a valid user then we will create a token and send it to the frontend
            if(!isValidUser){
                console.log("you have entered a wrong password please try again");
                throw {name : "IncorrectPassword"};
            }

            return this.#createToken({ email : userDetails.email , id : userDetails.id });
        } catch (error) {
            if(error.name == 'EmailNotFound'){
                throw error;
            }
            if(error.name == "IncorrectPassword"){
                throw new AppErrors(
                    'clientSideError',
                    'Incorrect password',
                    'please enter the correct password',
                    400
                )
            }
            console.log("something went wrong while signing in at the service layer");
            throw error;
        }
    }

    #createToken(data){
        try {
            const token = jwt.sign(data , JWT_KEY , { expiresIn: '1d' });
            return token;
        } catch (error) {
            console.log("something went wrong while creating the jwt web token");
            throw error;
        }
    }

    #verifyToken(token){
        try {
            const response = jwt.verify(token , JWT_KEY);
            return response;
        } catch (error) {
            console.log("something went wrong while token verification");
            throw error;
        }
    }

    #checkPassword(plainPassword , encryptedPassword){
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


    async isAuthenticated(token){
        try {
            const istokenValid = this.#verifyToken(token);
            console.log('is the user valid : ' , istokenValid);
            
            if(!istokenValid){
                throw {error : "the input token is not a valid token"};
            }
            //if token is valid then we will get this as response as we have seen 
            //{ id : " " , email : " " , iat : " " , exp : " " }

            //now even if the token is a vaild token then also there arises a edge case
            //where the user makes an account in the site and gets the token saved on the frontend
            //then deletes his account from the website and then he is making requrests
            //but he should not be allowed to make any request so we need to handle this
            //if token is valid the check if user exists or not
            const tokenUser = await userRepository.getById(istokenValid.id);
            if(!tokenUser){
                throw {error : "there exits no user with this token kindly login first to proceed"};
            }
            //if above both cases are checked then we can say the user is a valid user
            return tokenUser.id;
        } catch (error) {
            console.log("something went wrong in the service layer while token authentication");
            throw error;   
        }
    }

    async isAdmin(userId){
        try {
            const response = await userRepository.isAdmin(userId);
            return response;
        } catch (error) {
            console.log("something went wrong in the service layer while checking if is admin?");
            throw error;   
        }
    }
}

module.exports = UserService;