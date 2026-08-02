'use strict';

const {
    PROJECT_TIMELINE_IN_MONTHS,
    MIN_SALARY_RANGE,
    MAX_SALARY_RANGE,
    MIN_EXPERIENCE_RANGE,
    MAX_EXPERIENCE_RANGE,
} = require('./configurations/constants');

const { employees } = require('./data/employee');
const { getProjectEstimate } = require('./utils/salaryUtils');

// ---------- Total Project Cost for Available Resources ----------
const overallEstimate = getProjectEstimate(employees, { projectTimelineInMonths: PROJECT_TIMELINE_IN_MONTHS });

console.log(
    `Total project cost for ${PROJECT_TIMELINE_IN_MONTHS} month(s) with ${overallEstimate.employees.length} available resource(s): ${overallEstimate.totalProjectCost.toFixed(2)}`
);

// ---------- Free Employees Within a Salary Range ----------
const salaryRangeEstimate = getProjectEstimate(employees, {
    minSalary: MIN_SALARY_RANGE,
    maxSalary: MAX_SALARY_RANGE,
    projectTimelineInMonths: PROJECT_TIMELINE_IN_MONTHS,
});

console.log(
    `Free employees with salary between ${MIN_SALARY_RANGE} and ${MAX_SALARY_RANGE}:`,
    salaryRangeEstimate.employees.map((employee) => employee.name)
);

// ---------- Free Employees Within an Experience Range (for new project estimates) ----------
const experienceRangeEstimate = getProjectEstimate(employees, {
    minExperience: MIN_EXPERIENCE_RANGE,
    maxExperience: MAX_EXPERIENCE_RANGE,
    projectTimelineInMonths: PROJECT_TIMELINE_IN_MONTHS,
});

console.log(
    `Free employees with experience between ${MIN_EXPERIENCE_RANGE} and ${MAX_EXPERIENCE_RANGE} years:`,
    experienceRangeEstimate.employees.map((employee) => employee.name)
);
console.log(
    `Estimated project cost for this experience range: ${experienceRangeEstimate.totalProjectCost.toFixed(2)}`
);
