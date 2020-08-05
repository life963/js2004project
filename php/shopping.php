<?php
    require "conn.php";

    $result = $conn->query("select*from project");
    $arr = array();
    //将所有的数据放入数组内
    for($i =0;$i<$result->num_rows;$i++){
        $arr[$i] = $result->fetch_assoc();
    }
    echo json_encode($arr);//输出