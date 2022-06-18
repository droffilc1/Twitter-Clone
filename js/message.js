document.getElementById("write").onclick = () => {
    document.getElementById("new").style.display = "block";
}
document.getElementById("writes").onclick = () => {
    document.getElementById("new").style.display = "block";
}


document.getElementById("quit").onclick = () => {
    document.getElementById("new").style.display = "none";
}

firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        // pull all users;

        var db = firebase.firestore();
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let name = doc.data().username;
                let userId = doc.data().userid;
                
              if(userId != user.id) {
                let content = '';
                content += `<div onClick="sendMessage(\`${userId}\`)" >`
                content += `<img style="border-radius: 50%; height: 70px; margin-top: 10px;"  src="/Images/profile.jpg" alt="">` 
                content += `<h5>${name}</h5>`
                content += `</div>`


                $("#allusers").append(content);

              }
                
                
            })
        })
        window.sendMessage = (value) => {
            alert(value);

            document.getElementById('sendMessage').onclick = function() {
                var messageText =document.getElementById('message').value;
                var timeStamp = firebase.firestore.Timestamp.fromDate(new Date());

                // invoke firebase;
                let messageDoc = db.collection("messages").doc();

                messageDoc.set({
                    messsage: messageText,
                    messageFrom: user.uid,
                    messageTo: value,
                    timeStamp: timeStamp,
                    messageId: messageDoc.id
                }).then(() => {
                    alert('Message has been sent!')

                    window.location.reload();
                }).catch((error) => {
                    console.log(error.messaage);
                })
            }
        }

        // PULL ALL MESSAGES
    }

    else {
        window.location.href = "signup.html"
    }
})