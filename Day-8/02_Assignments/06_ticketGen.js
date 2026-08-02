// ---------------- Asynchronous Block -----------------------------
{

async function* issueTickets(count){
    try{
       for (let i=1; i<=count; i++){
        yield await new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(`Ticket #${i} issued`)
            }, 500)
        })
       } 
    }catch(err){
        console.log(err)
    }
    
}


for await (const t of issueTickets(4)){
    console.log("Ticket:", t)
}

const ticket = issueTickets(4);

console.log(ticket.next())
console.log(ticket.next())
console.log(ticket.next())
console.log(ticket.next())
console.log(ticket.next())

// console.log(await ticket.next())
// console.log(await ticket.next())
// console.log(await ticket.next())
// console.log(await ticket.next())
// console.log(await ticket.next())

}


// ----------------- Synchronous Block ------------------
{


function* issueTickets(count){
    for (let i=1; i<=count; i++){
    yield new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(`Ticket #${i} issued`)
        }, 500)
    })
    } 
    
}

const ticket = issueTickets(4);

console.log(ticket.next())
console.log(ticket.next())
console.log(ticket.next())
console.log(ticket.next())
console.log(ticket.next())


}


// ------------- Explanation --------------------------
// Normal (sync) function → returns a plain value immediately.

// Normal generator (function*) → returns a synchronous iterator object. Each .next() call gives { value, done } directly, no promises involved.

// Async function (async function) → always returns a Promise. Even if you return 42, the caller sees Promise { 42 }.

// Async generator (async function*) → returns an async iterator. Each .next() call gives back a Promise that eventually resolves to { value, done }.