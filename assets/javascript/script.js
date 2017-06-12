// .ready() wrapper
$( document ).ready(function() {
	console.log("letsago!")

	// global variables
	var trainName = "";
	var trainDestination = "";
	var trainTime = "";
	var trainFrequency = 0;
	var trainNext = "";
	var trainMinutes = 0;
	var now = moment();

	console.log("Current time: " + moment(now).format("hh:mm"))

	// Initialize Firebase
  	var config = {
    	apiKey: "AIzaSyDx2DDWQ9VASKyZ1AnU6Xrco3t7QXM3w08",
    	authDomain: "train-scheduler-7c463.firebaseapp.com",
   		databaseURL: "https://train-scheduler-7c463.firebaseio.com",
   		projectId: "train-scheduler-7c463",
   		storageBucket: "train-scheduler-7c463.appspot.com",
   		messagingSenderId: "1018810211662"
  	};
  	firebase.initializeApp(config);

  	// variable that references firebase
  	var database = firebase.database();

  	// script to be run when the page loads
  	database.ref().on("value", function(snapshot) {

  		$("#schedule-div").empty();

  		// reassign variables with data from database
		trainName = database.trainName;
		trainDestination = database.trainDestination;
		trainTime = database.trainTime;
		trainFrequency = database.trainFrequency;

  		// time calculations
		var trainTimeObj = moment(database.trainTime, "hh:mm");
		var minutesSince = now.diff(trainTimeObj, 'minutes');
		var trainNextObj = now.add(database.trainMinutes, 'm');
		trainMinutes = minutesSince % trainFrequency;
		trainNext = trainNextObj.format("hh:mm");

		// push the users input to the database
  		database.ref().set({
	        trainName: trainName,
	        trainDestination: trainDestination,
	        trainTime: trainTime,
	        trainFrequency: trainFrequency,
	        trainMinutes: trainMinutes,
	        trainNext: trainNext
   		});

	    var sv = snapshot.val();
	      
	    var svArr = Object.keys(sv);

	  	for (var i = 0; i < svArr.length; i++) {
	  		var alreadyKey = svArr[i]
	  		var alreadyScheduled = sv[alreadyKey]

	  		$("#schedule-div").append("<div class='train-row'><span class='train-name'> " + alreadyScheduled.trainName +
			" </span><span class='train-destination'> " + alreadyScheduled.trainDestination +
			" </span><span class='train-frequency'> " + alreadyScheduled.trainFrequency +
			" </span><span class='train-next'> " + alreadyScheduled.trainNext + 
			" </span><span class='train-minutes'> " + alreadyScheduled.trainMinutes + " </span></div>");	
	  	}
	});





  	// script to be run when user clicks submit
	$("#submit-button").click(function(){
		event.preventDefault();

		$("schedule-div").empty();


		// reassign variables to the users input
		trainName = $("#input-name").val().trim();
		trainDestination = $("#input-destination").val().trim();
		trainTime = $("#input-time").val().trim();
		trainFrequency = $("#input-frequency").val().trim();

		// time calculations
		var trainTimeObj = moment(trainTime, "hh:mm");
		var minutesSince = now.diff(trainTimeObj, 'minutes');
		var trainNextObj = now.add(trainMinutes, 'm');
		trainMinutes = minutesSince % trainFrequency;
		trainNext = trainNextObj.format("hh:mm");

		// push the users input to the database
  		database.ref().push({
	        trainName: trainName,
	        trainDestination: trainDestination,
	        trainTime: trainTime,
	        trainFrequency: trainFrequency,
	        trainMinutes: trainMinutes,
	        trainNext: trainNext
   		});

  //  		console.log(trainName + " added!");
		// console.log("Minutes since train began running: " + minutesSince);
		// console.log("Next train arrives in: " + trainMinutes + " minutes");
		// console.log("Next train arrives at: " + trainNext);

	   	$("#input-name").val("");
		$("#input-destination").val("");
		$("#input-time").val("");
		$("#input-frequency").val("");
  	});



	






	// end of .ready() wrapper
});