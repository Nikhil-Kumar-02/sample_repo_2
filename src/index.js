const express = require('express');
const app = express();

const dotENV = require('dotenv');
dotENV.config();


const startServer = async () => {

    app.listen(process.env.PORT , async () => {
        console.log(`server is running at port ${process.env.PORT}`);
    })

}

startServer();