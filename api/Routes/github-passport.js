const express = require("express");
const Router = express.Router() ;
const jwt = require('jsonwebtoken') ;
const passport = require("passport") ;
const { SECRET } = require("../constants") ;
const {executeQuery} = require("../mySqldb/Query") ;
var GitHubStrategy = require("passport-github").Strategy;

// Intiliazing passport as middleware in our application
Router.use(passport.initialize()) ;

// Configure Passport to use Github
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENTID,
      clientSecret: process.env.GITHUB_CLIENTSECRET,
      callbackURL: "/login/github/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        console.log("passport.use() wala callback wala chl rha h");
        console.log("GitHub Profile:", profile);
        let Username = profile.displayName;
        let provider = profile.provider;
        let profileUrl = profile.profileUrl; //  Email k column me ye daal rhe
        const user = await executeQuery(`select * from users where username = ?`,[Username]);
        if(user.length > 0) {
          cb(null, user[0]);
        }else {
          await executeQuery(`insert into users(Username, Email, Provider) values(?,?,?)`,[Username, profileUrl, provider] );
          const newUser = await executeQuery(`select * from users where username = ?`,[Username]);
          cb(null, newUser[0]);
        }
      } catch(error) {
        cb(error, false);
      }
    }
  )
)

// path : /login/github
// Sabse pehle ye route chalega → ye Github ki login screen pr redirect karega phir passport config ka verify callback fnc chlega
Router.get('/', passport.authenticate('github',{
    scope : ['profile']
    // OR
    // scope: ['user:email']
    // only FB & google gives you account selection ka login screen
}))

// path : /login/github/callback
// Jab github login complete ho jata hai, to Github yahan reFB & googlect karta hai
Router.get('/callback', passport.authenticate('github',{
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
    githubPassport : Router
}