//---------------------- Firebase --------------//
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Authentication 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence, onAuthStateChanged} from "firebase/auth";
// Realtime Database
import { getDatabase, ref, set} from "firebase/database";
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
    console.log("The page has been loaded sucessfully!")

    // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        const auth = getAuth(app);
        // Get a reference to the database service
        const db = getDatabase(app);
        const userId = auth.currentUser?.uid;
        const reference = ref(db, 'users/' + userId);

// ------------------registration.html------------------//
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
                    console.log(errorMessage)
                    console.log(error.code)
                    });
        });

 // ------------------log-in.html------------------//
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
                        }                                              
                        //index.ts:65 Uncaught error from Firebase.signInWithEmailAndPassword error code: auth/too-many-requests and error message: Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).
                        else if (errorCode === "auth/too-many-requests") {
                            alert("Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later")
                        }else{
                            console.error(`Uncaught error from Firebase.signInWithEmailAndPassword error code: ${errorCode} and error message: ${errorMessage}`)
                        }
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

// ----------------- Realtime Dabase ---------------//
        // Story: User registers; saves id, name, and email on a user profile database 
        /* This is the code that is supposed to save the user's name and email to the database. */
        //Doesnt work yet
        document.getElementById("register-bt")?.addEventListener("click", () => {
            const email = document.getElementById('signup-email') as HTMLInputElement | null;
            const name = document.getElementById('name') as HTMLInputElement | null;;

            function writeUserData(userId: any, name: any , email:any) {
                set(reference, {
                    username: name.value,
                    email: email.value
                })
            };
            writeUserData(userId, name, email);
        });
    
//------------------Transcribe.html-------------//
        //Story: User wants to be notified if they miss labeling a transcription upon clickling submit and wants to be alerted so they can cancel
        //the submission and go back and label it properly before submitting it again.
        const submitCheck: any = document.getElementById('NextInQueue') as HTMLInputElement | null;
        const transcription: any = document.getElementById('transcription') as HTMLInputElement | null;
        const flag:any = document.querySelector('input[name="Flag"]:checked') as HTMLInputElement | null;
        const containsSpeech: any = document.querySelector('input[name="ContainsSpeech"]:checked') as HTMLInputElement | null;
        const backgroundSpeech: any = document.querySelector('input[name="BackgroundSpeech"]:checked') as HTMLInputElement | null;
        const fillerSpeech: any = document.querySelector('input[name="FillerSpeech"]:checked') as HTMLInputElement | null;
        const cutOff: any = document.querySelector('input[name="CutOff"]:checked') as HTMLInputElement | null;
        const backgroundNoise: any = document.querySelector('input[name="BackgroundNoise"]:checked') as HTMLInputElement | null;
        const invalidAudio: any = document.querySelector('input[name="Invalid"]:checked') as HTMLInputElement | null;
        const unintelligibleWords: any = document.querySelector('input[name="Unintelligible"]:checked') as HTMLInputElement | null;
        const throatSounds: any = document.querySelector('input[name="ThroatSounds"]:checked') as HTMLInputElement | null;
        const otherSpeakers: any = document.querySelector('input[name="OtherSpeakers"]:checked') as HTMLInputElement | null;
        const Notes: any = document.getElementsByClassName('Notes-text-area') as HTMLCollectionOf<Element> | null;
        
        submitCheck.addEventListener('click', () => {
            if (flag.checked == false) {
                alert("You must check the box to submit your transcription")
            }else if (containsSpeech.checked == false) {
                alert("You must check the box to submit your transcription")
            }


         } );
        function SubmitTranscription   

        //     const YesFlag = document.getElementById("YesFlag") as HTMLInputElement | null;
        //     const NoFlag = document.getElementById("NoFlag") as HTMLInputElement | null;

        //     if(YesFlag?.checked==true)
        //         alert("Flag for Review: "+YesFlag.value);
        //     else if (NoFlag?.checked==true)
        //         alert("Flag for Review: "+NoFlag.value );
        //     else
        //         alert("Nothing was selected");
        // };

        //Submit Transcription
        //User transcribes and labels the audio file. User submits the transcriptions and expects the data to be saved in the database. 
        const NextInQueue: any = document.getElementById('NextInQueue') as HTMLInputElement | null;

        NextInQueue.addEventListener('click', () => {
                set(reference, {
                //audio: , //get name of the audio file
                transcription: transcription.value,
                flagForReview: flag.value,
                containsSpeech: containsSpeech.value,
                backgroundSpeech: backgroundSpeech.value,
                fillerSpeech: fillerSpeech.value,
                cutOff: cutOff.value,
                backgroundNoise: backgroundNoise.value,
                invalidAudio: invalidAudio.value,
                unintelligibleWords: unintelligibleWords.value,
                throatSounds: throatSounds.value,
                otherSpeakers: otherSpeakers.value,
                Notes: Notes.value
                });

        });

    });
