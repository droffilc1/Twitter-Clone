firebase.auth().onAuthStateChanged((user) => {
    if(user){
        // alert(uid);        
        document.getElementById('input').onkeyup = () => {            
            document.getElementById('tweet').style.backgroundColor = 'rgb(29,155,240)'
        }

        document.getElementById('tweet').onclick = () => {

            // get html elements

            let tweet = document.getElementById('input').value;
            let timeStamp = firebase.firestore.Timestamp.fromDate(new Date());

            if(!tweet) {
                alert('empty tweet add somthething')
            }
            else {
                // invoke firebase;
                let tweetDoc = firebase.firestore().collection('tweets').doc();
                tweetDoc.set({
                    tweet:tweet,
                    time:timeStamp,
                    tweetId:tweetDoc.id,
                    userId:user.uid

                }).then(() => {
                    alert('Tweet has been sent!')

                    window.location.reload();
                }).catch((error) => {
                    console.log(error.messaage);
                })
            }          

            
        }
    }
    else {
        // login.html
        // window.location.href = ''
    }



})





