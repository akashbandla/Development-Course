// -------------------- Single Source of Truth: Inventory ------------------------------
const inventory = [
    { id: 101, name: "Biriyani", price: 250, stock: 10 },
    { id: 102, name: "Chicken Curry", price: 360, stock: 5 },
    { id: 103, name: "Mushroom Curry", price: 280, stock: 0 }, // Out of stock
    { id: 104, name: "Paneer Curry", price: 280, stock: 3 },
    { id: 105, name: "Roti", price: 10, stock: 20 }
];

// Display menu by extracting id, name, and price from inventory
const menu = function () {
    console.log("\n=================================");
    console.log("      Welcome to ABC Restaurant   ");
    console.log("ID   Item ----------------- Price");
    
    inventory.forEach(({ id, name, price }) => {
        console.log(`${id}  ${name.padEnd(20, '.')} ₹${price}`);
    });
    
    console.log("=================================\n");
};

// -------------------- Roles Definition ------------------------------

const Chef = {
    processOrder: function (order) {
        console.log("\nChef: Checking inventory stock for the order...");
        
        const preparedItems = [];

        order.forEach(orderItem => {
            // Find item in inventory using ID or Name
            const inventoryItem = inventory.find(i => i.id === orderItem.id || i.name.toLowerCase() === orderItem.name.toLowerCase());

            if (!inventoryItem) {
                console.log(`Chef: Item "${orderItem.name}" does not exist in our menu.`);
                return;
            }

            // Stock validation check based on requested quantity
            if (inventoryItem.stock < orderItem.quantity) {
                console.log(`Chef: OUT OF STOCK / INSUFFICIENT STOCK for "${inventoryItem.name}". (Requested: ${orderItem.quantity}, Available: ${inventoryItem.stock})`);
            } else {
                // Deduct stock from inventory
                inventoryItem.stock -= orderItem.quantity;
                
                preparedItems.push({
                    id: inventoryItem.id,
                    name: inventoryItem.name,
                    price: inventoryItem.price,
                    quantity: orderItem.quantity
                });
            }
        });

        if (preparedItems.length > 0) {
            console.log(`Chef: Cooking: ${preparedItems.map(i => `${i.name} (x${i.quantity})`).join(", ")}...`);
            console.log("Chef: Food is ready! Handing over to waiter.");
        }

        return preparedItems;
    }
};

const Manager = {
    generateBill: function (cookedItems) {
        console.log("\nManager: Generating bill for prepared items...");

        let grandTotal = 0;
        const billDetails = cookedItems.map(item => {
            const itemTotal = item.price * item.quantity;
            grandTotal += itemTotal;

            return {
                name: item.name,
                quantity: item.quantity,
                pricePerUnit: item.price,
                total: itemTotal
            };
        });

        return { billDetails, grandTotal };
    }
};

const waiter = {
    getMenu: () => menu(),

    takeOrder: function (customerOrder) {
        console.log("\nWaiter: Order taken from customer. Passing to chef...");
        return Chef.processOrder(customerOrder);
    },

    serveFood: function (cookedFood) {
        if (cookedFood.length === 0) {
            console.log("Waiter: Sorry, none of your items could be prepared today.");
            return;
        }
        console.log(`\nWaiter: Serving ${cookedFood.map(i => i.name).join(", ")} to customer. Enjoy your meal!`);
    },

    requestBill: function (cookedFood) {
        if (cookedFood.length === 0) return;

        console.log("\nWaiter: Customer requested the bill. Asking manager to generate it...");
        const bill = Manager.generateBill(cookedFood);
        
        console.log("\n====== FINAL RECEIPT ======");
        bill.billDetails.forEach(item => {
            console.log(`${item.name} x${item.quantity} @ ₹${item.pricePerUnit} = ₹${item.total}`);
        });
        console.log("---------------------------");
        console.log(`GRAND TOTAL: ₹${bill.grandTotal}`);
        console.log("===========================\n");
    }
};

const customer = {
    placeOrder: function (itemsToOrder) {
        console.log("Customer: I would like to order:", itemsToOrder);
        return waiter.takeOrder(itemsToOrder);
    },

    eat: function (cookedItems) {
        if (cookedItems.length > 0) {
            console.log("Customer: Eating food... Delicious!");
        }
    },

    askForBill: function (cookedItems) {
        waiter.requestBill(cookedItems);
    }
};

// -------------------- Customer Flow ------------------------------

console.log("--- Customer Enters the Restaurant ---");

// 1. Customer asks for Menu
waiter.getMenu();

// 2. Customer orders using Item ID and requested quantity
// Note: Mushroom Curry (103) has 0 stock, Paneer Curry (104) has 3 stock (ordering 5)
const customerOrder = [
    { id: 101, name: "Biriyani", quantity: 2 },
    { id: 103, name: "Mushroom Curry", quantity: 1 }, // Stock is 0
    { id: 104, name: "Paneer Curry", quantity: 5 },    // Exceeds stock of 3
    { id: 105, name: "Roti", quantity: 4 }
];

// 3. Waiter takes order & Chef processes stock
const preparedFood = customer.placeOrder(customerOrder);

// 4. Waiter serves available food
waiter.serveFood(preparedFood);

// 5. Customer eats
customer.eat(preparedFood);

// 6. Customer asks for bill
customer.askForBill(preparedFood);