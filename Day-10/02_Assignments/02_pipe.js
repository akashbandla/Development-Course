// Implement pipe() and process a product name: trim, lowercase, capitalize, add status='Available'.

// Combines functions left-to-right so data flows through them like an assembly line
function pipe(...fns){
    return (data)=>{
        return fns.reduce((result, fn)=> fn(result), data)
    }
}

// 1. Strip extra whitespace from both ends
const trim = name => name.trim();

// 2. Normalize everything to lowercase first
const lowerCase = name => name.toLowerCase();

// 3. Make the first letter uppercase (guarded against empty strings)
const capitalize = name => name.length === 0 ? '' : name[0].toUpperCase() + name.slice(1);

// 4. Wrap the cleaned name into the final product object
const status = name => ({name, status:"Available"});

// Set up our reusable pipeline
const processName = pipe(trim, lowerCase, capitalize, status);

console.log(processName("  aKAsh "))