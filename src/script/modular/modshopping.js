define(["jquery", "cookie"], function() {
    return {
        init: function() {
            //封装渲染购物车的函数
            let $datastr = "";
            let $shopnum = 0; //记录总共购物数量
            let $shopsum = 0; //记录商品总价
            let $sidarr = null; //存储cookie里sid
            let $numarr = null; //存储cookie里num

            function shopping(sid, num) {
                $.ajax({
                    url: "http://localhost/js/project/php/shopping.php",
                    dataType: "json"
                }).done(function(data) {
                    $.each(data, function(index, value) {
                        //如果数据内的sid和传入的的参数sid相同，渲染该条数据
                        if (sid == value.sid) {
                            $datastr += `
                    <div class="shopping_boss" sid="${value.sid}">
                        <div class="shopping_img">
                            <img src="${value.url}" alt="">
                        </div>
                        <span class="shopping_goodsName">${value.title}</span>
                        <span class="shopping_price">${value.price}</span>
                        <div class="shopping_proCount">
                            <span class="reduce">-</span><span class="proCount_num">${num}</span><span class="plus">+</span>
                        </div>
                        <span class="shopping_priceCount">${value.price*num}</span>
                        <span class="shopping_operation">删除</span>
                    </div>
                    `;
                            $shopsum += value.price * num; //记录每一种商品的总价，求全部的总价
                        }
                    })
                    $(".shopping_box").html($datastr);
                    $(".shopping_bot_priceCount span").html("￥" + $shopsum + ".00"); //改变商品总价
                })
            };

            //获取cookie里的sid和num
            if ($.cookie("cookiesid") && $.cookie("cookienum")) {
                //将从cookie获取的sid和num转变成数组形式存储
                $sidarr = $.cookie("cookiesid").split(",");
                $numarr = $.cookie("cookienum").split(",");
                //使用遍历，调用函数进行渲染
                $.each($sidarr, function(index, value) {
                    shopping($sidarr[index], $numarr[index]);
                    $shopnum += Number($numarr[index]);
                })
                $(".top_num").html($shopnum); //改变商品数量总数
                $(".shopping_bot_preCount span").html($shopnum); //改变商品数量总数
            }

            //购物车商品数量修改，增加 减少 改变cookie里的值
            //减少
            $(".shopping_box").on("click", function(e) {
                if ($(e.target).is(".reduce")) {
                    //对应商品的sid
                    let $shopsid = $(e.target).parent(".shopping_proCount").parent(".shopping_boss").attr("sid");
                    //单个商品数量
                    let $nownum = $(e.target).siblings(".proCount_num").html();
                    //单个商品总价
                    let $nowpricesum = $(e.target).parent(".shopping_proCount").siblings(".shopping_priceCount").html();
                    //单个商品单价
                    let $nowprice = $(e.target).parent(".shopping_proCount").siblings(".shopping_price").html();
                    //所有商品总价
                    let $pricesum = $(".shopping_bot_priceCount span").html().slice(1);
                    //数量大于1，允许进行减少操作
                    if ($nownum > 1) {
                        $nownum--;
                        //改变单个商品总数
                        $(e.target).siblings(".proCount_num").html($nownum);
                        //商品总数量也相应的减少
                        $shopnum--;
                        //所有商品的总价相应减少一个单价值
                        $pricesum = Number($pricesum) - Number($nowprice);
                        //改变商品总价
                        $(".shopping_bot_priceCount span").html("￥" + $pricesum + ".00");
                        //改变商品数量总数
                        $(".top_num").html($shopnum);
                        //改变商品数量总数
                        $(".shopping_bot_preCount span").html($shopnum);
                        //单个商品总价变化
                        $nowpricesum = $nowprice * $nownum;
                        //改变单个商品总价
                        $(e.target).parent(".shopping_proCount").siblings(".shopping_priceCount").html($nowpricesum);
                        //改变cookie里的商品对应的数量
                        $numarr[$.inArray($shopsid, $sidarr)] = $nownum; //对应数量数组位置的值用修改后的数字代替
                        $.cookie("cookienum", $numarr, { //数据存入cookie里
                            expires: 7,
                            path: "/"
                        })
                    }
                }
            });
            //增加
            $(".shopping_box").on("click", function(e) {
                if ($(e.target).is(".plus")) {
                    //对应商品的sid
                    let $shopsid = $(e.target).parent(".shopping_proCount").parent(".shopping_boss").attr("sid");
                    //单个商品数量
                    let $nownum = $(e.target).siblings(".proCount_num").html();
                    //单个商品总价
                    let $nowpricesum = $(e.target).parent(".shopping_proCount").siblings(".shopping_priceCount").html();
                    //单个商品单价
                    let $nowprice = $(e.target).parent(".shopping_proCount").siblings(".shopping_price").html();
                    //所有商品总价
                    let $pricesum = $(".shopping_bot_priceCount span").html().slice(1);
                    $nownum++;
                    $(e.target).siblings(".proCount_num").html($nownum); //改变单个商品总数
                    $shopnum++; //商品总数量也相应的减少
                    $pricesum = Number($pricesum) + Number($nowprice); //所有商品的总价相应增加一个单价值
                    $(".shopping_bot_priceCount span").html("￥" + $pricesum + ".00"); //改变商品总价
                    $(".top_num").html($shopnum); //改变商品数量总数
                    $(".shopping_bot_preCount span").html($shopnum); //改变商品数量总数
                    $nowpricesum = $nowprice * $nownum //单个商品总价变化
                    $(e.target).parent(".shopping_proCount").siblings(".shopping_priceCount").html($nowpricesum); //改变单个商品总价
                    //改变cookie里的商品对应的数量
                    $numarr[$.inArray($shopsid, $sidarr)] = $nownum; //对应数量数组位置的值用修改后的数字代替
                    $.cookie("cookienum", $numarr, { //数据存入cookie里
                        expires: 7,
                        path: "/"
                    })
                }
            });


            //单个商品删除,由于删除也是渲染出来的，无法直接获取，只能使用事件委托
            $(".shopping_box").on("click", function(e) {
                //找到渲染出的删除按钮
                if ($(e.target).is(".shopping_operation")) {
                    $(e.target).parent(".shopping_boss").remove(); //该点击按钮的父级删除自身
                    //对应商品的sid
                    let $shopsid = $(e.target).parent(".shopping_proCount").parent(".shopping_boss").attr("sid");
                    //获取该商品在数组内的索引位置
                    let $shopindex = $.inArray($shopsid, $sidarr);
                    //两个数组在对应位置删除一个数字
                    $numarr.splice($shopindex, 1);
                    $sidarr.splice($shopindex, 1);
                    $.cookie("cookienum", $numarr, { //数据存入cookie里
                        expires: 7,
                        path: "/"
                    });
                    $.cookie("cookiesid", $sidarr, { //数据存入cookie里
                        expires: 7,
                        path: "/"
                    });
                }
            })

            //全部商品清空
            $(".clear").on("click", function() {
                $(".shopping_box").html(""); //购物车列表内容为空
                $.cookie("cookienum", null, { //清空cookie里num
                    expires: -1,
                    path: "/"
                });
                $.cookie("cookiesid", null, { //清空cookie里sid
                    expires: -1,
                    path: "/"
                });
            })
        }
    }
})