"use strict";
// // ---------------------- Firebase --------------//
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js";
// import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";
//   // Your web app's Firebase configuration
//   const firebaseConfig = {
//     apiKey: "AIzaSyD4ziKkzq2Bv2VjLeg7LvBNC1eZUB0yQh0",
//     authDomain: "transcription-website-55f1b.firebaseapp.com",
//     databaseURL: "https://transcription-website-55f1b-default-rtdb.firebaseio.com",
//     projectId: "transcription-website-55f1b",
//     storageBucket: "transcription-website-55f1b.appspot.com",
//     messagingSenderId: "357514451132",
//     appId: "1:357514451132:web:13a0af8d3f9569eb6d18b9",
//     measurementId: "G-07Q0DWGX8G"
//   };
//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
//   const auth = getAuth(app);
//   document.getElementById("login-btn")?.addEventListener('click', function(){
//     const loginEmail = document.getElementById("email")?.value;  
//     const loginPassword = document.getElementById("password-field")?.value; 
//     signInWithEmailAndPassword(auth, email, password-field)
//    .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//    .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });
// });
// ------------------Log-In.html------------------//
//Show/Hide Password Mask on Log In
function viewPassword() {
    const passwordInput = document.getElementById('password-field');
    const passStatus = document.getElementById('pass-status');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passStatus.className = 'fa fa-eye showHidePw';
    }
    else {
        passwordInput.type = 'password';
        passStatus.className = 'fa fa-eye-slash showHidePw';
    }
}
//Show/Hide Password Mask on Registration
function viewPassword2() {
    const passwordInput = document.getElementById('password-field2');
    const passStatus = document.getElementById('pass-status2');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passStatus.className = 'fa fa-eye showHidePw';
    }
    else {
        passwordInput.type = 'password';
        passStatus.className = 'fa fa-eye-slash showHidePw';
    }
}
//------------------Transcribe.html-------------//
// Checking if the radio button is selected or not
// Flag for Review
function SubmitTranscription() {
    const YesFlag = document.getElementById("YesFlag");
    const NoFlag = document.getElementById("NoFlag");
    if (YesFlag.checked == true)
        alert("Flag for Review: " + YesFlag.value);
    else if (NoFlag.checked == true)
        alert("Flag for Review: " + NoFlag.value);
    else
        alert("Nothing was selected");
}
