const express = require("express");
const Router = express.Router() ;
const {executeQuery} = require("../mySqldb/Query") ;

Router.get("/", async function(req,res){
    const {isAuth, user_id} = req ;
    if(isAuth){
        let show_files = await executeQuery(`select * from resumeTitle where created_by = ?`, [user_id]) ;
        console.log(show_files) ;   // 2 length ka array nhi arha direct 0 index wala array of objects arha h
        res.render("home", {isAuth, arr : show_files}) ;
    }else{
        res.render("home", {isAuth, arr : []}) ;
    }
})


module.exports = {
    homeRouter : Router
}