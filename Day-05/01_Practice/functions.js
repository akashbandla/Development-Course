// --------------- Function Declaration ----------------------
console.log(sayHello());

function sayHello(){
    console.log('This is the example for the Function Declaration')
    return "Hello From the sayHello function";
}

console.log('==================================================')

// --------------- Function Expression ------------------------
const sayHi = function (){
    console.log('This is the example for the Function Expression')
    return "Hello From the sayHi function";
}

console.log(sayHi())

console.log('==================================================')

// --------------- Arrow Function ------------------------------

const arrowFunction = () => "Hello from the Arrow Function"

console.log(arrowFunction())