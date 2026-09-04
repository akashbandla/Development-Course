import http from 'http';

http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.write("Hello ");
    res.write("World");
    res.end("Hello World");
}).listen(3000, ()=>{
    console.log("Server Created!");
    console.log("check: http://localhost:3000");
});