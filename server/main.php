<?php
if (isset($_SERVER["REQUEST_METHOD"])) {
    $url = "http://congress.api.sunlightfoundation.com/";
    $opts = array(
        'https'=>array(
            'method'=>"GET",
            'header'=>"Accept-language: en\r\n"
        )
    );
    $context = stream_context_create($opts);
    $url = "http://congress.api.sunlightfoundation.com/";
    $apikey = "apikey=c8e8d23822424300b4043bb3ad752f57";
    $filePath = $url . $_GET["query"] . "?&per_page=all&" . $apikey;
    $file = file_get_contents($filePath, false, $context);
    echo $file;
}
?>

