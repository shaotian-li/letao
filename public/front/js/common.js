/**
 * Created by DELL on 2017/11/24.
 */
mui('.mui-scroll-wrapper').scroll({
    //deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false,//不显示滚动条
});

var gallery = mui('.mui-slider');
gallery.slider({
    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});


//function getSearchObj(){
////    获取地址栏参数，封装成一个对象  {name:"zs", age:18, desc:"呵呵呵"}
//    var search = location.search;
////    对search字符串进行解码
//    search = decodeURI(search);
////    去除 ？  name =zs&age=18&desc=呵呵呵
//    search = search.slice(1);
////    把search切割成一个数组 从&切 ["name=zs","age=18","desc=呵呵呵"]
//    var arr = search.split("&")
//
//    var obj ={};
//
////    遍历数组
//    arr.forEach(function(v) {
//        var key = v.split("=")[0];
//        var value = v.split("=")[1];
//        obj[key] = value;
//    });
//    return obj;
//}
//function getSearch(key){
//    return this.getSearchObj()[key];
//}

var tools ={
    getSearchObj:function() {
    //    获取地址栏的参数封装成一个对象
        var search = location.search;
    //    对search进行解码
        search =decodeURI(search);
    //    去掉 ？
        search = search.slice(1);
    //    转成数组
        var arr = search.split("&");

    //    创建一个空对象
        var obj ={};
    //    遍历数组
        arr.forEach(function(v){
            var key =v.split("=")[0];
            var value =v.split("=")[1];
            obj[key] =value;
        })
        return obj;
    },
    getSearch:function(key) {
        return this.getSearchObj()[key];
    }
}