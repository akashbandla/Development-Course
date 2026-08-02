'use strict';

// Parent User class with logout method and a static totalUsers property
class User{

    static totalUsers = 0;
    constructor(username){
        this.username = username;
        User.totalUsers += 1;
    };

    logout(){
        console.log(`${this.username} logged out`);
    };
}

class AdminUser extends User{
    #password
    constructor(username, password){
        super(username);
        this.#password = password
    }

    login(attempt){
        if (attempt === this.#password){
            console.log("Access granted");
        }else{
            console.log("Access denied");
        }
    };

    logout(){
        super.logout();
        console.log("admin session cleared");
    }

    get hasPassword(){
        if(this.#password){
            return true;
        }
        return false;
    }
}

class GuestUser extends User{
    constructor(username){
        super(username);
    }

    logout(){
        super.logout();
        console.log("Guest data discarded")
    }
}

const admin = new AdminUser("neha", "s3cret");
const guest = new GuestUser("visitor1");

admin.login("wrong");

admin.login("s3cret");

const sessions = [admin, guest];

sessions.forEach((user)=>user.logout());

console.log(User.totalUsers);

console.log(admin.hasPassword);

// SyntaxError: Private field '#password' must be declared in an enclosing class
// console.log(admin.#password);