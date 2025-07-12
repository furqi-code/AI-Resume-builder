const express = require("express");
const Router = express.Router() ;
const {workExpSchema} = require("../schema/workExp") ;
const {validator} = require("../middleware") ;
const {executeQuery} = require("../mySqldb/Query") ;

Router.get("/", async function(req,res){
    const isAuth = req.isAuth ;
    const current_user = req.user_id ;
    const resume_id = req.query.resumeID ;
    let show_workExp = await executeQuery(`select * from job_history where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
    if(show_workExp.length > 0)
        res.render("jobHistory", {isAuth, arr : show_workExp}) ;    
    else
        res.render("jobHistory", {isAuth, arr : []}) ;
})

Router.post("/", async function(req,res){
    try{    
        const current_user = req.user_id ;
        const resume_id = req.query.resumeID ;
        // const {company, start, end, discription} = req.body ;
        console.log("WorkExp array - ", req.body.workExp_array)  ;
        let existing_workExp = await executeQuery(`select * from job_history where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        console.log(existing_workExp) ;
        if(existing_workExp.length === 0)
        {
            req.body.workExp_array.forEach(async function(element){
                await executeQuery(`insert into job_history(created_by, resume_id, company_name, start_year, end_year, discription)
                values(?,?,?,?,?,?)`, [current_user, resume_id, element.company, element.startDate, element.endDate, element.discription]) ;    
            });
            res.status(200).send("Job history inserted") ;
        }else{
            // throw{
            //     message : "Work Experience of this Resume already exist"
            // }
            await executeQuery(`delete from job_history where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
            req.body.workExp_array.forEach(async function(element){
                await executeQuery(`insert into job_history(created_by, resume_id, company_name, start_year, end_year, discription)
                values(?,?,?,?,?,?)`, [current_user, resume_id, element.company, element.startDate, element.endDate, element.discription]) ;    
            });
            res.status(200).send("Job history Updated") ;
        }
    }catch(err){
        console.log(err) ;  
        res.status(401).send({
            message : err.message ? err.message : "Something went wrong"
        })
    }
})

module.exports = {
    workExpRouter : Router
}

