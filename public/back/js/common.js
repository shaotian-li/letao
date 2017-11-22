$(function() {
    // 禁用进度环
    NProgress.configure({ showSpinner: false });
   

    // 在ajax开启请求之前，让进度条显示
    // $(window).ajaxStart(function(){
    //     // console.log(111);
    //    
    // 开启进度条
    // NProgress.start();
    // });

    $(document).ajaxStart(function () {
        // console.log("ajaxStart在开始一个ajax请求时触发");
         // 开启进度条
        NProgress.start();
    });
    // 在ajax关闭请求之后，让进度条关闭
    $(window).ajaxStart(function(){
        // console.log(222);
        // 关闭进度条
        NProgress.done();
    });
  
    // 非登录页面 判读用户是否登录了 如果登录了就继续 如果没有登录就跳到 login.html

    if(location.href.indexOf("login.html")== -1){
        $.ajax({
            type:"get",
            url:"/employee/checkRootLogin",
            success:function(data){
                console.log(data);
              if(data.error == 400){
                  location.href ="login.html";
              }
            }
        })
    }


    //侧边栏二级菜单显示隐藏
    $(".child").prev().on("click",function(){
        $(this).next().slideToggle();
    });

    // 侧边栏显示隐藏
    $(".icon-menu").on("click",function(){
        $(".lt_aside").toggleClass("now");
        $(".lt_section").toggleClass("now");
    });


    // 退出功能
    $(".icon_logout").on("click",function(){
        $("#logoutModal").modal("show");
    });

    // 给退出按钮注册退出事件
    $(".btn_logout").on("click",function(){
        // 发送ajax 退出系统
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            success:function(data){
                console.log(data);
                if(data.success==true){
                    location.href="login.html"
                }
            }
        })
    })

});