// 1Q) If you chain 3 .then() calls onto an already-resolved promise, and ALSO have a setTimeout(fn, 0) queued
// before any of them run — which runs first, and why?

// A) The 3 .then() calls executed first even there is a setTimeout(fn, 0) queued before any of them run.
// Because promise handlers (.then()) are micro tasks which has highest priority then macro tasks i.e (setTimeout) in JS Event Mechanism

// ==========================================================================================================================================

// 2Q)  Does await block the entire JavaScript engine (all other code everywhere) while it waits, or does it only
// pause the current async function? Justify with one sentence.

// A) Await block doesn't block entire javascript engine while it waits, it only pause the current async function and handover to eventLoop
// to free the call stack for sync statement execution or other priority statemnts which are present in thier respective queues

// ==========================================================================================================================================

// 3Q) If a for...of loop is used on a plain (non-async) generator that internally returns promises instead of plain
// values, what will the loop variable actually be on each iteration — the resolved value, or the Promise
// object itself? Why?

// A) The Loop variable acutally holds the object, where the value is Promise object later it will resolve into value
// example: from 06_ticketGen assigment: { value: Promise { <pending> }, done: false }

// ==========================================================================================================================================

// 4Q)  In Promise.allSettled(), what are the exact two possible values of the status field in each result object,
// and what other field accompanies each one

// A) In Promise.allSettled(), the exact two possible values of the status field are (fulfilled & rejected) amd other field accompanies are
//  if status is fullfilled then other accompany field is value
//  if status is rejecyed then other accompany field is reason

// ==================================== Example Output ===============================================
// [
//   { status: 'fulfilled', value: 'Chennai is OK' },
//   {
//     status: 'rejected',
//     reason: Error: Bangalore is OFFLINE
//         at Timeout._onTimeout (D:\Terralogic Academy\Development-Course\Day-8\02_Assignment.js\04_stationReport.js:4:28)
//         at listOnTimeout (node:internal/timers:605:17)
//         at process.processTimers (node:internal/timers:541:7)
//   }
// ]
