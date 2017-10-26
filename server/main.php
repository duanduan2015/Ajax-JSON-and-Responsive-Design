<?php
if (isset($_SERVER["REQUEST_METHOD"])) {
    $url = "https://api.propublica.org/congress/v1/";
    $opts = array(
        'https'=>array(
            'method'=>"GET",
            'header'=>"XX-API-Key: Pga8Fvx9q5sAiall9vV60J2tk6lhdfTnA2Vtzji"
        )
    );
    $context = stream_context_create($opts);
    if ($_GET["query"] == "legislators" && $_GET["chamber"] == "senate") {
        $filePath = "https://api.propublica.org/congress/v1/115/senate/members.json";
        $ch = curl_init(); 
        curl_setopt($ch, CURLOPT_URL, $filePath); 
        curl_setopt($ch, CURLOPT_HTTPHEADER,array('X-API-Key: XPga8Fvx9q5sAiall9vV60J2tk6lhdfTnA2Vtzji'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
        $output = curl_exec($ch); 
        curl_close($ch);      
        echo $output;
    } else if ($_GET["query"] == "legislators" && $_GET["chamber"] == "house") {
        $filePath = "https://api.propublica.org/congress/v1/115/house/members.json";
        $ch = curl_init(); 
        curl_setopt($ch, CURLOPT_URL, $filePath); 
        curl_setopt($ch, CURLOPT_HTTPHEADER,array('X-API-Key: XPga8Fvx9q5sAiall9vV60J2tk6lhdfTnA2Vtzji'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
        $output = curl_exec($ch); 
        curl_close($ch);      
        echo $output;
    } else if ($_GET["query"] == "billsTrue" && $_GET["chamber"] == "house") {
        $filePath = "https://api.propublica.org/congress/v1/115/house/bills/active.json";
        $ch = curl_init(); 
        curl_setopt($ch, CURLOPT_URL, $filePath); 
        curl_setopt($ch, CURLOPT_HTTPHEADER,array('X-API-Key: XPga8Fvx9q5sAiall9vV60J2tk6lhdfTnA2Vtzji'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
        $output = curl_exec($ch); 
        curl_close($ch);      
        echo $output;
    } else if ($_GET["query"] == "billsTrue" && $_GET["chamber"] == "senate") {
        $filePath = "https://api.propublica.org/congress/v1/115/senate/bills/active.json";
        $ch = curl_init(); 
        curl_setopt($ch, CURLOPT_URL, $filePath); 
        curl_setopt($ch, CURLOPT_HTTPHEADER,array('X-API-Key: XPga8Fvx9q5sAiall9vV60J2tk6lhdfTnA2Vtzji'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
        $output = curl_exec($ch); 
        curl_close($ch);      
        echo $output;
    } else if ($_GET["query"] == "billsFalse" && $_GET["chamber"] == "house") {
        $filePath = "https://api.propublica.org/congress/v1/bills/upcoming/house.json";
        $ch = curl_init(); 
        curl_setopt($ch, CURLOPT_URL, $filePath); 
        curl_setopt($ch, CURLOPT_HTTPHEADER,array('X-API-Key: XPga8Fvx9q5sAiall9vV60J2tk6lhdfTnA2Vtzji'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
        $output = curl_exec($ch); 
        curl_close($ch);      
        echo $output;
    } else if ($_GET["query"] == "billsFalse" && $_GET["chamber"] == "senate") {
        $filePath = "https://api.propublica.org/congress/v1/bills/upcoming/senate.json";
        $ch = curl_init(); 
        curl_setopt($ch, CURLOPT_URL, $filePath); 
        curl_setopt($ch, CURLOPT_HTTPHEADER,array('X-API-Key: XPga8Fvx9q5sAiall9vV60J2tk6lhdfTnA2Vtzji'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
        $output = curl_exec($ch); 
        curl_close($ch);      
        echo $output;
    } else if ($_GET["query"] == "memberBills") {
        $filePath = "https://api.propublica.org/congress/v1/members/" . $_GET["id"] . "/bills/introduced.json";
        $ch = curl_init(); 
        curl_setopt($ch, CURLOPT_URL, $filePath); 
        curl_setopt($ch, CURLOPT_HTTPHEADER,array('X-API-Key: XPga8Fvx9q5sAiall9vV60J2tk6lhdfTnA2Vtzji'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
        $output = curl_exec($ch); 
        curl_close($ch);      
        echo $output;
    } else {
        $filePath = $url . $_GET["query"] . "&" . $apikey;
        $file = file_get_contents($filePath, false, $context);
        echo $file;
    }
    $_SRVER["REQUEST_METHOD"] = null; 
}
?>
