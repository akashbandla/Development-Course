// ------------------ Dishes Data ---------------------------
const dishData= [
    ["Pizza", 300, 10],
    ["Burger", 150, 5],
    ["Noodles", 200, 2]
];

let dishes;


// -------------------- Object literal ----------------------
console.log("\n==============Object Literal===============")
const dish = { 
    name:"pasta", 
    price:250 
}

console.log(dish);


// ------------------- Factory Fucntion ---------------------
console.log("\n==============Factory Fucntion===============")

function createDish(name, price, quantity){
    return {name, price, quantity}
};

dishes = dishData.map(([name, price]) => createDish(name, price));

console.log(dishes);


// ------------------- Constructor Function -------------------
console.log("\n==============Constructor Fucntion===============")
function Dish(name, price, quantity){
    this.name = name;
    this.price = price;
    this.quantity = quantity
};

dishes = dishData.map(([name, price])=> new Dish(name, price))

console.log(dishes)


// ----------------- ES6 Class ---------------------------------
console.log("\n==============ES6 Class=====================")
class DishClass {
    constructor(name, price){
        this.name = name;
        this.price = price;
    };
};

dishes = dishData.map(([name, price]) => new DishClass(name, price))
console.log(dishes)