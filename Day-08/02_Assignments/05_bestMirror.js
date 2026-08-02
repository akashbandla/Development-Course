const mirror1 = new Promise((_, reject) => setTimeout(() => reject("Mirror 1 down"), 200));
const mirror2 = new Promise((resolve, reject) => setTimeout(() => reject("Mirror 2 OK"), 800));
const mirror3 = new Promise((_, reject) => setTimeout(() => reject("Mirror 3 down"), 400));
const mirror4 = new Promise((_, reject) => setTimeout(() => reject("Mirror 4 down"), 300));


Promise.race([mirror1, mirror2, mirror3])
   .then((result)=>{
    console.log(`In success handler: ${result}`)
   })
   .catch((err)=>{
    console.log("In Catch block:", err)
   })

// Promise.any([mirror1, mirror2, mirror3, mirror4])
//    .then((result)=>{
//     console.log(`In success handler: ${result}`)
//    })
//    .catch((err)=>{
//     console.log("In Catch block:", err)
//    })

// Wraped Promise.any() inside the try/catch using async await 
async function checkMirrors(){
    try{
        await Promise.any([mirror1, mirror2, mirror3, mirror4])
    }catch(err){
        console.log(err.name)
        console.log(err)
    }
    
}
// Executing the Promise.any() with all rejected promises
// We will get the AggregateError: All promises were rejected
checkMirrors()



