/*
Script to be rand on Individual Quick Look viewing page.
Pairs with index.html
Pairs with StyleRandVids.css
*/

var currentVideoIndex = 0;
var videoGBLink = "PlaceHolder";
var timeoutPlay = 0;
var timeoutSeek = 0;
var timeoutResume = 0;
var timeoutFinish = 0;
var dateTime = new Date().getTime() / 1000;
var startTime = 1488932254;
var globalTimeStamp = Math.floor(dateTime - startTime);
var videoTimeStamp = 0;
var totalLength = 0;

// Serve up a video when page loads
$(document).ready(calculateCurrentVideo());
pickQuickLook();
setInterval(changeTime,1000);

// Gets current video id and name from video array
function pickQuickLook(){
	resetVideoTimeouts();
	document.getElementById("currVideo").src='http://www.giantbomb.com/videos/embed/' + quickLooks[currentVideoIndex].split('~')[0] + '/';
	document.getElementById("VideoTitle").innerHTML=quickLooks[currentVideoIndex].split('~')[1];
	videoGBLink=quickLooks[currentVideoIndex].split('~')[2];
}

// Change text for timer
function changeTime(){
	globalTimeStamp += 1;

	//Calculate seconds
	var seconds = Math.floor((globalTimeStamp % 3600) % 60);
	if(seconds < 10){
		seconds = "0" + seconds;
	}
	
	//Calculate Minutes
	var minutes = Math.floor((globalTimeStamp % 3600) / 60);
	if(minutes < 10){
		minutes = "0" + minutes;
	}
	
	//Calculate Hours
	var hours = Math.floor(globalTimeStamp / 3600);
	if(hours > 0){
		$('#timeSinceStart').html("Current Universal Time Stamp - " + hours + ":" + minutes + ":" + seconds);
	}else{
		$('#timeSinceStart').html("Current Universal Time Stamp - " + minutes + ":" + seconds);
	}
}


// Calculates the current video based on global time stamp since start
function calculateCurrentVideo(){
	var i = 0;
	var lastLength = 0;
	totalLength = 0;

	dateTime = new Date().getTime() / 1000;
	globalTimeStamp = Math.floor(dateTime - startTime);

	for(i = 0; totalLength < globalTimeStamp; i++){
		totalLength = totalLength + parseInt(quickLooks[i].split('~')[3]);
		lastLength = parseInt(quickLooks[i].split('~')[3]);

	}

	globalTimeStamp = lastLength - (totalLength - globalTimeStamp);
	currentVideoIndex = i - 1;

}

function resetVideoTimeouts(){
	clearTimeout(timeoutPlay);
	clearTimeout(timeoutSeek);
	clearTimeout(timeoutResume);
	clearTimeout(timeoutFinish);
}