const express = require("express") ;
const Router = express.Router() ;
const bcrypt = require("bcrypt") ;
const {SALTROUNDS} = require("../constants") ;
const {forgetPassword_schema} = require("../schema/resetPassword") ;
const {validator} = require("../middleware") ;
const {executeQuery} = require("../mySqldb/Query") ;


Router.get("/test", function(req, res){
    res.send("Test route working!") ;
});

Router.patch("/", async function(req,res){
    try{
        const {email, newPassword, confirmPassword} = req.body ; 
        let existing_user = await executeQuery(`select * from users where Email = ?`, [email]) ;
        console.log(existing_user) ;
        if(existing_user.length > 0)
        {
            let dbUser = existing_user[0] ;
            let update_pass = await executeQuery(`update users set Password = ? where user_id = ?`,
                [bcrypt.hashSync(newPassword, SALTROUNDS), dbUser.user_id]) ;
            console.log(update_pass) ;
            res.status(200).send({
                message : "Reset Password successfully"
            })
            // if(update_pass.affectedRows > 0){
            // }else{
            //     res.status(404).send("Password cant be Reset") ;
            // }
        }else{
            throw {
                message : "Email/user not found in DB"
            }
        }
    }catch(error){
        res.status(500).send({
            message : error.message ? error.message : "Something went wrong" 
        })
    }
})

module.exports = Router ;