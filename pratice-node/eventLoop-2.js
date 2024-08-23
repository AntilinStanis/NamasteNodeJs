const fs = require('fs');
let a = 500;

// setImmediate call back function excute in check phase
setImmediate(() => {
    console.log({ INFO: "SetImmediate function is called" });
});

// Promise.resolve call back function excute in promise phase 
// for every loop process.nextTick and promise callbacks are checked
Promise.resolve({ INFO: "This is Promise resolve call back" }).then(console.log);

//  fs.readFile usally take more time than all process it is slow and it happens in poll phase
fs.readFile('./file.txt', 'utf-8', () => {
    console.log({ INFO: "File reading is completed." });
});

// setTimeout call back function excute in TIMER phase
setTimeout(() => {
    console.log({ INFO: "This is a setTimeout call back" });

}, 0);

// process.nextTick call back function excute in process.nextTick phase 
process.nextTick(() => {
    console.log({ INFO: "This is process.nextTick function callback" });

});

//  This is synchronous code so it excutes immediatley
function print() {
    console.log({ INFO: "Value of a = " + a });

};

print();

console.log({ INFO: "This is the last line of Code" });