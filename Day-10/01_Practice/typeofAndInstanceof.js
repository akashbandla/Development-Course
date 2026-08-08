console.log("====== Example 1 (real world): typeof/instanceof quirks and checks =======");

{

console.log(typeof 42);
console.log(typeof "hi");
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof NaN);
console.log(typeof []);
console.log(typeof function(){});

console.log(Array.isArray([]));

class ApiError extends Error{}

const err = new ApiError();

console.log(err instanceof Error);
console.log(err instanceof ApiError);

}

console.log("====== Example:2 Safety narrowing an unknown API payload =====");
{

function parseApiResult(data){

    if (data instanceof Error){
        throw data
    }

    if(Array.isArray(data)){
        return data.map(parseApiResult);   // recursive into a list
    }

    if(data===null || typeof data!=="object"){
        return data;
    }

    return { ...data, receivedAt:new Date()};
}

console.log(parseApiResult(42));
console.log(parseApiResult([1, "two", null]));
console.log(parseApiResult({id:1, name:"Aria"}));

}