$(document).ready(function () {
    $("#txt_username").focus(function () {          //用户名文本框失去焦点
        $("#div_msg_username").show();
    }).blur(function () {                           //失去焦点
        var username = $(this).val();
        if (username == null || username == "") {
            $("#div_msg_username").hide();
        } else {
            usernameVerify(username);
            if (!$("#div_msg_username ul li").hasClass("fontred")){
                $.ajax({
                    url:"/user/check",
                    type:"post",
                    data:{username:username},
                    dataType:"json",
                    success:function (data) {
                        if (data.result=="success") {
                            $("#div_msg_username").html("√该用户名可以使用").removeClass("divred fontred").addClass("divgreen fontgreen");
                        }else{
                            $("#div_msg_username").html("×该用户名已经存在").removeClass("divgreen fontgreen").addClass("divred fontred");
                        }
                    },
                    error:function () {
                        alert("联系系统管理员");
                    }
                });
            }
        }
    }).keyup(function () {                          //键盘按键按起
        var username = $(this).val();
        usernameVerify(username);
    }).change(function () {                         //文本内容发生改变
        var username = $(this).val();
        usernameVerify(username);
    });

    $("#pwd_password").focus(function () {
        $("#div_msg_pwd").show();
    }).blur(function () {
        var password = $(this).val();
        if (password == null || password == "") {
            $("#div_msg_pwd").hide();
        } else {
            passwordVerify(password);
            pwStrength(password);
        }
    }).keyup(function () {
        var password = $(this).val();
        passwordVerify(password);
        pwStrength(password);
    }).change(function () {
        var password = $(this).val();
        passwordVerify(password);
        pwStrength(password);
    });

    $("#pwd_repassword").focus(function () {
        $("#div_msg_repwd").show();
    }).blur(function () {
        var repassword = $(this).val();
        if (repassword == null || repassword == "") {
            $("#div_msg_repwd").hide();
        } else {
            repasswordVerify(repassword);
        }
    }).keyup(function () {
        var repassword = $(this).val();
        repasswordVerify(repassword);
    }).change(function () {
        var repassword = $(this).val();
        repasswordVerify(repassword);
    });

    $("#form_register").submit(function () {
        //判断是否存在li元素包含fontred类样式
        var reli = $("li").hasClass("fontred");
        if (reli){
            return false;
        } else {
            return true;
        }
    });
});

/*
用户名验证
 */
function usernameVerify(username) {
    if (username.length < 8 || username.length > 12) {
        $("#div_msg_username").removeClass("divgreen").addClass("divred");
        $("#div_msg_username ul li:first").text("×长度为8-12位").removeClass("fontgreen").addClass("fontred");
    } else {
        $("#div_msg_username").removeClass("divred").addClass("divgreen");
        $("#div_msg_username ul li:first").text("√长度为8-12位").removeClass("fontred").addClass("fontgreen");
    }
    if (/^\w+$/.test(username)) {
        $("#div_msg_username").removeClass("divred").addClass("divgreen");
        $("#div_msg_username ul li:eq(1)").text("√只能使用字母（大小写不限）、数字、下划线").removeClass("fontred").addClass("fontgreen");
    } else {
        $("#div_msg_username").removeClass("divgreen").addClass("divred");
        $("#div_msg_username ul li:eq(1)").text("×只能使用字母（大小写不限）、数字、下划线").removeClass("fontgreen").addClass("fontred");
    }
    if (/^[a-zA-Z]/.test(username)) {
        $("#div_msg_username").removeClass("divred").addClass("divgreen");
        $("#div_msg_username ul li:eq(2)").text("√必须以字母开头").removeClass("fontred").addClass("fontgreen");
    } else {
        $("#div_msg_username").removeClass("divgreen").addClass("divred");
        $("#div_msg_username ul li:eq(2)").text("×必须以字母开头").removeClass("fontgreen").addClass("fontred");
    }
}

/*
密码验证
 */
function passwordVerify(password) {
    if (password.length < 6 || password.length > 10) {
        $("#div_msg_pwd").removeClass("divgreen").addClass("divred");
        $("#div_msg_pwd ul li:first").text("×长度为6-10位").removeClass("fontgreen").addClass("fontred");
    } else {
        $("#div_msg_pwd").removeClass("divred").addClass("divgreen");
        $("#div_msg_pwd ul li:first").text("√长度为6-10位").removeClass("fontred").addClass("fontgreen");
    }
    if (/^\w+$/.test(password)) {
        $("#div_msg_pwd").removeClass("divred").addClass("divgreen");
        $("#div_msg_pwd ul li:eq(1)").text("√只能使用字母（大小写不限）、数字、下划线").removeClass("fontred").addClass("fontgreen");
    } else {
        $("#div_msg_pwd").removeClass("divgreen").addClass("divred");
        $("#div_msg_pwd ul li:eq(1)").text("×只能使用字母（大小写不限）、数字、下划线").removeClass("fontgreen").addClass("fontred");
    }
}

/*
确认密码验证
 */
function repasswordVerify(repassword) {
    var flag = true;
    if (repassword != $("#pwd_password").val()) {
        $("#div_msg_repwd").removeClass("divgreen").addClass("divred");
        $("#div_msg_repwd ul li:first").text("×必须与密码保持一致").removeClass("fontgreen").addClass("fontred");
        flag = false;
    } else {
        $("#div_msg_repwd").removeClass("divred").addClass("divgreen");
        $("#div_msg_repwd ul li:first").text("√必须与密码保持一致").removeClass("fontred").addClass("fontgreen");
        flag = true;
    }
    return flag;
}

/*
密码强度验证
 */

//判断输入密码的类型
function CharMode(iN) {
    if (iN >= 48 && iN <= 57) //数字
        return 1;
    if (iN >= 65 && iN <= 90) //大写
        return 2;
    if (iN >= 97 && iN <= 122) //小写
        return 4;
    else
        return 8;
}

//bitTotal函数
//计算密码模式
function bitTotal(num) {
    var modes = 0;
    for (var i = 0; i < 4; i++) {
        if (num & 1)
            modes++;
        num >>>= 1;
    }
    return modes;
}

//返回强度级别
function checkStrong(sPW) {
    if (sPW.length <= 5)
        return 0; //密码太短
    var Modes = 0;
    for (var i = 0; i < sPW.length; i++) {
        //密码模式
        Modes |= CharMode(sPW.charCodeAt(i));
    }
    return bitTotal(Modes);
}

//显示颜色
function pwStrength(pwd) {
    var O_color = "#eeeeee";
    var L_color = "#FF0000";
    var M_color = "#FF9900";
    var H_color = "#33CC00";
    if (pwd == null || pwd == '') {
        var Lcolor = O_color;
        var Mcolor = O_color;
        var Hcolor = O_color;
    } else {
        var S_level = checkStrong(pwd);
        switch (S_level) {
            case 0:
                Lcolor = Mcolor = Hcolor = O_color;
            case 1:
                Lcolor = L_color;
                Mcolor = Hcolor = O_color;
                break;
            case 2:
                Lcolor = Mcolor = M_color;
                Hcolor = O_color;
                break;
            default:
                Lcolor = Mcolor = Hcolor = H_color;
        }
    }
    document.getElementById("strength_L").style.background = Lcolor;
    document.getElementById("strength_M").style.background = Mcolor;
    document.getElementById("strength_H").style.background = Hcolor;
    return;
}
