// Add an item to the cart (if item already exists, increase quantity)
function addItem(cart, item) {
  const existingIndex = cart.findIndex(i => i.id === item.id);
  
  if (existingIndex > -1) {
    return cart.map((i, index) => 
      index === existingIndex ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
    );
  }
  
  return [...cart, { ...item, quantity: item.quantity || 1 }];
}

// Remove an item from the cart by its id
function removeItem(cart, itemId) {
  return cart.filter(item => item.id !== itemId);
}

// Update quantity of a specific item by its id
function updateQuantity(cart, itemId, newQuantity) {
  if (newQuantity <= 0) {
    return removeItem(cart, itemId);
  }
  
  return cart.map(item => 
    item.id === itemId ? { ...item, quantity: newQuantity } : item
  );
}



const originalCart = [
  { id: 1, name: 'Book', quantity: 1 },
  { id: 2, name: 'Pen', quantity: 2 }
];

// 1. Add new item
const cartWithLaptop = addItem(originalCart, { id: 3, name: 'Laptop' });

// 2. Remove item
const cartWithoutPen = removeItem(originalCart, 2);

// 3. Update quantity
const cartUpdatedQuantity = updateQuantity(originalCart, 1, 5);

// Verification: originalCart remains unchanged
console.log('Original Cart:', originalCart);
// [{ id: 1, name: 'Book', quantity: 1 }, { id: 2, name: 'Pen', quantity: 2 }]

console.log('Updated Quantity Cart:', cartUpdatedQuantity);
// [{ id: 1, name: 'Book', quantity: 5 }, { id: 2, name: 'Pen', quantity: 2 }]