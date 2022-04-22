"use strict";
//Log-In.html
//Show/Hide Password Mask
function viewPassword() {
    let passwordInput = document.getElementById("password-field");
    let passStatus = document.getElementById("pass-status");
    if (passwordInput.type == "password") {
        passwordInput.type = "text";
        passStatus === null || passStatus === void 0 ? void 0 : passStatus.className = 'fa fa-eye-slash';
    }
    else {
        passwordInput.type = "password";
        passStatus.className = "fa fa-eye";
    }
}
//Checking for Password Strength
function validate() {
    let validationField = document.getElementById("validation-txt");
    let password = document.getElementById("password-field");
    let content = password.value;
    let errors = [];
    console.log(content);
    if (content.lenght < 8) {
        errors.push("Your password must be at least 8 characters");
    }
    if (content.search(/[a-z]/i) < 0) {
        errors.push("Your password must contain at least one letter.");
    }
    if (content.search(/[0-9]/i) < 0) {
        errors.push("Your password must contain at least one digit.");
    }
    if (errors.lenght > 0) {
        validationField.innerHTML = errors.join("");
        return false;
    }
    validationField === null || validationField === void 0 ? void 0 : validationField.innerHTML = errors.join("");
    return true;
}
//Transcribe.html
// Checking if the radio button is selected or not
// Flag for Review
function SubmitTranscription() {
    let YesFlag = document.getElementById("YesFlag");
    let NoFlag = document.getElementById("NoFlag");
    if (YesFlag.checked == true)
        alert("Flag for Review: " + YesFlag.value);
    else if (NoFlag.checked == true)
        alert("Flag for Review: " + NoFlag.value);
    else
        alert("Nothing was selected");
}
