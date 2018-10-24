/**
/**
 * Created by zxm on 2017/12/01.
 * phoneNum 15313337875
 * new Project
 * details:
 *      -----项目对象：客服&&合伙人 后台系统  分配权限
 *      -----插件包含：基础类：jQuery/bootstrap
 *                    表格：dataTables
 *                    画图：eCharts
 *                    美化： 日期:jeDate 弹框:layer
 *                    功能类： jqueryForm/template/sWiper
 *      -----布局：flex c3-animation&transform
 *      -----IDE:webStorm11  nodeJs git npm bower
 *      -----兼容：chrome fireFox opera safari   IE普通支持，大屏展示系统不支持 建议用户使用Chrome浏览器
 *
 */
/**
 * 鼠标悬浮用户名显示修改密码
 * 鼠标移入 显示
 * 鼠标移除 定时器开启 0.5s后关闭
 * */
var timer=null;
$('#userName,#changePwd').on('mouseenter', function () {
    clearTimeout(timer);
    $('#changePwd').fadeIn(1000);
}).on('mouseleave', function () {
    timer=setTimeout(function () {
        $('#changePwd').fadeOut(1000);
    },500);
});
/**
 * 判断用户权限
 * */
if(localStorage.sign == 0){
    $('#contentFrame').removeAttr('src').attr('src','framePages/totalIndex.html');
    $('#indexCity').removeClass('liActive');
}else if(localStorage.sign == 1){
    $('#contentFrame').removeAttr('src').attr('src','framePages/totalIndex.html');
}else if(localStorage.sign == 2  || localStorage.sign == 5){
    $('#contentFrame').removeAttr('src').attr('src','partner/partnerIndex.html');
    $('#indexMain').removeClass('liActive');
}else if(localStorage.sign == 4){
    $('#contentFrame').removeAttr('src').attr('src','partner/partnerIndex.html');
}
// 如果不是合伙人  不显示合伙人消息图标
if(localStorage.sign == 0 || localStorage.sign == 1){
    $('#dadMessage').hide();
}else{  //否则显示
    $('#dadMessage').show();
}

/**
 * 判断是否本地缓存有login&&token
 * 如果有，不变
 * 否则返回登录页
 * */
$.ajax({
    url:global_path + '/cms/user/checkToken',
    type:'post',
    data:{
        "loginId":localStorage.loginId,
        "token":localStorage.token
    },
    dataType:'json',
    success:function (result) {
        checkTokenIndex(result);
        if(result.code == 200){

        }else {
            layer.msg('登陆失效,重新登陆',{
                icon:1,
                time:1000
            });
            setTimeout(function () {
                $("#loginId").val(localStorage.loginId);
                window.location.href = 'login.html';
            },1000)
        }
    }
});

/**
 * 根据用户权限展示nav菜单栏列表
 * */
$.ajax({
    url:global_path + '/cms/user/getResource',
    type:'post',
    dataType:'json',
    data:{
        "loginId":localStorage.loginId,
        "token":localStorage.token
    },
    success:function (res) {
        checkTokenIndex(res);
        if(res.code == 212){
            var needArr = res.data.resource;
            var messageNoReadCount = res.data.messageNoReadCount;
            $('#span').text(messageNoReadCount);
            for (var i = 0; i < needArr.length; i ++){
                if(i == 0){
                    $('.listBox').html($('.listBox').html() + '<li class="navLi" data="'+needArr[i].resourceUrl+'">' +
                        '<a href="javascript:;" class="liActive">'+needArr[i].resourceName+'</a></li>');
                }else {
                    $('.listBox').html($('.listBox').html() + '<li class="navLi" data="'+needArr[i].resourceUrl+'">' +
                        '<a href="javascript:;">'+needArr[i].resourceName+'</a></li>');
                }

            }
        }else {
//            layer.msg('获取菜单失败',{icon:2,time:2000})
        }
    }
});


/**
 * 修改密码
 * 1.点击修改密码modal弹窗出现，点空白处或者esc不退出模态框
 * 2.手机号从本地获取
 * 3.发送验证码
 * 4.新密码核对、校验码核对
 * 5.修改成功/失败
 * */
