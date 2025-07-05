const express = require("express");
const Router = express.Router() ;
const {skillSchema} = require("../schema/skills") ;
const {validator} = require("../middleware") ;
const {executeQuery} = require("../mySqldb/Query") ;

Router.get("/", async function(req,res){
    const isAuth = req.isAuth ;
    const current_user = req.user_id ;
    const resume_id = req.query.resumeID ;
    let show_skill = await executeQuery(`select * from skills where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
    console.log(show_skill) ;
    if(show_skill.length > 0)
        res.render("skills", {isAuth, arr : show_skill}) ;    
    else
        res.render("skills", {isAuth, arr : []}) ;
})

Router.post("/", async function(req,res){
    try{    
        const current_user = req.user_id ;
        const resume_id = req.query.resumeID ;
        const {skill, skill1, skill2, skill3, range, range1, range2, range3} = req.body ;
        let inserted_skills = await executeQuery(`insert into skills(created_by, resume_id, skill_name, ratings, skill_name1, ratings1, skill_name2, ratings2, skill_name3, ratings3)
            values(?,?,?,?,?,?,?,?,?,?)`,[current_user, resume_id, skill, range, skill1, range1, skill2, range2,  skill3, range3]) ;
        res.status(200).send("Skills inserted") ;
    }catch(err){
        console.log(err) ;  
        res.status(401).send({
            message : err.message ? err.message : "Something went wrong"
        })
    }
})

module.exports = {
    skillRouter : Router
}