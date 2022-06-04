//---------------------- Firebase --------------//
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Authentication 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence, onAuthStateChanged} from "firebase/auth";
// Realtime Database
import { getDatabase, ref, set, onValue, child, get} from "firebase/database";
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
        

// ------------------registration.html------------------//
    // Create a Password based account
    // Story: User registers; saves id, name, and email on a user profile database 
        document?.getElementById("signup")?.addEventListener("click", () => {
            const signupEmail: any = document.getElementById('signup-email') as HTMLInputElement | null;
            const signupPassword = document.getElementById('signup-password')as HTMLInputElement | null;
            const name: any = document.getElementById('name') as HTMLInputElement | null;

            createUserWithEmailAndPassword(auth, signupEmail!.value, signupPassword!.value)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    // ...
                    console.log(user)
                    /* Saves the user's name and email to the database. */
                    const userId = auth.currentUser?.uid;
                    const reference = ref(db, 'users/' + userId);
                    set(reference, {
                        username: name.value,
                        email: signupEmail.value
                    })
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

    // Story: After the user has signed in, the page should redirect to the transcribe page.
    // Does not work how I expected; it keeps redirecting the user to the transcribe page and refreshing a lot. Makes sense, because this states that 
    // while the user is logged in it should do that.
        // onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //         redirectToTranscribePage(user)
        //     } else {
        //         console.log("No user signed in")
        //     }
        // });
            
    //Function to redirect to the transcribe page
    //     function redirectToTranscribe() {
    //         window.location.href = "transcribe.html";
    //     };
    
    // //login and redirect 
    //     function loginAndRedirect() {
    //         console.log("login and redirect")
    //         setTimeout(redirectToTranscribe, 1000);
    //     };

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
            
//------------------Transcribe.html-------------//
        //Submit Transcription
        //Story: User wants to be notified if they miss labeling a transcription upon clickling submit and wants to be alerted so they can cancel
        //the submission and go back and label it properly before submitting it again.
        //User transcribes and labels the audio file. User submits the transcriptions and expects the data to be saved in the database. 
        const submitCheck: any = document.getElementById('NextInQueue') as HTMLInputElement | null;
        
        submitCheck.addEventListener('click', () => {
            const transcription: any = document.getElementById('transcription') as HTMLInputElement | null;
            const flag:any = document.querySelector('input[name="Flag"]:checked') as HTMLInputElement;
            const containsSpeech: any = document.querySelector('input[name="ContainsSpeech"]:checked') as HTMLInputElement;
            const backgroundSpeech: any = document.querySelector('input[name="BackgroundSpeech"]:checked') as HTMLInputElement;
            const fillerSpeech: any = document.querySelector('input[name="FillerSpeech"]:checked') as HTMLInputElement;
            const cutOff: any = document.querySelector('input[name="CutOff"]:checked') as HTMLInputElement;
            const backgroundNoise: any = document.querySelector('input[name="BackgroundNoise"]:checked') as HTMLInputElement;
            const invalidAudio: any = document.querySelector('input[name="Invalid"]:checked') as HTMLInputElement;
            const unintelligibleWords: any = document.querySelector('input[name="Unintelligible"]:checked') as HTMLInputElement;
            const throatSounds: any = document.querySelector('input[name="ThroatSounds"]:checked') as HTMLInputElement;
            const otherSpeakers: any = document.querySelector('input[name="OtherSpeakers"]:checked') as HTMLInputElement;
            const Notes: any = document.getElementById('Notes-text-area') as HTMLInputElement | null;

            // if (flag != null) {
            //     alert("Please make sure to mark whether this transcription has to be flagged for review before submitting.")
            // // }else if (containsSpeech.checked == false) {
            // //     alert("Please make sure to mark whether this transcription has to speech before submitting.")
            // }else if (backgroundSpeech.checked == false) {
            //     alert ("Please make sure to mark wether this transcription has background speech before submitting.")
            // }else if(fillerSpeech.checked == false) {
            //     alert ("Please make sure to mark whether this transcription has filler speech before submitting.")
            // }else if(cutOff.checked == false) {
            //     alert ("Please make sure to mark whether this transcription has cut off speech before submitting.")
            // }else if(backgroundNoise.checked == false) {
            //     alert ("Please make sure to mark whether this transcription has background noise before submitting.")
            // }else if(invalidAudio.checked == false) {
            //     alert ("Please make sure to mark whether this transcription has invalid audio before submitting.")
            // }else if(unintelligibleWords.checked == false) {
            //     alert ("Please make sure to mark whether this transcription has unintelligible words before submitting.")
            // }else if(throatSounds.checked == false) {
            //     alert ("Please make sure to mark whether this transcription has throat sounds before submitting.")
            // }else if(otherSpeakers.checked == false) {
            //     alert ("Please make sure to mark whether this transcription has other speakers before submitting.")
            // }else{
            //     alert("Your transcription has been submitted")
            // }

            //Changed 1,2 to the userId so that I can track what user did what transcription
            const userId = auth.currentUser?.uid;
            const reference = ref(db, 'transcriptions/' + userId);

            set(reference, {
                // audio: "./audioSample/LJ001-001.wav", //get name of the audio file
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

//------------------LIST.html-------------//        
// The user expects to have a list of all the transcribed audio files.
// We need a function that retrieves all the data from the database and displays it on the page.
        
        //Filling the table with our data
        let id: any = 0;
        const table: any = document.getElementById('table') as HTMLTableElement;

        function addItemToTable(transcription:string, flag: string, containsSpeech: string, backgroundSpeech: string, fillerSpeech: string, cutOff: string, backgroundNoise: string, invalidAudio: string, unintelligibleWords: string, throatSounds: string, otherSpeakers: string, Notes: string) {
            let tRow = document.createElement('tr');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            let td4 = document.createElement('td');
            let td5 = document.createElement('td');
            let td6 = document.createElement('td');
            let td7 = document.createElement('td');
            let td8 = document.createElement('td');
            let td9 = document.createElement('td');
            let td10 = document.createElement('td');
            let td11 = document.createElement('td');
            let td12 = document.createElement('td');
            let td13 = document.createElement('td');

            td1.innerHTML = id;
            td2.innerHTML = transcription;
            td3.innerHTML = flag;
            td4.innerHTML = containsSpeech;
            td5.innerHTML = backgroundSpeech;
            td6.innerHTML = fillerSpeech;
            td7.innerHTML = cutOff;
            td8.innerHTML = backgroundNoise;
            td9.innerHTML = invalidAudio;
            td10.innerHTML = unintelligibleWords;
            td11.innerHTML = throatSounds;
            td12.innerHTML = otherSpeakers;
            td13.innerHTML = Notes;

            tRow.appendChild(td1);
            tRow.appendChild(td2);
            tRow.appendChild(td3);
            tRow.appendChild(td4);
            tRow.appendChild(td5);
            tRow.appendChild(td6);
            tRow.appendChild(td7);
            tRow.appendChild(td8);
            tRow.appendChild(td9);
            tRow.appendChild(td10);
            tRow.appendChild(td11);
            tRow.appendChild(td12);
            tRow.appendChild(td13);

            table.appendChild(tRow);
        }

        //Adding all the data to the table

        function addAllItemsToTable(transcriptionData: any) {
            id = 0;   
            table.innerHTML = '';
            transcriptionData.forEach((element: any) => {
                    addItemToTable(element.transcription, element.flagForReview, element.containsSpeech, element.backgroundSpeech, element.fillerSpeech, element.cutOff, element.backgroundNoise, element.invalidAudio, element.unintelligibleWords, element.throatSounds, element.otherSpeakers, element.Notes);
                });
            };

        //Retrieving all the data from the database
        
        function getAllDataRealTime() {
            const reference = ref(db, 'transcriptions/');
            
            onValue(reference, (snapshot) => {
                const transcriptions: any = [];

                snapshot.forEach((childSnapshot) => {
                    transcriptions.push(childSnapshot.val());
                });
                
                addAllItemsToTable(transcriptions);
            });
        };
        // should I add this inside a script tag on the list file?? I tried it but it gave me a reference error.
        window.onload = getAllDataRealTime;

});
