//配置jquery插件和cookie插件
require.config({
    paths: {
        "jquery": "https://cdn.bootcss.com/jquery/1.12.4/jquery.min",
        "cookie": "https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie",
        "lazyload": "https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload.min",
    }
});

//调用模块
require(["jquery"], function($) {
    let mod = $("#currentpage").attr("currentmod"); //获取属性值，后面根据属性值调用相应的模块
    if (mod) { //如果存在改属性值，进行调用对应模块
        require([mod], function(data) {
            data.init();
        })
        if (mod == "modlist") {
            require(["modindex"], function(data) {
                data.init();
            })
        }
    }
})