const { User , Role } = require('../models/index');
const ValidateErrors = require('../utils/validation-error');
const ClientErrors = require('../utils/client-errors');
const {StatusCodes} = require('http-status-codes');

class UserRepository{

    async create(data){
        try {
            const newUser = await User.create(data);
            //now we also have to make sure that whenever anyone makes an account we have 
            //entitle him a customer role by default
            const role = await Role.findOne({
                where : {
                    userRole : 'CUSTOMER'
                }
            });
            //NOW WE WILL ASSIGN THIS USER CUSTOMER ROLE
            newUser.addRole(role);
            return newUser;
        } catch (error) {
            // console.log(error);
            if(error.name == 'SequelizeValidationError'){
                // console.log("creating new validation error")
                // let validationError = new ValidateErrors(error);
                // console.log("printing the error",validationError);
                // console.log("created new validation error")
                throw new ValidateErrors(error);
            }
            console.log("something went wrong in the repository layer");
            throw error;
        }
    }

    async delete(userId){
        try {
            await User.destroy({
                where : {
                    id : userId
                }
            });
            return true;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw error;
        }
    }

    async getById(userId){
        try {
            const response = await User.findByPk(userId,{
                    attributes : {
                        exclude : ['password']
                    }
                }
            );
            return response;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw error;
        }
    }

    async getByEmail(email){
        try {
            const userDetails = await User.findOne({
                where :{
                    email : email
                }
            })
            if(!userDetails){
                throw new ClientErrors(
                    'EmailNotFound',
                    'Invalid Email sent in the request',
                    'please check the email, as there is no record of the email',
                    StatusCodes.NOT_FOUND
                )
            }
            return userDetails;
        } catch (error) {
            // console.log(error);
            console.log("something went wrong while getting details by email in the repo layer");
            throw error;
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const adminKey = await Role.findOne({
                where : {
                    userRole : 'ADMIN'
                }
            });
            const adminRoleAssigned = await user.hasRole(adminKey);
            //from above we will get boolean value which indicates if he is admin or not
            console.log("the user is valid true/false :" , adminRoleAssigned);
            return adminRoleAssigned;
        } catch (error) {
            console.log("something went wrong while admin verification in the repo layer");
            throw error;
        }
    }
}

module.exports = UserRepository;