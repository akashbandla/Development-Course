// Bank Account module using closure to keep the balance state strictly private
const bankAccount = (() => {
    let balance = 350; // Private variable, cannot be accessed directly outside

    return {
        // Increases balance for positive amounts
        deposit(amount) {
            if (amount <= 0) {
                console.log('Deposit amount must be greater than 0.');
                return balance;
            }
            balance += amount;
            return balance;
        },

        // Decreases balance if sufficient funds exist
        withdraw(amount) {
            if (amount <= 0) {
                console.log('Withdrawal amount must be greater than 0.');
                return balance;
            }
            if (amount > balance) {
                console.log('Insufficient funds!');
                return balance;
            }
            balance -= amount;
            return balance;
        },

        // Public getter to safely read the current balance
        getBalance: () => balance
    };
})();

// Test operations
console.log("After Deposit:", bankAccount.deposit(1000));  
console.log("After Withdrawal:", bankAccount.withdraw(500)); 
console.log('Fetching Account Balance:', bankAccount.getBalance()); 

// Proving privacy: direct access returns undefined
console.log(bankAccount.balance); 