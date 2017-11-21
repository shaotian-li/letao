$(function(){
// 表单校验的功能
// 1.用户名不能为空
// 2. 用户密码不能为空
// 3. 用户密码的长度是6-12位

// 如何使用表单校验插件:
// 1.引包
// 2. 调用bootstrapValidator

var $form = $("form");
$form.bootstrapValidator({
    // 配置校验的规则
    feedbackIcons:{
        valid:" glyphicon glyphicon-ok",
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    // 字段， 你想要校验那些字段
    fields:{
        username:{
            validators:{
                notEmpty:{
                    message: "用户名不能为空"
                },
                stringLength:{
                    min:4,
                    max:10,
                    message:"用户名长度必须在4-10之间"
                },
                callback:{
                    message:"用户名不存在"
                }
            }
        },
        password: {
            validators: {
                notEmpty: {
                    message: "用户密码不能为空"
                },
                stringLength: {
                    min: 6,
                    max: 12,
                    message: "密码长度是6-12位"
                },
                callback:{
                    message:"密码输出错误"
                }
            }
        }
    }

       
})

// 需要给表单注册一个校验成功的事件 success.form.bv
$form.on("success.form.bv",function(e){
    // 阻止浏览器的默认行为
    e.preventDefault();

    // 发送ajax
    $.ajax({
        type:"post",
        url:"/employee/employeeLogin",
        data:$form.serialize(),
        success:function(data){
            
            // 如果成功就跳主页
            if(data.success){
                location.href="index.html";
            }else if(data.error==1000){
                // alert("用户名不存在");

                $form.data("bootstrapValidator").updateStatus("username", "INVALID","callback");
            }else if (data.error==1001){
                // alert("密码错误");
                $form.data("bootstrapValidator").updateStatus("password","INVALID","callback");
            }
        }
    })
})

// 重置功能  重置样式
$(".btn-reset").on("click",function(){
    $form.data("bootstrapValidator").resetForm();
})

});