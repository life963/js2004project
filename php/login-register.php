<?php
    require "conn.php";

    if(isset($_POST['$phone'])){
        $phone = $_POST['$phone'];
        //利用$phone查找对应的数据，返回给前端。
        $result=$conn->query("select * from newreg where tel = $phone");
        if($result->fetch_assoc()){//找到了就返回true，也就是1，没有false，也就是空
            echo 1;
        }else{
            echo 2;
        }
    }