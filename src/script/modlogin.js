define(["jquery"], function() {
    return {
        init: function() {
            let $usernameBox = $("#username"); //用户名输入框
            let $passwordBox = $("#password"); //密码框
            let $loginbtn = $("#submit"); //登陆按钮
            let $login_top = $(".login-head_top"); //错误提示框
            $loginbtn.on("click", function() {
                $.ajax({
                    type: "post",
                    url: "http://localhost/js/project/php/login-register.php",
                    dataType: "json",
                    data: {
                        name: $usernameBox.val(),
                        pass: $passwordBox.val()
                    }
                }).done(function(data) {
                    if (data === 1) {
                        $usernameBox.val(""); //清空账户名
                        $passwordBox.val(""); //清空密码
                        alert("登录成功");
                        location.href = "http://localhost/js/project/src/1index.html";
                    } else if (data === 2) {
                        $login_top.css({
                            "color": "red",
                            "display": "block"
                        });
                        $login_top.html("账号或者密码错误");
                        $passwordBox.val(""); //清空密码
                    }
                })
            })
        }
    }
})