$(function(){

    var currentPage = 1;
    var pageSize = 5;

   function render(){
       $.ajax({
           type: "get",
           url: "/category/querySecondCategoryPaging",
           data: {
               page: currentPage,
               pageSize: pageSize
           },
           success: function (data) {
            //    console.log(data);
               // if()
               var html = template("secondTpl", data);
               $("tbody").html(html);


               // 渲染分页
               $("#paginator").bootstrapPaginator({
                   bootstrapMajorVersion: 3,
                   currentPage: currentPage,
                   totalPages: Math.ceil(data.total / pageSize),
                   onPageClicked: function (a, b, c, page) {
                       currentPage = page;
                        render();
                   }
               })
           }
       });
   }
   render();

// 添加功能
   $(".btn_add").on("click",function(){
       $("#secondAddModal").modal("show");

    //发送ajax获取一级数据
    $.ajax({
        type:"get",
        url:"/category/queryTopCategoryPaging",
        data:{
            page:1,
            pageSize:999
        },
        success:function(data){
            // console.log(data);

            $(".dropdown-menu").html(template("secondtpl2",data));
        }
    });
   });

    // 给下拉框所有a标签注册点击事件(代理)   
   $(".dropdown-menu").on("click","a",function(){
        // alert(2222);
        // console.log($(this));
        // 设置按钮的内容
       $(".dropdown_text").text($(this).text());

    //    获取当前a的id值 设置给categoryId
    $("[name='categoryId']").val($(this).data("id"));
    // 让categoryId校验成功
    $form.data("bootstrapValidator").updateStatus("categoryId","VALID");

   });

//    初始化图片上传

   $("#fileupload").fileupload({
       dataType:"json",//指定响应的格式
       done:function(e,data){
        //    通过data.result.picAddr可以获取到图片上传后的路径

        //    console.log(data);
        //    console.log(data.result.picAddr);

        //    设置给 img_second_box中img的src属性
           $(".img_second_box img").attr("src",data.result.picAddr);

        //    把图片的地址赋值给brandLogo
        $("[name='brandLogo']").val(data.result.picAddr);

        // 吧brandLogo改成成功
        $form.data("bootstrapValidator").updateStatus("brandLogo","VALID")
       }
   });

//    表单校验
    var $form = $("form");
    $form.bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields:{
            categoryId:{
                validators:{
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类的名称"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传品牌图片"
                    }
                }
            }    
        }
    });

  
    // 给表单注册校验成功事件
    $form.on("success.form.bv",function(e){
        e.preventDefault();
        console.log($form.serialize());
        // 使用ajax提交逻辑
        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:$form.serialize(),
            success:function(info){
                console.log(info);
                if (info.success) {
                    $("#secondAddModal").modal("hide");

                    // 重新渲染第一页
                    currentPage = 1;
                    render();

                    // 清空内容和样式
                    $form[0].reset();
                    $form.data("bootstrapValidator").resetForm();

                    // 重置下拉框组件和图片
                    $(".dropdown_text").text("请选择一级分类");
                    $(".img_second_box img").attr("src","./images/none.png");
                    $("[name='categoryId']").val("");
                    $('[name="brandLogo"]').val("");
                }
            }
        });
    })


})