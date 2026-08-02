'use strict'

// Car Class with setter and getter functions for the speed property
class Car {
    constructor(brand){
        this.brand = brand;
        this.color = "white";
        this.speed = 0;
    };

    // Setter method will trigger when assiging the value to speed property
    set speed(value){
        if (typeof value != "number"){
            console.error("Speed must be a Number");
            return;
        };

        if (value < 0 || value > 120){
            console.error("Speed must be in between 0 and 120");
            return;
        }

        this._speed = value;
    };

    // Getter method will trigger when reading the speed property
    get speed(){
        return this._speed;
    };

    // Setter method will trigger when assiging the value to speed property
    set color(value){
        if (typeof value != "string"){
            console.error("Color must be a String");
            return;
        };

        if (value.toLowerCase()=="pink"){
            console.error("Color must not be a Pink");
            return;
        }

        this._color = value;
    };

    // Getter method will trigger when reading the color property
    get color(){
        return this._color;
    };
};


const bmw = new Car("BMW");

console.log(bmw);

bmw.speed = 120;
console.log(bmw.speed);

bmw.speed = "100";
console.log(bmw.speed);

bmw.color = 120;
bmw.color = "Black";
console.log(bmw.color);

bmw.color = "Pink";
console.log(bmw.color)