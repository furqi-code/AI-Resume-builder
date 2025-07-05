const express = require("express");
const Router = express.Router() ;

Router.post("/", async function(req,res){
  res.clearCookie("userDetail") ;
  res.status(200).send({
    message: "Logout successfull"
  });
})

module.exports = {
  logoutRouter : Router 
}