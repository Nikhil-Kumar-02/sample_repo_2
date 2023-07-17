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

const isAdminRequsetValid = (req,res,next)=>{
    if(!req.body.id){
        console.log("something went wrong in middleware");
        return res.status(400).json({
            message : "the mandatory feild id is not present/sent",
            data : {},
            sucess : false,
            error : "id is missing"
        })
    }
    next();
}

module.exports = {
    validateUser,
    isAdminRequsetValid
}