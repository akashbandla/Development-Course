// File System (fs) Module:
const fs = require('fs');

// Reading the file
fs.readFile('file.txt', 'utf8', (err, data)=>{
    if(err) return console.error(err);
    console.log(data)
});

// Writing into files
fs.writeFile('output.txt', "Hello world", (err)=>{
    if (err) return console.error(err);
    console.log("File Saved");
});

// Creating Directories
fs.mkdir('logs/08-08-2026', {recursive:true}, (err)=>{
    if (err) return console.error(err);
    console.log("Directory created");
});