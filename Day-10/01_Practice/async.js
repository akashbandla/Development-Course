function fetchUser(){
    return new Promise((resolve, reject)=>{
        console.log('fetching user')
        setTimeout(()=>{
            reject(new Error("Server is down"));
        }, 10000);
    })
};


async function getUser(){
    try{
        console.log("Inside try block");
        const user = await fetchUser();
        console.log("User:", user);
    }catch(err){
        console.log("Inside the catch Block");
        console.log("Error:", err.message);
    }finally{
        console.log("Inside finally block");
        console.log("request finished");
    }
}

console.log('Program started');
getUser();
console.log("Program Ended");