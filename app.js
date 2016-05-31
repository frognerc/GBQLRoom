// 1 = pause button, 0 = play button
var pauseOrResume = 1;

var currentVideoIndex = 0;

var videoGBLink = "PlaceHolder";

var timeoutPlay = 0;
var timeoutSeek = 0;
var timeoutResume = 0;
var timeoutFinish = 0;
var dateTime = new Date().getTime() / 1000;
var startTime = 1464678978;
var globalTimeStamp = Math.round(dateTime - startTime);

// Serve up a video when page loads
$(document).ready(calculateCurrentVideo());
pickRandomQuickLook();
setInterval(changeTime,1000);

// Gets random video id and name from video array
function pickRandomQuickLook(){
	resetVideoTimeouts();
	document.getElementById("currVideo").src='http://www.giantbomb.com/videos/embed/' + quickLooks[currentVideoIndex].split(',')[0] + '/';
	document.getElementById("VideoTitle").innerHTML=quickLooks[currentVideoIndex].split(',')[1];
	videoGBLink=quickLooks[currentVideoIndex].split(',')[3];
}

function changeTime(){
	globalTimeStamp += 1;
	$('#timeSinceStart').html(globalTimeStamp);
}

function calculateCurrentVideo(){
	var i = 0;
	var totalLength = 0;
	
	for(i = 0; totalLength < globalTimeStamp; i++){
		totalLength = totalLength + parseInt(quickLooks[i].split(',')[2]);
	}
	return i;
}

function resetVideoTimeouts(){
	clearTimeout(timeoutPlay);
	clearTimeout(timeoutSeek);
	clearTimeout(timeoutResume);
	clearTimeout(timeoutFinish);
}

function openGBLink(){
	var win = window.open(videoGBLink, '_blank');
	if(win){
		//Browser has allowed it to be opened
		win.focus();
	}else{
		//Broswer has blocked it
		alert('Please allow popups for this site');
	}
}

// pause,resume button animation
$("#resumePause").mousedown(playPressed);
$("#resumePause").mouseup(playReleased);
$("#resumePause").keydown(function (e) {
		if(e.keyCode === 32){
			playPressed();
		}
});
$("#resumePause").keyup(function (e) {
		if(e.keyCode === 32){
			playReleased();
		}
});


// pause,resume button animation
function playReleased(){
	if(pauseOrResume == 0){
		$("#resumePause").attr("src", "play_0.png");
		$("#resumePause").attr("onClick", "pauseVideo();");
	}else{
		$("#resumePause").attr("src", "Buttons_0.png");
		$("#resumePause").attr("onClick", "resumeVideo();");
	}
}

// pause,resume button animation
function playPressed(){
	if(pauseOrResume == 0){
		pauseOrResume = 1;
		$("#resumePause").attr("src", "play_1.png");
	}else{
		pauseOrResume = 0;
		$("#resumePause").attr("src", "Buttons_3.png");
	}
}

// Next video button animation
$("#change").mousedown(function(){
		$("#change").attr("src", "ChangeBDown.png");
});

// Next video button animation
$("#change").mouseup(function(){
		$("#change").attr("src", "ChangeBUp.png");
});

$("#GBLink").mousedown(function(){
		$("#GBLink").attr("src", "GButton1.png");
});

// Next video button animation
$("#GBLink").mouseup(function(){
		$("#GBLink").attr("src", "GButton0.png");
});