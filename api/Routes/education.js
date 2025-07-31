const express = require("express");
const Router = express.Router() ;
const {educationSchema} = require("../schema/education") ;
const {validator} = require("../middleware") ;
const {executeQuery} = require("../mySqldb/Query") ;

Router.get("/", async function(req,res){
    const isAuth = req.isAuth ;
    const current_user = req.user_id ;
    const resume_id = req.query.resumeID ;
    if(isAuth){
        let show_educationDetails = await executeQuery(`select * from education where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        res.render("education", {isAuth, arr : show_educationDetails}) ;
    }else{
        res.send({message : "kindly Login to edit your education Details"}) ;
    }
})

Router.post("/", async function(req,res){
    try{    
        const current_user = req.user_id ;
        const resume_id = req.query.resumeID ;
        // const {degree, start, end, percentage} = req.body;
        console.log("Education array - ", req.body.education_array)  ;
        let existing_education = await executeQuery(`select * from education where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        if(existing_education.length === 0)
        {
            req.body.education_array.forEach(async function(element){
                await executeQuery(`insert into education(created_by, resume_id, degree_name, start_year, end_year, percentage) values(?,?,?,?,?,?)`,
                [current_user, resume_id, element.degree, element.startDate, element.endDate, element.percentage]) ;
            })
        }else{
            // throw{
            //     message : "Education details of this Resume already exist"
            // }
            await executeQuery(`delete from education where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
            req.body.education_array.forEach(async function(element){
                await executeQuery(`insert into education(created_by, resume_id, degree_name, start_year, end_year, percentage) values(?,?,?,?,?,?)`,
                [current_user, resume_id, element.degree, element.startDate, element.endDate, element.percentage]) ;
            })
        }
        res.status(200).send("education Details inserted") ;
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