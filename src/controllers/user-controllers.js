const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req,res) => {
    try {
        const newUser = await userService.create({
            email : req.body.email,
            password : req.body.password
        });
        return res.status(201).json({
            data : newUser,
            message : "A new user account has been sucessfully created",
            sucess : true,
            error : {}
        })
    } catch (error) {
        console.log("something went wrong in the controller layer");
        return res.status(500).json({
            data : {},
            message : "Not able to perform the required request",
            sucess : false,
            error : error
        })
    }

}


const deleteUser = async (req,res) => {
    try {
        const reponse = await userService.delete(req.params.id);
        return res.status(201).json({
            data : reponse,
            message : "An account has been sucessfully deleted",
            sucess : true,
            error : {}
        })
    } catch (error) {
        console.log("something went wrong in the controller layer");
        return res.status(500).json({
            data : {},
            message : "Not able to perform the required request",
            sucess : false,
            error : error
        })
    }

}

module.exports = {
    create,
    deleteUser
}