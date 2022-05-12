"use strict";
// ------------------Log-In.html------------------//
//Show/Hide Password Mask on Log In
/*
 If the password input type is password, change it to text and change the icon to an eye. If the
 password input type is text, change it to password and change the icon to an eye-slash
*/
function viewPassword() {
    const passwordInput = document.getElementById('login-password');
    const passStatus = document.getElementById('login-pass-status');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passStatus.className = 'fa fa-eye SIshowHidePw';
    }
    else {
        passwordInput.type = 'password';
        passStatus.className = 'fa fa-eye-slash SIshowHidePw';
    }
}
//Show/Hide Password Mask on Registration
/*
  If the password input field is a password, change it to text and change the icon to an eye. If the
  password input field is text, change it to password and change the icon to an eye slash
*/
function viewPassword2() {
    const signupPasswordInput = document.getElementById('signup-password');
    const signupPassStatus = document.getElementById('signup-pass-status');
    if (signupPasswordInput.type === 'password') {
        signupPasswordInput.type = 'text';
        signupPassStatus.className = 'fa fa-eye SUshowHidePw';
    }
    else {
        signupPasswordInput.type = 'password';
        signupPassStatus.className = 'fa fa-eye-slash SUshowHidePw';
    }
}
// Make the signup and login form appear//
// document.getElementById("signup")?.addEventListener('click', function(){
//     document.getElementById("container2")?.style.display="inline";
//     document.getElementById("container")?.style.display="none";
// });
// document.getElementById("signup")?.addEventListener('click', function(){
//     document.getElementById("container2")?.style.display="none";
//     document.getElementById("container")?.style.display="inline";
// });
//------------------Transcribe.html-------------//
//wavesurfer.js
/* This is a function that is called when the DOM is loaded. It creates a new instance of the
WaveSurfer object and loads the audio file. */
window.addEventListener('DOMContentLoaded', () => {
    var wavesurfer = WaveSurfer.create({
        container: '#waveform',
        scrollParent: true,
        backgroundColor: 'white',
        cursorColor: '#333',
        progressColor: 'lightblue',
        waveColor: 'lightgrey',
        barWidth: 3,
        barRadius: 3,
    });
    /* Loading the audio file into the waveform. */
    wavesurfer.load('audioSample/LJ001-0001.wav');
    const playPause = document.getElementById('playPause');
    const stop = document.getElementById('stop');
    const mute = document.getElementById('mute');
    const volumeSlider = document.getElementById('volume-Slider');
    /* This is an event listener that listens for a click on the playPause button. When the button is
    clicked, the playPause function is called. If the audio is playing, the playPause button is
    given the class "playing". If the audio is not playing, the playPause button is given the class
    "playing". In other words, I can click play to start listening to the audio, and symoultanously
    the icon will change into the pause button allowing me to click pause at anytime. If pause is clicked,
    the icon will chenge into the play button for when the user is ready to continue playing
    the audio. This will hopefully help with an intuitive use of the audio controls.*/
    playPause === null || playPause === void 0 ? void 0 : playPause.addEventListener('click', () => {
        wavesurfer.playPause();
        if (wavesurfer.isPlaying()) {
            playPause.classList.add("playing");
        }
        else {
            playPause.classList.remove("playing");
        }
    });
    stop === null || stop === void 0 ? void 0 : stop.addEventListener('click', () => {
        wavesurfer.stop();
        playPause.classList.remove("playing");
    });
    volumeSlider.addEventListener("mouseup", () => {
        changeVolume(volumeSlider.value);
    });
    const changeVolume = (volume) => {
        if (volume == 0) {
            mute === null || mute === void 0 ? void 0 : mute.classList.add("muted");
        }
        else {
            mute === null || mute === void 0 ? void 0 : mute.classList.remove("muted");
        }
        wavesurfer.setVolume(volume);
    };
    mute === null || mute === void 0 ? void 0 : mute.addEventListener('click', () => {
        if (mute.classList.contains("muted")) {
            mute.classList.remove("muted");
            wavesurfer.setVolume(0.5);
            volumeSlider.value = 0.5;
        }
        else {
            wavesurfer.setVolume(0);
            mute.classList.add("muted");
            volumeSlider.value = 0;
        }
    });
});
// Flag for Review
/*
  The function checks to see if the YesFlag or NoFlag radio buttons are checked, and if so, it alerts
  the user with the value of the radio button that was checked
 */
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
