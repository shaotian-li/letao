$(function(){
    var currentPage = 1;
    var pageSize = 5;

    function reader() {
        // 发送ajax请求
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page: currentPage,
                pageSize:pageSize
            },
            success:function(info){
                console.log(info);
                var html = template("usertpl",info);
                $("tbody").html(html);

                // 渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages:Math.ceil(info.total /pageSize),
                    // totalPages:10
                    onPageChlicked(a,b,c,page){
                        currentPage = page;
                        reader();
                    }
                })
            }
        });   
    }
    reader();
    // 启动禁用功能
    $("tbody").on("click",".btn",function(){
        $("#userModal").modal("show");
    })
});