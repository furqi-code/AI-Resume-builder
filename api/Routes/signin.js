const express = require("express");
const Router = express.Router() ;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {SECRET} = require("../constants");
const {executeQuery} = require("../mySqldb/Query") ;
const passport = require("../passport-config") ;
const {signinSchema} = require|("../schema/signin") ;
const {validator} = require("../middleware") ;

// locally handling user Login in our DB
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

// OAuth login via Google and GitHub using passport.js

// path : /login/google
// Sabse pehle ye route chalega → ye Google ki login screen pr redirect karega phir passport config ka verify callback fnc chlega
Router.get('/google', passport.authenticate('google',{
    scope : ['profile', 'email'],
    prompt: 'consent select_account' // forces account selection on Google ka login screen + re-consent
}))

// path : /login/google/callback
// Jab Google login complete ho jata hai, to Google yahan redirect karta hai
Router.get('/google/callback', passport.authenticate('google',{
    session : false
}), function(req,res,next) {
    const user = req.user ; // contains your user from your DB
    console.log(user) ;
    const token = jwt.sign(
        {
            username : user.Username ,
            userid : user.user_id
        },SECRET, {expiresIn: '1h'})
    res.cookie("userDetail", token, {httpOnly : true}) ;
    res.redirect('/') ;
})


// path : /login/github
// Sabse pehle ye route chalega → ye Github ki login screen pr redirect karega phir passport config ka verify callback fnc chlega
Router.get('/github', passport.authenticate('github',{
    // scope : ['profile']
    // OR
    scope: ['user:email']
    // only FB & google gives you account selection ka login screen
}))

// path : /login/github/callback
// Jab github login complete ho jata hai, to Github yahan reFB & googlect karta hai
Router.get('/github/callback', passport.authenticate('github',{
    session : false
}), function(req,res,next) {
    const user = req.user ; 
    console.log(user) ;
    const token = jwt.sign(
        {
            username : user.Username ,
            userid : user.user_id
        },SECRET, {expiresIn: '1h'})
    res.cookie("userDetail", token, {httpOnly : true}) ;
    res.redirect('/') ;
})

module.exports = {
    signinRouter : Router
}