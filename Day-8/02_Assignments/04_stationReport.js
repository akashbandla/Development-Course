function checkStation(name, willFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (willFail) reject(new Error(`${name} is OFFLINE`));
      else resolve(`${name} is OK`);
    }, Math.random() * 1000);
  });
}
const stations = [
  checkStation("Chennai", false),
  checkStation("Bangalore", true),
  checkStation("Vijayawada", false),
  checkStation("Nellore", true),
];

Promise.allSettled(stations)
   .then((result)=> {
        let okCount = 0;
        let failedCount = 0;
        let failedStations = [];

        console.log(result)
        result.forEach((station)=>{
            if (station.status === "fulfilled"){
                okCount += 1
            }else{
                failedCount += 1
                failedStations.push(station.reason.message)
            }
        })
        const summary = {okCount, failedCount, failedStations}
        console.log(summary)
   })
   .catch((err)=>{
        console.log(err)
   })

// ---------------- Explanation -----------------
// (4A) Promise.All() : Use it when you need all promises should be resolved
// Promise.allSetteled(): Use it when you need all promises response irrespective thier resolve and reject