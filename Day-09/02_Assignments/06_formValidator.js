const fields = [
  { name: "email", value: "a@b.com", valid: true },
  { name: "age", value: 0, valid: true },
  { name: "password", value: "", valid: false },
];

// ==========================================
// Part 1: Basic Checks & Parameter Destructuring
// ==========================================
const canSubmit = fields.every(({ valid }) => valid);
const hasErrors = fields.some(({ valid }) => !valid);
const firstInvalid = fields.find(({ valid }) => valid === false);

console.log("Can Submit:", canSubmit); 
console.log("Has Errors:", hasErrors); 

// Destructuring name and value in parameter list when logging
const {name, value} = firstInvalid;
console.log(`First Invalid Field -> Name: ${name}, Value: "${value}"`);


// ==========================================
// Part 2: The Falsy Value Trap & Explanation
// ==========================================
// NAIVE CHECK: Direct truthy check on field values
const naiveCanSubmit = fields.every(({ value }) => value);
console.log("Naive Check Result:", naiveCanSubmit); 


 // EXPLANATION:
 // The naive check `({ value }) => value` fails on the "age" field because its value is 0.
 // In JavaScript, 0 is a "falsy" value (along with "", null, undefined, false, and NaN).
 // When evaluated in a boolean context like `every()`, 0 is converted to `false`.
 // This causes the check to wrongly mark valid numeric inputs like 0 (or empty-string edge cases)
 // as missing or invalid.
 
 // FIX: Always check the explicit `valid` boolean flag instead of coercing `value`.
const fixedCanSubmit = fields.every(({ valid }) => valid);

// ==========================================
// Part 3: One-Liner Extraction using find()
// ==========================================
// Destructuring with default object fallback
const { name: invalidName } = fields.find(({ valid }) => !valid);

console.log("First Invalid Name:", invalidName);

// ==========================================
// Part 4: Combined Summary Object
// ==========================================

const invalidFieldNames = fields.filter(({valid}) => valid === false).map(({name}) => name);
const summary = {
  canSubmit,
  invalidFieldNames
};

console.log("Summary Object:", summary);