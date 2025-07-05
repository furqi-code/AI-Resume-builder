const express = require("express");
const Router = express.Router() ;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {SECRET} = require("../constants");
const {signinSchema} = require|("../schema/signin") ;
const {validator} = require("../middleware")
const {executeQuery} = require("../mySqldb/Query") ;


Router.post("/", async function(req,res){
    try{
        const {gmail, pass} = req.body ;
        if(gmail && pass)
        {
            let matched_user = await executeQuery(`select * from users where Email = ?`, [gmail]) ;
            console.log(matched_user) ;     // 2 length ka array nhi arha direct 0 index wala array of objects arha h
            if(matched_user.length > 0)
            {
                let dbUser = matched_user[0] ;  
                let hashPwrd = dbUser.Password ;
                if(bcrypt.compareSync(pass, hashPwrd))
                {
                    const token = jwt.sign(
                    {
                        username : dbUser.Username,
                        userid : dbUser.user_id
                    },SECRET)
                    res.cookie("userDetail", token, {httpOnly : true}) ;
                    res.status(200).send({
                        message : "User logged in"
                    })
                }else{
                    throw{
                        message : "Incorrect Password"
                    }
                }
            }else{
                throw{
                    message : "Incorrect Email"
                }
            }
        }else{
            throw{
                message : "provide Email/Password"
            }
        }
    }catch(err){
        console.log(err) ;
        res.status(401).send({
            message : err.message ? err.message : "Something went wrong"
        })
    }
})

module.exports = {
    signinRouter : Router
}