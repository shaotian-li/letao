/**
 * Created by DELL on 2017/11/26.
 */

$(function() {

//    先去地址栏获取到id
    var productId = tools.getSearch("productId");
    console.log(productId)
    //ajax请求数据
    $.ajax({
        type:"get",
        url:"/product/queryProductDetail",
        data:{
            id:productId
        },
        success:function(info){
            console.log(info);

            //var html = template("tpl",info);
            $(".mui-scroll").html(template("tpl",info));

            //初始化轮播图
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
            });

            //    当点击span的时候给添加一个now其他清除
            $(".mui-scroll").on("click",".btn_span",function() {
                $(this).addClass("now").siblings().removeClass("now");
            })
            //重置 数量点击
            mui(".mui-numbox").numbox()
        }
    });


//    添加购物车
    $(".btn_add_cart").on("click",function() {

    //    获取尺码
        var size = $(".lt_size span.now").text();
        if(!size){
            mui.toast("请选择尺码");
            return false;
        }
    //    获取数量
        var num = $(".mui-numbox-input").val();
        console.log(num);

    //  ajax
        $.ajax({
            type:"post",
            url:"/cart/addCart",
            data:{
                productId:productId,
                num:num,
                size:size
            },
            success:function(info){
                console.log(info);
                //如果没登录 就跳转到 login.html
                if(info.success){
                    mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function(e){
                        if(e.index == 0){
                            location.href ="cart.html";
                        }
                    })
                }
                if(info.error == 400){
                    location.href="login.html?retUrl="+location.href;
                }
            }
        });

    })
})