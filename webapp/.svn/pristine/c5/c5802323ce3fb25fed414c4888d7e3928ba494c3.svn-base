/**
 * 第三方goEasy实现后台实时推送SOS需求
 * */
var goeasy = new GoEasy({
    appkey : 'BC-f8527a61678d424b98c170e4ff70ce37',
    onConnected: function () {
        console.log("成功连接GoEasy。");
    },
    onDisconnected: function () {
        console.log("与GoEasy连接断开。");
    },
    onConnectFailed: function (error) {
        console.log("与GoEasy连接失败，错误编码："+error.code+"错误信息："+error.content);
    }
});

goeasy.subscribe({
    channel : 'sos',
    onMessage : function(result) {
        console.log("You hava a new message: " + result.content);
        if(result.content == 2){
            justify_notifyAPI();
            justify_showMess();
            otification_construct();
            otification_event();
        }
    }
});

/**
 * SOS预警弹框
 * */
//判断浏览器是否支持 Web Notifications API
function justify_notifyAPI(){
    if (window.Notification) {
        // 支持
        console.log("支持"+"Web Notifications API");
    } else {
        // 不支持
        console.log("不支持"+"Web Notifications API");
    }
}
//浏览器是否支持弹出实例
function justify_showMess(){
    // if(window.Notification && Notification.permission !== "denied") {
        Notification.requestPermission(function(status) {
            if (status === "granted") {
                var n = new Notification('新预警:-O', {
                    body: '有新的SOS预警，请注意查看',
                    icon:"../imgs/SOS.png"
                });
                n.onclick = function() {
                    // window.open('framePages/SosWarningList.html');
                    // $('#sosLi').find('a').addClass('liActive');
                    // $('#sosLi').siblings().children("a").removeClass('liActive');
                    $('#contentFrame').removeAttr('src').attr('src','framePages/SosWarningList.html');
                    n.close();
                };
                setTimeout(function() {
                    n.close();
                }, 300000);
                // alert("Hi! this is the notifyMessages!");
            } else{
                var n = new Notification("baby! i will leave you!");
            }

        });
    // }
}
// 实例展示弹出的内容
function otification_construct(){

    /*var notification = new Notification('收到新邮件', {
        body: '您有1封来自雪静的未读邮件。',
        dir: "auto",
        lang:"zh-CN",
        tag: "a1",
        icon:"../../images/headerPic/772513932673948130.jpg"
    });
    console.log(notification.title); // "收到新邮件"
    console.log(notification.body); // "您总共有3封未读邮件。"*/
}
//Notifications API的相关事件
function otification_event(){

    /*var MM = new Notification("Hi! My beautiful little princess！",{
        body: '您有1封来外太空的邮件。',
        icon:"../../images/headerPic/20100114212301-1126264202.jpg"
    });

    MM.onshow = function() {
        console.log('Notification showning!');
    };
    MM.onclick = function() {
        console.log('Notification have be click!');
    };
    MM.onerror = function() {
        console.log('Notification have be click!');
        // 手动关闭
        MM.close();
    };*/
}