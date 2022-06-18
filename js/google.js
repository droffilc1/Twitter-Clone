var provider = new firebase.auth.GoogleAuthProvider();
function googleSignup() {
   firebase.auth()   
    .signInWithPopup(provider)
    .then(function(result) {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        
            
        console.log(token)
        console.log(user)
        console.log(credential)
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        
        
        console.log(errorCode)
        console.log(errorMessage)
        console.log(email)
        console.log(credential)
    });
}