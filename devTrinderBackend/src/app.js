const express = require('express');
const app = express();

app.use((req,res)=>{
    res.send("vanakam da mapla server la irrunthu....")
})

app.listen(3000,()=>{
console.log("My application is running successfully");

});