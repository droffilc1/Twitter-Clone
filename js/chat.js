firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        // pull all users;

        var db = firebase.firestore();
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let name = doc.data().username;
                let userId = doc.data().userid;
                
                if(userId != user.uid) {
                    let content = '';
                    content += `<div onClick="sendMessage(\`${userId}\`)" class="user">`
                    content += `<img src="/Bem/Images/profile.jpg" alt="">` 
                    content += `<h5>${name}</h5>`
                    content += `</div>`


                    $("#allusers").append(content);

                }
                
                
            })
        })

        var sentId = [];

        window.sendMessage = (value) => {
            alert(value);

            sentId.push(value);

            document.getElementById("sendMessage").onclick = function() {
                var messageText =document.getElementById("message").value;
                var timeStamp = firebase.firestore.Timestamp.fromDate(new Date());

                // invoke firebase;
                let messageDoc = db.collection("messages").doc();

                messageDoc.set({
                    message: messageText,
                    messageFrom: user.uid,
                    messageTo: value,
                    timeStamp: timeStamp,
                    messageId: messageDoc.id
                }).then(() => {
                    alert('Message has been sent!')

                    window.location.href = 'chat.html'
                }).catch((error) => {
                    console.log(error.message);
                })
            }
        }

        // PULL ALL MESSAGES;

        db.collection("messages").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let message = doc.data().message;
                let messageFrom = doc.data().messageFrom;
                let messageTo = doc.data().messageTo;
                let timeStamp = doc.data().timeStamp;                
                let date = timeStamp.toDate().toDateString()

                

                if(messageFrom === user.uid) {

                    let content = '';

                    content += `<div class="sentmessage">`
                    content += `<p>${message}</p>`
                    content += `<h5>${date}</h5>`
                    content += `</div>`



                    $("#sentholder").append(content)            
                         
                         
                     
                }

                if(messageTo === user.uid) {

                    let content = '';

                    content += `<div class="incomingmessage">`
                    content += `<p>${message}.</p>`
                    content += `<h5>${date}</h5>`
                    content += ` </div>`

                    $("#incomingmessages").append(content);

                    
                        
                        
                   
                }


            })
        })
    }

    else {
        window.location.href = "signup.html"
    }
})