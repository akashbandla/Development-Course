// -------- Concept 4: Set & Map ------------------------

console.log("========== SET ===============");

const numbers = [1, 2, 2, 3, 4, 4, 5];

const uniqueNumbers = [...new Set(numbers)];

console.log("original :", numbers);
console.log("Unique :", uniqueNumbers);

// ------------- Creating a set and adding a values
console.log("=========== add() ============");

const fruits = new Set();
fruits.add("Apple");
fruits.add("Orange");
fruits.add("Apple");

console.log(fruits);


// ------------ has() ----------------------
console.log("========== has() =============");

console.log(fruits.has("Apple"));
console.log(fruits.has("Grapes"));

// ----------- delete() --------------------
console.log("=========== delete() =========");

fruits.delete("Apple");
console.log(fruits);

// ---------- Size -------------------------
console.log("========== size ================")
console.log(fruits.size);


// ---------- Loop through set ------------
console.log("========== Loop ==============");

const colors = new Set(["red", "blue", "black"]);

for (const color of colors){
    console.log(color);
}




// --------------- MAP ----------------------
console.log("======== Map =============");
const marks = new Map();

// ------------- set-----------------
console.log("========= set() =============");
marks.set("Akash", 92);
marks.set("Yaswanth", 99);

console.log(marks);

// ------------- get() ---------------
console.log('=========== get() ============');
console.log(marks.get("Akash"));


// ------------ has() ----------------
console.log("========== has() =============");
console.log(marks.has('Akash'));

// ------------ delete() -------------
console.log("========= delete() =============");
marks.delete("Yaswanth");
console.log(marks);

// ------------ size() ---------------
console.log("=========== size() ==============");
console.log(marks.size);
