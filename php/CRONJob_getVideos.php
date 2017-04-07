<?php
/*
A CRON job to be ran on the server to retrieve and update the video array with newest videos.
Uses the Giant Bomb API to retrieve video information.  
*/

error_reporting( error_reporting() & ~E_NOTICE );
class GiantBombApi {

	public $api_key;
	public $format;
	public $offset = 0;

	function __construct() {
		$this->format = "format=json";
		$this->api_key = "[YOUR API KEY]";
	}

	// Removes quotation marks that would mess with JavaScript array
	public function clean($string) {
		$string = str_replace('"', '', $string);
		return $string;
	}

	public function printList() {
		$file = "[YOUR FILE HERE]";
		file_put_contents($file, "");
		$currentVid = "var quickLooks = [\n";
		while(1){
			$url = "https://www.giantbomb.com/api/videos/?api_key=" . $this->api_key . "&" . $this->format . "&filter=video_show:3&offset=" . $offset . "&field_list=id,length_seconds,embed_player,name,site_detail_url";
			
			$curl_handle=curl_init($url);
			curl_setopt($curl_handle, CURLOPT_URL,$url);
			curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, true);

			//Insecure method right now for SSL. Will fix.  
			curl_setopt($curl_handle, CURLOPT_SSL_VERIFYPEER, false);

			curl_setopt($curl_handle, CURLOPT_USERAGENT, 'gbrandomquicklook.party_Video_Retrieval_Bot');
			$query = curl_exec($curl_handle);
			curl_close($curl_handle);
			
			/*   TESTING OUTPUT ------------------------
			echo "Query: " . $query . '<br>';
			echo "Errors: " . curl_error($curl_handle) . " --- " . curl_errno($curl_handle) . '<br>';
			echo "URL: " . $url . '<br>';
			*/
			
			$json = json_decode($query, true);
			
			if(sizeof($json['results']) != 0){
				foreach ($json['results'] as $videoElement)
				{
					$currentVid .= '"'.$videoElement['id'].'~'.$this->clean($videoElement['name']).'~'.$videoElement['site_detail_url'].'~'.$videoElement['length_seconds'] . '",'."\n";
				}	
				$offset = $offset + 100;
			}else{
				break;
			}
		}
		
		$currentVid .= "];";
		file_put_contents($file,$currentVid);
	}

}


$games = new GiantBombApi;
echo $games->printList();

?>
