const AppErrors = require('./error-handlers');
const {StatusCodes} = require('http-status-codes');

class ValidateErrors extends AppErrors{
    constructor(error){
        let errorNames = error.name;
        let explanation = [];
        error.errors.forEach((err) => {
           explanation.push(err.message); 
        });

        super(
            errorNames,
            "the sent feilds does not match the required constraints",
            explanation,
            StatusCodes.BAD_REQUEST
        )
    }
}

module.exports = ValidateErrors;

