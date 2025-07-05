// extracted from URL (<a> tag se directly resumeID nhi send kr skte)
let params = new URLSearchParams(window.location.search) ;
let resumeID = params.get("resumeID") ;
console.log("Resume_id: ", resumeID) ;

const companyRegex = /^[a-zA-Z ]{4,50}$/ ;
const discripRegex = /^[a-zA-Z ]+$/ ;
const startRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$/ ; // input type = datetime-local, takes  YYYY-MM-DDTHH:MI:SS
const endRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$/ ;   // validate nhi kre to bhi ok bcz we cant type anything else in this input field

// save all workExp at once using div iteration .each() Jquery Fnc
$("#jobDetails").on("click", function(){
    let workExp_array = [], hasError = false ;
    $(".moreworkExp").each(function(){
        let company = $(this).find(".companyName").val() ;
        let discription = $(this).find(".Discription").val() ;
        let start_year = $(this).find(".startJob").val() ;
        let end_year = $(this).find(".endJob").val() ;
        // Clear previous errors
        $(this).find(".companyError").text("") ;
        $(this).find(".discriptionError").text("") ;
        $(this).find(".startError").text("") ;
        $(this).find(".endError").text("") ;

        // Validate dates before conversion toISOstring()
        // if(!startRegex.test(start_year)) {
        //     $("#startError").text("Invalid start datetime format");
        //     return;
        // }
        // if(!endRegex.test(end_year)) {
        //     $("#endError").text("Invalid end datetime format");
        //     return;
        // }

        const startDate = new Date(start_year).toISOString().split("Z")[0].replace("T", " ") ; 
        const endDate = new Date(end_year).toISOString().split("Z")[0].replace("T", " ") ;

        // return exits from .each() not the outer function so invalid pe bhi Post req lg rhi h, so now we are using a flag
        if(startDate > endDate){
            // alert("End_year should be greater than start_year") ;
            $(this).find(".endError").text("End_year should be greater than start_year") ;
            hasError = true ;
            return ;
        }
        if(!companyRegex.test(company)){
            $(this).find(".companyError").text("Company name should be 4-50 letters") ;
            hasError = true ;
            return ;
        }
        else if(!discripRegex.test(discription)){
            $(this).find(".discriptionError").text("Description must have Alphabets") ;
            hasError = true ;
            return ;
        }
        let jobs = {    
            company,
            startDate,
            endDate,
            discription
        }
        workExp_array.push(jobs) ;
    })
    console.log(workExp_array) ;
    if(hasError){   // Post req backend pe nhi lgana
        return ;
    } 
    axios({
        method : "POST",
        url : `http://localhost:10000/jobHistory?resumeID=${resumeID}`,
        data : {
            workExp_array
        }
    })
    .then(function(res){
        alert("Job History added in DB") ;
        // window.open("/") ;
    })
    .catch(function(err){
        console.log(err) ;
        alert("Job History Not added in DB") ;
    })
})

// adding divs in Job history to save all at once, no need to use Dynamic Id
function moreExperience()
{
    let html = '' ;
    html += ` <div class="moreworkExp">
                <div class="mb-3">
                    <label for="companyName" class="form-label">Company Name</label>
                    <input type="text" class="form-control companyName" placeholder=Enter company name" required>
                    <small class="text-danger companyError"></small>
                </div>
                <div class="mb-3">
                    <label for="Discription" class="form-label">Discription</label>
                    <textarea type="text" class="form-control Discription" placeholder="Enter Discription" required></textarea>
                    <small class="text-danger discriptionError"></small>
                </div>
                <div class="mb-3">
                    <label class="form-label">Start year</label>
                    <input type="datetime-local" class="form-control startJob" placeholder="start year" required />
                    <small class="text-danger startError"></small>
                </div>
                <div class="mb-4">
                    <label class="form-label">End year</label>
                    <input type="datetime-local" class="form-control endJob" placeholder="End year" required />
                    <small class="text-danger endError"></small>
                </div>
            </div>`
    $(".multipleJob").append(html) ;
}

function removeDiv(){
    $(".moreworkExp").last().remove() ;
}

function gotoSkillsPage(){
    console.log("Skills page pe jarhe h") ;
    window.open(`/skills?resumeID=${resumeID}`, "_parent") ;
}

function gotoEducationPage(){
    console.log("Education page pe wapas jana bhai") ;
    window.open(`/educationDetails?resumeID=${resumeID}`, "_parent") ;
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