function unreliableServer(delayMs, label) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Response from ${label}`), delayMs);
  });
}

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Timeout")), ms);
    promise.then((value) => {
      clearTimeout(timer);
      resolve(value);
    });
  });
}

// Usage
withTimeout(unreliableServer(3000, "Server A"), 1000)
  .then(console.log)
  .catch(console.error);

withTimeout(unreliableServer(500, "Server B"), 1000)
  .then(console.log)
  .catch(console.error);
