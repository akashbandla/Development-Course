// console.log("Call Back functions & Event Loops");

// setInterval(()=>{
//     console.log("Train Reached to the Station!");
// },2000);

// setTimeout(()=>{
//     console.log("Green Signal: Train is Arriving!");
// },1000);

// Promise.resolve("Chennai Parcel")
//     .then((parcel)=>{
//         console.log(`Train arrived ${parcel} received`);
//         console.log("Parcel destination Changed");
//         return "Bangalore Parcel";
//     })
//     .then((parcel)=>{
//         console.log(`Train arrived ${parcel} received`);
//         throw new Error("Train Breakdown in middle of journey");
//     })
//     .catch((err)=>{
//         console.log(`Train arrived to Repair Station, Because ${err.message}`);
//     })
//     .finally(()=>{
//         console.log("Train Reached the Destination!")
//     })



console.log("=============== Example-2: Restaurant =================");
// Macro Tasks
// customer will enter the shop and will wait one Sec & Order the Pizza
// For Every 2 secs Waiting for the Pizza

// Micro Tasks
// Waiter Takes the Order and deligate to chef
// Chef start preparing the Order with order Data
// If order data is missing, He Stop Preparing Food
// Finally convey the Acknowlegment to waiter


// customer will enter the shop and will wait one Sec & Order the Pizza
setTimeout(()=>{
    console.log("Customer Entered the Shop & Ordered Pizza!");
},1000);

// For Every 2 secs Waiting for the Pizza
setInterval(()=>{
    console.log("Waiting For the Pizza!");
},2000);

const order= undefined;

Promise.resolve(order)
    // Waiter Takes the Order and deligate to chef
    .then((order)=>{
        console.log(`Waiter Deligate the order to Chef`);
        if(order){
            return order;
        }
        else{
            throw new Error("Order Data is Missing");
        }
    })
    // Chef start preparing the Order with order Data
    .then((order)=>{
        console.log(`Chef Start preparing the ${order} `);
    })
    // If order data is missing, He Stop Preparing Food
    .catch((err)=>{
        console.log(err);
        console.log("Chef stop preparing order")
    })
    // Finally convey the Acknowlegment to waiter
    .finally(()=>{
        console.log("Chef Acknowledged to waiter")
    })






