document.getElementById("signupbtn").onclick = () => {
    // alert('clicked')
    document.getElementById("signupform").style.display = 'block';
}

document.getElementById("dismissSignup").onclick = () => {
    document.getElementById("signupform").style.display = 'none';
}


document.getElementById('signup').onclick = () => {   

    

    alert('clicked')
    // GETIING HTML ELEMENTS;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let username = document.getElementById('username').value;
    let userphonenum = document.getElementById('userphonenum').value;
        if(username == ''){
            alert('Username is a required field')
        }
        else if(userphonenum == ''){
            alert('User phonenumber is required')
        }
    document.getElementById('signup').style.display = 'none';
    document.getElementById('signingupbtn').style.display = 'block'

    // INVOKE FIREBASE;
    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
        let user = userCredential.user
        let uid = user.uid;
        console.log(user);
        console.log(uid);
        alert('user has been created')
        // INVOKE FIRESTORE
        firebase.firestore().collection("users").doc(uid)
        .set({
            email:email,
            username:username,
            userphonenum:userphonenum,
            userid:uid
        }).then(()=>{
            alert('user data has been added')
            window.location.href = "/Bem/index.html"
        }).catch((error) => {
            document.getElementById('signup').style.display = 'block';
            document.getElementById('signingupbtn').style.display = 'none'
            console.log(error.message, "==", error.code);
            document.getElementById('errormessage1').innerHTML = error.message
        })                  
    })
    .catch((error) =>{
        document.getElementById('signup').style.display = 'block';
        document.getElementById('signingupbtn').style.display = 'none'
        console.log(error.message);
        document.getElementById('errormessage2').innerHTML = error.message
        document.getElementById('errormessagealert2').style.display = 'block'
        
    })

}


// logout

firebase.auth().signOut().then(() => {
    const logout = document.querySelector('#logout');
    logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('user signed out')
    });
});    
  // Sign-out successful.
}).catch((error) => {
    console.log(error.message)
  // An error happened.
});




