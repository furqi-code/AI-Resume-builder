const express = require("express");
const Router = express.Router() ;
const {personalSchema} = require("../schema/personal") ;
const {validator} = require("../middleware") ;
const {executeQuery} = require("../mySqldb/Query") ;

Router.get("/", async function(req,res){
    const isAuth = req.isAuth ;
    const current_user = req.user_id ;
    const resume_id = req.query.resumeID ;
    if(isAuth){
        let show_personalDetails = await executeQuery(`select * from personal_details where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        res.render("personalDetails", {isAuth, arr : show_personalDetails}) ;
    }else{
        res.send({message : "kindly Login to edit your personal Details"}) ;
    }
})

Router.post("/",  async function(req,res){
    try{    
        const {username, gmail, location, linkedin, github, gender, phoneNumber} = req.body ;
        const current_user = req.user_id ;
        const resume_id = req.query.resumeID ;
        let existing_personalDetails = await executeQuery(`select * from personal_details where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        if(existing_personalDetails.length === 0)
        {
            let inserted_personalDetails = await executeQuery(`insert into personal_details(created_by, resume_id, name, email, address, linkedin, github, contact, gender)
                values(?,?,?,?,?,?,?,?,?)`,[current_user, resume_id, username, gmail, location, linkedin, github, phoneNumber, gender]) ;
        }else{
            // throw{
            //     message : "Personal Details of this Resume already exist"
            // }
            await executeQuery(`delete from personal_details where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
            let inserted_personalDetails = await executeQuery(`insert into personal_details(created_by, resume_id, name, email, address, linkedin, github, contact, gender)
                values(?,?,?,?,?,?,?,?,?)`,[current_user, resume_id, username, gmail, location, linkedin, github, phoneNumber, gender]) ;
        }
        res.status(200).send("personal Details inserted") ;
    }catch(err){
        console.log(err) ;  
        res.status(401).send({
            message : err.message ? err.message : "Something went wrong"
        })
    }
})

module.exports = {
    personalRouter : Router
}