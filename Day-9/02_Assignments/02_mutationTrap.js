// ------------------ sort() ----------------------
// Mutate the original array in place
console.log("================= sort() ===========================")

{

const platformArrivals = ["Chennai Exp", "Nellore Local", "Bangalore SF", "Vijayawada Pass"];
function getSortedBoard(trains) {
  return trains.sort();
}
const sortedBoard = getSortedBoard([...platformArrivals]);
console.log("Sorted board:", sortedBoard);
console.log("Original array:", platformArrivals);

}

// ----------------- reverse() --------------------
// Mutate the original array in place
console.log("================= reverse() ===========================")

{

const platformArrivals = ["Chennai Exp", "Nellore Local", "Bangalore SF", "Vijayawada Pass"];
function getSortedBoard(trains) {
  return trains.reverse();
}
const reverseBoard = getSortedBoard([...platformArrivals]);
console.log("Reverse board:", reverseBoard);
console.log("Original array:", platformArrivals);

}

// ----------------- slice() --------------------
// returns the new array with in the given range(start, end), excludes end
console.log("================= slice() ===========================")
const platformArrivals = ["Chennai Exp", "Nellore Local", "Bangalore SF", "Vijayawada Pass"];
console.log("Last two arrivals:", platformArrivals.slice(-2))

// -------------- Explanation ------------------------------
// Mutates the Original Array
// ---------------------------------------------------------
// sort(), reverse(), splice()

// Returns a new array
// ---------------------------------------------------------
// slice(), concat(), map()

// splice() actually mutate the original array by adding, removing or replacing elements
// also it returns the removed elemnts as a new array