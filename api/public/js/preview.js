/*
Inspired from the design made by 'Teodora':
https://www.webdesignerforum.co.uk/files/file/63-free-psd-cv-template/
https://dribbble.com/shots/1141520-PSD-CV-template?list=searches&offset=17

Dark-wall pattern: https://subtlepatterns.com/dark-wall/

Lato Font: https://www.google.com/fonts/specimen/Lato

We love font icons: http://weloveiconfonts.com/

*/

// $(".download_print_buttons li a").on("click", function(){
//     console.log("print CV clicked") ;
//     $(".no-print").addClass("d-none") ;
// })

function logout() 
{
    axios({
        method:'POST',
        url: 'http://localhost:10000/logout'
    }).then(function(){
        window.open("/") ;
    })
}