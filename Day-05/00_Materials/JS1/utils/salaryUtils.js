'use strict';

const {
    MONTHS_IN_YEAR,
    STANDARD_DEDUCTION,
    MONTHLY_PF_DEDUCTION,
    MONTHLY_PT_DEDUCTION,
    TOTAL_MONTHLY_HOURS,
    CESS_RATE,
    TAX_SLABS,
    DESIGNATION_LEVELS,
} = require('../configurations/constants');

/**
 * Converts an annual CTC into a take-home hourly rate, after New Regime
 * income tax + cess and monthly PF/PT deductions.
 * @param {number} annualSalary
 * @returns {number} hourly take-home salary
 */
function getHourlySalary(annualSalary) {
    const taxableIncome = Math.max(annualSalary - STANDARD_DEDUCTION, 0);

    let tax = 0;
    let remainingIncome = taxableIncome;

    for (const slab of TAX_SLABS) {
        if (remainingIncome <= 0) break;
        const taxedAtThisSlab = Math.min(remainingIncome, slab.width);
        tax += taxedAtThisSlab * slab.rate;
        remainingIncome -= taxedAtThisSlab;
    }

    const totalTax = tax * (1 + CESS_RATE);
    const monthlyTax = totalTax / MONTHS_IN_YEAR;
    const monthlyGrossSalary = annualSalary / MONTHS_IN_YEAR;
    const monthlyNetSalary = monthlyGrossSalary - monthlyTax - MONTHLY_PF_DEDUCTION - MONTHLY_PT_DEDUCTION;

    return monthlyNetSalary / TOTAL_MONTHLY_HOURS;
}

/**
 * Derives an employee's designation from their track and experience.
 * @param {string} track - 'engineering', 'qa', or 'management'
 * @param {number} experience - years of experience
 * @returns {string} designation
 */
function getDesignation(track, experience) {
    const level = DESIGNATION_LEVELS.find((designationLevel) => experience <= designationLevel.maxExperience);
    return level[track];
}

/**
 * Filters employees whose salary falls within the given range (inclusive).
 * @param {Array<Object>} employees
 * @param {number} minSalary
 * @param {number} maxSalary
 * @returns {Array<Object>} employees within the salary range
 */
function getEmployeesBySalaryRange(employees, minSalary, maxSalary) {
    return employees.filter((employee) => employee.salary >= minSalary && employee.salary <= maxSalary);
}

/**
 * Filters employees whose experience (in years) falls within the given range (inclusive).
 * @param {Array<Object>} employees
 * @param {number} minExperience
 * @param {number} maxExperience
 * @returns {Array<Object>} employees within the experience range
 */
function getEmployeesByExperienceRange(employees, minExperience, maxExperience) {
    return employees.filter(
        (employee) => employee.experience >= minExperience && employee.experience <= maxExperience
    );
}

/**
 * Finds employees who are free to be allocated to a new project (optionally narrowed by
 * salary/experience range) and estimates the project cost for them.
 * @param {Array<Object>} employees
 * @param {Object} [range]
 * @param {number} [range.minSalary]
 * @param {number} [range.maxSalary]
 * @param {number} [range.minExperience]
 * @param {number} [range.maxExperience]
 * @param {number} range.projectTimelineInMonths
 * @returns {{employees: Array<Object>, totalHourlyRate: number, totalProjectCost: number}}
 */
function getProjectEstimate(employees, { minSalary, maxSalary, minExperience, maxExperience, projectTimelineInMonths }) {
    let freeEmployees = employees.filter((employee) => employee.projectAllocated === false);

    if (minSalary !== undefined && maxSalary !== undefined) {
        freeEmployees = getEmployeesBySalaryRange(freeEmployees, minSalary, maxSalary);
    }

    if (minExperience !== undefined && maxExperience !== undefined) {
        freeEmployees = getEmployeesByExperienceRange(freeEmployees, minExperience, maxExperience);
    }

    const totalHourlyRate = freeEmployees.reduce(
        (total, employee) => total + getHourlySalary(employee.salary),
        0
    );
    const totalProjectCost = totalHourlyRate * TOTAL_MONTHLY_HOURS * projectTimelineInMonths;

    return { employees: freeEmployees, totalHourlyRate, totalProjectCost };
}

module.exports = {
    getHourlySalary,
    getDesignation,
    getProjectEstimate,
};
