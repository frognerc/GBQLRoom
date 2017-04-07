//Modified file from Giant Bomb API example

var gVideoId = 0;
var gApi = 0;
var timeoutPlay = 0;
var timeoutSeek = 0;
var timeoutResume = 0;
var timeoutFinish = 0;

$(document).ready(

	function ()
	{
	
		$('iframe[data-cbsi-video]').each(

			function(i,e)
			{
				e.addEventListener('load',

					function()
					{
						var api = new CBSiVideoEmbedApi();
						$.data(this, 'cbsi-embed-api', api);
						
						api.init(this,

							function(result)
							{
								
								if(i == 0){
									gVideoId = result[0].id;
									gApi = $.data(document.getElementById('currVideo'), 'cbsi-embed-api');
								}
								
								setVideoForPlay();
								
							},

							function(error)
							{
								alert('Oops! API returned error ' + error);
							}
						);
					}
				);
			}
		);
	}
);

function setVideoForPlay(){
	timeoutPlay = setTimeout('seekVideo(1)', 1000)
	timeoutSeek = setTimeout(playVideo, 2000)
	timeoutResume = setTimeout(resumeVideo, 4000)
	timeoutFinish = setTimeout(alertWhenFinished, 10000);
}

function playVideo()
{
	gApi.play(gVideoId,

		function()
		{
		},

		function(error)
		{
			alert('Ooops! ' + error);
		}
	);
}

function pauseVideo()
{
	gApi.pause(gVideoId,

		function()
		{
		},

		function(error)
		{
			alert('Ooops! ' + error);
		}
	);
}

function resumeVideo()
{
	gApi.resume(gVideoId,

		function()
		{
		},

		function(error)
		{
			alert('Ooops! ' + error);
		}
	);
}

function seekVideo(timeStamp)
{
	gApi.setCurrentTimeStamp(gVideoId, timeStamp,

		function()
		{
		},

		function(error)
		{
			alert('Ooops! ' + error);
		}
	);
}

function alertWhenFinished()
{
	gApi.ended(gVideoId, true,

		function()
		{
			pickRandomQuickLook();
		},

		function(error)
		{
			alert('Ooops! ' + error);
		}
	);
}