<?php
    require "conn.php";

    //手机号重复验证
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

    //注册
    if(isset($_POST['submit'])){
        $tel = $_POST['tel'];
        $password = sha1($_POST['password']);
        //将表单获取的电话和密码注册到表内
        $result=$conn->query("INSERT newreg VALUES('$tel','$password')");
        //跳转到登陆页面
        header("location:http://localhost/js/project/src/4login.html");
    }

    //登录
    //判断是否传入用户名和密码
    if(isset($_POST['name'])&&isset($_POST['pass'])){
        $sname = $_POST['name'];
        $spass = sha1(($_POST['pass']));
        //将表单获取的电话和密码注册到表内
        $result=$conn->query("select*from newreg where tel='$sname'and password='$spass'");
        if($result->fetch_assoc()){
            echo 1;//知道符合的输出1
        }else {
            echo 2;//找不到符合输出2
        }
    }