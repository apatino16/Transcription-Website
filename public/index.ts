//---------------------- Firebase --------------//
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Create a password based account and Sign in a user with an email address and password
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence, onAuthStateChanged} from "firebase/auth";
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
    console.log("i'm going crazy")

    //  Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        const auth = getAuth(app);

        // Create a Password based account
        document?.getElementById("signup")?.addEventListener("click", () => {
            const signupEmail = document.getElementById('signup-email') as HTMLInputElement | null;
            const signupPassword = document.getElementById('signup-password')as HTMLInputElement | null;

            createUserWithEmailAndPassword(auth, signupEmail!.value, signupPassword!.value)
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
    //Auth State Persistance 
    document.getElementById("login-bt")?.addEventListener("click", () => {
        console.log("clickled on login button")
        const signinEmail = document.getElementById('loginEmail') as HTMLInputElement | null;
        const signinPassword = document.getElementById('login-password') as HTMLInputElement | null;
            setPersistence(auth, browserSessionPersistence)
                .then(() => {
        // New sign-in will be persisted with session persistence.
                return signInWithEmailAndPassword(auth, signinEmail!.value, signinPassword!.value);
                })
                .catch((error) => {
        // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    //index.ts:61 Uncaught error from Firebase.signInWithEmailAndPassword error code: auth/wrong-password and error message: Firebase: Error (auth/wrong-password).
                    if (errorCode === "auth/wrong-password") {
                        alert("Wrong Password")
                    }else{
                        console.error(`Uncaught error from Firebase.signInWithEmailAndPassword error code: ${errorCode} and error message: ${errorMessage}`)
                    }
                    //index.ts:65 Uncaught error from Firebase.signInWithEmailAndPassword error code: auth/too-many-requests and error message: Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).
            });
    });

        // Sign Out User
        document.getElementById('signout-bt')?.addEventListener("click", () => {
            signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Sign-out successful.")
            }).catch((error) => {
            // An error happened.
            });
        });

        //Get Current User

        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              // ...
                console.dir(user)
            } else {
              // User is signed out
              // ...
              console.log("No user is logged in")
            }
          });

    });


    // ------------------Log-In.html------------------//


    //------------------Transcribe.html-------------//

    // Flag for Review

    /*
      The function checks to see if the YesFlag or NoFlag radio buttons are checked, and if so, it alerts
      the user with the value of the radio button that was checked
     */
    function SubmitTranscription(){
        const YesFlag = document.getElementById("YesFlag") as HTMLInputElement | null;
        const NoFlag = document.getElementById("NoFlag") as HTMLInputElement | null;

        if(YesFlag?.checked==true)
            alert("Flag for Review: "+YesFlag.value);
        else if (NoFlag?.checked==true)
            alert("Flag for Review: "+NoFlag.value );
        else
            alert("Nothing was selected");
    };
