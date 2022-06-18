document.getElementById("loginBtn").onclick = () => {
    
    alert("clicked")
    document.getElementById("loginform").style.display = 'block';
}

document.getElementById("dismissLogin").onclick = () => {
    document.getElementById("loginform").style.display = 'none';
}

document.getElementById('login').onclick = () => {

    // alert('clicked')
    // GETTING HTML ELEMENTS;
    let email = document.getElementById('email1').value;
    let password = document.getElementById('password1').value;

    // INVOKE FIREBASE;

    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredentials) => {
        alert('user is signed in')

        let user = userCredentials.user
        console.log(user.uid);
            

        window.location.href = "/Bem/index.html"
    }).catch((error) => {
        console.log(error.message);
    })

}