/**
 * Created by DELL on 2017/11/26.
 */
$(function() {

//    获取验证码
//    注册点击事件
    $(".btn_vcode").on("click",function() {

    //   让按钮禁用掉
        var $this =$(this);
        $this.prop("disabled",true).addClass("disabled").text("发送中...");
    //    添加一个定时器
        var count =5;
       // 发送ajax

        $.ajax({
            type:"get",
            url:"/user/vCode",
            success:function(info){
                console.log(info.vCode);

                var timer = setInterval(function() {
                    count --;
                    $this.text(count+"秒后重新发送");

                    if(count === 0){
                        clearInterval(timer);
                        $this.prop("disabled",false).removeClass("disabled").text("重新发送");

                    }
                },1000)
            }

        });


    })

//    注册用户名

//    给注册按钮注册点击事件
//    校验
//    发送ajax请求

    $(".btn_register").on("click",function(e) {
        //阻止按钮默认行为
        e.preventDefault();

        var username = $("[name = 'username']").val();
        var password = $("[name = 'password']").val();
        var repassword = $("[name = 'repassword']").val();
        var mobile = $("[name = 'mobile']").val();
        var vCode = $("[name = 'vCode']").val();

    //    校验
        if(!username) {
            mui.toast("请输入用户名");
            return false;
        }

        if(!password) {
            mui.toast("请输入密码");
            return false;
        }

        if(repassword != password){
            mui.toast("两次输入的密码不一致");
            return false;
        }

        if(!mobile){
            mui.toast("请输入手机号");
            return false;
        }
        if(! /^1[3,4,5,7,8,9]\d{9}$/.test(mobile)){
            mui.toast("手机格式不正确");
            return false;
        }

        if(!vCode) {
            mui.toast("请输入验证码");
            return false;
        }

    //    发送ajax请求
        $.ajax({
            type:"post",
            url:"/user/register",
            data:{
                username:username,
                password:password,
                mobile:mobile,
                vCode:vCode
            },
            success:function(info){
                console.log(info)

                if(info.error ==403){

                    mui.toast(info.message);
                }

                //if(info.success) {
                //    location.href= "login.html";
                //}
            }
        });
    })
})