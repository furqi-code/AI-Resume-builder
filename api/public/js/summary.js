// extracted from URL (<a> tag se directly resumeID nhi send kr skte)
let params = new URLSearchParams(window.location.search) ;
let resumeID = params.get("resumeID") ;
console.log("Resume_id: ", resumeID) ;

function regenerate(){
    // location.reload() 
    $("p").text("") ;
    axios({
        method : "GET",
        url : `http://localhost:10000/summary/regenerate?resumeID=${resumeID}`
    })
    .then(function(res){
        $("p").text(res.data);
        setTimeout(function(){
            const addToast = new bootstrap.Toast(document.getElementById('addToast'));
            addToast.show() ;
        }, 1000);
    })
    .catch(function(err){
        $("p").text(err);
        alert("Error while generating summary") ;
    })
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