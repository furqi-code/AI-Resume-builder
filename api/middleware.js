const jwt = require("jsonwebtoken");
const {SECRET} = require("./constants");

function AuthMiddleware(req,res,next)
{
    try{
        const token = req.cookies.userDetail ;
        const payload = jwt.verify(token,SECRET) ;
        req.user_id = payload.userid ;
        // req.username = payload.Username ;
        req.isAuth = true ;
        next() ;
    }catch(err){
        req.isAuth = false ;
        next() ;
    }
}

function validator(schema)
{
    return function(req,res,next){
        try{
            const {error} = schema.validate(req.body) ;
            if(error) throw error ;
            next()
        }catch(error){
            res.status(400).send(error.message) ;
        }
    }
}

module.exports  = {
    Auth : AuthMiddleware,
    validator
}