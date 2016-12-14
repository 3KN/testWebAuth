var database = firebase.database();
var currentUser;
google.charts.load('current', {packages: ['corechart', 'line']});
//google.charts.setOnLoadCallback(drawBasic);
var dataArray = [];



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

function drawBasic(array1) {
	
	

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'Pulse Value');
		if(array1!=null){
			for (var i = 0; i < array1.length; i++)
			{
				data.addRows([[i, array1[i]]])
			}
		}

      var options = {
        hAxis: {
          title: ''
        },
        vAxis: {
          title: ''
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

      chart.draw(data, options);
 }
 
 function ondataChanges(){
	 
	 var ref = firebase.database().ref('data/pulseHistory/'+ currentUser.uid).limitToFirst(50);
		ref.once('value', function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				var childData = childSnapshot.val();
				dataArray.push(childData);
			});
			drawBasic(dataArray)
  
	});
	 
 }