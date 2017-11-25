/**
 * Created by DELL on 2017/11/24.
 */
$(function() {

    //一级分类
    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        success:function(data){
            console.log(data);
            $(".lt_cateLeft").html(template("barsTpl",data));
            //渲染二级
            render(data.rows[0].id)
        }



    });

      //    渲染二级分类
    function render(id){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategory",
            data:{
                id:id
            },
            success:function(info){
                console.log(info);
                $(".lt_cateRight").html(template("barsTpl2",info));

            }
        });
    }

//    给一级类在注册点击事件
    $(".lt_cateLeft").on("click","li",function(){
        $(this).addClass("now").siblings().removeClass("now");

        var id = $(this).data("id");

        render(id);
        mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,500);
    })
})