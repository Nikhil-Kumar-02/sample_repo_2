const { User } = require('../models/index');

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

}

module.exports = UserRepository;