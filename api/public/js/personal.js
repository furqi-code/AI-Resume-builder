// const emailRegex = /^$/ ;
// const nameRegex = /^[a-zA-Z]+( [a-zA-Z]+)+$/;  // atleast two words needed
const nameRegex = /^[a-zA-Z ]{4,50}$/ ;
const phoneRegex = /^[1-9][0-9]{9}$/ ;
const linkedinRegex = /^[a-zA-Z ]+$/ ; // input type != URL, text h filhaal 
const genderRegex = /^(Male|Female|M|F)$/i ;
const githubRegex = /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/ ;

$("#personalDetails").on("click", function(){
    // Clear all error messages
    $("#nameError, #phoneError, #linkedinError, #githubError, #genderError").text("") ;
    let name = $("#fullName").val() ;
    let email = $("#email").val() ;
    let linkedin = $("#linkedin").val() ;
    let github = $("#github").val() ;
    let phoneNumber = $("#phoneNumber").val() ;
    let gender =$("input[name='gender']:checked").val() ;
    console.log(name, email, phoneNumber, linkedin, github, gender) ;
    
    if(!nameRegex.test(name)){
        // alert("Name should contain Alphabets of length 4-17") ;
        $("#nameError").text("Please enter a valid name (4-50 letters)");
        return ;
    }
    else if(!phoneRegex.test(phoneNumber)){
        $("#phoneError").text("Phone number must be 10 digits and start 1-9");
        return ;
    }
    else if(!linkedinRegex.test(linkedin)){
        $("#linkedinError").text("invalid linkedin profile URL") ;
        return ;
    }
    else if(!githubRegex.test(github)){
        $("#githubError").text("Enter a valid GitHub profile URL") ;
        return ;
    }
    else if(!gender || !genderRegex.test(gender)){
        $("#genderError").text("Please select a valid gender (M, F, Male, Female)") ;
        return ;
    }
    
    // extracted from URL to use in POST route (GET route me send ho rha tha automatically)
    let params = new URLSearchParams(window.location.search) ;
    let resumeID = params.get("resumeID") ;
    console.log("Resume_id: ", resumeID) ;

    axios({
        method : "POST",
        url : `http://localhost:10000/personalDetails?resumeID=${resumeID}`,
        data : {
            username : name,
            gmail : email,
            linkedin : linkedin,
            github : github,
            phoneNumber,
            gender 
        }
    })
    .then(function(res){
        alert("personalDetails added in DB") ;
        window.open(`/educationDetails?resumeID=${resumeID}`) ;
    })
    .catch(function(err){
        console.log(err) ;
        alert("personalDetails Not added in DB/already exist for this resume") ;
    })
})

function logout() 
{
    axios({
        method:'POST',
        url: 'http://localhost:10000/logout'
    }).then(function(){
        window.open("/") ;
    })
}