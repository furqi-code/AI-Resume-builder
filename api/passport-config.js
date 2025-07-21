const passport = require("passport");
const { executeQuery } = require("./mySqldb/Query");
var GitHubStrategy = require("passport-github").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

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

module.exports = passport ;
