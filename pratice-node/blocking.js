const crypto = require('crypto');

console.log({INFO :"Hello World"});

var a = 1000;
var b = 2000;

// crypto.pbkdf2 - passeword based key deravtive function

//  Synchronous function blocks the main thread don't use it.
crypto.pbkdf2Sync("password","salt",5000000,50,"sha512");
console.log({INFO:"first key is generated."});

setTimeout(()=>{
  console.log({INFO:"Call me right now"});
  // This function is executed only after the main thread is free
},0);

// async function
crypto.pbkdf2("password","salt",50000,50,"sha512",(err,key)=>{
  console.log({INFO:"Second Key is generated"});
  
});

function multiply(){
    return a*b;
};

var c = multiply();
console.log({INFO:"Multiply answer -" + c});
