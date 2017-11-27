/**
 * Created by DELL on 2017/11/26.
 */
$(function() {

    $(".mui-btn-primary").on("click",function() {
       var username = $("[name='username']").val().trim();
       var password = $("[name='password']").val().trim();

    //    校验
        if(!username) {
            mui.toast("请输入用户名");
            return false;
        };

        if(!password) {
            mui.toast("请输入密码");
            return false;
        }

    //    请求ajax
        $.ajax({
            type:"post",
            url:"/user/login",
            data:{
                username:username,
                password:password
            },
            success:function(info){

                console.log(info);
                //    登录成功
                if(info.success) {

                    var search = location.search;
                    if (search.indexOf("retUrl") != -1) {
                        //说明需要回跳
                        search = search.replace("?retUrl=", "");
                        location.href = search;
                    }else{
                    //    跳到个人中心
                        location.href = "user.html";
                    }
                }
            //    登录失败
                if(info.error===403){
                    mui.toast(info.message);
                }
            }


        });
    })
})