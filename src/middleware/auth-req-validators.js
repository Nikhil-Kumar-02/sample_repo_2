const validateUser = (req,res,next)=>{
    if(!req.body.email || !req.body.password){
        console.log("something went wrong in the middleware");
        return res.status(400).json({
            sucess : false,
            data : {},
            message : "either of email or password is missing",
            error : "mandatory feilds empty"
        })
    }
    next();
}

module.exports = {
    validateUser
}