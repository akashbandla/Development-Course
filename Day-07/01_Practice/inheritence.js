// Car class with start & stop methods
class Car{
    constructor(brand){
        this.brand = brand;
    };

    start(){
        console.log("Stock available");
    };

    stop(){
        console.log("Stock not available");
    };
}

const c = new Car();

// Toyota Class is inheriting the Car class using the extends keyword
class Toyota extends Car{
    constructor(){
        super('Toyota');
    };
}

const t = new Toyota();

// Triggering the Car class methods using Toyota class object
t.start();
t.stop();