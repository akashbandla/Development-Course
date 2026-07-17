// Declaration - hoisted
greet();

function greet(){
    console.log("Hi!");
};


// Expression     - not hoisted
sayBye();         // TypeError

const sayBye = function () {
    console.log("Bye!");
};


// Arrow Functions
const team = {
    name : "Devs",
    regular: function () {
        console.log(this.name);     // "Devs"
    },
    arrow: () => {
        console.log(this.name);     // undefined
    }
};

team.regular();                     // "Devs"
team.arrow();                       // undefined