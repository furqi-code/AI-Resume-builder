// extracted from URL (<a> tag se directly resumeID nhi send kr skte)
let params = new URLSearchParams(window.location.search) ;
let resumeID = params.get("resumeID") ;
console.log("Resume_id: ", resumeID) ;

const degreeRegex = /^[a-zA-Z ]{2,50}$/ ;
const percentageRegex = /^(100|[1-9]?[0-9])%$/ ;
const startRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$/ ; // input type = datetime-local, takes  YYYY-MM-DDTHH:MI:SS
const endRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$/ ;   // validate nhi kre to bhi ok bcz we cant type anything else in this input field

$("#educationDetails").on("click", function(){
    let degree = $("#degreeName").val() ;
    let start_year = $("#start").val() ;
    let end_year = $("#end").val() ;
    let percentage = $("#percentage").val() ;

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
    // seconds user de hi nhi skta isliye wo 00 print hoga DB me and
    // milliseconds k liye timestamp(3) use krna hoga for upto 3 digits agar diya h to
    if(!degreeRegex.test(degree)){  
        $("#degreeError").text("Please enter a valid Degree Name") ;
        return ;
    }
    else if(!percentageRegex.test(percentage)){
        $("#percentageError").text("Please enter a valid Percentage with %") ;
        return ;
    }   
    if(startDate > endDate){
        $("#endError").text("End_year should be greater than start_year") ;
        return ;
    }

    axios({
        method : "POST",
        url : `http://localhost:10000/educationDetails?resumeID=${resumeID}`,
        data : {
            degree : degree,
            start : startDate,
            end : endDate,
            percentage : percentage
        }
    })
    .then(function(res){
        alert("educationDetails added in DB") ;
        window.open(`/jobHistory?resumeID=${resumeID}`) ;
    })
    .catch(function(err){
        console.log(err) ;
        alert("educationDetails Not added in DB") ;
    })
})

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