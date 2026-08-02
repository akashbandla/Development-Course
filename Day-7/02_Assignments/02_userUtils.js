'use strict';

console.log("\n======= Assignment 2 — Object.assign & Object.freeze (Tricky) ==========");
// Default Settings object
const defaultSettings = {
    theme : "light",
    notifications : {
        email : true,
        sms : false
    }
};

// User Preferences Object
const userPreferences = {
    theme : "dark",
    notifications : {
        sms : true
    }
};

// Creating the Final Settings from defaultSettings & userPreferences using the Object.assign method
// Object.assign only does a shallow copy, so nested objects overwrite each other entirely
const finalSettings = Object.assign({}, defaultSettings, userPreferences)

console.log(finalSettings)

// Fixing the nested objects overwrite by spreading the nested objects
const fixedSettings = Object.assign({}, defaultSettings, userPreferences, {notifications : { ...defaultSettings.notifications, ...userPreferences.notifications}})

console.log(fixedSettings)

// Freeze the fixed Settings to avoid modifiying the properties.
Object.freeze(fixedSettings)

// modify the theme property of fixedSetting Object
try {
    fixedSettings.theme = 'blue'
}catch(err){
    console.log(err.message)
}

// Modifying the sms property under the notifications in fixedSettings object
// Object.freeze is shallow -- it only locks the top-level properties not nested objects
fixedSettings.notifications.sms = false;

console.log(fixedSettings.notifications)