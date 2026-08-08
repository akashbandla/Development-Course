'use strict';

// SINGLETON PATTERN: Guarantees only one instance of Logger exists throughout the app.
class Logger {
    constructor() {
        // GUARD CLAUSE: If an instance already exists (e.g., via 'new Logger()'),
        // return that existing instance instead of creating a new one.
        if (Logger.#instance) {
            return Logger.#instance;
        }

        // Only runs the very first time an instance is created.
        this.logs = [];

        // Store reference to 'this' (the current new object) in the private static field.
        Logger.#instance = this;
    }

    // Private static field to store the single shared instance across the class.
    static #instance;

    // Method to retrieve the single Logger instance.
    static getInstance() {
        if (!Logger.#instance) {
            Logger.#instance = new Logger(); // Triggers constructor on first call
        }
        return Logger.#instance;
    }

    // Appends formatted timestamped entries to the shared logs array.
    log(message) {
        const now = new Date().toISOString();
        this.logs.push({ now, message });
        console.log(`${now}-:${message}`);
    }

    // Output the complete log history stored in memory.
    getLogs() {
        console.log(this.logs);
    }
}

// 1. Get instance using the standard static method
const logger1 = Logger.getInstance();
logger1.log("Akash created logger1 instance");

// 2. Get instance again via getInstance() -> returns same object reference
const logger2 = Logger.getInstance();
console.log("Does Both instance are same :", logger1 === logger2);

// 3. Try to bypass getInstance() with direct 'new' -> constructor guard redirects to original instance
const logger3 = new Logger();

// Verify all references point to the exact same object in heap memory
console.log("Does all instance are same :", logger1 === logger2 && logger2 === logger3);

// Log another message through logger2
logger2.log("Another user also created a Logger2 Instace");

// Both getLogs calls print identical arrays because all 3 variables point to the same memory address
logger2.getLogs();
logger3.getLogs();