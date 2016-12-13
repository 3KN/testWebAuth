var provider = new firebase.auth.GoogleAuthProvider();
var database = firebase.database();
var currentUser;

$( document ).ready(function() {
	
	
	firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		currentUser = user;
		showWelcome();
	} else {
		$("#welcome").hide();
		$(".upload-group").hide();
		$("#login").show();
	//document.getElementById("upload").addEventListener('change', handleFileSelect, false);
	}
	});
	

});


function signOut(){
	firebase.auth().signOut().then(function() {
		console.log('Signed Out');
	}, function(error) {
		console.error('Sign Out Error', error);
	});
	
}

function signIn() {
	  firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credntial.accessToken;
	  // The signed-in user info.
	  currentUser = result.user;
	  console.log('Signed Out');
	  console.log("Connected" + currentUser.displayName);
	  writeUser("team");
	  writeUserData(currentUser.userId,currentUser.displayName,currentUser.email,currentUser.providerId,"admins");
	  showWelcome();
		
	 
	  // ...
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});
};

function writeUserData(userId, name, email, imageUrl,providerId,team) {
	firebase.database().ref('newusers/' + userId).set({
		name: name,
		email: email,
		photoUrl : imageUrl,
		providerId: providerId,
		team : team
  });
}
function writeUser(team) {
	firebase.database().ref('newusers/').set({
		team : team
  });
}


function showWelcome(){
	$("#login").hide();
	$("#welcome").show();
	$("#welcomeText").html("Welcome "+ currentUser.displayName);
};

