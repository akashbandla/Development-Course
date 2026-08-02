// --------- Traditional object manipulation
const person = {
    name : "Akash",
    age : 25
};

const name = person.name;
const age = person.age;

console.log(name, age);

{

// --------------- Efficient way ------------------
console.log("========= Object Destruction =============");

const {name, age} = person;
console.log(name, age);

}

