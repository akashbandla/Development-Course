// step 1: Create your own error Class
class AgeError extends Error{}

// Step 2: Create a function and throw your Own defined error
function checkAge(age){
    if (age<18){
        throw new AgeError("Age must be 18 or above");
    }

    console.log(age)
}

// Function call in try/catch block to catch errors
try{
    checkAge(16)
}catch(err){
    console.log("Error:", err.message);
    console.log("Error Name:", err.stack);
}finally{
    console.log("Operation compelted");
}




// ======== custom error class =============
class ValidationError extends Error {
    constructor(field, message) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    }
}


try {
    throw new ValidationError('email', 'Invalid email');
} catch (err) {
if (err instanceof ValidationError) {
    highlightField(err.field);
}
} finally {
    hideLoadingSpinner();  // always runs
}