$('#changePwd').on('click', function () {
    $('#layer-changePwd').modal({backdrop: 'true', keyboard: false});//点击出现模态窗，并且esc,空白点击，不会关闭
});
if(localStorage.username != null){
	var hh = new Date().getHours();
	if(hh<12){
		$('#userName').text("早上好！"+localStorage.username);
	}else if(12<hh<18){
		$('#userName').text("下午好！"+localStorage.username);
	}else if(18<hh<24){
		$('#userName').text("晚上好！"+localStorage.username);
	}
}
$('#userName2').text(localStorage.username);
$('#phoneNum').val(localStorage.phoneNum);
//短信验证
var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
var code = ""; //验证码
$('#sendMsg').click(function () {
    curCount = count;
    var phoneNum=$("#phoneNum").val();//手机号码
    if(phoneNum != ''){
        //设置button效果，开始计时
        $("#sendMsg").attr("disabled", "true");
        $("#sendMsg").text( curCount + "秒后可重新发送");
        InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
        //向后台发送处理数据
        $.ajax({
            url:global_path+'/cms/user/phoneCheck',
            type:'post',
            data:{
                'loginId':localStorage.loginId,
                'token':localStorage.token,
                'phoneNum': phoneNum
            },
            dataType:'json',
            success:function(result){
                checkTokenIndex(result);
                if(result.code == 200){
                    layer.msg(result.msg,{
                        icon:1,
                        time:2000
                    });
//                    var checkNum = result.data.randomNum;
                    changePwd();
                }else{
                    layer.msg(result.msg,{
                        icon:2,
                        time:2000
                    });
                }
            },
            error: function () {
                layer.msg('发送失败，请稍后重试!',{
                    icon:1,
                    time:2000
                });
            }
        });
    }else{
        layer.msg("手机号输入有误！",{
            icon:1,
            time:2000
        });
    }
});
//timer处理函数
function SetRemainTime() {
    if (curCount == 0) {
        window.clearInterval(InterValObj);//停止计时器
        $("#sendMsg").removeAttr("disabled");//启用按钮
        $("#sendMsg").text("重新发送");
        code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
    }
    else {
        curCount--;
        $("#sendMsg").text(curCount + "秒后可重新发送");
    }
}
//修改密码
function changePwd() {
    $('#enterBtn').fadeIn(1000);
    $('#enterBtn').on('click',function () {
        var pwd1 = $('#newPassWord1');
        var pwd2 = $('#newPassWord2');
        if(pwd1.val() != pwd2.val()){
            layer.msg('您输入的密码不一致!',{
                icon:2,
                time:2000
            });
            pwd1.val('');
            pwd2.val('');
        }else{
                if(/^[\w]{6,16}$/.test(pwd1.val())){
                    $.ajax({
                        url:global_path+'/cms/user/updatePassword',
                        type:'post',
                        data:{
                            'loginId':localStorage.loginId,
                            'token':localStorage.token,
                            'newPassword': pwd1.val(),
                            'code':$('#countCode').val(),
                            'phoneNum':$('#phoneNum').val()
                        },
                        dataType:'json',
                        success:function(result){
                            checkTokenIndex(result);
                            //console.log(result.code);
                            if(result.code == 2001){
                                layer.confirm('修改成功，返回登录', {
                                    btn: ['确定'] //按钮
                                },function(){
                                    localStorage.clear();
                                    window.location.href="login.html";
                                });
                            }else{
                                layer.msg(result.msg,{
                                    icon:2,
                                    time:2000
                                });
                                pwd1.val('');
                                pwd2.val('');
                            }
                        }
                    })
                }else {
                    layer.msg('密码违规，按照规则输入',{
                        icon:2,
                        time:2000
                    });
                    pwd1.val('');
                    pwd2.val('');
                }
        }
    });
}
/**
 * 退出登录
 * 成功退出  清除本地缓存
 * */
$('#logout').on('click', function () {
    layer.confirm('是否返回登录', {
        btn: ['确定','取消'] //按钮
    },function(){
        $.ajax({
            url:global_path + '/cms/user/logout',
            type:'post',
            dataType:'json',
            data:{
                'loginId':localStorage.loginId,
                'token':localStorage.token
            },
            success: function (result) {
                checkTokenIndex(result);
                if(result.code == 202){
                    localStorage.clear();
                    window.location.href="login.html";
                }else{
                    window.location.href="login.html";
                }
            }
        })
    },function () {

    });

});

/**
 * 导航栏nav
 * 点击导航做两件事：{1.切换active,2.iframe src跳转到相应页面}
 * 此处click结合html li标签中data属性，data属性的值为需要跳转的界面，操作如下：
 * 1.当前navLi下的a标签添加liActive属性
 * 2.当前被选中标签的所有同胞下的a移除liActive属性
 * 3.iframe的src先移除再添加，链接到该标签的data属性值中（用attr("data")选取属性值）
 * */
$('.listBox').on('click','.navLi',function () {
    $(this).find('a').addClass('liActive');
    $(this).siblings().children("a").removeClass('liActive');
    $('#contentFrame').removeAttr('src').attr('src',''+$(this).attr('data'));
});

// 点击合伙人消息图标，显示页面
$('#dadMessage').click(function(){
    console.log(1);
    $('#contentFrame').removeAttr('src').attr('src','partner/parnterSystemMessage.html');
});
