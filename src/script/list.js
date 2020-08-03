;
(function($) {
    //下拉菜单
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

    //数据渲染
    let $listbox = $(".shoppinglist")
    $.ajax({
        url: "http://localhost/js/project/php/list.php",
        dataType: "json"
    }).done(function(data) {
        //console.log(data)
        let $liststr = "";
        $.each(data, function(index, value) {
            $liststr += `
            <a href="3detail.html?sid=${value.sid}">
                <div class="shoppinglist_one">
                    <img src="${value.url}" alt="">
                    <p>${value.title}</p>
                    <p>
                        <span>￥${value.price}</span>
                        <span class="iconfont icon-gouwucheman"></span>
                    </p>
                </div>
            </a>
            `
        })
        $listbox.html($liststr);
    })
})(jQuery)