"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//---------------------- Firebase --------------//
const app_1 = require("firebase/app");
const analytics_1 = require("firebase/analytics");
// Create a password based account and Sign in a user with an email address and password
const auth_1 = require("firebase/auth");
const firebaseConfig = {
    apiKey: "AIzaSyD4ziKkzq2Bv2VjLeg7LvBNC1eZUB0yQh0",
    authDomain: "transcription-website-55f1b.firebaseapp.com",
    databaseURL: "https://transcription-website-55f1b-default-rtdb.firebaseio.com",
    projectId: "transcription-website-55f1b",
    storageBucket: "transcription-website-55f1b.appspot.com",
    messagingSenderId: "357514451132",
    appId: "1:357514451132:web:13a0af8d3f9569eb6d18b9",
    measurementId: "G-07Q0DWGX8G"
};
window.addEventListener('DOMContentLoaded', () => {
    var _a, _b, _c;
    //  Initialize Firebase
    const app = app_1.initializeApp(firebaseConfig);
    const analytics = analytics_1.getAnalytics(app);
    const auth = auth_1.getAuth(app);
    // Create a Password based account
    (_a = document === null || document === void 0 ? void 0 : document.getElementById("signup")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        const signupEmail = document.getElementById('signup-email');
        const signupPassword = document.getElementById('signup-password');
        auth_1.createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
            .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            console.log(user);
        })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorMessage); //auth/invalid-email
            console.log(error.code);
        });
    });
    // Sign in a user with an email address and password
    (_b = document.getElementById("login-bt")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        const signinEmail = document.getElementById('loginEmail');
        const signinPassword = document.getElementById('login-password');
        auth_1.signInWithEmailAndPassword(auth, signinEmail.value, signinPassword.value)
            .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            // ...
        })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    });
    //Auth State Persistance 
    //QUESTION: Do I need to add an event listener?
    const signinEmail = document.getElementById('loginEmail');
    const signinPassword = document.getElementById('login-password');
    auth_1.setPersistence(auth, auth_1.browserSessionPersistence)
        .then(() => {
        // New sign-in will be persisted with session persistence.
        return auth_1.signInWithEmailAndPassword(auth, signinEmail.value, signinPassword.value);
    })
        .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
    });
    // Sign Out User
    (_c = document.getElementById('signout-bt')) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
        auth_1.signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Sign-out successful.");
        }).catch((error) => {
            // An error happened.
        });
    });
});
// ------------------Log-In.html------------------//
//------------------Transcribe.html-------------//
// Flag for Review
/*
  The function checks to see if the YesFlag or NoFlag radio buttons are checked, and if so, it alerts
  the user with the value of the radio button that was checked
 */
function SubmitTranscription() {
    const YesFlag = document.getElementById("YesFlag");
    const NoFlag = document.getElementById("NoFlag");
    if ((YesFlag === null || YesFlag === void 0 ? void 0 : YesFlag.checked) == true)
        alert("Flag for Review: " + YesFlag.value);
    else if ((NoFlag === null || NoFlag === void 0 ? void 0 : NoFlag.checked) == true)
        alert("Flag for Review: " + NoFlag.value);
    else
        alert("Nothing was selected");
}
;
//# sourceMappingURL=index.js.map