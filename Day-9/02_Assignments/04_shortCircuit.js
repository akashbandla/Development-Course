const emptyQueue = [];
const ticketPrices = [120, 85, 300, 60];

// every() on empty arrays always returns true and some() on empty arrays always returns false
// Because that is vocuous truth
// Means
console.log(emptyQueue.every((price)=> price >0))
console.log(emptyQueue.some((price)=> price >0))

// Checking upto which elements some() executed based on the condition in callback
// some() stops callingBack when it find a match insead of checking every element
ticketPrices.some((price)=>{
    console.log(price)
    return price > 250
})

// Checking upto which elements every() executed based on the condition in callback
// evry() stops callingBack when any element fails the condition in callback insead of checking every element
ticketPrices.every((price)=>{
    console.log(price)
    return price < 300
})

// finding the element using find() without the filter
console.log(ticketPrices.find((ticketPrice)=>{
    return ticketPrice > 250
}))

// ----------- Explanation --------------------
// find() is a better choice because it returns the first matching element
// and stops searching immediately. Using filter()[0] would continue checking
// every element, create a new array of all matching elements, and then return
// the first one, which is unnecessary when only the first match is needed.
