const express = require('express');
const app = express();
const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./router/user-routes');
const bodyParser = require('body-parser');

const startServer = async () => {

    app.use(bodyParser.urlencoded({ extended: true }))

    app.use(bodyParser.json())

    app.use('/api' , apiRoutes);

    app.listen( PORT , async () => {
        console.log(`server is running at port ${PORT}`);
    })

}

startServer();