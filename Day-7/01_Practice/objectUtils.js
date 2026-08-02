// ------------ Assignment 2: Object.assign & Object.freeze ----------------------
const defaultDish = {
    spiceLevel : "medium",
    portion : "regular"
}

const userChoice = {
    spiceLevel : "extra hot"
}

// ----------- creating an object from defaultDish & userChoice using Object.assign method
const finalOrder = Object.assign({}, defaultDish, userChoice);

console.log(finalOrder)

Object.freeze(finalOrder);

// ----------- Alter the finalOrder spiceLevel after Object.freeze()
finalOrder.spiceLevel = "mild";

console.log(finalOrder)



// Method,                    Can Add Props?,   Can Delete Props?,      Can Modify Values?
// Object.freeze(),             ❌ No,              ❌ No,                    ❌ No
// Object.seal(),               ❌ No,              ❌ No,                    ✅ Yes
// Object.preventExtensions(),  ❌ No,              ✅ Yes,                   ✅ Yes
