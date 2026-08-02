// Task 1 — Predict the Exact Output
console.log("========= Task 1 — Predict the Exact Output ==========");

console.log("A. Station Master starts duty");
setTimeout(() => console.log("B. Late train arrives"), 0);
const announce = setInterval(() => {
  console.log("C. Repeated announcement");
}, 100);
Promise.resolve()
  .then(() => console.log("D. Microtask 1"))
  .then(() => console.log("E. Microtask 2"));
setTimeout(() => {
  console.log("F. Clearing announcements");
  clearInterval(announce);
}, 250);
console.log("G. Station Master ends duty");


// ---------- (1A) Console output Prediction------------------
// A. Station Master starts duty
// D. Microtask 1
// -------- (2A) I was Assumed G will print after the D -----------------
// G. Station Master ends duty
// E. Microtask 2
// B. Late train arrives
// C. Repeated announcement
// C. Repeated announcement
// F. Clearing announcements


// ---------- Explanation --------------------
// (3A) Because G is sync statement, so it will execute immediatly when that statment appears in call stack
// Even though D has no delay and setTimeout has a 0ms delay, they are async statements, JS never excute async statements in main Thread before sync statements,
// async statements will be execute by EventLoop Mechanism after completing all sync statements present in call stack

// (4A) C keeps printing for every ~100ms because of its timer we gave in setInterval callback is 100ms
// and bacause of clearInterval() method inside the setTimeout() callback,  it will explicitly clear the setInterval() callback from the eventLoop,
// so after F runs the interval will vbe explicitly cleared 