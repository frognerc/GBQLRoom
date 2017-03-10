<?php
error_reporting( error_reporting() & ~E_NOTICE );
class GiantBombApi {
//http://www.giantbomb.com/api/search/?api_key=1ad88f4d213c490d695231da3ce9e9636eebf8ad&query=Mortal+Kombat&format=json
  public $api_key;
  public $base_url;
  public $format;
  public $offset = 0;

   function __construct() {
    $this->format="&format=json";
    $this->api_key = "1ad88f4d213c490d695231da3ce9e9636eebf8ad";
    $this->search_url = "http://www.giantbomb.com/api/search/?api_key=".$this->api_key."&query=";

  }

  public function clean($string) {
   $string = str_replace('"', '', $string); // Replaces all spaces with hyphens.
   //return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
   return $string;
  }

  public function printList() {
    $file = "quickLookArray.js";
    file_put_contents("quickLookArray.js", "");
    $currentVid = "var quickLooks = [\n";
    while(1){
      $url = "http://www.giantbomb.com/api/videos/?api_key=1ad88f4d213c490d695231da3ce9e9636eebf8ad&format=json&video_type=3&offset=".$offset."&field_list=id,length_seconds,embed_player,name,site_detail_url";
      $curl_handle=curl_init();
      curl_setopt($curl_handle, CURLOPT_URL,$url);
      curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 2);
      curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($curl_handle, CURLOPT_USERAGENT, 'gbrandomquicklook.party');
      $query = curl_exec($curl_handle);
      //echo $query;
      curl_close($curl_handle);

      $json = json_decode($query, true);

      if(sizeof($json['results']) != 0){
        foreach ($json['results'] as $videoElement)
        {
            $currentVid .= '"'.$videoElement['id'].'~'.$this->clean($videoElement['name']).'~'.$videoElement['site_detail_url'].'~'.$videoElement['length_seconds'] .'",'."\n";
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


   //TESTING SECTION
$games = new GiantBombApi;
//$query = $_GET['videos'];
echo $games->printList();

?>
