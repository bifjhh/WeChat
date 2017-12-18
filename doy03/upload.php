<?php


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');


$postData=file_get_contents('php://input', true);
 
$d=json_decode($postData);

$name=$d->username;

$age=$d->age;

$str.='姓名'.$name."\r\n";
$str.='年龄'.$age."\r\n";

echo $str;
file_put_contents('upload_test/upload.txt', $str);

?>
