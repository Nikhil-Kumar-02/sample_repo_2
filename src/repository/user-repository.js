const { User , Role } = require('../models/index');

class UserRepository{

    async create(data){
        try {
            const newUser = await User.create(data);
            return newUser;
        } catch (error) {
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
            return userDetails;
        } catch (error) {
            console.log("something went wrong while getting details by email in the repo layer");
            throw error;
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            console.log("after user and before admin key");
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