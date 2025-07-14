// extracted from URL (<a> tag se directly resumeID nhi send kr skte)
let params = new URLSearchParams(window.location.search) ;
let resumeID = params.get("resumeID") ;
console.log("Resume_id: ", resumeID) ;

function regenerate(){
    location.reload() ;
}

function gotoPreviewPage(){
    window.open(`/preview?resumeID=${resumeID}`, "_parent") ;
}

function gotoSkillsPage(){
    window.open(`/skills?resumeID=${resumeID}`, "_parent") ;
}

function logout() 
{
    axios({
        method:'POST',
        url: 'http://localhost:10000/logout'
    }).then(function(){
        window.open("/") ;
    })
}