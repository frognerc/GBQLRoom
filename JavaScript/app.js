/*
Script to be rand on Individual Quick Look viewing page.
Pairs with index.html
Pairs with StyleRandVids.css
*/

// 1 = pause button, 0 = play button
var pauseOrResume = 1;

var currentVideoIndex = 0;
var videoGBLink = "PlaceHolder";
var timeoutPlay = 0;
var timeoutSeek = 0;
var timeoutResume = 0;
var timeoutFinish = 0;


// Serve up a video when page loads
$(document).ready(pickRandomQuickLook);

// Gets random video id and name from video array
function pickRandomQuickLook(){
	resetVideoTimeouts();
	currentVideoIndex = Math.floor((Math.random() * 2169));
	document.getElementById("currVideo").src='http://www.giantbomb.com/videos/embed/' + quickLooks[currentVideoIndex].split('~')[0] + '/';
	document.getElementById("VideoTitle").innerHTML=quickLooks[currentVideoIndex].split('~')[1];
	videoGBLink=quickLooks[currentVideoIndex].split('~')[2];
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

// pause and resume button animations
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

function playReleased(){
	if(pauseOrResume == 0){
		$("#resumePause").attr("src", "css/Images/play_0.png");
		$("#resumePause").attr("onClick", "pauseVideo();");
	}else{
		$("#resumePause").attr("src", "css/Images/pause_0.png");
		$("#resumePause").attr("onClick", "resumeVideo();");
	}
}

function playPressed(){
	if(pauseOrResume == 0){
		pauseOrResume = 1;
		$("#resumePause").attr("src", "css/Images/play_1.png");
	}else{
		pauseOrResume = 0;
		$("#resumePause").attr("src", "css/Images/pause_1.png");
	}
}

// Next video button animation
$("#change").mousedown(function(){
	$("#change").attr("src", "css/Images/next_1.png");
});

$("#change").mouseup(function(){
	$("#change").attr("src", "css/Images/next_0.png");
});

// Giant Bomb link button animation
$("#GBLink").mousedown(function(){
	$("#GBLink").attr("src", "css/Images/GBLink_1.png");
});

$("#GBLink").mouseup(function(){
	$("#GBLink").attr("src", "css/Images/GBLink_0.png");
});