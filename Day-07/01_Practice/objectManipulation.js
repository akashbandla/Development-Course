const Employees = [
    { name : 'Akash', role : "developer", workMail : "akash@gmail.com"},
    
]

const userChoice = [
    { name : 'Bharath', role : 'QA', workMail : "bharath@gmail.com"},
]

const finalEmployees = Object.assign([], Employees, userChoice)
console.log(finalEmployees)


// ----------- Fetching Only Keys from the Employee Array<Object>
console.log("\n============= Keys =====================")
const keys = Object.keys(Employees[0])
console.log(keys)

// ----------- Fetching Only keys from the Employee Array<Object>
console.log("\n============= Values =====================")
Employees.forEach((employee)=>{
    const values = Object.values(employee)
    console.log(values)
})


// ----------- Formatting into Tabular Format ------------------
console.log("\n============= Single Entry =====================")
const entry = Employees[0]
console.log(entry)



