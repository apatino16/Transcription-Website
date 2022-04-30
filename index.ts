// ---------------------- Firebase --------------//
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

// ------------------Log-In.html------------------//
//Show/Hide Password Mask
function viewPassword(){
    const passwordInput = document.getElementById('password-field');
    const passStatus = document.getElementById('pass-status');

    if (passwordInput.type === 'password'){
        passwordInput.type = 'text';
        passStatus.className = 'fa fa-eye showHidePw';
    }
    else{
        passwordInput.type = 'password';
        passStatus.className = 'fa fa-eye-slash showHidePw';
    }
}


//------------------Transcribe.html-------------//
// Checking if the radio button is selected or not
// Flag for Review
function SubmitTranscription(){
    const YesFlag = document.getElementById("YesFlag");
    const NoFlag = document.getElementById("NoFlag");

    if(YesFlag.checked==true)
        alert("Flag for Review: "+YesFlag.value);
    else if (NoFlag.checked==true)
        alert("Flag for Review: "+NoFlag.value );
    else
        alert("Nothing was selected");
}