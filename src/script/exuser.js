define(["jquery", "cookie"], function($) {
    return {
        init: function() {
            /*------------------------------用户登录，用户名显示-------------------------------- */
            if ($.cookie("user")) {
                //如果获取了用户名
                let newuser = $.cookie("user");
                $(".onecen_right").hide(); //原本的注册登录隐藏
                $(".newboss").show(); //隐藏模块显示
                $(".welcome").html("尊敬的" + newuser + "用户，您好!")
            }
            $(".goout").on("click", function() {
                $.cookie("user", null, { //删除cookie里用户名信息
                    expires: -1,
                    path: "/"
                });
                $(".onecen_right").show(); //注册登录模块显示
                $(".newboss").hide(); //欢迎模块隐藏
            })
        }
    }
})