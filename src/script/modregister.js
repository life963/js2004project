define(["jquery"], function() {
    return {
        init: function() {
            /*-------------------------------------------注册-------------------------------------------*/
            let $tel = $(".tel input"); //手机号码
            let $ran = $(".random input"); //随机验证码
            let $spannum = $(".random_cen") //生成验证码
            let $password = $(".password input"); //密码
            let $newpass = $(".newpass input"); //确认密码
            let $submit = $(".submit input"); //提交按钮

            let $telspan = $(".tel_bot"); //号码后的span
            let $ranspan = $(".random_bot"); //验证码后的span
            let $passwordspan = $(".password_bot"); //密码后的span
            let $newpassspan = $(".newpass_bot"); //确认密码后的span
            //各个标记
            let $telflag = false;
            let $passflag = false;
            let $ranflag = false;
            let $newflag = false;

            //手机号码
            $tel.on("focus", function() {
                $telspan.html("请输入11位电话号码");
                $telspan.css("color", "#ccc");

            })
            $tel.on("blur", function() {
                if ($tel.val() !== "") {
                    let $tellength = $tel.val().length;
                    let $reg = /^1[3579]\d{9}$/;
                    if ($reg.test($tel.val())) {
                        $.ajax({
                            type: "post",
                            url: "http://localhost/js/project/php/login-register.php",
                            dataType: "json",
                            data: {
                                $phone: $tel.val()
                            }
                        }).done(function(data) {
                            console.log(data);
                            if (data == 1) { //如果返回1，说明后端有相同的值
                                $telspan.html("该手机号已被注册");
                                $telspan.css("color", "red")
                            } else if (data == 2) { //如果返回2，说明后端没有相同的值
                                $telspan.html("允许注册");
                                $telspan.css("color", "green");
                                $telflag = true; //该行正确，标记变true
                            }
                        })
                    } else {
                        $telspan.html("请输入正确格式的手机号码");
                        $telspan.css("color", "red");
                    }
                } else {
                    $telspan.html("手机号码不可为空");
                    $telspan.css("color", "red");
                }
            })


            //验证码
            function rannum() {
                let $ranarr = [];
                for (let $i = 0; $i < 4; $i++) {
                    $ranarr.push(Math.round(Math.random() * 9));
                }
                return $ranarr.join("");
            }
            $spannum.html(rannum()); //未点击的时候也需要显示一个验证码
            $spannum.on("click", function() { //点击后可以更新验证码
                    $spannum.html(rannum());
                })
                //验证码表单失去焦点进行验证码识别
            $ran.on("blur", function() {
                if ($ran.val() == $spannum.html()) {
                    $ranspan.html("验证码正确");
                    $ranspan.css("color", "green");
                    $ranflag = true;
                } else {
                    $ranspan.html("验证码错误");
                    $ranspan.css("color", "red");
                }
            })


            //密码识别
            $password.on("focus", function() {
                $passwordspan.html("仅支持数字字母下划线12位以内");
                $passwordspan.css("color", "#ccc");
            })
            $password.on("input", function() {
                if ($password.val() !== "") {
                    if ($password.val().length >= 6 && $password.val().length <= 12) {
                        let $uppercase = /[A-Z]/;
                        let $lowcase = /[a-z]/;
                        let $numb = /\d/;
                        let $other = /[^\w]/;
                        let $count = 0; //用来记录符合几个条件来判断密码强度
                        if ($uppercase.test($password.val())) {
                            $count++;
                        }
                        if ($lowcase.test($password.val())) {
                            $count++;
                        }
                        if ($numb.test($password.val())) {
                            $count++;
                        }
                        if ($other.test($password.val())) {
                            $count++;
                        }
                        switch ($count) {
                            case (1):
                                $passwordspan.html("弱");
                                $passwordspan.css("color", "red");
                                break;
                            case (2):
                            case (3):
                                $passwordspan.html("中");
                                $passwordspan.css("color", "orange");
                                $newpass.removeAttr("disabled"); //解禁确认密码输入框
                                $passflag = true;
                                break;
                            case (4):
                                $passwordspan.html("强");
                                $passwordspan.css("color", "green");
                                $newpass.removeAttr("disabled"); //解禁确认密码输入框
                                $passflag = true;
                                break;
                        }
                    } else {
                        $passwordspan.html("请输入正确长度的密码");
                        $passwordspan.css("color", "red");
                    }
                } else {
                    $passwordspan.html("密码不可为空");
                    $passwordspan.css("color", "red");
                }
            })


            //确认密码
            $newpass.on("focus", function() {
                $newpassspan.html("请再次输入密码");
                $newpassspan.css("color", "#ccc");
            })
            $newpass.on("blur", function() {
                if ($newpass.val() !== "") {
                    if ($newpass.val() === $password.val()) {
                        $newpassspan.html("对");
                        $newpassspan.css("color", "green");
                        $newflag = true;
                    } else {
                        $newpassspan.html("密码不一致");
                        $newpassspan.css("color", "red");
                    }
                } else {
                    $newpassspan.html("密码不可为空");
                    $newpassspan.css("color", "red");
                }
            })

            //submit验证
            $("form").submit(function() {
                if ($tel.val() === "") {
                    $telspan.html("电话号码不可为空");
                    $telspan.css("color", "red");
                }
                if ($password.val() === "") {
                    $passwordspan.html("密码不可为空");
                    $passwordspan.css("color", "red");
                }
                if ($ran.val() === "") {
                    $ranspan.html("验证码不可为空");
                    $ranspan.css("color", "red");
                }
                if ($newpass.val() === "") {
                    $newpassspan.html("确认密码不可为空");
                    $newpassspan.css("color", "red");
                }
                if (!$telflag || !$ranflag || !$passflag || !$newflag) {
                    return false;
                }
            });
        }
    }
})