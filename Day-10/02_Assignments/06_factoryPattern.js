// Individual Payment Strategy Classes
class CreditCardPayment {
  pay(amount) {
    console.log(`Paid $${amount} using Credit Card.`);
  }
}

class UPIPayment {
  pay(amount) {
    console.log(`Paid $${amount} using UPI.`);
  }
}

class CashPayment {
  pay(amount) {
    console.log(`Paid $${amount} in Cash.`);
  }
}

// Object map holding constructor references
const paymentMethods = {
  creditcard: CreditCardPayment,
  card: CreditCardPayment,
  upi: UPIPayment,
  cash: CashPayment
};

// Payment Factory using object key lookup
function createPaymentMethod(type) {
  const PaymentClass = paymentMethods[type.toLowerCase()];

  if (!PaymentClass) {
    throw new Error(`Unsupported payment method: ${type}`);
  }

  return new PaymentClass();
}

// --- Usage ---
let payment = createPaymentMethod('creditcard');
payment.pay(150); 

payment = createPaymentMethod('upi');
payment.pay(50);

payment = createPaymentMethod('cash');
payment.pay(20); 