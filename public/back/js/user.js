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
                    itemTexts:function(type,page,current){
                        //console.log(type);
                        switch (type){
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "尾页";
                            case "page":
                                return page;
                        }

                    },
                    tooltipTitles:function(type,page,current){

                    },
                    onPageClicked:function(a,b,c,page){
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

        // 获取id
        var id = $(this).parent().data("id");

        var isDelete = $(this).hasClass("btn-danger")?0:1; 

        // 给确定按钮注册一个点击事件
        $(".btn_user").off().on("click",function(){
            
            // 发送ajax请求
            $.ajax({
                type:"post",
                url:"/user/updateUser",
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function(data){
                    // console.log(data);
                    if (data.success==true){
                        $("#userModal").modal("hide");
                        reader();
                    }
                }
            });
        })
    })
});

