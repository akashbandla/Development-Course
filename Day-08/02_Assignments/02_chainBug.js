// This code is BUGGY on purpose. It looks like it chains correctly,
// but Station 2 does NOT actually wait for Station 1's delayed work.
function stationOneWork() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("n Parcel sorted at Station 1"), 1500);
  });
}
function stationTwoWork(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`n Station 2 processed: ${data}`), 500);
  });
}

// function runPipeline() {
//   return Promise.resolve("n Parcel dispatched")
//     .then((data) => {
//       console.log("Step 1:", data);
//       return stationOneWork(); // BUG: result is never returned or awaited
//     })
//     .then((data) => {
//       console.log("Step 2:", data); // logs "undefined" instead of Station 1's result
//       return stationTwoWork(data);
//     })
//     .then((finalData) => {
//       console.log("Step 3:", finalData);
//     });
// }


// (3A) Equivalent runPipeline function using the async/await instead of .then() callback
async function runPipeline(){
    try{
        console.log("Step 1:n Parcel dispatched");
        const data = await stationOneWork();
        console.log("Step 2:", data);
        const finalData = await stationTwoWork(data);
        console.log("Step 3:", finalData);
    }catch(err){
        console.log(err);
    }
}

runPipeline();



// ---------- Explanation --------------------
// (4A) If we forgot to return a promise inside the first .then() handler, next .then() handler is resolved with undefined
// it will continue without waiting for the previous handlers promise (output). so, chain breaks silently instead of throwing an error