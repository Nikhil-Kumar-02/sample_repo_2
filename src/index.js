const express = require('express');
const app = express();
const {PORT} = require('./config/serverConfig');

const startServer = async () => {

    app.listen( PORT , async () => {
        console.log(`server is running at port ${PORT}`);
    })

}

startServer();