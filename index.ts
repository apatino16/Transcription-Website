// ------------------Log-In.html------------------//
//Show/Hide Password Mask
function viewPassword(){
    const passwordInput = document.getElementById('password-field');
    const passStatus = document.getElementById('pass-status');

    if (passwordInput.type === 'password'){
        passwordInput.type = 'text';
        passStatus.className = 'fa fa-unlock';
    }
    else{
        passwordInput.type = 'password';
        passStatus.className = 'fa fa-lock';
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