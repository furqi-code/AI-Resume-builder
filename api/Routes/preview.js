const express = require("express");
const Router = express.Router() ;
const {executeQuery} = require("../mySqldb/Query") ;

Router.get('/', async function(req,res){
    try{
        const isAuth = req.isAuth ;
        const current_user = req.user_id ;
        const resume_id = req.query.resumeID ; 
        if(isAuth){
            let resumeTitle = await executeQuery(`select * from resumeTitle where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
            let personalDetails = await executeQuery(`select * from personal_details where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
            let education = await executeQuery(`select * from education where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
            let workExp = await executeQuery(`select * from job_history where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
            let skills = await executeQuery(`select * from skills where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
            let summary = await executeQuery(`select * from summary where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;

            res.render("preview", {isAuth, resume : resumeTitle[0], personalInfo : personalDetails[0], education, workExp, skills, summary : summary[0]}) ;
        }else{
            res.send({message : "kindly Login to see your resume Preview page"}) ;
        }   
    }catch(err){
        console.log(err) ;  
        res.status(500).send({
            message : err.message ? err.message : "Something went wrong"
        })
    }
})

module.exports = {
    previewRouter : Router
}