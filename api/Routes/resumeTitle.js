const express = require("express");
const Router = express.Router() ;
const {resumeSchema} = require("../schema/resumeTitle")
const {validator} = require("../middleware")
const {executeQuery} = require("../mySqldb/Query") ;

Router.post("/", async function(req,res){
    try{
        const user_id = req.user_id ;
        const title = req.body.resumeTitle ;
        const created_at = new Date().toISOString().split("Z")[0].replace("T", " ") ;
        console.log(created_at) ;
        let existing_title = await executeQuery(`select * from resumeTitle where title = ?`, [title]) ;
        console.log(existing_title)
        if(existing_title.length === 0)
        {
            let inserted_resumeTitle = await executeQuery(`insert into resumeTitle(title, created_at, created_by) values(?,?,?)`, [title, created_at, user_id]) ;
            if(inserted_resumeTitle.insertId > 0){
                res.status(200).send("Resume title inserted") ;
            }else{
                throw{
                    message : "Resume title not inserted in DB"
                }
            }
        }else{
            throw{
                message : "Title already taken"
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
    resumeTitleRouter : Router
}