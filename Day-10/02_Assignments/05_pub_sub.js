// Implement EventBus with subscribe/publish. Notify Inventory, Email and Analytics when an order is placed.

class EventBus {
    constructor(){
        // Store event subscriptions in an object lookup map { eventName: [callbacks] }
        this.listeners = {};
    }

    // Register a subscriber callback for a named event topic
    subscribe(event, callback){
        // Initialize an empty array for this event if it doesn't exist yet
        if(!this.listeners[event]){
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    // Broadcast data to all registered callbacks under the specified event
    publish(event, data){
        // Safely execute callbacks only if subscribers exist for this event
        if(this.listeners[event]){
            this.listeners[event].forEach(callback => callback(data));
        }
    }
}

const bus = new EventBus();

// --- Event Subscribers ---
// 1. Inventory listener
bus.subscribe("order:placed", order => 
    console.log(`[Inventory] Deducting stock for item ID: ${order.itemId}`)
);

// 2. Email listener
bus.subscribe("order:placed", order => 
    console.log(`[Email] Sending confirmation receipt to: ${order.userEmail}`)
);

// 3. Analytics listener
bus.subscribe("order:placed", order => 
    console.log(`[Analytics] Logging purchase event total: $${order.total}`)
);

// Function simulating an order creation flow
function createOrder(order){
    console.log("Order is Placed");
    bus.publish("order:placed", order);
}

// Dummy payload
const order = {
    orderId : 123456,
    itemId : 456789,
    userEmail : "akashbandla@gmail.com",
    total : 12350
};

createOrder(order);