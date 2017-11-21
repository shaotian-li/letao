$(function() {
    // 禁用进度环
    NProgress.configure({ showSpinner: false });
   

    // 在ajax开启请求之前，让进度条显示
    $(window).ajaxStart(function(){
        console.log(111);
        // 开启进度条
        NProgress.start();
    });

    // 在ajax关闭请求之后，让进度条关闭
    $(window).ajaxStart(function(){
        console.log(222);
        // 关闭进度条
        NProgress.done();
    });
  
});