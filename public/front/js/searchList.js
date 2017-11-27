/**
 * Created by DELL on 2017/11/25.
 */
$(function () {

    var page = 1;
    var pageSize = 100;

//    获取地址栏的参数，设置个 lt_btn_search

    var key = tools.getSearch("key");
    $(".lt_btn_search").val(key);

    //页面加载需要渲染一次
    render();

//    点击按钮 需要渲染一次
    $(".search-btn").on("click", function () {

        // 点击按钮的时候，把所有的anow清除把所有span都向下
        $(".lt_order a").removeClass("now").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
        render()
    })

//    点击排序的时候
    $(".lt_order [data-type]").on("click", function () {

        if ($(this).hasClass("now")) {
            $(this).find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        } else {
            $(this).addClass("now").parent().siblings().child().removeClass("now");
            $(".lt_order span").removeClass("fa-angle-up").addClass("fa-angle-down");
        }
        render();
    })


//    发送ajax请求，获取对应的商品的数据，渲染到页面中
    function render() {
        //这个对象是用来设置参数列表的
        var param = {};
        param.page = page;
        param.pageSize = pageSize;
        //    设置proName这个参数
        param.proName = $(".lt_btn_search").val().trim();


        //    设置 price或者num
        //    获取lt_order 下有nnot这个类的a标签的type属性
        //    如果选中了排序 type能够取到price或者num，如果是underfind,说明没有排序-[=-
        var $now = $(".lt_order a.now");
        if ($now.length > 0) {
            var type = $now.data("type")
            var value = $now.find("span").hasClass("fa-angle-down") ? 2 : 1;
            //console.log(value);

            param[type] = value;
        }

        $.ajax({
            //    发送ajax
            type: "get",
            url: "/product/queryProduct",
            data: param,
            success: function (info) {
                console.log(info);
                $(".lt_product").html(template("tpl", info))
            }
        });
    }
})