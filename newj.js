var database = firebase.database();
var currentUser;


$( document ).ready(function() {
	
	
	firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		currentUser = user;
		getPulseValue();
	} else {
			$("#PulseValue").html("Sign in First");
	}
	});

});

function getPulseValue(){
	var starCountRef = firebase.database().ref('data/pulse/' + currentUser.uid+'/pulseValue');
		starCountRef.on('value', function(snapshot) {
			$("#PulseValue").html("Your current pulse  "+ snapshot.val());
		});
	
	
}