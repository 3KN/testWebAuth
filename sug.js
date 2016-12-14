var database = firebase.database();
var currentUser;

$( document ).ready(function() {
	
	
	firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		currentUser = user;
		
	} else {
			$("#sugarValue").html("Sign in First");
	}
	});

});