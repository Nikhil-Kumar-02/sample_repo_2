const AppErrors = require('./error-handlers');
const {StatusCodes} = require('http-status-codes');

class ClientErrors extends AppErrors{
    constructor(name,message,explanation,statusCode){
        super(
            name,
            message,
            explanation,
            statusCode
        )
    }
}

module.exports = ClientErrors;

