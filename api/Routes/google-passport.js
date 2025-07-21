const express = require("express");
const Router = express.Router() ;
const jwt = require('jsonwebtoken') ;
const passport = require("passport") ;
const { SECRET } = require("../constants") ;
const {executeQuery} = require("../mySqldb/Query") ;
const GoogleStrategy = require('passport-google-oauth20').Strategy ;

// Intiliazing passport as middleware in our application
Router.use(passport.initialize()) ;

// Configure Passport to use Google OAuth
passport.use(new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENTID ,
    clientSecret : process.env.GOOGLE_CLIENTSECRET ,
    callbackURL : "/login/google/callback"
}, async function(accessToken, refreshToken, profile, cb) {
    try{
        console.log("passport.use() wala callback wala chl rha h") ;
        console.log(profile) ;
        let Username = profile.displayName ;
        let provider = profile.provider ;
        let email = profile.emails[0].value ;
        const user = await executeQuery(`select * from users where email = ?`, [email]) ;
        if(user.length > 0){
            cb(null, user[0]) ;
        }else{
            await executeQuery(`insert into users(Username, Email, Provider) values(?,?,?)`, [Username, email, provider]) ;
            const newUser  = await executeQuery(`select * from users where email = ?`, [email]) ;
            cb(null, newUser[0]) ;
        }
    }catch(error){
        cb(error, false) ;
    }
}))

// path : /login/google
// Sabse pehle ye route chalega → ye Google ki login screen pr redirect karega phir passport.use() ka verify callback fnc chlega
Router.get('/', passport.authenticate('google',{
    scope : ['profile', 'email'],
    prompt: 'consent select_account' // forces account selection on Google ka login screen + re-consent
}))

// path : /login/google/callback
// Jab Google login complete ho jata hai, to Google yahan redirect karta hai
Router.get('/callback', passport.authenticate('google',{
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

module.exports = {
    googlePassport : Router
}
