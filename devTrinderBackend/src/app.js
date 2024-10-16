const express = require('express');
const app = express();
const {authenticate} = require('../middlewares/authenticate');
require('../config/database');
app.use('/dashboard',authenticate,(req,res)=>{
    throw new Error("Error da server la");
    res.send("Hello da mapla dashboard la irrunthu....");
});

app.use('/',(req,res,next)=>{
    // res.send("vanakam da mapla server la irrunthu....");
    console.log("nan than da first response uh....");
    next()
},
(req,res)=>{
    res.send("Ithu 2nd response da mapla");
}
);

app.use('/',(err,req,res,next)=>{
 
    console.log({ERROR:err.message});
    
    res.status(500).send("sorry da mapla server la error");
});



app.listen(3000,()=>{
console.log("My application is running successfully");

});