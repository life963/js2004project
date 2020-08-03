;
(function($) {
    let $tel = $(".tel input"); //手机号码
    let $ran = $(".random input"); //随机验证码
    let $password = $(".password input"); //密码
    let $newpass = $(".newpass input"); //确认密码
    let $submit = $(".submit input"); //提交按钮

    let $telspan = $(".tel_bot"); //号码后的span
    let $ranspan = $(".random_bot"); //验证码后的span
    let $passwordspan = $(".password_bot"); //密码后的span
    let $newpassspan = $(".newpass_bot"); //确认密码后的span

    //手机号码注册验证
    $tel.on("blur", function() {
        $.ajax({
            type: "post",
            url: "http://localhost/js/project/php/login-register.php",
            dataType: "json",
            data: {
                $phone: $tel.val()
            }
        }).done(function(data) {
            console.log(data);
            if (data == 1) { //如果返回true，说明后端有相同的值
                $telspan.html("该手机号已被注册");
                $telspan.css("color", "red")
            } else if (data == 2) {
                $telspan.html("允许注册");
                $telspan.css("color", "green")
            }
            console.log(6);
        })
    })



})(jQuery)