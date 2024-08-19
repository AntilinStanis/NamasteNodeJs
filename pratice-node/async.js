const fs = require('fs');
const https = require('https');

console.log("Hello World");

var a = 500;

var b = 600;

https.get("https://dummyjson.com/products/1",(res)=>{
  console.log("Fetched data successfully");
  
});

setTimeout(()=>{
console.log("Set time out called after 5 seconds");

},5000);

fs.readFile("./file.txt","utf8",(err,data)=>{
    console.log("File data : ",data);
    
});

function multiply(x,y){
    const result = a * b;
    return result;
};

let c = multiply(a,b);
console.log("The multiplication result - "+ c);
