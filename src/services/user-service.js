const UserRepository = require('../repository/user-repository');

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

}

module.exports = UserService;