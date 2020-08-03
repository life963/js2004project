;
(function($) {
    //渲染数据
    let $sid = location.search.substring(1).split('=')[1];
    $.ajax({
        url: "http://localhost/js/project/php/detail.php",
        data: {
            sid: $sid
        },
        dataType: "json"
    }).done(function(data) {
        $(".introduce_name").html(data.title);
        $(".price_bold").html("<span>￥</span >" + data.price);
        //对获取的5个图片地址进行转换成数组的值
        let $detailarr = data.imgurl.split(",");
        //对大图进行渲染
        $(".exhibition_big p img").each(function(index, ele) {
                $(".exhibition_big p img").eq(index).attr("src", $detailarr[index])
            })
            //对小图进行渲染
        $(".exhibition_small_top p img").each(function(index, ele) {
            $(".exhibition_small_top p img").eq(index).attr("src", $detailarr[index])
        })

    })


    //点击图片效果
    let $exhlist = $(".exhibition_big p");
    let $exhbtn = $(".exhibition_small_top p");
    let $exhleft = $(".exhibition_small_bottom_left");
    let $exhright = $(".exhibition_small_bottom_right");
    let $exhbox = $(".exh_move"); //大图移动时移动父级盒子
    let $index = 0;

    let $listwidth = $exhlist.eq(0).width(); //获取每次移动的长度
    //如果小图不超过5，右键变灰色
    console.log($exhbtn.length);
    if ($exhbtn.length < 5) {
        $exhright.css("color", "#ddd")
    };
    if ($index == 0) {
        $exhleft.css("color", "#ddd")
    };
    //点击图片
    $exhbtn.on("click", function() {
        $index = $(this).index();
        tabswitch();
    });
    //点击向左
    $exhleft.on("click", function() {
        $index--;
        if ($index - 1 !== -1) {
            tabswitch();
            $exhleft.css("color", "#999")
        } else if ($index - 1 == -1) {
            tabswitch();
            $exhleft.css("color", "#ddd")
        } else {
            $index++;
        }
    });
    //点击向右
    $exhright.on("click", function() {
        $index++;
        $exhleft.css("color", "#999")
        if ($index + 1 < $exhbtn.length) {
            tabswitch();
            $exhright.css("color", "#999")
        } else if ($index + 1 == $exhbtn.length) {
            tabswitch();
            $exhright.css("color", "#ddd")
        } else {
            $index--;
        }

    });

    function tabswitch() {
        //小图边框效果
        $exhbtn.eq($index).addClass("exhibition_small_active").siblings("p").removeClass("exhibition_small_active");
        //大图移动
        $exhbox.stop(true).animate({
            left: -$index * $listwidth
        })
    }


    //放大镜效果
    let $movebox = $(".exhbox"); //小图
    let $smallf = $(".smallf"); //小放大镜
    let $bigf = $(".bigf"); //大放大镜
    let $bigimg = $(".bigimg img"); //大图
    let $exhbig = $(".exhibition_big");
    $movebox.hover(function() { //进入小图范围
        $smallf.show();
        $bigf.show();
        $("body").on("mousemove", function(ev) {
            let $left = ev.pageX - $exhbig.offset().left - $smallf.width() / 2;
            let $top = ev.pageY - $exhbig.offset().top - $smallf.height() / 2;
            if ($left <= 0) { //小放大镜左右距离限定
                $left = 0;
            } else if ($left >= $movebox.width() - $smallf.width()) {
                $left = $movebox.width() - $smallf.width();
            }
            if ($top <= 0) { //小放大镜上下范围限定
                $top = 0;
            } else if ($top >= $movebox.height() - $smallf.height()) {
                $top = $movebox.height() - $smallf.height();
            }
            $smallf.css({
                "left": $left,
                "top": $top
            })
            $bigimg.css({
                "left": -2 * $left,
                "top": -2 * $top
            });
        })
        let moveimgurl = $(".exhibition_small_active img").attr("src");
        //console.log(moveimgurl);
        $bigimg.attr("src", moveimgurl);
    }, function() {
        $smallf.hide();
        $bigf.hide();
    })


    //购物数量
    let $increace = $(".math_increace"); //加号
    let $math_num = $(".math_num"); //当前数量
    let $reduce = $(".math_reduce"); //减号
    let $now_num = null; //定义一个变量存当前数量
    $now_num = $math_num.html(); //获取当前数量
    $increace.on("click", function() {
        $now_num++;
        $math_num.html($now_num);
    })
    $reduce.on("click", function() {
        $now_num--;
        if ($now_num <= 0) { //数量最少为0
            $now_num = 0;
            $math_num.html($now_num);
        }
        $math_num.html($now_num);
    })


    //购物数量存入cookie里，便于购物车获取
    let $arrsid = []; //用来存储物品sid
    let $arrnum = []; //用来存储物品数量
    let $shoppingcar = $(".introduce_btn p"); //加入购物车按钮

    function cookietoarr() {
        if ($.cookie("cookiesid") && $.cookie("cookienum")) {
            $arrsid = $.cookie("cookiesid").split(",");
            $arrnum = $.cookie("cookienum").split(",")
        } else {
            $arrsid = [];
            $arrnum = [];
        }
    }

    $shoppingcar.on("click", function() {
        cookietoarr();
        if ($.inArray($sid, $arrsid) === -1) { //$sid用渲染时获取的数据
            $arrsid.push($sid);
            $arrnum.push($math_num.html());
            $.cookie("cookiesid", $arrsid, { //将sid数组存储到cookie
                expires: 7,
                path: "/"
            });
            $.cookie("cookienum", $arrnum, { //将num数组存储到cookie
                expires: 7,
                path: "/"
            })
        } else {
            //将num数组内对应索引位置的物品数量值进行修改，原有的加上现在加上的为最后的数量
            $arrnum[$.inArray($sid, $arrsid)] = parseInt($math_num.html()) + parseInt($arrnum[$.inArray($sid, $arrsid)])
            $.cookie("cookienum", $arrnum, { //数据存入cookie里
                expires: 7,
                path: "/"
            })
        }
        alert("已成功加入购物车");
        window.open("6shopping.html", "_self");

    })

})(jQuery)