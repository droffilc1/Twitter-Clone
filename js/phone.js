document.getElementById("sign-in-button").onclick = () => {
    firebase.auth().languageCode = 'en';
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      onSignInSubmit();
    }
  });
  recaptchaVerifier.render().then((widgetId) => {
    window.recaptchaWidgetId = widgetId;
  });

    // Sign in with phone number
    let num = document.getElementById("phoneNum").value;    
    firebase.auth().signInWithPhoneNumber(num, recaptchaVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      alert("Code")

      document.getElementById("Code").style.display = "block";
      document.getElementById("verify").style.display = "block";
      document.getElementById("sign-in-button").style.diplay = "none"
      document.getElementById("phoneNum").style.diplay = "none"

      // ...
    }).catch((error) => {
        alert("Kuna Error Bwana")
        console.log(error.message)
      // Error; SMS not sent
      // ...
    });
}

//  verify text

document.getElementById("verify").onclick = () => {
    let code = document.getElementById("Code").value;
    
    confirmationResult.confirm(code).then((result) => {
    // User signed in successfully.
    let user = result.user;
    // ...
    }).catch((error) => {
        alert(error.message)
    // User couldn't sign in (bad verification code?)
    // ...
    });
}