/**
 * 
1) If you destructure { a, b } from an object that is actually null or undefined, what happens, and how would you
safely destructure a value that MIGHT be null without crashing?

---------- Answer ------------
const obj = null;
const { a, b } = obj;
TypeError: Cannot destructure property 'a' of 'obj' as it is null.

const obj = undefined;
const { a, b } = obj;
TypeError

Use the nullish coalescing operator (??)
const obj = null;
const { a, b } = obj ?? {};
 *
 */



/**
 * 
2)  Does Array.prototype.map() skip holes in a sparse array the same way forEach() does? Justify with one
sentence, and name one method that does NOT skip holes.

------------- answer ----------------
map() skips holes just like forEach() because both iterate only over existing array elements, 
whereas for...of treat holes as undefined.
Because, for...of uses the array iterator, which yields undefined for holes.
 *
 */



/**
 * 
 3)  You call arr.sort() on an array of numbers like [10, 2, 33, 4] with no comparator. What is the actual output, and
 why does sort() behave this way by default?

 ------------ answer ---------------
 Actual Output : [10, 2, 33, 4]

 Because, Without a comparator, JavaScript converts every element into a string.
 Internally:[
    "10",
    "2",
    "33",
    "4"
]
Then performs lexicographical (dictionary) sorting.
sample: "10" starts with '1', "2" starts with '2', 1 < 2. so, "10" comes first.

so, Always pass a comparator when sorting numbers.
i.e, arr.sort((a,b)=>b-a);

 * 
 */



/**
 * 
 4) In array destructuring, can you skip elements you don't need? Show the syntax for skipping the 2nd element
    while grabbing the 1st and 3rd from [10, 20, 30].

    ----------- answer ------------
    const arr = [10,20,30];
    const [first, , third] = arr;

    The empty comma tells JavaScript: Ignore this position.

    Multiple Skips:
    const arr = [10,20,30,40,50];
    const [a,,c,,e]=arr;
 * 
 */


/**
 * 
 5) Is includes() able to correctly find NaN inside an array, when indexOf() cannot? Explain the one-sentence
    reason why these two methods disagree on NaN.

    ----------- answer -------------
    indexOf() uses strict equality (===), where NaN !== NaN.
    Because, IEEE-754 defines NaN as "not equal to anything, including itself."
    while includes() uses the SameValueZero algorithm, which considers NaN equal to NaN.

    example:
    const arr = [1,2,NaN];
    console.log(arr.includes(NaN)); // true
    console.log(arr.includes(NaN)); // -1
 * 
 */


