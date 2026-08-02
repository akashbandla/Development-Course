// ------------------------------------------------------
// Promise.all()
// wait for the all promises to Succeed
// ------------------------------------------------------

{

const fruit1 = Promise.resolve("Apple");
const fruit2 = Promise.resolve("Orange");
const fruit3 = Promise.resolve("Grapes");

Promise.all([fruit1,fruit2,fruit3])
   .then((result)=>{
    console.log("Promise.all:", result);
    return result[0]
   })
   .then((fruit1)=>{
    console.log("Fruit1:", fruit1)
   })

// ------------------------------------------------------
// Promise.allSettled()
// Returns the result of All promises
// {success or failure}
// ------------------------------------------------------

Promise.allSettled([fruit1, fruit2, fruit3])
   .then((result)=>{
    console.log("Promise.allSettled:", result);
   })
   .then(()=>{
    console.log("Second .then() Handler in Promise.allSettled()")
   })

}
// ------------------------------------------------------
// Promise.race()
// Returns the first promise to finish
// ------------------------------------------------------

const fast = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        reject("Error while processing the fast callback");
    },1000)
})

const slow = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve("Slow")
    },5000)
})

Promise.race([fast, slow])
  .then((result)=>{
    console.log("Promise.race:", result);
  })
  .catch((err)=>{
    console.log("promise.race():", err)
  })


// ------------------------------------------------------
// Promise.any()
// Returns a single promise as soon as any of the input promises fulfills 
// ------------------------------------------------------
{

const fruit1 = Promise.reject("Because it is ripped Apple");
const fruit2 = Promise.resolve("Orange");
const fruit3 = Promise.resolve("Grapes");

Promise.any([fruit1, fruit2, fruit3])
  .then((result)=>{
    console.log("Promise.any:", result);
  })
  .finally(()=>{
    console.log("Process is completed")
  })

}