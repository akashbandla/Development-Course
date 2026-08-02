//  call by value example (primitive)
let a = 10;

let b = a;

console.log(b);

b = 20;

console.log(b);
console.log(a);


// call by reference example (object)
let obj1 = { score : 10};
console.log(obj1)

let obj2 = obj1

obj2.score = 20

console.log(obj2)
console.log(obj1)

