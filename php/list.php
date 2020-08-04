<?php
    require "conn.php";

    $result = $conn->query("SELECT*FROM project");//所有的数据
    $pagesize = 20;//设置每个页面展示的数据条数
    $num = $result->num_rows;//数据所有条数
    $pagenum = ceil($num / $pagesize);//获取页数，且向上取整

    //获取前端传入的页码信息
    if(isset($_GET['page'])){
        $pagevalue = $_GET['page'];//获取传入的页码
    }else{
        $pagevalue = 1;//默认页码为1
    }

    //页码页面对应数据开始的条数
    $page = ($pagevalue - 1)*$pagesize;

    //limit方法,变量不可以加引号
    //限制选取的数据开始位置和获取的数据个数,第一个参数为开始位置，第二个为获取的条数
    //每次一组一组输出,假如一组10条，那么第一组0-10；第二组11-20
    $res = $conn->query("select * from project limit $page,$pagesize");

    $arr = array();//创建一个数组用于存储前面的一组一组的数据
    for($i = 0;$i <$res->num_rows;$i++){
        $arr[$i] = $res->fetch_assoc();//limit每次获取一组，普通每次输出一条
    }
    echo json_encode($arr);//输出后端的数据