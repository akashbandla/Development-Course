// ================ map(), filter(), reduce() ============
console.log("=========== Example 1: map(), filter(), reduce() ==========");

const marks = [20, 25, 30, 55];

// --------- map() creates a new array by performing a operation on each element of array
const finalMarks = marks.map((mark)=> mark + 10);

// --------- filter() creates a new array with the elements which are satisfying the condition.
const merit = finalMarks.filter((mark)=> mark >= 35);

// --------- reduce() is used to flatten an array into sum, average etc and returns a single value.
const total = finalMarks.reduce((sum, mark)=> sum + mark);

console.log("Marks:", marks)
console.log("Final Marks", finalMarks);
console.log("Merit Marks", merit);
console.log("Sum of FinalMarks:", total);



// ================ forEach(), find(), some(), every() ============
console.log("=========== Example 2: forEach(), find(), some() ==========");

// ------- forEach() is used to iterate all elemenets in the array
let id = 1;
finalMarks.forEach((mark)=>{
    console.log(`Subject ${id}: ${mark} marks`);
    id += 1;
})

// ------- find() return the first matching record  in the array based on the condition.
const passMark = finalMarks.find((mark)=> mark > 30);

// ------- some() return the true if any one of the element satisfying the given condition.
const isSomePassed = finalMarks.some((mark)=> mark > 30);

const isAllPassed = finalMarks.every((mark)=> mark > 30);


console.log("Pass Mark:", passMark);
console.log("Is any student passed", isSomePassed)
console.log("Is All students passed", isAllPassed)


// ===================== includes() ========================
console.log("=========== Example 3: includes() ==========");

// --------- includes() check and return true/false whether given value is present in the array or not
const isThere50 = finalMarks.includes(50);
const isThere65 = finalMarks.includes(65);

console.log(isThere50);
console.log(isThere65);



// ===================== reverse() ========================
console.log("=========== Example 4: reverse() ==========");

let reversed = [...finalMarks].reverse();
console.log("Final Marks Source:", finalMarks);
console.log("Reversed marks:", reversed);

reversed = finalMarks.reverse();
console.log("Final Marks Source:", finalMarks);
console.log("Reversed Marks", reversed);



// ===================== slice() ==========================
console.log("=========== Example 5: slice() ==========");
// ------------ slice() returns a new array from start to end index in the array, end index excludes
const firstTwo = finalMarks.slice(0,2);
console.log("slice:", firstTwo)



// ===================== concat()==========================
console.log("=========== Example 6: concat() ==========");

const moreMarks = [35, 78, 98, 100, 230, 2];
// ------------ concat() combines two arrays without modifying the sources
const combined = finalMarks.concat(moreMarks);

console.log(combined);
console.log(finalMarks);
console.log(moreMarks);



// ===================== sort()==========================
console.log("=========== Example 7: sort() ==========");
const sort= [...combined].sort((a, b)=> a - b);
console.log(sort)


// ===================== sort(), split()==========================
console.log("=========== Example 8: join(), split() ==========");

// ---------- join() converts the array into a string
console.log(typeof(sort.join('-')));
const marksString= sort.join(',');

console.log(marksString)

// ---------- split() converts string into array based on teh delimetter
console.log(marksString.split(','))








