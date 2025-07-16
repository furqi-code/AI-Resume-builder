const express = require("express");
const Router = express.Router() ;
const {executeQuery} = require("../mySqldb/Query") ;
// const html2pdf = require("html-pdf-node");
const path = require("path") ;
const ejs = require("ejs");
const puppeteer = require("puppeteer") ;

Router.get("/", async function(req,res){
    try {
        const isAuth = req.isAuth ;
        const current_user = req.user_id ;  
        const resume_id = req.query.resumeID ; 

        let resumeTitle = await executeQuery(`select * from resumeTitle where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        let personalDetails = await executeQuery(`select * from personal_details where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        let education = await executeQuery(`select * from education where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        let workExp = await executeQuery(`select * from job_history where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        let skills = await executeQuery(`select * from skills where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        let summary = await executeQuery(`select * from summary where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        
        const htmlString = await ejs.renderFile("./views/printPage.ejs", {
            isAuth,
            resume: resumeTitle[0],
            personalInfo: personalDetails[0],
            education,
            workExp,
            skills,
            summary: summary[0]
        });

        // Launch the browser and open a new blank page
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(htmlString);
        await page.pdf({
            path: "resume.pdf",
            format: "A4",
            // width: "1140px",     
            printBackground: true,
        });

        await browser.close();
        // res.send("File generated");
        res.download("resume.pdf");
    }catch (error) {
    console.log(error);
  }
})

module.exports = {
    PDF_router : Router
}