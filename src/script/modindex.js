define(["jquery", "cookie", "lazyload"], function() {
    return {
        init: function() {
            /*-----------------------------------二级菜单--------------------------------------*/
            let $topmenu = $(".top_select li");
            let $tophover = $(".hoverbox .top_cenhover");
            let $boxs = $(".hoverbox");
            $topmenu.on("mouseover", function() {
                $boxs.css({
                        "display": "block"
                    })
                    //$boxs.show();
                    //$tophover.eq($(this).index()).show().siblings('.top_cenhover').hide();
                $tophover.eq($(this).index()).css({
                    "display": "block"
                }).siblings('.top_cenhover').css({
                    "display": "none"
                });
            });
            $topmenu.on("mouseout", function() {
                //$boxs.hide();
                $boxs.css({
                    "display": "none"
                });
            });
            $boxs.on("mouseover", function() {
                //$boxs.show();
                $boxs.css({
                    "display": "block"
                });
            });
            $boxs.on("mouseout", function() {
                //$boxs.hide();
                $boxs.css({
                    "display": "none"
                });
            });

            /*---------------------------------轮播图-----------------------------------*/
            let $imglist = $(".top_cenban_img img");
            let $libtn = $(".top_cenban ul li");
            let $left = $(".top_cenban_left");
            let $right = $(".top_cenban_right");
            let $index = 0;
            let $autotimer = null;
            console.log($imglist.length, $libtn.length);
            //图片自动切换
            $autotimer = setInterval(function() {
                $right.click();
            }, 1000)

            $imglist.hover(function() {
                clearInterval($autotimer);
            }, function() {
                $autotimer = setInterval(function() {
                    $right.click();
                }, 1000)
            })

            //按钮点击
            $libtn.on("click", function() {
                $index = $(this).index();
                ban();
            });
            //左箭头点击
            $left.on("click", function() {
                $index--;
                if ($index < 0) {
                    $index = $libtn.length - 1;
                }
                ban();
            });
            //右箭头点击
            $right.on("click", function() {
                $index++;
                if ($index > $libtn.length - 1) {
                    $index = 0;
                }
                ban();
            });
            //封装切换函数
            function ban() {
                $libtn.eq($index).addClass("lishow").siblings("li").removeClass("lishow");
                $imglist.eq($index).stop(true).animate({ opacity: 1 }).siblings("img").stop(true).animate({ opacity: 0 });
            }


            /*------------------------------获取数据渲染--------------------------------*/
            let $indexbox = $(".Shopping_show_content_proList");
            $.ajax({
                url: "http://10.31.163.33/js/project/php/1index.php",
                dataType: "json"
            }).done(function(data) {
                let $indexstr = "";
                console.log(data);
                $.each(data, function(index, value) {
                    $indexstr += `
            <li target="_black" class="Shopping_show_content_product_li">
            <a href="javascript:;" class="Shopping_show_content_product">
                <div class="Shopping_show_product_img_box">
                    <img class="lazy" data-original="${value.url}">
                </div>
                <p class="Shopping_show_content_proName">${value.title}</p>
                <p class="Shopping_show_content_price">￥${value.price}</p>
            </a>
        </li>
            `
                })
                $indexbox.html($indexstr);
                //懒加载
                $(function() {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });
            })
        }
    }
});