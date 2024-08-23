const fs = require('fs');

setImmediate(() => {
    console.log({ INFO: "SetImmediate function is called" });
});

Promise.resolve({ INFO: "This is Promise resolve call back" }).then((obj)=>{
    process.nextTick(() => {
        process.nextTick(() => {
            console.log({ INFO: "promise Inner next tick" });
            process.nextTick(() => {
                console.log({ INFO: "Promise Inner 2nd next tick" });
    
            });
            Promise.resolve({INFO:"Hello this log is form inside promise inner next tick"}).then(console.log);
        });
        console.log({ INFO: "Next tick inside first promise" });
    });
    console.log(obj);
    
});

fs.readFile('./file.txt', 'utf-8', () => {
    console.log({ INFO: "File reading is completed." });
});

process.nextTick(() => {
    process.nextTick(() => {
        console.log({ INFO: "Inner next tick" });
        process.nextTick(() => {
            console.log({ INFO: "Inner 2nd next tick" });

        });
        Promise.resolve({INFO:"Hello this log is form promise"}).then(console.log);
    });
    console.log({ INFO: "Next tick" });
});

console.log({INFO: "last line of the code."});
