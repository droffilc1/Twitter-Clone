firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        // pull all tweets
        var db = firebase.firestore();
        // get details of logged in user;

        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                
                let name = doc.data().username;
                let userid = doc.data().userid;

                // alert(name)

                
                db.collection("tweets")
                .where("userId", "==",userid)
                .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
        
                        let tweet = doc.data().tweet;                               
                        let time = doc.data().time;
                        let tweetId = doc.data().tweetId;
                        let newTime = time.toDate().toDateString();
                        let userId = doc.data().userId;
            
                        // if(userid === userId){
                            let content = '';
                
                            content += `<div>`
                            content += `<h4>${newTime}</h4>`
                            content += `<h4>${name}</h4>`
                            content += `<p>${tweet}</p>`
                
                            content += `<div class="tweet_action">`
                
                            if(user.uid === userId){
                                content += `<i onClick="editTweet(\`${tweetId}\`)" class="fa fa-pencil h1" style="color: green; padding-right; 40px; padding-left: 40px; cursor: pointer;"></i>`
                                content += `<i onClick="deleteTweet(\`${tweetId}\`)" class="fa fa-trash h1" style="color: red; cursor: pointer; padding-right; 40px; padding-left: 40px;"></i>`
                            }
                            
                            content += `</div>`
                            content += `</div>` 
                                    
                                
                            $('#output').append(content); 

                        // }
                                        
                            
                    })
                })
        
                
            
        })

        
    })
    window.editTweet = (value) => {
        // alert(value)
        // invoke firebase
        db.collection("tweets").doc(value)
        .get().then((doc) => {
            let tweet = doc.data().tweet;

            document.getElementById("newtweet").value = tweet;

        })
    

        // edit my tweet;

        document.getElementById("updatebtn").onclick = () => {
        
            let newTweet = document.getElementById("newtweet").value;

            // invoke firebase;

            db.collection("tweets").doc(value)
            .update({
                tweet:newTweet
            }).then(() => {
                alert('Document succesfully updated')
                window.location.href = 'index.html'
            }).catch((error) => {
                console.log(error.message);
            })
        }
 
    }
    // delete tweet
        window.deleteTweet = (tweetId) => {
            db.collection("tweets").doc(tweetId).delete().then(() => {              
                
                alert("Document successfully deleted!")
                window.location.href = 'index.html'
            }).catch((error) => {
                console.log(error.message);
            });                  
        
        
     }   

        
    }

        
    else {
        window.location.href = "index.html"
    }
})