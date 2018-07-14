
    // this file is created by Beth for user data firebase testing purpose.s
    
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyD3GtRS1N5UxrzvxA1i8XV0babAG61zf9Q",
      authDomain: "groupproject1-e81bf.firebaseapp.com",
      databaseURL: "https://groupproject1-e81bf.firebaseio.com",
      projectId: "groupproject1-e81bf",
      storageBucket: "groupproject1-e81bf.appspot.com",
      messagingSenderId: "825404731161"
  };

    firebase.initializeApp(config);

//     var database = firebase.database();

// function writeUserData(userId, name, email, imageUrl) {
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }


var userId = firebase.auth().currentUser.uid;
return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
  var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  // ...
});



$("#adv-item").on("click", function(event) {

        event.preventDefault();
        var generalSearch=$('#general-input').val().trim();  
        var advancedSearch=$('#advanced-input').val().trim();  

    // push user  input to firebase.
    database.ref().set({
        user:userId,
        genSearch:generalSearch,
        advSearch:advancedSearch
    });
      //clear form text boxes after push

  });

//   $("#gen-item").on("click", function(event) {

//     event.preventDefault();
//     var generalSearch=$('#general-input').val().trim();  
//     var advancedSearch=$('#advanced-input').val().trim();  

// // push user  input to firebase.
// database.ref().push({
//     user:userId,
//     genSearch:generalSearch,
//     advSearch:advancedSearch
// });
//   //clear form text boxes after push

// });



    database.ref().on("child_added", function(childSnapshot) {


      var tempuser=childSnapshot.val().user;
      var tempgenSearch=childSnapshot.val().genSearch;
      var tempadvSearch=childSnapshot.val().advSearch;
      var tempkey=childSnapshot.key;


      $('#list-display"').append("<ol>" +
      "<li>" + tempuser+ "</li>" +
      "<li>" + tempgenSearch+ "</li>" +
      "<li>" + tempadvSearch+ "</li>" +
      "<li>" +  tempkey+ "</li>" +
      "</ol>"
      );
      },function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
      });



