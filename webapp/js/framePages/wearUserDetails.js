/**
 * 获取url传的参数
 * */
var obj = {};
var url = window.location.search;       //截取"?"以及之后的所有字符串
var str = url.substring(1,url.length);  //去除"?"
var arr = str.split('&');               //根据&分割成数组   ["key=value","name=zxm"]
for(var i = 0; i < arr.length; i ++){
    obj[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
}
// obj.loginId = localStorage.loginId;
// obj.token = localStorage.token;

if(localStorage.sign == '2'){
    $('.mapPointsBtn').css("display","none");
    $('#isAttention').css("display","none");
    $('#updateAge').css("display","none");
    $('#ageNum').css("display","none");
    $('#services').css("display","none");
    $('#isRecord').css("display","none");
}

/**
 * 历史心率血压血氧
 * */
$('#hisData').html('<a target="_blank" href="historyData.html?wearUserId='+obj.wearUserId+'">心率血压血氧</a>');

$('#goHrHistory').on('click',function () {
    window.open("historyData.html?wearUserId="+obj.wearUserId);
});
$('#goBpHistory').on('click',function () {
    window.open("historyData.html?wearUserId="+obj.wearUserId);
});
$('#goBoHistory').on('click',function () {
    window.open("historyData.html?&wearUserId="+obj.wearUserId);
});

/**
 * 查看详情悬浮时
 */
$('#seeDetails').on('mouseover',function () {
    layer.tips('点击可查看设备详情。', $('#seeDetails'), {
        tips: [2, '#3595CC'],
        time: 4000
    });
});
$('#seeDetails').on('mouseout',function () {
    layer.closeAll('tips');
});

//解除绑定
$('#removeBinding').on('click',function () {
    layer.confirm('解除设备后用户将没有设备，服务停止，是否解除？', {
        btn: ['确认','取消'] //按钮
    }, function(){
        //向服务端发送请求
        $.ajax({
            url: global_path + '/cms/device/removeBinding',
            type: 'post',
            dataType: 'json',
            data: obj,
            success: function (res) {
                if(res.code == 200){
                    layer.msg(res.msg, {icon: 1});
                }else{
                    layer.msg(res.msg);
                }
            }
        });
    }, function(){
        layer.msg('已取消',{time:1000});
    });
});

//更换设备
$('#changeDevice').on('click',function () {
        obj.newDeviceId = $('#newDeviceId').val();
        obj.checkCode = $('#checkCode').val();
        $.ajax({
            url: global_path + '/cms/device/changeDevice',
            type: 'post',
            dataType: 'json',
            data: obj,
            success: function (res) {
                if(res.code == 200){
                    layer.msg(res.msg, {icon: 1});
                }else{
                    layer.msg(res.msg);
                }
                $('#addDeal').modal('hide');
            }
        });
});

/**
 * ajax
 * */
$.ajax({
    url:global_path + '/cms/wearUser/selectWearUserInfo',
    type:'post',
    dataType:'json',
    data:obj,
    success:function (res) {
        if(res.code == 200){
            /**
             * 查看详情  跳转设备详情页
             * 需要把deviceId参数带过去
             * */
            $('#seeDetails').html('<a target="_blank" href="deviceDetails.html?deviceId='+res.data.cmsWearUserInfo.deviceId+'">查看详情</a>');

            //资料
            userDeatils(res.data.cmsWearUserInfo);
            //地图
            var arr = res.data.cmsWearUserInfo.location.split(',');
            if(localStorage.sign != '2'){
                nowUserMap(arr);
            }else{
                $('#nowMap').html('<div style="text-align: center;margin-top: 180px;font-size: 18px;">暂未开放定位</div>');
            }
            // nowUserMap(arr);
            //测量数据
            $('#hrTheHighest').text(res.data.healthVo.hrTheHighest);
            $('#hrminimum').text(res.data.healthVo.hrminimum);
            $('#bpTheHighest').text(res.data.healthVo.bpTheHighest);
            $('#bpminimum').text(res.data.healthVo.bpminimum);
            $('#boTheHighest').text(res.data.healthVo.boTheHighest);
            $('#bominimum').text(res.data.healthVo.bominimum);
            //恢复年龄状态
            if(res.data.cmsWearUserInfo.ageSign != ''){
                // $('#updateAge').attr('disabled','disabled').removeClass('.btn-skyBlue');
                $('#ageNum').val(res.data.cmsWearUserInfo.ageSign);
            }
            //用户协议状态
            if(res.data.cmsWearUserInfo.isPass == 0){
                $('#seeService').text("无");
                $('#seeService').off('click');
            }
            if(res.data.cmsWearUserInfo.isPass == 1)$('#seeService').text("待审");
            if(res.data.cmsWearUserInfo.isPass == 2)$('#seeService').text("审核通过");
            if(res.data.cmsWearUserInfo.isPass == 3)$('#seeService').text("审核失败");
            if(res.data.cmsWearUserInfo.serviceImgUrl != "")$("#service-img").attr('src',"https://i.iandun.com:8085/"+res.data.cmsWearUserInfo.serviceImgUrl);

            if(res.data.cmsWearUserInfo.locationShowSign == 1)$('#OpenLocation').text("关闭定位");
            if(res.data.cmsWearUserInfo.locationShowSign == 0)$('#OpenLocation').text("开启定位");

            if(res.data.cmsWearUserInfo.voiceSign == 0)$('#voiceBtn').text("关闭语音");
            if(res.data.cmsWearUserInfo.voiceSign == 1)$('#voiceBtn').text("开启语音");
        }else {
            layer.msg(res.msg,{
                icon:2,
                time:2000
            })
        }
    }
});

/**
 * 加载用户详情
 * */
function userDeatils(data){
    /*part1*/
    $('#addressInfo').text(data.addressInfo);
    if(data.username != '' && localStorage.sign == 2){
        // debugger;
        var arr = data.username.split('');
        var str = arr.splice(1,1,"*");
        arr = arr.join('');
        $('#username').text(arr);
    }else {
        $('#username').text(data.username);
    }

    if(data.gender == 1){
        $(".headImg").remove('src').attr('src','../../imgs/iframeImgs/u10.png');
    }else{
        $(".headImg").remove('src').attr('src','../../imgs/iframeImgs/u20.png');
    }
    data.gender == 1 ? data.gender = '男' : data.gender = '女';
    $('#gender').text(data.gender);
    $('#age').text(data.age);
    if(localStorage.sign == '2'){
        $('#idCard').text(data.idCard.substring(0,12)+'******');
    }else{
        $('#idCard').text(data.idCard);
    }
    $('#medicalHistory').text(data.medicalHistory);
    $('#alarmCount').text(data.alarmCount);
    $('#lastAlarmTime').text(data.lastAlarmTime);
    $('#phoneNum').text(data.phoneNum);
    $('#occupation').text(data.occupation);
    if(data.isInsurance == 1){
        $('#isInsurance').css('display','inline-block');
    }else{
        $('#isInsurance').css('display','none');
    }
    if(data.isVip == 1){
        $('#isVip').css('display','inline-block');
    }else{
        $('#isVip').css('display','none');
    }
    if(data.isAttention == 2){
        $('#isAttention').text('取消关注');
    }else {
        $('#isAttention').text('关注');
    }
    $('#remark').text(data.remark);
    /*part2*/
    if(data.binder != null && data.binder != ''){
        if(data.binder[0].id != '' && localStorage.sign == 2 ){
            var numArr = data.binder[0].id.split('');
            var numStr = numArr.splice(3,4,'*','*','*','*');
            numArr = numArr.join('');
            $('#id').text(numArr);
        }else {
            $('#id').text(data.binder[0].id);
        }
        $('#id').attr("href","appUserDetails.html?appUserId="+data.binder[0].id).css('color','#337ab7');
        $('#nickName').text(data.binder[0].nickName);
        $('#username2').text(data.binder[0].username);
        $('#emergencyPeople').text(data.emergencyPeople);
        $('#emergencyPhone').text(data.emergencyPhone);
    }
    /**
     * 旋转
     * */
    var rotate = 0;
    $('#runCircle').on('click',function () {
        rotate = rotate + 90;
        $('#service-img').css({"transform":"rotate("+(rotate)+"deg)"});
    });

    /*查看全部绑定*/
    for(var i = 0; i < data.binder.length; i ++){
        if(localStorage.sign == 2){
            var num1 = data.binder[i].id.split('');
            var num2 = num1.splice(3,4,'*','*','*','*');
            num1 = num1.join('');
        }else {
            var num1 = data.binder[i].id;
        }

        $('#allUsers').html($('#allUsers').html() + '<div class="row"><div class="col-sm-4">账号:<a href="appUserDetails.html?appUserId='+num1+'" target="_blank" >'+num1+'</a></div>' +
            '<div class="col-sm-4">账户昵称:'+data.binder[i].username+'</div><div class="col-sm-4">' +
            '与佩戴人关系:'+data.binder[i].nickName+'</div></div><hr/>');
    }
    /*查看历史佩戴设备*/
    for(var i = 0;i < data.historyWear.length; i++){
        var removeBindingTime = data.historyWear[i].removeBindingTime == null ? '无':data.historyWear[i].removeBindingTime;
        var bindingTime = data.historyWear[i].bindingTime == null ? '无':data.historyWear[i].bindingTime;
        $('#allHistoryWear').html($('#allHistoryWear').html()+'<div class="dis2"><div class="">设备ID：<a href="deviceDetails.html?deviceId='+data.historyWear[i].deviceId+'"target="_blank">'+data.historyWear[i].deviceId+'</a></div>'
        +'<div class="">绑定时间：'+bindingTime+'</div><div class="">解绑时间：'+removeBindingTime+'</div></div>');
    }
    /*part3  地址*/
    $('#address').text(data.address);
    /*part4*/
    data.waySign == 1? data.waySign = '租赁' : data.waySign = '购买';
    $('#waySign').text(data.waySign);
    data.deviceVersion == 1? data.deviceVersion = '安顿一代' : data.deviceVersion = '安顿二代';
    $('#deviceVersion').text(data.deviceVersion);
    $('#serviceResidue').text(data.serviceResidue);
    $('#serviceStartTime').text(data.serviceStartTime.slice(0,10));
    $('#serviceEndTime').text(data.serviceEndTime.slice(0,10));
    $('#deviceId').text(data.deviceId);
    $('#deviceId').attr("href","deviceDetails.html?deviceId="+data.deviceId).css("font-weight","1000");
    $('#sIMPhoneNum').text(data.sIMPhoneNum == '' ? '无':data.sIMPhoneNum);
    $('#electricQuantity').text(data.electricQuantity+"%");
}

/**
 * 查看全部绑定
 * */
$('#seeAll').on('click',function () {
    $('#layer').modal({backdrop: 'true', keyboard: false});//点击出现模态窗，并且esc,空白点击，不会关闭
});
/**
 * 处理用户协议
 */
$('#seeService').on('click',function () {
    $('#service').modal({backdrop: 'true', keyboard: false});//点击出现模态窗，并且esc,空白点击，不会关闭
});

/**
 * 更换设备模态框
 */
$('#toChangeDevice').on('click',function () {
    $('#addDeal').modal({backdrop: 'true', keyboard: false});//点击出现模态窗，并且esc,空白点击，不会关闭
});

/**
 * 填写备注模态框
 */
$('#clickRemark').on('click',function(){
    $('#addRemark').modal({backdrop: 'true', keyboard: false});//点击出现模态窗，并且esc,空白点击，不会关闭
});
/**
 * 历史佩戴模态框
 */
$('#seeHistoryWear').on('click',function(){
    $('#historyWear').modal({backdrop: 'true', keyboard: false});//点击出现模态窗，并且esc,空白点击，不会关闭
});


/*
客服审核用户协议是否通过
 */
function pass(sign){
    $.ajax({
        url:global_path+'/cms/wearUser/updataServiceAgreementSign',
        type:'post',
        dataType:'json',
        data:{
            "loginId": localStorage.loginId,
            "token": localStorage.token,
            "wearUserId": obj.wearUserId,
            "sign":sign,
        },
        success:function(res){
            if(res.code == 200){
                layer.msg(res.msg,{
                    icon:6,time:2000
                });
                if(res.data.sign == 2)$('#seeService').text("审核通过");
                if(res.data.sign == 3)$('#seeService').text("审核失败");

            }else{
                layer.msg(res.msg,{
                    icon:5,time:2000
                });
            }
            $('#service').modal('hide');

        }
    })
}


/**
 * 开启/关闭定位
 */
$('#OpenLocation').on('click',function(){
    $.ajax({
        url:global_path + '/cms/device/isOpenLocation',
        type:'post',
        dataType:'json',
        data:{
            "loginId": localStorage.loginId,
            "token": localStorage.token,
            "deviceId": $('#deviceId').text()
        },
        success:function (res) {
            if(res.code == 200){
                layer.msg(res.msg,{
                    icon:6,time:2000
                });
                if(res.data.locationShowSign == 1)$('#OpenLocation').text("关闭定位");
                if(res.data.locationShowSign == 0)$('#OpenLocation').text("开启定位");
            }else {
                layer.msg(res.msg,{
                    icon:5,time:2000
                });
            }
        }
    });
});
/**
 * 更新定位
 */
$('#updateLocation').on('click',function () {
    $.ajax({
        url:global_path + '/cms/wearUser/setLocationQuerySG',
        type:'post',
        dataType:'json',
        data:{
            "loginId": localStorage.loginId,
            "token": localStorage.token,
            "deviceId": $('#deviceId').text()
        },
        success:function (res) {
            if(res.code == 200){
                layer.msg(res.msg,{
                    icon:6,time:2000
                },function () {
                    location.reload();
                });
            }else {
                layer.msg(res.msg,{
                    icon:5,time:2000
                });
            }
        }
    });
});
/**
 * 关注
 * */
$('#isAttention').on('click',function () {
    var type;
    if($('#isAttention').text() == '关注'){
        type = 2;
    }else {
        type = 1;
    }
    $.ajax({
        url:global_path + '/cms/device/addDeviceToAttention',
        type:'post',
        dataType:'json',
        data:{
            "loginId": localStorage.loginId,
            "token": localStorage.token,
            "wearUserId": obj.wearUserId,
            "type": type
        },
        success:function (res) {
            if(res.code == 200){
                layer.msg(res.msg,{
                    icon:1,time:2000
                });
                if(type == 1){
                    $('#isAttention').text('关注');
                }else {
                    $('#isAttention').text('取消关注');
                }
            }else {
                layer.msg(res.msg,{
                    icon:2,time:2000
                });
            }
        }
    });
});
/**
 * 恢复年龄
 * */
$('#updateAge').on('click',function () {
    obj.ageNum = $('#ageNum').val();
    $.ajax({
        url: global_path + '/cms/wearUser/updateAgeSign',
        type:'post',
        dataType:'json',
        data:obj,
        success:function (res) {
            if(res.code == 200){
                // $('#updateAge').attr('disabled','disabled');
                $('#ageNum').val(obj.ageNum);
                layer.msg(res.msg,{icon:6,time:2000});
            }else {
                layer.msg(res.msg,{icon:5,time:2000});
            }
        }

    })
});


/**
 * 设置已回访
 */
$('#isRecord').on('click',function () {
    $.ajax({
        url: global_path + '/cms/wearUser/updateIsRecord',
        type:'post',
        dataType:'json',
        data:obj,
        success:function (res) {
            if(res.code == 200){
                // $('#updateAge').attr('disabled','disabled');
                $('#ageNum').val(obj.ageNum);
                layer.msg(res.msg,{icon:6,time:2000});
            }else {
                layer.msg(res.msg,{icon:5,time:2000});
            }
        }

    })
});

/**
 * 确认添加备注
 */
$('#makeRemarkSure').on('click',function(){
    if($('#remarkVal').val() == null || $('#remarkVal').val() == ''){
        layer.msg('请填写备注',{time:2000});
        return;
    }
    obj.remark = $('#remarkVal').val();
    $.ajax({
        url: global_path + '/cms/wearUser/addRemark',
        type:'post',
        dataType:'json',
        data:obj,
        success:function (res) {
            if(res.code == 200){
                $('#addRemark').modal('hide');
                $('#remark').text($('#remarkVal').val());
                layer.msg(res.msg,{icon:6,time:2000});
            }else {
                layer.msg(res.msg,{icon:5,time:2000});
            }
        }

    })
})


/**
 * 开启或关闭语音播报
 */
$('#voiceBtn').on('click',function () {
    $.ajax({
        url: global_path + '/cms/wearUser/updateVoiceSign',
        type:'post',
        dataType:'json',
        data:obj,
        success:function (res) {
            if(res.code == 200){
                layer.msg(res.msg,{icon:6,time:2000});
                if(res.data.sign == 1){$('#voiceBtn').text("开启语音");}
                if(res.data.sign == 0){$('#voiceBtn').text("关闭语音");}
            }else {
                layer.msg(res.msg,{icon:5,time:2000});
            }
        }

    })
});
/**
 * 实时地图
 * */
function nowUserMap(center) {
    var map = new AMap.Map("nowMap", {
        mapStyle: 'amap://styles/931a01b82d0445641683eaf454f13b15', //style url  ||开发者key和ID绑定
        resizeEnable: true,
        center: [116.368904, 39.923423],//地图中心点
        zoom: 10 //地图显示的缩放级别
    });
//添加点标记，并使用自己的icon
    new AMap.Marker({
        map: map,
        position: center,
        icon: new AMap.Icon({
            size: new AMap.Size(40, 50),  //图标大小
            image: "../../imgs/iframeImgs/nowMap.png",
            imageOffset: new AMap.Pixel(0, 0)
        })
    });
    map.setFitView();
}
/**
 * 轨迹地图
 * */
var str;
$.ajax({
    url:global_path + '/cms/wearUser/selectLocationPath',
    type:'post',
    dataType:'json',
    data:obj,
    success:function (res) {
        str = res.data.res;
        // loadMapPoints(res.data.res)
    }
});
$('.mapPointsBtn').on('mouseenter',function () {
    $('.mapPoints').fadeIn(1000);
    loadMapPoints();
}).on('mouseleave',function () {
    // $('.mapPoints').fadeOut(1000);
});
$('.mapPoints').on('mouseenter',function () {
    $('.mapPoints').css('display','block');
}).on('mouseleave',function () {
    $('.mapPoints').fadeOut(1000);
});
function loadMapPoints() {
    //创建地图
    var map = new AMap.Map('mapPoints', {
        mapStyle: 'amap://styles/931a01b82d0445641683eaf454f13b15', //style url  ||开发者key和ID绑定
        resizeEnable: true,
        zoom:11,
        center: [116.397428, 39.90923],
        icon: new AMap.Icon({
            size: new AMap.Size(40, 50),  //图标大小
            image: "../../imgs/iframeImgs/nowMap.png",
            imageOffset: new AMap.Pixel(0, 0)
        })
    });
    if(str == null || str == undefined){
        return;
    }
    var arr = str.split(';');
    var timeArr = [];
    var needArr = [];
    for(var i = 0; i < arr.length; i ++){
        timeArr.push(arr[i].split(',')[0].substring(0,2)+':'+arr[i].split(',')[0].substring(2,4)+':'+arr[i].split(',')[0].substring(4,6));
        needArr.push([arr[i].split(',')[1],arr[i].split(',')[2]]);
    }

    //创建地图
    AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(PathSimplifier, $) {

        if (!PathSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！');
            return;
        }

        var pathSimplifierIns = new PathSimplifier({
            zIndex: 100,
            //autoSetFitView:false,
            map: map, //所属的地图实例

            getPath: function(pathData, pathIndex) {

                return pathData.path;
            },
            getHoverTitle: function(pathData, pathIndex, pointIndex) {

                if (pointIndex >= 0) {
                    //point
                    return pathData.time[pointIndex] + '位于此处' /*+ pointIndex + '/' + pathData.path.length*/;
                }

                return pathData.name + '，点数量' + pathData.path.length;
            },
            renderOptions: {

                renderAllPointsIfNumberBelow: 100 //绘制路线节点，如不需要可设置为-1
            }
        });

        window.pathSimplifierIns = pathSimplifierIns;

        //设置数据
        pathSimplifierIns.setData([{
            name: '路线',
            time:timeArr,
            path: needArr
        }]);

        //对第一条线路（即索引 0）创建一个巡航器
        var navg1 = pathSimplifierIns.createPathNavigator(0, {
            loop: true, //循环播放
            speed: 1000,//巡航速度，单位千米/小时
            pathNavigatorStyle: {
                width: 24,
                height: 24,
                //使用图片
                content: PathSimplifier.Render.Canvas.getImageContent('../../imgs/iframeImgs/nowMap.png', onload, onerror),
                strokeStyle: null,
                fillStyle: null,
                //经过路径的样式
                pathLinePassedStyle: {
                    lineWidth: 6,
                    strokeStyle: 'black',
                    dirArrowStyle: {
                        stepSpace: 15,
                        strokeStyle: 'red'
                    }
                }
            }
        });

        navg1.start();
    });
}



