// -------- Loose(==) and Strict(===) Comparision ------------
console.log("--------- Loose(==) and Strict(===) Equality --------");
const dbEmployeeId = 101;
const apiEmployeeId = "101";

console.log(dbEmployeeId == apiEmployeeId);
console.log(dbEmployeeId === apiEmployeeId);

// -------- Best Practice -----------------
console.log(Number(apiEmployeeId) == dbEmployeeId);


// ------- Example:2 Students Marks Validation -------------
{

function validateMarks(marks){
    if(!marks){
        return "Marks are required";
    }
    return null;
}

function validateMarksFixed(marks){
    if(marks === undefined || marks === null || marks === ""){
        return "Marks are required";
    }
    return marks;
}

console.log(validateMarks());
console.log(validateMarksFixed(100));

}

// ------------- falsy values ----------------------
console.log("=========== falsy Values ==============")
console.log(Boolean(false));
console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));


