/**
 * Created by DELL on 2017/11/26.
 */

$(function() {

//    发送ajax请求 查询用户信息
    $.ajax({
        type:"get",
        url:"/user/queryUserMessage",
        success:function(info){
            console.log(info);

            if(info.error ==400){
                location.href="login.html";
            };

            var html = template("tpl",info);
            $(".mui-media").html(html);
        }
    });

//    点击退出的时候调到login.html
//    注册点击事件
    $(".btn_logout").on("click",function(){
    //    获取ajax请求

        $.ajax({
            type:"get",
            url:"/user/logout",
            success:function(info) {
                //console.log(info);

                if(info.success){
                    location.href ="login.html";
                }
            }
        });
    } )
})