$(window).bind('scroll',function(){
    var len=$(this).scrollTop();
    if(len>=100){
        //显示添加处理按钮
        $('#deal').fadeIn('1000');
    }else{
        //影藏添加处理按钮
        $('#deal').fadeOut('1000');
    }
});

/**
 * Created by zxm on 2017/12/20.
 */
/**********************************************---*********************************************************/
//截取url字符串 获取deviceId phoneNum token,然后ajax传参获取数据
getParameter();
function getParameter(){
    var obj = {};
    var url = window.location.search;       //截取"?"以及之后的所有字符串
    var str = url.substring(1,url.length);  //去除"?"
    var arr = str.split('&');               //根据&分割成数组   ["key=value","name=zxm"]
    for(var i = 0; i < arr.length; i ++){
        obj[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
    }
    // obj.loginId = localStorage.loginId;
    // obj.token= localStorage.token;
    $.ajax({
        url : global_path + '/cms/wearUser/selectHealthAnalysisModel',
        type : 'post',
        dataType : 'json',
        data : obj,
        success : function (res) {
            if(res.code == 200){
                if(res.msg != ''){
                    layer.msg(res.msg,{time:2000});
                }
                var needData = res.data.monitoringDetails;
                /**
                 * part1
                 * 综合诊断
                 * */
                //判断 iconFlag 如果为0 则展示静图  否则如果为1 展示动图
                if(needData.iconFlag == 1){
                    $('#headBGImg').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/titleIcon.gif');
                }else {
                    $('#headBGImg').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/titleIcon.png');
                }
                $('#newDate').text(needData.monitoringDetailsTime);         //日期
                $('#newTime').text(needData.monitoringDetailsService);      //时间
                $('#tiredLevel').text(needData.fatigueLevel);               //疲劳等级
                if(needData.sleepMonitoring == null){
                    $('#sleepTime').text('0h0min');   //睡眠时间
                }else {
                    $('#sleepTime').text(needData.sleepMonitoring.totalSleepDuration.replace(/小时/,'h').replace(/分钟/,'min'));   //睡眠时间
                }
                $('#totalRateCurve').html(needData.heartRateCurve + '<hr>' + needData.bloodPressureCurve + '<hr>'  + needData.bloodOxygenCurve);
                $('#walkCount').text(needData.runningMonitoring.numberOfWalk);      //步数
                $('#walkCount2').text(needData.runningMonitoring.numberOfWalk);      //步数
                $('#comprehensiveDiagnosis').text(needData.comprehensiveDiagnosis);      //综合诊断
                if(needData.healthFlag == 1){
                    //$('#healthFlag').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/total-health.gif');  //综合动图  健康
                    // $('.pageTitle').css('backgroundImage','url(../../imgs/iframeImgs/healthDetails/titleBG-1.png)');  //title背景图 健康
                    $('#illType').text('健康').css('color','rgb(54,184,100)');   //part3 结论
                }else if(needData.healthFlag == 2){
                    // $('#healthFlag').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/total-subHealth.gif');//综合动图  亚健康
                    // $('.pageTitle').css('backgroundImage','url(../../imgs/iframeImgs/healthDetails/titleBG-2.png)');  //title背景图 亚健康
                    $('#illType').text('亚健康').css('color','rgb(255,153,0)');   //part3 结论
                }else if(needData.healthFlag == 3){
                    // $('#healthFlag').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/total-ill.png');//综合动图  疾病
                    // $('.pageTitle').css('backgroundImage','url(../../imgs/iframeImgs/healthDetails/titleBG-3.png)');  //title背景图  疾病
                    $('#illType').text('疾病').css('color','rgb(234,74,74)');   //part3 结论
                }else{
                    // $('#healthFlag').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/total-gray.png');//综合动图  未知
                    // $('.pageTitle').css('backgroundImage','url(../../imgs/iframeImgs/healthDetails/titleBG-4.png)');  //title背景图   未知
                    $('#illType').text('未明确').css('color','rgb(179,179,179)');   //part3 结论
                }

                /**
                 * part2
                 * 异常病症
                 * */
                if(needData.currentAbnormalCondition != null){
                    $('#illContent').html(' ');        //异常病症清空
                    for(var i = 0; i < needData.currentAbnormalCondition.length; i ++){         //异常病症循环添加
                        //如果为null 则继续下一个
                        if(needData.currentAbnormalCondition[i] == null){
                            i ++;
                        }
                        $('#illContent').html($('#illContent').html() + '<div>'+ needData.currentAbnormalCondition[i] +'</div>')
                    }
                }


                /**
                 * part3
                 * 内脏器官
                 * */
                var organ = res.data.monitoringDetails.allTheInternalOrgans;        //内脏健康数组
                if(organ != null){
                    //膀胱
                    if(organ.bladder == 1){
                        $('#bladder').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/health_bladder@2x.png');  //健康
                    }else if(organ.bladder == 2){
                        $('#bladder').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/subhealthy_bladder@2x.png');  //亚健康
                    }else if(organ.bladder == 3){
                        $('#bladder').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/danger_bladder@2x.png');  //疾病
                    }else{
                        $('#bladder').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/unknown_bladder@2x.png');  //未知
                    }
                    //胆
                    if(organ.gallBladder == 1){
                        $('#gallBladder').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/health_gallbladder@2x.png');  //健康
                    }else if(organ.gallBladder == 2){
                        $('#gallBladder').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/subhealthy_gallbladder@2x.png');  //亚健康
                    }else if(organ.gallBladder == 3){
                        $('#gallBladder').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/danger_gallbladder@2x.png');  //疾病
                    }else{
                        $('#gallBladder').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/unknown_gallbladder@2x.png');  //未知
                    }
                    //心
                    if(organ.heart == 1){
                        $('#heart').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/health_heart@2x.png');  //健康
                    }else if(organ.heart == 2){
                        $('#heart').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/subhealthy_heart@2x.png');  //亚健康
                    }else if(organ.heart == 3){
                        $('#heart').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/danger_heart@2x.png');  //疾病
                    }else{
                        $('#heart').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/unknown_heart@2x.png');  //未知
                    }
                    //肾
                    if(organ.kidney == 1){
                        $('#kidney').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/health_kidney@2x.png');  //健康
                    }else if(organ.kidney == 2){
                        $('#kidney').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/subhealthy_kidney@2x.png');  //亚健康
                    }else if(organ.kidney == 3){
                        $('#kidney').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/danger_kidney@2x.png');  //疾病
                    }else{
                        $('#kidney').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/unknown_kidney@2x.png');  //未知
                    }
                    //大肠
                    if(organ.largeIntestine == 1){
                        $('#largeIntestine').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/health_large_intestine@2x.png');  //健康
                    }else if(organ.largeIntestine == 2){
                        $('#largeIntestine').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/subhealthy_large_intestine@2x.png');  //亚健康
                    }else if(organ.largeIntestine == 3){
                        $('#largeIntestine').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/danger_large_intestine@2x.png');  //疾病
                    }else{
                        $('#largeIntestine').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/unknown_large_intestine@2x.png');  //未知
                    }
                    //肝
                    if(organ.liver == 1){
                        $('#liver').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/health_hepar@2x.png');  //健康
                    }else if(organ.liver == 2){
                        $('#liver').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/subhealthy_hepar@2x.png');  //亚健康
                    }else if(organ.liver == 3){
                        $('#liver').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/danger_hepar@2x.png');  //疾病
                    }else{
                        $('#liver').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/unknown_hepar@2x.png');  //未知
                    }
                    //肺
                    if(organ.lung == 1){
                        $('#lung').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/health_lungs@2x.png');  //健康
                    }else if(organ.lung == 2){
                        $('#lung').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/subhealthy_lungs@2x.png');  //亚健康
                    }else if(organ.lung == 3){
                        $('#lung').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/danger_lungs@2x.png');  //疾病
                    }else{
                        $('#lung').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/unknown_lungs@2x.png');  //未知
                    }
                    //淋巴
                    if(organ.lymph == 1){
                        $('#lymph').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/health_lymph@2x.png');  //健康
                    }else if(organ.lymph == 2){
                        $('#lymph').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/subhealthy_lymph@2x.png');  //亚健康
                    }else if(organ.lymph == 3){
                        $('#lymph').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/danger_lymph@2x.png');  //疾病
                    }else{
                        $('#lymph').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/unknown_lymph@2x.png');  //未知
                    }
                    //心包
                    if(organ.pericardium == 1){
                        $('#pericardium').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/health_heart_sac@2x.png');  //健康
                    }else if(organ.pericardium == 2){
                        $('#pericardium').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/subhealthy_heart_sac@2x.png');  //亚健康
                    }else if(organ.pericardium == 3){
                        $('#pericardium').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/danger_heart_sac@2x.png');  //疾病
                    }else{
                        $('#pericardium').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/unknown_heart_sac@2x.png');  //未知
                    }
                    //小肠
                    if(organ.smallIntestine == 1){
                        $('#smallIntestine').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/health_small_intestine@2x.png');  //健康
                    }else if(organ.smallIntestine == 2){
                        $('#smallIntestine').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/subhealthy_small_intestine@2x.png');  //亚健康
                    }else if(organ.smallIntestine == 3){
                        $('#smallIntestine').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/danger_small_intestine@2x.png');  //疾病
                    }else{
                        $('#smallIntestine').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/unknown_small_intestine@2x.png');  //未知
                    }
                    //脊柱
                    if(organ.spine == 1){
                        $('#spine').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/health_vertebra@2x.png');  //健康
                    }else if(organ.spine == 2){
                        $('#spine').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/subhealthy_vertebra@2x.png');  //亚健康
                    }else if(organ.spine == 3){
                        $('#spine').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/danger_vertebra@2x.png');  //疾病
                    }else{
                        $('#spine').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/unknown_vertebra@2x.png');  //未知
                    }
                    //脾
                    if(organ.spleen == 1){
                        $('#spleen').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/health_splenic@2x.png');  //健康
                    }else if(organ.spleen == 2){
                        $('#spleen').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/subhealthy_splenic@2x.png');  //亚健康
                    }else if(organ.spleen == 3){
                        $('#spleen').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/danger_splenic@2x.png');  //疾病
                    }else{
                        $('#spleen').removeAttr('src').attr('src','../../imgs/iframeImgs/healthDetails/unknown_splenic@2x.png');  //未知
                    }
                }


                /*part4     30天健康天数*/
                /*var healthDays = [];        //创建数组 存放[健康、亚健康、疾病、报警次数]
                for(var o = 0; o < needData.healthDays.length; o ++){
                    healthDays.push(needData.healthDays[o].health);
                    healthDays.push(needData.healthDays[o].subHealth);
                    healthDays.push(needData.healthDays[o].illness);
                    healthDays.push(needData.healthDays[o].warning);
                }*/
                // healDays(healthDays);     //健康天数柱状图

                /*part5     实时心率折线图*/
                if(needData.realHRMonitoring != null){
                    var heartRateData = needData.realHRMonitoring.statusData;   //心率数据
                    heartRate(heartRateData);                                   //心率折线图
                    $('#heartRateContent').text(needData.realHRMonitoring.conclusion);  //心率分析
                    // $('#heartRateExp').text(needData.realHRMonitoring.visceraName);     //心率总结
                }
                /*part6     实时血压折线图*/
                if(needData.realBPMonitoring != null){
                    var bloodPressData = needData.realBPMonitoring.bpData;   //血压数据
                    bloodPress(bloodPressData);                                 //血压折线图
                    $('#bloodPressContent').text(needData.realBPMonitoring.conclusion); //血压分析
                    // $('#bloodPressConclusion').text(needData.realBPMonitoring.visceraName); //血压总结
                }
                /*part7     实时血氧折线图*/
                if(needData.realBOMonitoring != null){
                    var oxData = needData.realBOMonitoring.statusData;   //血氧数据
                    bloodOxygen(oxData);                             //血氧折线图
                    $('#oxContent').text(needData.realBOMonitoring.conclusion); //血氧分析
                    // $('#oxConclusion').text(needData.realBOMonitoring.visceraName); //血氧总结
                }

                /*part8     实时睡眠监测*/
                // var sleepData = needData.sleepMonitoring.returnDeepAndLight;   //睡眠数据
                // sleepWatch(sleepData);                                        //睡眠图
                // $('#sleepContent').text('睡眠总长'+needData.sleepMonitoring.totalSleepDuration+'，深睡'+needData.sleepMonitoring.deep+
                //     '，浅睡'+needData.sleepMonitoring.light);                                  //睡眠分析
                // $('#sleepContentAll').text(needData.sleepMonitoring.sleepConclusion);     //睡眠结论

                /*part     24h运动监控*/
                // $('#walkConclusion').text(needData.runningMonitoring.aerobicExercise.replace(/小时/,'h').replace(/分钟/,'m'));
                // $('#runContent').text(needData.runningMonitoring.walkConclusion);
            }else {
                layer.msg(res.msg,{time:2000});
        }


        }
    })
}
/**
 * 对比历史弹框操作
 * layer.js .mobile  移动端layer.js
 * */
$('.boxHead2').on('click', function () {
    layer.msg('数据不足,请继续佩戴',{
        skin: 'msg',
        icon:5,
        time: 2000 //2秒后自动关闭       <注：layer.js电脑端为毫秒 如 2000代表2s>
    });
});
/**
 * 12张图摆放
 * 胆、小肠、心、膀胱、       肝、脾、心包、脊椎、       肾、肺、淋巴、大肠
 * */
$(function(){
    //中心点横坐标
    var dotLeft = ($(".containerImg").width()-$(".dot").width())/2;
    //中心点纵坐标
    var dotTop = ($(".containerImg").height()-$(".dot").height())/2;
    //起始角度
    var stard = 0;
    //半径
    var radius = 90;
    //每一个BOX对应的角度;
    var avd = 360/$(".boxImg").length;
    //每一个BOX对应的弧度;
    var ahd = avd*Math.PI/180;

    //设置圆的中心点的位置
    $(".dot").css({"left":dotLeft,"top":dotTop+20});
    //设置图片位置
    $(".boxImg").each(function(index, element){
        $(this).css({"left":Math.sin((ahd*index))*radius+dotLeft,"top":Math.cos((ahd*index))*radius+dotTop});
    });
});

/**
 * boxPart4
 * 30天健康天数柱状图
 * */
function healDays(dataDays){
    var healDays = echarts.init(document.getElementById('monthHealthDaysCanvas'));//对应容器
    //配置项
    var option = {
        //tooltip
        tooltip: {
            trigger: 'axis'
        },
        //x轴
        xAxis:{
            type: 'category',
            boundaryGap: true,
            data:["健康","亚健康","疾病","报警"],
            splitLine:{
                show:false
            },
            axisLabel :{//标签设置
                color:"#fff",
                fontSize: "12"
            },
            axisLine: { //x轴颜色
                show: false,
                lineStyle: {
                    color: "#fff"
                }
            }
        },
        //y轴
        yAxis:{
            type: 'value',
            show:false,
            min: 0,
            max: 30,
            splitNumber: 3,
            splitLine:{
                show:true,
                lineStyle:{
                    color:'rgba(0,150,255,0.1)',
                    width: 1
                }
            },
            axisLine: { //y轴颜色
                lineStyle: {
                    color: "#fff"
                }
            },
            axisTick: {
                show: false//是否显示y轴刻度
            },
            axisLabel: { //强制显示
                interval: 0,
                textStyle: { //y轴标签颜色
                    color: "#fff"
                }
            }
        },
        //大小边距调整
        grid:{
            left: "10%",
            right:"10%",
            top:"10%",
            bottom:"10%",
            containLabel:false
        },
        //数据
        series:[
            //健康天数
            {
                name:'天数',
                type:'bar',            //折线图
                barWidth : 25,          //柱子宽度
                data:dataDays,      //动态data
                itemStyle: {
                    normal: {
                        //顶端显示value值 0则不显示
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#615a5a',
                                fontSize: "14"
                            },
                            formatter:function(params){
                                if(params.value==0){
                                    return '';
                                }else
                                {
                                    return params.value;
                                }
                            }
                        },
                        //颜色设置 循环
                        color: function (params){
                            var colorList = ['#37B864','#E58F5D','#E34545','#C12521'];
                            return colorList[params.dataIndex];
                        }
                    }
                }
            }
        ]
    };
    //配置项生成统计图
    healDays.setOption(option);
}
/**
 * boxPart5
 * 实时心率监控
 * */
