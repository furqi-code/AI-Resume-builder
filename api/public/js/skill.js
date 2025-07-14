// extracted from URL (<a> tag se directly resumeID nhi send kr skte)
let params = new URLSearchParams(window.location.search) ;
let resumeID = params.get("resumeID") ;
console.log("Resume_id: ", resumeID) ;

const skillRegex = /^[a-zA-Z ]{4,25}$/ ;
const rangeRegex = /^[0-5]$/ ;  // input type = range h, validate nhi kre to bhi ok bcz we cant type anything else in this input field
// lekin still numbers string me hi rhenge

$("#skillsDetails").on("click", function(){
    let skills_array = [], hasError = false ;
    $(".moreSkills").each(function(){
        let skill1 = $(this).find(`.skillName1`).val() ;
        let skill2 = $(this).find(`.skillName2`).val() ;
        let range1 = parseInt($(this).find(".customRange1").val());
        let range2 = parseInt($(this).find(".customRange2").val());

        $(this).find(".skill0Error, .skill1Error").text("") ;
        // if(!skillRegex.test(skill)){
        //     $(this).find(".skill0Error").text("it must contain alphabets") ;
        //     hasError = true ;
        //     return ;
        // }
        // if(!skillRegex.test(skill1)){
        //     $(this).find(".skill1Error").text("it must contain alphabets") ;
        //     hasError = true ;
        //     return ;
        // }
        // else if(!rangeRegex.test(range3)){
        //     $("#range3Error").text("it must contain any range from 0 to 5") ;
        //     hasError = true ;
        //     return ;
        // }
        let obj = {    
            skill1,
            skill2,
            range1,
            range2
        }
        skills_array.push(obj) ;
    })
    if(hasError){   // Post req backend pe nhi lgana
        return ;
    }
    axios({
        method : "POST",
        url : `http://localhost:10000/skills?resumeID=${resumeID}`,
        data : {
            skills_array
        }
    })
    .then(function(res){
        alert("Skills added in DB") ;
    })
    .catch(function(err){
        console.log(err) ;
        alert("Skills Not added in DB") ;
    })
})

// adding divs in skills to save all at once, no need to use Dynamic Id
let skillLabelCount = $(".moreSkills").length * 2 + 1;
console.log(skillLabelCount) ;

function moreSkills() {
    let label1 = skillLabelCount++;
    let label2 = skillLabelCount++;

    let html = `
    <div class="moreSkills"> 
        <div class="mb-3">
            <label class="form-label">Skill-${label1}</label>
            <input type="text" class="form-control skillName1" placeholder="Enter Skill">
            <small class="text-danger skill0Error"></small>
        </div>
        <div class="mb-4">
            <label class="form-label">Select Rating</label>
            <input type="range" class="form-range customRange1" min="0" max="5">
            <small class="text-danger range0Error"></small>
        </div>
        <div class="mb-3">
            <label class="form-label">Skill-${label2}</label>
            <input type="text" class="form-control skillName2" placeholder="Enter Skill">
            <small class="text-danger skill1Error"></small>
        </div>
        <div class="mb-4">
            <label class="form-label">Select Rating</label>
            <input type="range" class="form-range customRange2" min="0" max="5">
            <small class="text-danger range1Error"></small>
        </div>
    </div>`;

    $(".multipleSkills").append(html);
}

function removeDiv(){
    $(".moreSkills").last().remove() ;
}

function gotoNXTPage(){
    window.open(`/summary?resumeID=${resumeID}`) ;
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