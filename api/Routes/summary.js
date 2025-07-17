const express = require("express");
const Router = express.Router() ;
const {executeQuery} = require("../mySqldb/Query") ;
const { GoogleGenAI } = require("@google/genai");

// if you dont wanna show summary by default remove all the lines 10-54 on first route
// just render the page res.render("summary", {isAuth}) ;
Router.get("/", async function(req,res){
    try{
        const isAuth = req.isAuth ;
        const current_user = req.user_id ;
        const resume_id = req.query.resumeID ; 
        let resumeTitle = await executeQuery(`select * from resumeTitle where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        let personalDetails = await executeQuery(`select * from personal_details where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        let education = await executeQuery(`select * from education where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        let workExp = await executeQuery(`select * from job_history where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        let skills = await executeQuery(`select * from skills where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;

        const prompt = `
            You are a professional resume writer.
            Below is a user's raw resume data, including the title, personal details, multiple education entries, multiple job experiences, and a list of skills.
            Your task is to generate a **concise resume summary of just 3-4 lines**, not more. It should be short, impactful, and professional.

            🟢 Guidelines:
            - Only write **one short paragraph of 3-4 lines max**.
            - Do **not** exceed this limit. Keep it tight and to the point.
            - Highlight only the most important strengths, job roles, or academic achievements.
            - Do **not** use bullet points or headings.
            - Maintain a confident, industry-relevant tone.
            - Use only the information provided — do **not invent** anything.

            📄 Resume Data:
            Title: ${JSON.stringify(resumeTitle)}
            Personal Details: ${JSON.stringify(personalDetails)}
            Education: ${JSON.stringify(education)}
            Work Experience: ${JSON.stringify(workExp)}
            Skills: ${JSON.stringify(skills)}
            `;

        const ai = new GoogleGenAI({
            apiKey: "AIzaSyAVPo7HrZe9qjVBgM8cOVrGyDaXkeVJmR8",
        });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });
        console.log(response.text);

        let existing_summary = await executeQuery(`select * from summary where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        if(existing_summary.length === 0){
            await executeQuery(`insert into summary(resume_id, overall, created_by) values(?,?,?)`, [resume_id, response.text, current_user]) ;
        }else{
            await executeQuery(`delete from summary where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
            await executeQuery(`insert into summary(resume_id, overall, created_by) values(?,?,?)`, [resume_id, response.text, current_user]) ;
        }
        res.render("summary", {isAuth, summary : response.text}) ;    
    }catch(err){
        console.log(err) ;  
        res.status(500).send({
            message : err.message ? err.message : "Something went wrong"
        })
    }
})

Router.get("/regenerate", async function(req,res){
    try{
        const current_user = req.user_id ;
        const resume_id = req.query.resumeID ; 
        let resumeTitle = await executeQuery(`select * from resumeTitle where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        let personalDetails = await executeQuery(`select * from personal_details where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        let education = await executeQuery(`select * from education where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        let workExp = await executeQuery(`select * from job_history where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        let skills = await executeQuery(`select * from skills where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;

        const prompt = `
            You are a professional resume writer.
            Below is a user's raw resume data, including the title, personal details, multiple education entries, multiple job experiences, and a list of skills.
            Your task is to generate a **concise resume summary of just 3-4 lines**, not more. It should be short, impactful, and professional.

            🟢 Guidelines:
            - Only write **one short paragraph of 3-4 lines max**.
            - Do **not** exceed this limit. Keep it tight and to the point.
            - Highlight only the most important strengths, job roles, or academic achievements.
            - Do **not** use bullet points or headings.
            - Maintain a confident, industry-relevant tone.
            - Use only the information provided — do **not invent** anything.

            📄 Resume Data:
            Title: ${JSON.stringify(resumeTitle)}
            Personal Details: ${JSON.stringify(personalDetails)}
            Education: ${JSON.stringify(education)}
            Work Experience: ${JSON.stringify(workExp)}
            Skills: ${JSON.stringify(skills)}
            `;

        const ai = new GoogleGenAI({
            apiKey: "AIzaSyAVPo7HrZe9qjVBgM8cOVrGyDaXkeVJmR8",
        });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });
        console.log(response.text);

        let existing_summary = await executeQuery(`select * from summary where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
        if(existing_summary.length === 0){
            await executeQuery(`insert into summary(resume_id, overall, created_by) values(?,?,?)`, [resume_id, response.text, current_user]) ;
        }else{
            await executeQuery(`delete from summary where resume_id = ? AND created_by = ?`, [resume_id, current_user]) ;
            await executeQuery(`insert into summary(resume_id, overall, created_by) values(?,?,?)`, [resume_id, response.text, current_user]) ;
        }
        res.send(response.text) ;    
    }catch(err){
        console.log(err) ;  
        res.status(500).send({
            message : err.message ? err.message : "Something went wrong"
        })
    }
})


module.exports = {
    summaryRouter : Router
}
