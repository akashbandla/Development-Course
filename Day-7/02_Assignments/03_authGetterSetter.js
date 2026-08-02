'use strict';

// Account class with constructor which accepets username and password on object creation
class Account {
    constructor(username, password){
        this.username = username;
        this.password = password;
        this._failedAttempts = 0;
        this._isLoggedIn = false;
    }

    /**
     * Password method used to Authenticate user with this password if he does not exceeds
     * the failedAttempts limit, on every failed attempt it increment failedAttempt Property
     * on succefull authentication it modify the isLoggedIn Property and resets the failedAttempts property
     * @param {String} password 
     * @returns It doesn't return any value
     */
    login(password){
        if(this._failedAttempts >= 3){
            console.log("Account locked")
            return
        }

        if (this.password != password){
            this._failedAttempts += 1;
            console.log("incorrect password");
            return
        }

        this._isLoggedIn = true;
        this.failedAttempts(0);
    }

    // ------- Setter Function for the failedAttempts property -----------
    set failedAttempts(value){
        if (value < 0){
            console.log("Failed attempts cannot be negative");
            return ;
        }
        this._failedAttempts = value;
    }

    // ------ Getter Function for the for the isLoggedIn property --------
    get status(){
        if (this._failedAttempts >= 3){
            return "Locked"
        }
        
        if(this._isLoggedIn){
            return "Logged in";
        }
        else{
            return "Logged out";
        }
    }

}

// -------------------- Create a account ---------------------------------
const acc = new Account("neha", "neha@123");

// -------------------- Trying to loggin with wrong passwords -----------
acc.login("neha@1234");
acc.login("neha@12345");
acc.login("neha@12346");

console.log(acc.status);

acc.login("neha@123");

// Assigning the value to status without status setter method inside the class
try{
    acc.status = "Logged In";
}catch(err){
    console.log(err.message);
}

console.log(acc.status);

