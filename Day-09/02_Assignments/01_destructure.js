// ---------- config object --------------------
const config = {
  host: "localhost",
  port: 8080,
  db: { name: "orders", replica: null }
};

// ----------- Object Destruction --------------
const {
  host,
  port: PORT,
  db: { name: dbName, replica = "primary" },
  timeout = 5000,
  region = "ap-south1"
} = config;
const arr = [1, 2, , 4];
const [first, second, third = 99, fourth] = arr;

// ---------- Printing all property to see the values ---------
console.log(PORT);
console.log(dbName);
console.log(replica);
console.log(timeout);
console.log(third);
console.log(region);

// ------------- Explanation ---------------------------------
// 2A) In object destructuring, default values assigns to properties only when their value is undefined
// But, here replica property value is not undefined, so replica ends up as null and NOT primary

// 3A) The Third becomes 99. Because arr[] at 2 index there is a hole(empty slot), in js reading a hole in array returns undefined,
// in Object Destruction, if property's value is undefined then it assigns the default value if exists.
