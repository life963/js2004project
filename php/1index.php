<?php
require "conn.php";
$result = $conn->query("SELECT*FROM project");
    $arr = Array();
    for($i=0;$i<8;$i++){
        $arr[$i] = $result->fetch_assoc();
    }
    echo json_encode($arr);