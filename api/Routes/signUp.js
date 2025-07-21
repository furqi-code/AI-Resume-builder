const express = require("express");
const Router = express.Router() ;
const bcrypt = require("bcrypt");
const {SALTROUNDS} = require("../constants");
const {signUpschema} = require("../schema/signup")
const {validator} = require("../middleware")
const {executeQuery} = require("../mySqldb/Query") ;


// Handles user registration using email and password locally
Router.post("/", async function(req,res){
    try{
        const {name, pass, gmail} = req.body ;
        if(name && pass)
        {
            const existingUser = await executeQuery(`select * from users where Email = ?`, [gmail]);
            if(existingUser.length > 0){
                throw{
                    message: "User already exists with this email"
                }
            }
            let inserted_user = await executeQuery(`insert into users(username, password, Email, Provider) values(?,?,?,?)`,
                [name, bcrypt.hashSync(pass,SALTROUNDS), gmail, 'local']) ;
            console.log(inserted_user) ;    // ab ek array k andar obj nhi h, direct obj mil rha
            if(inserted_user.insertId > 0){
                res.status(200).send("User created") ;
            }else{
                throw{
                    message : "User not created"
                }
            }
        }else{
            throw{
                message : "please provide necessary details"
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
    signupRouter: Router 
};