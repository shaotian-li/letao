$(function () {

    var currentPage = 1;
    var pageSize = 5;

    function render() {
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){
                // console.log(info);
                var html = template("firstTpl",info);
                $("tbody").html(html);

                // 渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages:Math.ceil(info.total / pageSize),
                    numberOfPages:5,
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                });
            }
        });
    }
    render();

    // 添加功能
    $(".btn_add").on("click",function(){
        $("#firstAddModal").modal("show");
    })

   
    // 校验一级分类
    var $form = $("form");

    // console.log($form);
    $form.bootstrapValidator({
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryName:{
                validators:{
                    notEmpty: {
                        message: "请添加一级分类"
                    }
                }
            }
        }
    });

    // 注册表单校验成功事件
    $form.on("success.form.bv", function (e) {
        // 阻止浏览器的默认行为
        // e.preventDefault();
        console.log($form.serialize());
        // 发送ajax
        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: $form.serialize(),
            success: function (data) {
                // console.log(data);
                if(data.success){
                    $("#firstAddModal").modal("hide");
                    // 重新渲染第一页
                    currentPage = 1;
                    render();

                    // 重置表单的内容以及样式
                    $form.data("bootstrapValidator").resetForm();

                    $form[0].reset();
                }   
            }
        });
    })
})