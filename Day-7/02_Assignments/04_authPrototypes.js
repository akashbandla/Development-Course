'use strict';

// SessionHandler object with role property
const sessionHandler = {
    role : "guest",
    login : function(){
        return `${this.username} logged in as ${this.role}`;
    },
    logout : function(){
        return `${this.username} logged out`;
    }
}

const user1 = Object.create(sessionHandler);
user1.username = 'arjun';

const user2 = Object.create(sessionHandler);
user2.username = 'sara';
user2.role = 'admin';

// TODO: Need to add a comment why user1 & user2 logged in as different users
console.log(user1.login());
console.log(user2.login());

sessionHandler.role = 'member';

// TODO: Need to add a comment why user1 always lookup sessionHandler object
console.log(user1.login());

console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(user1)));

// TODO: Need to add a comment why login & logout are not duplicated in memory
console.log(Object.keys(user1));





