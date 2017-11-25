$(function(){

    var currentPage = 1;
    var pageSize = 5;
    var imgs = []
    function rander(){
        $.ajax({
            type:"get",
            url:"/product/queryProductDetailList",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                //console.log(data);
                var html = template("productTpl",data);
                $("tbody").html(html);

                // 渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(data.total / pageSize),
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
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        rander();
                    }
                })
            }
        });
    }
    rander();

    $(".btn_add").on("click",function(){
        $("#productAddModal").modal("show");

    //        发送ajax事件
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                //console.log(info)
               $(".dropdown-menu").html(template("productTpl2",info));
            }
        });
    })

     //给下拉框所有a注册点击事件（委托事件）
    $(".dropdown-menu").on("click","a",function(){
        $(".dropdown_text").text($(this).text());
    //    获取当前a的id值，赋值给brandId
        $("[name='brandId']").val($(this).data("id"));

    //    手动吧brandId改成功
        $("form").data("bootstrapValidator").updateStatus("brandId","VALID");
    });


     //获取图片初始化
    $("#fileupload").fileupload({
        dataType:"json",
        done:function(e,data){
            //console.log(data);
            //console.log(data.result);

            if(imgs.length===3){
                return false;
            }
            $(".img_second_box").append('<img src="'+data.result.picAddr+'" width="100" height="100" alt="">');

            imgs.push(data.result);

            if(imgs.length === 3){
                $("form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
            }else{
                $("form").data("bootstrapValidator").updateStatus("brandLogo","INVALID");
            }

        }
    })

     //表单校验插件
    $("form").bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:"输入二级分类名称"
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:"商品名称不能为空"
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "商品描述不能为空"
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: "商品库存不能为空"
                    },
                    //正则表达式
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:"请输入合法的库存"
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "商品价格不能为空"
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "商品原价不能为空"
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: "商品尺码不能为空"
                    },
                    //    正则表达式
                        regexp:{
                            regexp:/^\d{2}-\d{2}$/,
                            message:"请输入合法的尺码,例如(32-46)"
                        }
                },

            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传三张图片"
                    }
                }
            }
        }
    });

     $("form").on('success.form.bv', function (e) {

         e.preventDefault();

         var param = $("form").serialize();

         param += "&picName" +imgs[0].picName + "&picAddr" +imgs[0].picAddr;
         param += "&picName" +imgs[1].picName + "&picAddr" +imgs[1].picAddr;
         param += "&picName" +imgs[2].picName + "&picAddr" +imgs[2].picAddr;
         //使用ajax提交逻辑
         $.ajax({
             type:"post",
             url:"/product/addProduct",
             data:param,
             success:function(data){
                 if(data.success){
                     $("#productAddModal").modal("hide");
                     //重新渲染第一页
                     currentPage =1;
                     rander();
                 //    清空内容和样式
                     $("form")[0].reset();
                     $("form").data("bootstrapValidator").resetForm();

                 //    重置下拉框
                     $(".dropdown_text").text("输入二级分类名称");
                     $("[name='brandId']").val("");

                     $(".img_second_box img").remove();
                     imgs=[];
                 }
             }
         });
     });
})