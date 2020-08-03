<?php
header('content-type:text/html;charset=utf-8;');

define("HOST","localhost");
define("USERNAME","root");
define("PASSWORD","root");
define("DATABASE","js2004");

$conn = @new  mysqli(HOST,USERNAME,PASSWORD,DATABASE);
if($conn->connect_error){
    die("数据库连接失败".$conn->connect_error);
}