function heartRate(dataStr){
    var arr= [];
    for (var key in dataStr)
    {
        var k = [];
        k[0] = key;
        k[0] = k[0].slice(0,4) + '/' + k[0].slice(4,6) +'/' + k[0].slice(6,8) + ' ' + k[0].slice(8,10) + ':' +
            k[0].slice(10,12) + ':' + k[0].slice(12,14);
        k[1] = dataStr[key];
        arr.push(k);
    }
    var arrRate = arr;
    //展示长度
    var start = 0;
    if(arrRate.length <= 50){
        start = 0;
    }else if(arrRate.length <= 100){
        start = 50;
    }else if(arrRate.length <= 200){
        start = 75;
    }else if(arrRate.length <= 300){
        start = 87;
    }else if(arrRate.length <= 500){
        start = 93;
    }else if(arrRate.length > 500){
        start = 95;
    }
    var healDays = echarts.init(document.getElementById('heartRateCanvas'));//对应容器
    //配置项
    var option = {
        //tooltip
        tooltip: {
            trigger: 'axis'
        },
        //x轴
        xAxis:{
            type: 'time',
            boundaryGap: false,
            splitLine:{
                show:false
            },
            axisLabel :{//标签设置
                color:"#fff",
                fontSize: "12"
            },
            axisLine: { //x轴颜色
                show: true,
                lineStyle: {
                    color: "#fff"
                }
            }
        },
        //x轴分割
        dataZoom:[
            {
                type: 'inside',
                start: start,
                end: 100
            }
        ],
        //y轴
        yAxis:{
            type: 'value',
            show:true,
            min: 40,
            max: 200,
            splitNumber: 4,
            splitLine:{
                show:true,
                lineStyle:{
                    color:'rgba(0,150,255,0.1)',
                    width: 1
                }
            },
            axisLine: { //y轴颜色
                lineStyle: {
                    color: "#fff"
                }
            },
            axisTick: {
                show: false//是否显示y轴刻度
            },
            axisLabel: { //强制显示
                interval: 0,
                textStyle: { //y轴标签颜色
                    color: "#fff"
                }
            }
        },
        //大小边距调整
        grid:{
            left: "10%",
            right:"10%",
            top:"10%",
            bottom:"20%",
            containLabel:false
        },
        //数据
        series:[
            //心率
            {
                name:'心率',
                type:'line',            //折线图
                //symbol: 'none', //去掉每个点的小圆点标记
                data:arrRate,      //动态data
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(11,120,227,0.54)'
                        }, {
                            offset: 1,
                            color: 'rgba(11,120,227,0.1)'
                        }])
                    }
                },
                itemStyle: {
                    normal: {
                        //颜色设置
                        color: "#0096FF"
                    }
                }
            }
        ]
    };
    //配置项生成统计图
    healDays.setOption(option);
}
/**
 * boxPart6
 * 实时血压监控
 * */
