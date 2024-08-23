const fs= require('fs');
let a = 500;

setImmediate(()=>{
 console.log({INFO : "SetImmediate function is called"});
});

fs.readFile('./file.txt','utf-8',()=>{
 console.log({INFO:"File reading is completed."});
});

setTimeout(()=>{
     console.log({INFO:"This is a setTimeout call back"});
     
},0);

function print(){
    console.log({INFO: "Value of a = "+a });
    
};

print();

console.log({INFO:"This is the last line of Code"});

