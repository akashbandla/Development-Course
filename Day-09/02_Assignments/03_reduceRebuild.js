const orders = [
  { id: 1, amount: 250, status: "paid" },
  { id: 2, amount: 400, status: "pending" },
  { id: 3, amount: 150, status: "paid" },
];

// ------- Help function identical to Array.prototype.map ------------
function myMap(paidOrders, fn){
    return paidOrders.reduce((acc, order)=>{
        acc.push(fn(order))
        return acc
    }, [])
}

// ------- Help function identical to Array.prototype.filter ------------
function myFilter(orders, fn){
    return orders.reduce((acc, order)=>{
        if (fn(order)){
            acc.push(order)
        }
        return acc
    },[])
}

// fetching paid orders using the reduce()
console.log("======= Fecthing paid orders without filter() ============")
const paidOrders = myFilter(orders, (order)=> order.status === "paid")
console.log(paidOrders)

// fetching amounts of paid orders using the reduce()
console.log("======= Fecthing amounts of paid orders without map() ============")
const amounts = myMap(paidOrders, (order)=> order.amount)
console.log(amounts);

// calculating the total of amounts using reduce()
console.log("========= Calculating the Total using the reduce()")
const total = amounts.reduce((acc, amount)=> acc+amount, 0);
console.log("Paid Orders total Amount:", total)

// -------- using reduce without passing the intial value
// if there is no intial value then js automatically assign the first element of array as intial value
const sum = orders.reduce((acc, order)=> acc+order.amount)
console.log(sum)