outer: for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++){
        if (j === 1) continue;    
        if (i === 2) break outer;
        console.log(i, j); 
    }
}


// prefer this instead when possible:
function findMatch(matrix, target){
    for (const row of matrix){
        for (const cell of row){
            if (cell === target) return true;     //early return
        }
    }
    return false;
}