const express = require('express');
const app = express();

app.use('/dashboard',(req,res)=>{

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
)



app.listen(3000,()=>{
console.log("My application is running successfully");

});