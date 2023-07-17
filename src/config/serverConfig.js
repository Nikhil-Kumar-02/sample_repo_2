const dotENV = require('dotenv');
dotENV.config();
const bcrypt = require('bcrypt');

module.exports = {
    PORT : process.env.PORT,
    SALT : bcrypt.genSaltSync(process.env.slatrounds),
    JWT_KEY : process.env.JWT_KEY,
    DB_SYNC : process.env.DB_SYNC
}