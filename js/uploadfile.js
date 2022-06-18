firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        document.getElementById("uploadfile").onclick = () => {

            document.getElementById("upload").style.display = "block";
            document.getElementById("uploadfile").style.display = "none";

            // create a root ref;
            let storageRef = firebase.storage().ref();
            // get file;

            let file = document.getElementById("files").files[0];
            console.log(file)

            let uploadPic = storageRef.child("profilePics/").child(file.name).put(file);

            uploadPic.on('state_changed', (snapshot) => {
                var progress = Math.floor(snapshot.bytesTransferred/snapshot.totalBytes) * 100;

                document.getElementById("progress").innerHTML = progress               

                console.log(progress)
            }, (error) => {
                console.log(error.message);
            }, () => {
                uploadPic.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log(downloadURL);
                    firebase.firestore().collection("users")
                    .doc(user.uid).update({
                        downloadURL:downloadURL
                    }).then(() => {
                        alert('Upload is successful')
                    }).cactch((error) => {
                        console.log(error.message);
                    })
                })
            })
        }
    }
    else {
        window.location.href = 'signup.html'
    }
})