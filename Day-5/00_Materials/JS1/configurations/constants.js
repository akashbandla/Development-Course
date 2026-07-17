'use strict';

// ---------- Salary & Tax Constants ----------
const MONTHS_IN_YEAR = 12;
const STANDARD_DEDUCTION = 50000; // Standard deduction (New Regime)
const MONTHLY_PF_DEDUCTION = 1800;
const MONTHLY_PT_DEDUCTION = 200;

const WORKING_DAYS_PER_MONTH = 22;
const HOURS_PER_DAY = 8;
const TOTAL_MONTHLY_HOURS = WORKING_DAYS_PER_MONTH * HOURS_PER_DAY;

const CESS_RATE = 0.04;

// New Regime slabs: each slab taxes up to `width` rupees of the income
// that falls in it, at `rate`. Applied in order on the remaining income.
const TAX_SLABS = [
    { width: 300000, rate: 0.00 },
    { width: 300000, rate: 0.05 },
    { width: 300000, rate: 0.10 },
    { width: 300000, rate: 0.15 },
    { width: 300000, rate: 0.20 },
    { width: Infinity, rate: 0.30 },
];

// ---------- Designation Levels (by track & experience, in years) ----------
// Checked in order; the first level whose `maxExperience` the employee's
// experience does not exceed determines their designation for their track.
const DESIGNATION_LEVELS = [
    { maxExperience: 2, engineering: 'Software Engineer 1', qa: 'QA 1' },
    { maxExperience: 5, engineering: 'Software Engineer 2', qa: 'QA 2' },
    { maxExperience: 9, engineering: 'Lead Engineer', qa: 'Lead Engineer' },
    { maxExperience: Infinity, engineering: 'Project Manager', qa: 'Project Manager' },
];

// ---------- Project Constants ----------
const PROJECT_TIMELINE_IN_MONTHS = 2.9;

// ---------- Salary Range Filter Constants ----------
const MIN_SALARY_RANGE = 1500000;
const MAX_SALARY_RANGE = 2000000;

// ---------- Experience Range Filter Constants ----------
const MIN_EXPERIENCE_RANGE = 2;
const MAX_EXPERIENCE_RANGE = 5;

module.exports = {
    MONTHS_IN_YEAR,
    STANDARD_DEDUCTION,
    MONTHLY_PF_DEDUCTION,
    MONTHLY_PT_DEDUCTION,
    WORKING_DAYS_PER_MONTH,
    HOURS_PER_DAY,
    TOTAL_MONTHLY_HOURS,
    CESS_RATE,
    TAX_SLABS,
    DESIGNATION_LEVELS,
    PROJECT_TIMELINE_IN_MONTHS,
    MIN_SALARY_RANGE,
    MAX_SALARY_RANGE,
    MIN_EXPERIENCE_RANGE,
    MAX_EXPERIENCE_RANGE,
};
