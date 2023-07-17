const serverConfig = require('../config/serverConfig');
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
        const rseponse = await userService.delete(req.params.id);
        return res.status(201).json({
            data : rseponse,
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

const signIn = async (req,res) => {
    try {
        const response = await userService.signIn(req.body.email,req.body.password);
        //here in response the jwt token is present and that will be returned
        console.log("the recieved jwt token for the sign in is : ",response);
        return res.status(200).json({
            data : response,
            message : "You have been sucessfully signed in",
            sucess : true,
            error : {}
        })
        } catch (error) {
            console.log("something went wrong in the controller layer");
            return res.status(500).json({
                data : {},
                message : "Not able to perform the signIN request",
                sucess : false,
                error : error
            })
        }
    }

    const isAuthenticated = async (req,res) => {
        try {
            const incomingToken = req.headers['x-access-token'];
            const response = await userService.isAuthenticated(incomingToken);
            return res.status(200).json({
                sucess : true,
                message : "user is authenticated and token is valid",
                error : {},
                data : response
            });
        } catch (error) {
            console.log("something went wrong in the controller layer while authentication");
            return res.status(500).json({
                data : {},
                message : "User is not authenticated to perform activity",
                sucess : false,
                error : error
            })
        }
    }

    const isAdmin = async (req,res) => {
        try {
            const response = await userService.isAdmin(req.body.id);
            return res.status(200).json({
                data : response,
                sucess : true,
                error : {},
                message : "sucessfully checked if the user is admin or not"
            })
        } catch (error) {
            console.log("something went wrong in the controller while checking for admin");
            return res.status(400).json({
                sucess : false,
                data : {},
                error : error,
                message : "something went wrong"
            })
        }
    }

module.exports = {
    create,
    deleteUser,
    signIn,
    isAuthenticated,
    isAdmin
}