function bloodPress(str){
    var bp = [];
    for (var key in str)
    {
        var k = [];
        k[0] = key;
        k[0] = k[0].slice(0,4) + '/' + k[0].slice(4,6) +'/' + k[0].slice(6,8) + ' ' + k[0].slice(8,10) + ':' +
            k[0].slice(10,12) + ':' + k[0].slice(12,14);
        k[1] = str[key].split(',');

        bp.push(k);
    }
    var spNeed = [];//高压
    var bpNeed = [];//低压
    for(var i = 0; i < bp.length; i ++){
        spNeed.push([bp[i][0],bp[i][1][0]]);
        bpNeed.push([bp[i][0],bp[i][1][1]]);
    }
    //展示长度
    var l = 0;
    if(bp.length <= 50){
        l = 0;
    }else if(bp.length <= 100){
        l = 50;
    }else if(bp.length <= 200){
        l = 75;
    }else if(bp.length <= 300){
        l = 87;
    }else if(bp.length <= 500){
        l = 93;
    }
    //对应容器
    var bloodPress = echarts.init(document.getElementById('bloodPressCanvas'));
    //配置项
    var option = {
        //tooltip
        tooltip: {
            trigger: 'axis'
        },
        //x轴
        xAxis:{
            type: 'time',
            boundaryGap: false,
            splitLine:{
                show:false
            },
            axisLabel :{//标签设置
                color:"#fff",
                fontSize: "12"
            },
            axisLine: { //x轴颜色
                show: true,
                lineStyle: {
                    color: "#fff"
                }
            }
        },
        //x轴分割
        dataZoom:[
            {
                type: 'inside',
                start: l,
                end: 100
            }
        ],
        //y轴
        yAxis:{
            type: 'value',
            show:true,
            min: 40,
            max: 200,
            splitNumber: 4,
            splitLine:{
                show:true,
                lineStyle:{
                    color:'rgba(0,150,255,0.1)',
                    width: 1
                }
            },
            axisLine: { //y轴颜色
                lineStyle: {
                    color: "#fff"
                }
            },
            axisTick: {
                show: false//是否显示y轴刻度
            },
            axisLabel: { //强制显示
                interval: 0,
                textStyle: { //y轴标签颜色
                    color: "#fff"
                }
            }
        },
        //大小边距调整
        grid:{
            left: "10%",
            right:"10%",
            top:"10%",
            bottom:"20%",
            containLabel:false
        },
        //数据
        series:[
            //高压
            {
                name:'高压',
                type:'line',            //折线图
                //symbol: 'none', //去掉每个点的小圆点标记
                data:spNeed,      //动态data
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(233,44,129,0.54)'
                        }, {
                            offset: 1,
                            color: 'rgba(233,44,129,0.1)'
                        }])
                    }
                },
                itemStyle: {
                    normal: {
                        //颜色设置
                        color: "rgba(233,44,129,1)"
                    }
                }
            },
            //低压
            {
                name:'低压',
                type:'line',            //折线图
                //symbol: 'none', //去掉每个点的小圆点标记
                data:bpNeed,      //动态data
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(254,97,48,0.54)'
                        }, {
                            offset: 1,
                            color: 'rgba(254,97,48,0.1)'
                        }])
                    }
                },
                itemStyle: {
                    normal: {
                        //颜色设置
                        color: "#FE6130"
                    }
                }
            }

        ]
    };
    //配置项生成统计图
    bloodPress.setOption(option);
}
/**
 * boxPart7
 * 实时血氧监控
 * */
