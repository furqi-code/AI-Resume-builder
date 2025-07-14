// extracted from URL (<a> tag se directly resumeID nhi send kr skte)
let params = new URLSearchParams(window.location.search) ;
let resumeID = params.get("resumeID") ;
console.log("Resume_id: ", resumeID) ;

const degreeRegex = /^[a-zA-Z ]{2,50}$/ ;
const percentageRegex = /^(100|[1-9]?[0-9])%$/ ;
const startRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$/ ; // input type = datetime-local, takes  YYYY-MM-DDTHH:MI:SS
const endRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$/ ;   // validate nhi kre to bhi ok bcz we cant type anything else in this input field

$("#educationDetails").on("click", function(){
    let education_array = [], hasError = false ;
    $(".moreEducation").each(function(){
        let degree = $(this).find(".degreeName").val()
        let start_year = $(this).find(".start").val()
        let end_year = $(this).find(".end").val()
        let percentage = $(this).find(".percentage").val()
        // Clear previous errors
        $(this).find(".degreeError").text("") ;
        $(this).find(".percentageError").text("") ;
        $(this).find(".startError").text("") ;
        $(this).find(".endError").text("") ;

        // Validate dates before conversion toISOstring()
        // if(!startRegex.test(start_year)) {
        //     $(".startError").text("Invalid start datetime format");
        //     return;
        // }
        // if(!endRegex.test(end_year)) {
        //     $(".endError").text("Invalid end datetime format");
        //     return;
        // }

        const startDate = new Date(start_year).toISOString().split("Z")[0].replace("T", " ") ; 
        const endDate = new Date(end_year).toISOString().split("Z")[0].replace("T", " ") ;
        // seconds user de hi nhi skta isliye wo 00 print hoga DB me and
        // milliseconds k liye timestamp(3) use krna hoga for upto 3 digits agar diya h to
        // return exits from .each() not the outer function so invalid pe bhi Post req lg rhi h, so now we are using a flag
        // if(!degreeRegex.test(degree)){  
        //     $(this).find(".degreeError").text("Please enter a valid Degree Name") ;
        //     hasError = true ;
        //     return ;
        // }
        if(!percentageRegex.test(percentage)){
            $(this).find(".percentageError").text("Please enter a valid Percentage with %") ;
            hasError = true ;
            return ;
        }   
        else if(startDate > endDate){
            $(this).find(".endError").text("End_year should be greater than start_year") ;
            hasError = true ;
            return ;
        }
        let obj = {    
            degree,
            percentage,
            startDate,
            endDate
        }
        education_array.push(obj) ;
    })
    if(hasError){   // Post req backend pe nhi lgana
        return ;
    }

    axios({
        method : "POST",
        url : `http://localhost:10000/educationDetails?resumeID=${resumeID}`,
        data : {
           education_array
        }
    })
    .then(function(res){
        alert("educationDetails added in DB") ;
    })
    .catch(function(err){
        console.log(err) ;
        alert("educationDetails Not added in DB") ;
    })
})

// adding divs in Education to save all at once, no need to use Dynamic Id
function moreEducation()
{
    let html = '' ;
    html += ` <div class="moreEducation">
                    <div class="mb-3">
                        <label for="DegreeName" class="form-label">Degree Name</label>
                        <input type="text" class="form-control degreeName" placeholder="Enter Degree name">
                        <small class="text-danger degreeError"></small>
                    </div>
                    <div class="mb-3">
                        <label for="percentage" class="form-label">Percentage</label>
                        <input type="text" class="form-control percentage" placeholder="Enter Percentage">
                        <small class="text-danger percentageError"></small>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="datetime-local" class="form-control start" placeholder="start year"/>
                        <label>Start year</label>
                        <small class="text-danger startError"></small>
                    </div>
                    <div class="form-floating mb-4">
                        <input type="datetime-local" class="form-control end" placeholder="End year"/>
                        <label>End year</label>
                        <small class="text-danger endError"></small>
                    </div>
                </div>`
    $(".multipleEducation").append(html) ;
}

function removeDiv(){
    $(".moreEducation").last().remove() ;
}

function gotoWorkExpPage(){
    console.log("work Exp page pe jarhe h") ;
    window.open(`/jobHistory?resumeID=${resumeID}`, "_parent") ;
}

function gotoPersonalPage(){
    window.open(`/personalDetails?resumeID=${resumeID}`, "_parent") ;   
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