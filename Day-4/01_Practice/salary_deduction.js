const PT = 200
const PF = 1800
const PT_AND_PF = PT + PF
const PROJECT_TIME_LINE = 3


let employees = [
    {
    name    : "Satya",
    salary  : 1500000,
    projectAllocated: false
    },
    {
    name    : "Rupesh",
    salary  : 1800000,
    projectAllocated: false
    },
    {
    name    : "Rupesh",
    salary  : 1800000,
    projectAllocated: true,
    projectCompletionDate: "2026/08/10"
    },
    {
    name    : "Keerthi",
    salary  : 2800000,
    projectAllocated: true,
    projectCompletionDate: "2026/08/20"
    },
];



function salaryBreakdown(salary){
    
    if (salary <= 1200000){
    tax = (salary)*(0)
    }else if (salary>1200000 && salary<=1500000){
        tax = (salary)*(0.2)
    }else if (salary>1500000 && salary<=2000000){
        tax = (salary)*(0.1)
    }else if (salary>2000000 && salary<=2500000){
        tax = (salary)*(0.15)
    }else if (salary>2500000 && salary<=3000000){
        tax = (salary)*(0.2)
    }else if (salary>3000000 && salary<=3500000){
        tax = (salary)*(0.25)
    }else if (salary>3500000 && salary<=4000000){
        tax = (salary)*(0.3)
    }else if (salary>4000000 && salary<=4500000){
        tax = (salary)*(0.35)
    }else if (salary>4500000 && salary<=5000000){
        tax = (salary)*(0.4)
    }else if (salary>5000000){
        tax = (salary)*(0.45)
    }

    salary_per_month = (salary - tax)/12

    inHandSalary = salary_per_month - PT_AND_PF

    salaryPerHour = (inHandSalary)/160

    return inHandSalary
}


function budgetBreakDown(employees){
    let budgetPerEmployee = []
    for(let i = 0; i<employees.length; i++){
        if (employees[0]?.projectAllocated === false){
            let monthly_salary = salaryBreakdown(employees[0]?.salary)
            budgetPerEmployee.push(monthly_salary * PROJECT_TIME_LINE) 
        }
    }
    return budgetPerEmployee
}


const budgetPerEmployee = budgetBreakDown(employees)

let projectBudget = 0
for (let i=0; i<budgetPerEmployee.length; i++){
    projectBudget = projectBudget + budgetPerEmployee[i]
}

console.log(`Total Project Budget: ${projectBudget}`)






