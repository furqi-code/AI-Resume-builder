const signupModal = new bootstrap.Modal(document.getElementById("signupModal"));
const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
const resume_Modal = new bootstrap.Modal(document.getElementById("resume"));
const forgotPassModal = new bootstrap.Modal(document.getElementById("forgotPassModal")) ;
const toast = new bootstrap.Toast(document.getElementById('resetToast'));

// let emailRegex = /^$/ ;
const userRegex = /^[a-zA-Z][a-zA-Z0-9]{3,16}$/ ;
const passRegex = /^[a-zA-Z0-9]{3,12}$/ ;
const resumeRegex = /^[a-zA-Z]{4,25}$/ ;

function signUp(event)
{
    event.preventDefault() ;
    $("#signupErrorMessage").html("") ;
    const username = event.target.user.value ;
    const password = event.target.userPassword.value ;
    const email = event.target.Email.value ;

    if(!userRegex.test(username)){
        $("#signupErrorMessage").html("Username must start with a letter and length should be 4-17 characters") ;
        return ;
    }
    // else if(!emailRegex.test(email)){
    //     $("#signupErrorMessage").html("Invalid email format") ;
    //     return ;
    // }
    else if(!passRegex.test(password)){
        $("#signupErrorMessage").html("Password must contain 3-12 characters with letters and digits") ;
        return ;
    }

    axios({
        method : "POST",
        url : "http://localhost:10000/signUp",
        data : {
            name : username,
            pass : password,
            gmail : email
        }
    })
    .then(function(response){
        $("#signupSuccessMessage").html(
            "Signup Successful, Please login to continue"
        );
        setTimeout(() => {
            signupModal.hide() ;
            loginModal.show() ;
        }, 1000);
    })
    .catch(function(err){
        console.log(`Error occured while signing Up ${err}`) ;
        $("#signupErrorMessage").html("Registration unsuccessful") ;
    })
}

function login(event)
{
    event.preventDefault() ;
    $("#signinErrorMessage").html("") ;
    const email = event.target.email.value ;
    const password = event.target.password.value ;

    // if(!emailRegex.test(email)){
    //     $("#signinErrorMessage").html("Invalid email format") ;
    //     return ;
    // }
    if(!passRegex.test(password)){
        $("#signinErrorMessage").html("Password must contain 3-12 characters with letters and digits") ;
        return ;
    }

    axios({
        method : "POST",
        url : "http://localhost:10000/signin",
        data : {
            gmail : email ,
            pass : password
        }
    })
    .then(function(response){
        // const token = response.data.token ;
        // localStorage.setItem("userToken", token) ;
        $("#signinSuccessMessage").html(
                "Login Successful, redirecting you to homepage"
            );
        setTimeout(() => {
            location.reload() ;
        }, 400);
    })
    .catch(function(error){
        console.log(`Error occured while signing in ${error}`) ;
        $("#signinErrorMessage").html("Email/Password is invalid") ;
    })
}

function resume(event)
{
    event.preventDefault() ;
    $("#resumeDone").html("") ;
    let title = event.target.title.value ;

    if(!resumeRegex.test(title)){
        $("#resumeDone").html("Invalid Resume") ;
        return ;
    }

    axios({
        method : "POST",
        url : "http://localhost:10000/resume",
        data : {
            resumeTitle : title,
        }
    })
    .then(function(res){
        $("#resumeDone").html("Fill up your personal Details") ;
        $("#resumeDone").addClass("text-success")
        setTimeout(function(){
            resume_Modal.hide() ;
            location.reload() ;
            // window.open("/") ;   
        }, 500)
    })
    .catch(function(err){
        console.log(`Error occured while building Resume ${err}`) ;
        $("#resumeDone").html("Something is wrong") ;
        $("#resumeDone").addClass("text-danger") ;
    })
}

function forgotPass(event) 
{
    event.preventDefault() ; 
    $("#resetPassMessage").html("") ;
    let email = event.target.email.value ;
    let newPassword = event.target.newPassword.value;
    let confirmPassword = event.target.confirmPassword.value;

    if(newPassword !== confirmPassword){
        $("#resetPassMessage").html("Passwords don't match").addClass("text-danger") ;
        return ;
    }
    // if(!emailRegex.test(email)){
    //     $("#resetPassMessage").html("Invalid email format") ;
    //     return ;
    // }
    if(!passRegex.test(newPassword)){
        $("#resetPassMessage").html("Password must contain 3-12 characters with letters and digits") ;
        return ;
    }     

    axios({
        method : "PATCH",
        url : "http://localhost:10000/resetPassword",
        data : {
            email,
            newPassword,
            confirmPassword
        }
    })
    .then(function(res){
        $("#resetPassMessage").html("Your password changed successfully").addClass("text-success") ;
        toast.show() ;
        setTimeout(function(){
            // location.reload() ;
            forgotPassModal.hide() ;
            loginModal.show() ;
            toast.hide() ; // automatically bhi hide ho rha lekin after few seconds (maybe cz of hide class)
        }, 2000)
    })
    .catch(function(err){
        console.log(`Error occured while Reset password ${err}`) ;
        $("#resetPassMessage").html("Try Again!!").addClass("text-danger") ; 
    })
}

function deleteResume(id)
{
    axios({
        method : "DELETE",
        url : "http://localhost:10000/deleteResume",
        params : {
            resumeID : id
        }
    })
    .then(function(res){
        window.open("/") ;
    })
    .catch(function(err){
        console.log(err) ;
    })
}

function logout() 
{
    axios({
        method:'POST',
        url: 'http://localhost:10000/logout'
    }).then(function(){
        window.open("/", "_parent") ;
    })
}