function bloodOxygen(str){
    var oxArr = [];
    for (var key in str)
    {
        var k = [];
        k[0] = key;
        k[0] = k[0].slice(0,4) + '/' + k[0].slice(4,6) +'/' + k[0].slice(6,8) + ' ' + k[0].slice(8,10) + ':' +
            k[0].slice(10,12) + ':' + k[0].slice(12,14);
        k[1] = str[key];
        oxArr.push(k);
    }
    //展示长度
    var l = 0;
    if(oxArr.length <= 50){
        l = 0;
    }else if(oxArr.length <= 100){
        l = 50;
    }else if(oxArr.length <= 200){
        l = 75;
    }else if(oxArr.length <= 300){
        l = 87;
    }else if(oxArr.length <= 500){
        l = 93;
    }
    //对应容器
    var bloodOxygen = echarts.init(document.getElementById('bloodOxygenCanvas'));
    //配置项
    var option = {
        //tooltip
        tooltip: {
            trigger: 'axis'
        },
        //x轴
        xAxis:{
            type: 'time',
            boundaryGap: false,
            splitLine:{
                show:false
            },
            axisLabel :{//标签设置
                color:"#fff",
                fontSize: "12"
            },
            axisLine: { //x轴颜色
                show: true,
                lineStyle: {
                    color: "#fff"
                }
            }
        },
        //x轴分割
        dataZoom:[
            {
                type: 'inside',
                start: l,
                end: 100
            }
        ],
        //y轴
        yAxis:{
            type: 'value',
            show:true,
            min: 50,
            max: 100,
            splitNumber: 4,
            splitLine:{
                show:true,
                lineStyle:{
                    color:'rgba(0,150,255,0.1)',
                    width: 1
                }
            },
            axisLine: { //y轴颜色
                lineStyle: {
                    color: "#fff"
                }
            },
            axisTick: {
                show: false//是否显示y轴刻度
            },
            axisLabel: { //强制显示
                interval: 0,
                textStyle: { //y轴标签颜色
                    color: "#fff"
                }
            }
        },
        //大小边距调整
        grid:{
            left: "10%",
            right:"10%",
            top:"10%",
            bottom:"20%",
            containLabel:false
        },
        //数据
        series:[
            //血氧浓度
            {
                name:'血氧浓度(%)',
                type:'line',            //折线图
                //symbol: 'none', //去掉每个点的小圆点标记
                data:oxArr,      //动态data
                smooth: true,       //平滑显示
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(86,178,186,0.54)'
                        }, {
                            offset: 1,
                            color: 'rgba(86,178,186,0.1)'
                        }])
                    }
                },
                itemStyle: {
                    normal: {
                        //颜色设置
                        color: "#56B2BA"
                    }
                }
            }

        ]
    };
    //配置项生成统计图
    bloodOxygen.setOption(option);
}
/**
 * boxPart8
 * 实时睡眠  此处暂时用华康处开服务ajax
 * 此处接收数据为后台传输数据。原因有2：
 * 1.前端需要js时间处理 耗费大量资源
 * 2.iOS端不兼容此数据展示
 * */
