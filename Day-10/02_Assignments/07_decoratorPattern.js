// Decorator function that wraps any target function to measure execution time
function executionTime(fn) {
    return (...args) => {
        const timerLabel = fn.name || 'Anonymous';

        console.time(timerLabel);        // Start timer
        const result = fn(...args);      // Run original function
        console.timeEnd(timerLabel);     // Stop timer and log time

        return result;                   // Return result
    };
}

// Target function
function add(a, b) {
    return a + b;
}

// Wrap function and execute
const withExecutionTime = executionTime(add);
const result = withExecutionTime(10, 20);

console.log("Result:", result);