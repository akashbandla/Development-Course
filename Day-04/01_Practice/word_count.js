// return word count in a paragraph

const paragraph = "     H i,       This     is     Aka    sh,   from      Nellore      "

let j = 0

// skipping the starting spaces
while(paragraph[j]=== ' '){
    j+=1;
}

// Calculating the words
let words = 0
for(let i = j; i<paragraph.length+1; i++){
    if (paragraph[i] === ' ' && paragraph[i-1] !=' '){
        words = words+1
        
    }
}

console.log(words)