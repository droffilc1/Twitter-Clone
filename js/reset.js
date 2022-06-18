document.getElementById('reset').onclick = () => {

    alert('clicked')
    // get the email adress
       

    let emailValue = document.getElementById('email').value;

    // invoke firebase

    firebase.auth().sendPasswordResetEmail(emailValue).then(() => {
        
        alert('successful a reset link has been sent to the inputed email')       

    }).catch((error) =>{
        console.log(error.message);
    })
}