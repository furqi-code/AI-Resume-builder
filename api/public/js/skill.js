// extracted from URL (<a> tag se directly resumeID nhi send kr skte)
let params = new URLSearchParams(window.location.search) ;
let resumeID = params.get("resumeID") ;
console.log("Resume_id: ", resumeID) ;

const skillRegex = /^[a-zA-Z ]{4,25}$/ ;
const rangeRegex = /^[0-5]$/ ;  // input type = range h, validate nhi kre to bhi ok bcz we cant type anything else in this input field
// lekin still numbers string me hi rhenge

$("#skillsDetails").on("click", function(){
    let skill = $(`#skillName`).val() ;
    let skill1 = $(`#skillName1`).val() ;
    let skill2 = $(`#skillName2`).val() ;
    let skill3 = $(`#skillName3`).val() ;
    let range = parseInt($("#customRange").val());
    let range1 = parseInt($("#customRange1").val());
    let range2 = parseInt($("#customRange2").val());
    let range3 = parseInt($("#customRange3").val());

    $("#skill0Error, skill1Error, skill2Error, skill3Error").text("") ;
    if(!skillRegex.test(skill)){
        $("#skill0Error").text("it must contain alphabets") ;
        return ;
    }
    if(!skillRegex.test(skill1)){
        $("#skill1Error").text("it must contain alphabets") ;
        return ;
    }
    if(!skillRegex.test(skill2)){
        $("#skill2Error").text("it must contain alphabets") ;
        return ;
    }
    if(!skillRegex.test(skill3)){
        $("#skill3Error").text("it must contain alphabets") ;
        return ;
    }
    // else if(!rangeRegex.test(range3)){
    //     $("#range3Error").text("it must contain any range from 0 to 5") ;
    //     return ;
    // }

    axios({
        method : "POST",
        url : `http://localhost:10000/skills?resumeID=${resumeID}`,
        data : {
            skill,
            range,
            skill1,
            range1,
            skill2,
            range2,
            skill3,
            range3
        }
    })
    .then(function(res){
        alert("Skills added in DB") ;
        // window.open("/") ;
    })
    .catch(function(err){
        console.log(err) ;
        alert("Skills Not added in DB") ;
    })
})


function gotoHomePage(){
    window.open(`/`, "_parent") ;
}

function gotoWorkExpPage(){
    window.open(`/jobHistory?resumeID=${resumeID}`, "_parent") ;
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