//---------------------- Firebase --------------//
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Create a password based account and Sign in a user with an email address and password
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
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

window.addEventListener('DOMContentLoaded', ()=> {


    //  Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        const auth = getAuth(app);

        // Create a Password based account
        document?.getElementById("signup")?.addEventListener("click", () => {
            const signupEmail = document.getElementById('signup-email')?.value;
            const signupPassword = document.getElementById('signup-password')?.value;

            createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    // ...
                    console.log(user)
                    })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    console.log(errorMessage) //auth/invalid-email
                    console.log(error.code)
                    });
        });

        // Sign in a user with an email address and password
        document.getElementById("login-bt")?.addEventListener("click", () => {
            const signinEmail = document.getElementById('loginEmail')?.value;
            const signinPassword = document.getElementById('login-password')?.value;
            signInWithEmailAndPassword(auth, signinEmail, signinPassword)
             .then((userCredential) => {
                 // Signed in
                    const user = userCredential.user;
                    console.log(user)
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
            }
        );

        // Sign Out User
        document.getElementById('signout-bt')?.addEventListener("click", () => {
            signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Sign-out successful.")
            }).catch((error) => {
            // An error happened.
            });
        });


    // ------------------Log-In.html------------------//

    //Show/Hide Password Mask on Log In

    /*
     If the password input type is password, change it to text and change the icon to an eye. If the
     password input type is text, change it to password and change the icon to an eye-slash
    */

    function viewPassword(){
        const passwordInput = document.getElementById('login-password');
        const passStatus = document.getElementById('login-pass-status');

        if (passwordInput?.type === 'password'){
            passwordInput.type = 'text';
            passStatus!.className = 'fa fa-eye SIshowHidePw';
        }
        else{
            passwordInput!.type = 'password';
            passStatus!.className = 'fa fa-eye-slash SIshowHidePw';
        };
    };

    // ------------------Registration.html------------------//
    //Show/Hide Password Mask on Registration
    /*
      If the password input field is a password, change it to text and change the icon to an eye. If the
      password input field is text, change it to password and change the icon to an eye slash
    */

    function viewPassword2(){
        const signupPasswordInput = document.getElementById('signup-password');
        const signupPassStatus = document.getElementById('signup-pass-status');

        if (signupPasswordInput?.type === 'password'){
            signupPasswordInput.type = 'text';
            signupPassStatus!.className = 'fa fa-eye SUshowHidePw';
        }
        else{
            signupPasswordInput!.type = 'password';
            signupPassStatus!.className = 'fa fa-eye-slash SUshowHidePw';
        }
    };

    //------------------Transcribe.html-------------//

    // Flag for Review

    /*
      The function checks to see if the YesFlag or NoFlag radio buttons are checked, and if so, it alerts
      the user with the value of the radio button that was checked
     */
    function SubmitTranscription(){
        const YesFlag = document.getElementById("YesFlag");
        const NoFlag = document.getElementById("NoFlag");

        if(YesFlag?.checked==true)
            alert("Flag for Review: "+YesFlag.value);
        else if (NoFlag?.checked==true)
            alert("Flag for Review: "+NoFlag.value );
        else
            alert("Nothing was selected");
    }
})
