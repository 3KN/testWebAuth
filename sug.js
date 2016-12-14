var database = firebase.database();
var currentUser;

$( document ).ready(function() {
	
	
	firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		currentUser = user;
		getSugarValue();
	} else {
			$("#sugarValue").html("Sign in First");
	}
	});

});



function getSugarValue(){
	var starCountRef = firebase.database().ref('data/sugar/' + currentUser.uid+'/sugarValue');
		starCountRef.on('value', function(snapshot) {
			$("#sugarValue").html("Your current sugar is "+ snapshot.val()+ " %");
			
		});
	
	
}