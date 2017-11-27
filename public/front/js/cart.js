/**
 * Created by DELL on 2017/11/27.
 */


$(function () {
    //下拉刷新菜单
    mui.init({
        pullRefresh: {
            container: ".mui-scroll-wrapper",
            down: {
                auto: true,
                callback: function () {
                    //获取ajax数据
                    $.ajax({
                        type: "get",
                        url: "/cart/queryCart",
                        success: function (info) {
                            console.log(info);
                            setTimeout(function () {


                                if (info.error == 400) {
                                    location.href = "login.html?retUrl=" + location.href;
                                }
                                var html = template("tpl", {list: info});
                                //console.log(html);

                                $(".mui-table-view").html(html);

                                //    结束刷新
                                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                            }, 1000)
                        }
                    });
                }
            }

        }
    })

//    注册删除点击事件(委托事件 )
    $(".mui-table-view").on("tap", ".btn_delete", function () {

        var id = $(this).data("id");
        //console.log(id);

        mui.confirm("你确定要删除这件商品吗", "温馨提示", ["是", "否"], function (e) {

            if (e.index === 0) {
                //    根据ajax获取数据
                $.ajax({
                    type: "get",
                    url: "/cart/deleteCart",
                    data: {
                        id: [id]
                    },
                    success: function (info) {
                        console.log(info);

                        if (info.success) {
                            //当删除成功 重新下拉
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                });
            }
        })
    });

//    修改商品

    // 修改按钮注册点击事件
    $(".mui-table-view").on("tap", ".btn_alter", function () {

        var data = this.dataset;
        //console.log(data);

        //html中会有很多的换行,把html这个字符串中所有的\n替换成""
        var html = template("tpl2", data);
        html = html.replace(/\n/g, "");


        mui.confirm(html, "编辑商品", ["确认", "取消"], function (e) {
            if (e.index === 0) {

                var id = data.id;
                var num = $(".mui-numbox-input").val();
                var size = $(".lt_size span.now").text();

                $.ajax({
                    type: "post",
                    url: "/cart/updateCart",
                    data: {
                        id: id,
                        size: size,
                        num: num
                    },
                    success: function (info) {
                        console.log(info);
                        if(info.success){
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                });
            }
        })
        //给span 注册点击事件
        $(".lt_size span").on("tap",function() {
            $(this).addClass("now").siblings().removeClass("now");
        })
        mui(".mui-numbox").numbox();
    })


//    计算总金额

//   给checkbox注册点击事件

    $("body").on("click",".lt_check",function() {
        var total = 0;
        $(":checked").each(function() {
            var price =$(this).data('price');
            var num = $(this).data("num");

            total += price * num;
        });

        $(".lt_cart span").text(total.toFixed(2));
    })
})