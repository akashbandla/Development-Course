// Global Handler
process.on("uncaughtException", (err)=>{
    console.log("Pizza manager:", err.message);
    console.log("Dont worry, we'll make another pizza!");
});

function makePizza(){
    console.log("chef is making pizza..");

    // Oops! Something went wrong
    throw new Error("Pizza got burned!");
}

console.log("Customer placed on order.");

makePizza();

console.log("Pizza delivered");