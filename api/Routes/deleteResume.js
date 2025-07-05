const express = require("express");
const Router = express.Router() ;
const {executeQuery} = require("../mySqldb/Query") ;

Router.delete("/", async function(req,res){
    try{
        const current_user = req.user_id ;
        const resume_id = req.query.resumeID ;
        await executeQuery(`delete from resumeTitle where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        res.status(200).send({
            message : "Resume deleted from DB"
        })
    }catch(err){    
        console.log(err) ;  
        res.status(401).send({
            message : err.message ? err.message : "Something went wrong"
        })
    }
})

module.exports = {
    deleteRouter : Router
}