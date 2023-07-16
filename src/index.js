const express = require('express');
const app = express();
const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./router/user-routes');
const bodyParser = require('body-parser');
const UserRepository = require('./repository/user-repository');
const userRepository = new UserRepository();

const startServer = async () => {

    app.use(bodyParser.urlencoded({ extended: true }))

    app.use(bodyParser.json())

    app.use('/api' , apiRoutes);

    app.listen( PORT , async () => {
        console.log(`server is running at port ${PORT}`);
        const id = 4;
        const userData = await userRepository.getById(id);
        console.log(userData);
    })

}

startServer();