<?php

$image = $_POST["image"];
$name = $_POST["name"];

$file_type = null;

if(strpos($image,"image/jpeg")) { //jpeg
	$image = str_replace("data:image/jpeg;base64,","",$image);
	$file_type = "jpeg";	
} else if(strpos($image,"image/png")) { //png
	$image = str_replace("data:image/png;base64,","",$image);
	$image = str_replace(' ', '+', $image);
	$file_type = "png";
}


$data = base64_decode($image);

$file = "images/" . $name . "." . $file_type;
file_put_contents($file, $data);

echo $image;

?>