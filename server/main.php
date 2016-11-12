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
    //$url = "http://congress.api.sunlightfoundation.com/";
    $url = "http://104.198.0.197:8080/";
    //$url = "http://hengyang-zhao.ddns.net/~hzhao/fake-sunlight/";
    $apikey = "apikey=c8e8d23822424300b4043bb3ad752f57";

    if ($_GET["query"] == "legislators") {
        $filePath = $url . "legislators?" . "per_page=all&" . $apikey;
        $file = file_get_contents($filePath, false, $context);
        echo $file;
    } else if ($_GET["query"] == "billsTrue") {
        $filePath = $url . "bills?" . "&" . $apikey . "&per_page=50&history.active=true&last_version.urls.pdf__exists=true";
        $file = file_get_contents($filePath, false, $context);
        echo $file;
    } else if ($_GET["query"] == "billsFalse") {
        $filePath = $url . "bills?" . "&" . $apikey . "&per_page=50&history.active=false&last_version.urls.pdf__exists=true";
        $file = file_get_contents($filePath, false, $context);
        echo $file;
    } else if ($_GET["query"] == "committees") {
        $filePath = $url . "committees?" . "&" . "per_page=all&" . $apikey;
        $file = file_get_contents($filePath, false, $context);
        echo $file;
    } else {
        $filePath = $url . $_GET["query"] . "&" . $apikey;
        $file = file_get_contents($filePath, false, $context);
        echo $file;
    }
    /*$filePath = $url . "&" . $apikey . $_GET["query"] ;
    $file = file_get_contents($filePath, false, $context);
    echo $file;*/

    $_SRVER["REQUEST_METHOD"] = null; 
}
?>

