// logical Operators
console.log(true && false);
console.log(true || false);
console.log(!true);

//  && returns teh first falsy value, or the LAST value if all truthy
console.log(0 && "hello");
console.log("hi" && "bye");
console.log(null && expensiveCall());

// || returns the first TRUTHY value, or the LAST value if all are falsy
console.log(0 || "default");
console.log(""|| null || "ok");
console.log(false || 0 || "");

// Uisng && for control flow (a very common real-world pattern)
const isLoggedIn = true;
isLoggedIn && console.log("Welcome Back!!");

const isAdmin = false;
isAdmin && console.log("Admin panel unlocked");