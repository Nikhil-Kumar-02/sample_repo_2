const express = require('express');
const app = express();
const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./router/user-routes');
const bodyParser = require('body-parser');
// const UserService = require('./services/user-service');

const startServer = async () => {

    app.use(bodyParser.urlencoded({ extended: true }))

    app.use(bodyParser.json())

    app.use('/api' , apiRoutes);

    app.listen( PORT , async () => {
        console.log(`server is running at port ${PORT}`);

        // const service = new UserService();

        // const newToken = await service.createToken({email : "random@gmail.com" , id : 4});
        // console.log("new created token is : ", newToken);
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmRvbUBnbWFpbC5jb20iLCJpZCI6NCwiaWF0IjoxNjg5NDg5NDA1LCJleHAiOjE2ODk0ODk0MTV9.JBE2UaMPKXZlB_OA6CL3IQlFsFzQEoEJ4GFZISXEyKI";
        // const response = await service.verifyToken(token);
        // console.log(response);
    })

}

startServer();