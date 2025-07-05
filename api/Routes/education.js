const express = require("express");
const Router = express.Router() ;
const {educationSchema} = require("../schema/education") ;
const {validator} = require("../middleware") ;
const {executeQuery} = require("../mySqldb/Query") ;

Router.get("/", async function(req,res){
    const isAuth = req.isAuth ;
    const current_user = req.user_id ;
    const resume_id = req.query.resumeID ;
    let show_educationDetails = await executeQuery(`select * from education where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
    if(show_educationDetails.length > 0)
        res.render("education", {isAuth, arr : show_educationDetails}) ;
    else
        res.render("education", {isAuth, arr : []}) ;
})

Router.post("/", validator(educationSchema), async function(req,res){
    try{    
        const current_user = req.user_id ;
        const resume_id = req.query.resumeID ;
        const {degree, start, end, percentage} = req.body;
        let existing_education = await executeQuery(`select * from education where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        if(existing_education.length === 0)
        {
            let inserted_educationDetails = await executeQuery(`insert into education(created_by, resume_id, degree_name, start_year, end_year, percentage) values(?,?,?,?,?,?)`,
                [current_user, resume_id, degree, start, end, percentage]) ;
            res.status(200).send("education Details inserted") ;
        }else{
            // throw{
            //     message : "Education details of this Resume already exist"
            // }
            await executeQuery(`delete from education where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
            await executeQuery(`insert into education(created_by, resume_id, degree_name, start_year, end_year, percentage) values(?,?,?,?,?,?)`,
                [current_user, resume_id, degree, start, end, percentage]) ;
            res.status(200).send("education Details Updated") ;
        }
    }catch(err){
        console.log(err) ;  
        res.status(401).send({
            message : err.message ? err.message : "Something went wrong"
        })
    }
})

module.exports = {
    educationRouter : Router
}