function sleepWatch(data1){
    var arr1 = [];
    for(var p = 0; p < data1.length; p ++){
        var obj1 = {};
        obj1.name = data1[p].name;
        obj1.value = [data1[p].name,data1[p].value,data1[p].zstatus];
        obj1.type = data1[p].zstatus;
        arr1.push(obj1);
    }
    //对应容器
    var sleepWatch = echarts.init(document.getElementById('sleepWatchCanvas'));
    //配置项
    var option = {
        //tooltip
        /*tooltip: {
            trigger: 'axis'
        },*/
        //x轴
        xAxis:{
            type: 'time',
            boundaryGap: false,
            splitLine:{
                show:false
            },
            axisLabel :{//标签设置
                color:"#fff",
                fontSize: "12"
            },
            axisLine: { //x轴颜色
                show: false,
                lineStyle: {
                    color: "#fff"
                }
            }
        },
        //x轴分割
        /*dataZoom:[
            {
                type: 'inside',
                start: 0,
                end: 20
            }
        ],*/
        //y轴
        yAxis:{
            type: 'value',
            show:false,
            min: 0,
            max: 1,
            splitNumber: 0,
            axisLine: { //y轴颜色
                lineStyle: {
                    color: "#eee"
                }
            },
            axisTick: {
                show: false//是否显示y轴刻度
            },
            axisLabel: { //强制显示
                interval: 0,
                textStyle: { //y轴标签颜色
                    color: "#666"
                }
            }
        },
        //大小边距调整
        grid:{
            left: "10%",
            right:"10%",
            top:"10%",
            bottom:"25%",
            containLabel:false
        },
        //数据
        series:[
            //睡眠
            {
                name:'睡眠',
                type:'bar',            //折线图
                symbol: 'none', //去掉每个点的小圆点标记
                barWidth : 2,          //柱子宽度
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var index_color = params.value;
                            if(index_color[2] == 1){
                                return 'rgba(0,150,255,0.2)';
                            }else if(index_color[2] == 2){
                                return '#0096FF';
                            }else{
                                return '#0096FF';
                            }
                        }
                    }
                },
                data:arr1
            }
        ]
    };
    //配置项生成统计图
    sleepWatch.setOption(option);
}

/**
 * 公用方法/类
 * 暂未用到
 * */
//获取时间 "yyyy-MM-dd HH:MM:SS"
function getNowFormatDate(timePart) {
    var date = new Date(timePart);
    var seperator1 = "-";
    var seperator2 = ":";
    var month = (date.getMonth() + 1) < 10? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var day = date.getDate() < 10? ("0" + date.getDate()) : date.getDate();
    var hour = date.getHours() < 10? ("0" + date.getHours()) : date.getHours();
    var min = date.getMinutes() < 10? ("0" + date.getMinutes()) : date.getMinutes();
    var second = date.getSeconds() < 10? ("0" + date.getSeconds()) : date.getSeconds();

    var currentDate = date.getFullYear() + seperator1 + month + seperator1 + day
        + " " + hour + seperator2 + min + seperator2 + second;
    return currentDate;
}







//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG
//
//
//






