function* numbers(){
    yield 1
    yield 2
    yield 3
    yield 4
    yield 5
}

const iterator = numbers()

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

if(1==[]){
    console.log(1)
}

if(false){
    console.log(2)
}
