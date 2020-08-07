define(["./jquery.pagination", "jquery", "lazyload"], function() {
    return {
        init: function() {
            /*----------------------------------下拉菜单----------------------------------------*/
            let $topmenu = $(".top_menu_1");
            let $newbox = $(".newbox");
            $topmenu.on("mouseover", function() {
                $newbox.show();
            });
            $topmenu.on("mouseout", function() {
                $newbox.hide();
            });
            $newbox.on("mouseover", function() {
                $newbox.show();
            });
            $newbox.on("mouseout", function() {
                $newbox.hide();
            });

            //折叠隐藏
            let $spread = $(".spreadbottom");
            let $open = $(".shoplistcen_box_spread");
            let $spreadtop = $(".spreadtop");
            let $spreadcen = $(".spreadcen");
            let flag = true;
            $spread.on("click", function() {
                if (flag) {
                    $open.css("height", "auto");
                    $spreadtop.css("display", "none");
                    $spreadcen.css("display", "inline");
                    flag = false;
                } else {
                    $open.css("height", "57px");
                    $spreadtop.css("display", "inline");
                    $spreadcen.css("display", "none");
                    flag = true;
                }
            })

            //页面数据排序初始化
            let $defaultarr = []; //默认排序的数组
            let $nowarr = []; //排序中的数组
            let $prev = null;
            let $next = null;

            //渲染列表，不点击情况下默认渲染第一页
            let $listbox = $(".shoppinglist")
            $.ajax({
                url: "http://10.31.163.33/js/project/php/list.php",
                dataType: "json"
            }).done(function(data) {
                let $liststr = "";
                $.each(data, function(index, value) {
                    $liststr += `
            <a href="3detail.html?sid=${value.sid}">
                <div class="shoppinglist_one">
                <img class="lazy" data-original="${value.url}" />
                    <p>${value.title}</p>
                    <p>
                        <span class="price">￥${value.price}</span>
                        <span class="iconfont icon-gouwucheman"></span>
                    </p>
                </div>
            </a>
            `
                })
                $listbox.html($liststr);
                //懒加载
                $(function() {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });

                //渲染的标签放入数组,必须在这里放入数组里，渲染的数组外面获取不了
                $(".shoppinglist a").each(function(index, element) {
                    $defaultarr[index] = $(this); //放入默认数组
                    $nowarr[index] = $(this); //放入用于排序的数组
                });
            })


            /*--------------------------------排序--------------------------------------*/
            //默认排序，使用$defaultarr数组
            $(".sort-tab-def").on("click", function() {
                $.each($defaultarr, function(index, value) { //每个value是a标签
                    $(".shoppinglist").append(value); //每个a标签依次放入对应标签内
                });
                //给被点击的按钮增加背景颜色
                $(".sort-tab-def").addClass("sort-tab-item_active").siblings("li").removeClass("sort-tab-item_active");
            });
            //升序，使用$nowarr数组
            $(".sort-tab-asc").on("click", function() {
                for (let i = 0; i < $nowarr.length - 1; i++) {
                    for (let j = 0; j < $nowarr.length - i - 1; j++) {
                        $prev = parseInt($nowarr[j].find(".price").html().substring(1)); //获取当前数据的价格数据
                        $next = parseInt($nowarr[j + 1].find(".price").html().substring(1)); //获取下一个数据的价格
                        if ($prev > $next) {
                            let temp = $nowarr[j];
                            $nowarr[j] = $nowarr[j + 1];
                            $nowarr[j + 1] = temp;
                        }
                    }
                };
                //排序完成在渲染
                $.each($nowarr, function(index, value) {
                    $(".shoppinglist").append(value)
                });
                //给被点击的按钮增加背景颜色
                $(".sort-tab-asc").addClass("sort-tab-item_active").siblings("li").removeClass("sort-tab-item_active");
            });
            //降序
            $(".sort-tab-des").on("click", function() {
                for (let i = 0; i < $nowarr.length - 1; i++) {
                    for (let j = 0; j < $nowarr.length - i - 1; j++) {
                        $prev = parseInt($nowarr[j].find(".price").html().substring(1)); //获取当前数据的价格数据
                        $next = parseInt($nowarr[j + 1].find(".price").html().substring(1)); //获取下一个数据的价格
                        if ($prev < $next) {
                            let temp = $nowarr[j];
                            $nowarr[j] = $nowarr[j + 1];
                            $nowarr[j + 1] = temp;
                        }
                    }
                };
                //排序完成在渲染
                $.each($nowarr, function(index, value) {
                    $(".shoppinglist").append(value);
                });
                //给被点击的按钮增加背景颜色
                $(".sort-tab-des").addClass("sort-tab-item_active").siblings("li").removeClass("sort-tab-item_active");
            })


            /*----------------------------分页，使用插件-------------------------*/
            $(".jump").pagination({
                pageCount: 2, //设置页码数
                jump: true,
                prevContent: "上一页",
                nextContent: "下一页",
                callback: function(api) {
                    console.log(api.getCurrent()); //获取当前页码
                    $.ajax({
                        url: "http://10.31.163.33/js/project/php/list.php",
                        dataType: "json",
                        data: {
                            page: api.getCurrent() //将页码传入后端，用于确定要获取哪组数据
                        }
                    }).done(function(data) {
                        let $liststr = "";
                        $.each(data, function(index, value) {
                            $liststr += `
                    <a href="3detail.html?sid=${value.sid}">
                        <div class="shoppinglist_one">
                        <img class="lazy" data-original="${value.url}" />
                            <p>${value.title}</p>
                            <p>
                                <span class="price">￥${value.price}</span>
                                <span class="iconfont icon-gouwucheman"></span>
                            </p>
                        </div>
                    </a>
                    `
                        })
                        $listbox.html($liststr);

                        //懒加载
                        $(function() {
                            $("img.lazy").lazyload({ effect: "fadeIn" });
                        });

                        //渲染的标签放入数组,必须在这里放入数组里，渲染的数组外面获取不了
                        $(".shoppinglist a").each(function(index, element) {
                            $defaultarr[index] = $(this); //放入默认数组
                            $nowarr[index] = $(this); //放入用于排序的数组
                        });
                    })
                }
            })
        }
    }
})