firebase.auth().onAuthStateChanged((user) => {
    if(user) {

        var db = firebase.firestore();

        document.getElementById("searchtwitterbtn").onclick = () => {
            let searchInput = document.getElementById('twittersearch').value;

            db.collection("users")
            .where("username", "==", searchInput)
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    let name = doc.data().username;
                    let email = doc.data().email;
                    let userphonenum = doc.data().userphonenum;

                    let content = '';

                    content += `<div>`
                    content += `<h5>${name}</h5>`
                    content += `<h5>${email}</h5>`
                    content += `<h5>${userphonenum}</h5>`
                    content += `</div>`

                   
                        
                    $("#postOutPut").append(content);
                    
                })
            })


        }

    }

    else {
        window.location.href = 'signup.html'
    }
})