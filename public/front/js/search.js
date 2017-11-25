/**
 * Created by DELL on 2017/11/25.
 */
//$(function() {
//
////    用户获取lt_search_history对应的值,并且转成一个数组,方便操作
//
//  function getHistory(){
//      // 获取到lt_search_history对应的值,就是一个json字符串
//      var history = localStorage.getItem("lt_search_history") || '[]';
//      //console.log(history);
//
////    应该把获取到的json字符串换成数组
//      var arr = JSON.parse(history);
//      return arr;
//  }
////    渲染数据
//    function render() {
//        var arr = getHistory();
//        console.log(arr);
//        $(".lt_history").html(template("tpl",{arr:arr}))
//    }
//
//    // 约定: lt_search_history
//    //1.渲染搜索列表
//    render();
//
////    2 清空记录
//
////    注册点击事件(委托事件)
//    $(".lt_history").on("click",".lt_empty",function() {
//
//    //    清空ul
//        localStorage.removeItem("lt_search_history");
//    //    重新渲染页面
//        render();
//    });
//
////    点击那个删哪一行
////    给x注册点击事件
////    获取到点击对应的index
////    获取历史记录 得到数据
////    删除数组对应的下标
////    重新设置到缓存里面
////    重新渲染页面
//
//    //1.给x注册点击事件
//    $(".lt_delete").on("click",function(){
//        //alert(222)
//        //3 获取到历史记录 得到数据
//        var arr = getHistory();
//        console.log(arr);
//        //2 获取到点击对应的index
//        var index = $(this).data("index");
//        //console.log(index);
//        //4 删除数组对应的下标
//        arr.splice(index,1);
//
//        //console.log(arr);
//        //console.log(arr.splice(index, 1));
//        //    数组修复好 重新渲染到缓存里面
//        localStorage.setItem("lt_search_history",JSON.stringify(arr));
//
//    //    重新渲染页面
//        render();
//    });
//
////    当点击搜索的时候 输入框输入的东西添加到ul中
////    给按钮注册点击事件
////    获取输入框的内容
////    获取历史记录 得到数据
////    把搜索框添加的传入到最前面
////    重新设置到缓存里
////    重新渲染页面
//    $(".search-btn").on("click",function(){
//       // 获取输入框的内容
//       var key =$(".lt_search").val().trim();
//    //    获取历史记录得到数据
//        var arr = getHistory();
//        //判断如果有重复的就把后面的删掉
//        var index = arr.indexOf(key);
//        if(index != -1){
//            arr.splice(index,1);
//        }
//    //    如果超过十个就把最就的那条记录删除
//        if(arr.length >=10){
//            arr.pop();
//        }
//    //    把搜索框内容传到数组最前面
//        arr.unshift(key);
//        localStorage.setItem("lt_search_history",JSON.stringify(arr));
//        render();
//    })
//})


$(function(){

    function getHistory(){

        var history = localStorage.getItem("lt_search_history") || "[]";

        var arr =JSON.parse(history);

        return arr;
    }

    function render(){
         var arr = getHistory();
        $(".lt_history").html(template("tpl",{arr:arr}))
    }
    //1.渲染
    render();

//   2. 清空记录
//    给清空记录注册点击事件（委托事件）
    $(".lt_history").on("click",".lt_empty",function() {
        mui.confirm("你确定要删除吗","温馨提示",["否","是"],function(e){
            if(e.index===1){
                localStorage.removeItem("lt_search_history");
                render();
            }
        })

    });

//    3 当点击x的时候删除当前一行

//    给x注册点击事件
    $(".lt_delete").on("click",function() {
        var that = this;

        mui.confirm("你确定要删除吗","温馨提示",["否","是"],function(e){
            if(e.index === 1){
                //    获取索引
                var index = $(that).data("index");
                //    获取历史记录 得到数据
                var arr =getHistory();
                console.log(arr);
                //    从数组中删除当前对应的索引号
                arr.splice(index,1);
                console.log(arr);
                //    重新获取到缓存里面
                localStorage.setItem("lt_search_history",JSON.stringify(arr));
                //    重新渲染
                render();
            }

        })

    });

//    给搜索注册点击事件
    $(".search-btn").on("click",function(){
        //alert(222)
    //    获取搜索框的值
        var key = $(".lt_search").val().trim();
        if(key ===""){
            mui.toast("请输入关键字")
            return false;
        }
    //    获取历史记录
        var arr = getHistory();
    //    在增加前判断有没有重复的
        var index  =key;
        if(index != -1){
            arr.splice(index,1);
        }
    //  判断如果超过十个就删除存的最久的数据

        if(arr.length>=10){
            arr.pop();
        }

    //    把新增的添加到最前面
        arr.unshift(key);
    //    重新获取到缓存中
        localStorage.setItem("lt_search_history",JSON.stringify(arr));
    //    重新渲染
        render();

    //    跳转到searchList页面
        location.href ="searchList.html?key=" +key;
    })
})