const deeplyNested = [1, [2, 3, [4, 5, [6, 7]]]];
const words = ["hello world", "  javascript  rocks", "flat map fun"];

// ------- flat() on nested arrays ---------------
// by default it only flatten one level regardless of its depth
console.log("========= flat() by default ============")
let flattenArray = deeplyNested.flat();
console.log(flattenArray);

// -------- flat() with Infinity argument --------
// It works regardless of how deeply nested the array is
console.log("======== flat() with Infinity argument =============")
flattenArray = deeplyNested.flat(Infinity);
console.log(flattenArray);


const flatArray = words.flatMap((word)=>word.trim().split('/\s+/'));
console.log(flatArray);