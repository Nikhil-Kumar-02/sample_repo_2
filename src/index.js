const express = require('express');
const app = express();
const {PORT , DB_SYNC} = require('./config/serverConfig');
const apiRoutes = require('./router/user-routes');
const bodyParser = require('body-parser');
// const UserService = require('./services/user-service');
const { User , Role } = require('./models/index');

const startServer = async () => {

    app.use(bodyParser.urlencoded({ extended: true }))

    app.use(bodyParser.json())

    app.use('/api' , apiRoutes);

    app.listen( PORT , async () => {
        console.log(`server is running at port ${PORT}`);

        const u1 = await User.findByPk(4);
        const r1 = await Role.findByPk(2);
        // u1.addRole(r1);
        // const res = await u1.getRoles();
        // const res = await r1.getUsers();
        const res = await u1.hasRole(3);
        //now can you see how simple authorization will be now as now if user u1 is doing something
        //which an admin can do then we can simply do u1.hasRole(1) is he has then
        //he is authorized to do so
        console.log(res);
        

        if(DB_SYNC){
            db.sequelize.sync({alter : true});
        }

        // const service = new UserService();

        // const newToken = await service.createToken({email : "random@gmail.com" , id : 4});
        // console.log("new created token is : ", newToken);
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmRvbUBnbWFpbC5jb20iLCJpZCI6NCwiaWF0IjoxNjg5NDg5NDA1LCJleHAiOjE2ODk0ODk0MTV9.JBE2UaMPKXZlB_OA6CL3IQlFsFzQEoEJ4GFZISXEyKI";
        // const response = await service.verifyToken(token);
        // console.log(response);
    })

}

startServer();