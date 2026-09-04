// Blocking Code (Synchronous)
console.log("============ Blocking ===============")
const fs = require('fs');
const data = fs.readFileSync('file.txt');
console.log(data.toString());
console.log("This runs after the file read")


// Non-Blocking code(asynchronous)
console.log("============ Non-blocking ===============")
fs.readFile('file.txt', (err, data)=>{
    if (err) throw err;
    console.log(data.toString());
});

console.log("This runs immediately");
