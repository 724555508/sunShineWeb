
/**
 * 点击提交
 * */
$('#subBtn').off('click').on('click',function () {
    layer.confirm('确定提交吗？', {
        btn: ['确定','取消'] //按钮
    }, function(){
        //创建保存所有变量字段的对象，用serializeArray把表单所有内容装入此对象
        var data = {};
        data.loginId = localStorage.loginId;
        data.token = localStorage.token;
        data.phoneStatus = $('#callType option:selected').val();   //通话类型
        data.questionParentType = $('#select option:selected').val();  //反馈类型
        data.questionType = $('#select2 option:selected').val();  //反馈子类型
        data.userType = $('#userType option:selected').val();  //用户类型
        data.userCity = $('#city').val();  //用户城市
        data.phoneNum = $('#phoneNum').val();  //手机号
        // data.userName = $('#userName').val();  //用户姓名
        data.deviceId = $('#deviceId').val(); //设备号
        data.appUserId = $('#appUserId').val();  //app账号
        data.questionDetails = $('#txt1').val();  //反馈详情
        data.disposeInfo = $('#txt2').val();  //处理结果
        data.isNeedReturn = $("input[name='radio']:checked").val(); //获取radio的值
        data.nextReturnTime = $('#nextDate').val();  //获取时间
        // $("#recordForm").serializeArray().map(function(x){data[x.name]=x.value;});
        //ajax
        $.ajax({
            url:global_path + '/cms/service/addServiceInfo',
            type:'post',
            dataType:'json',
            data:data,
            success:function (res) {
                if(res.code == 200){
                    console.log(res)
                    // $('.dad1').fadeOut(500);
                    // $('.hideThis').fadeOut(500);
                    // $("#recordForm")[0].reset();
                    // showNextDate();
                    layer.msg(res.msg,{icon:6,time:2000},function () {
                        window.close();
                    });
                    // $('#otherInput').removeAttr('name').hide();
                    // $('#select2').attr('name','questionType').show();
                }else {
                    layer.msg(res.msg,{icon:5,time:2000});
                }
            }
        });
    }, function(){
        layer.msg('已取消', {
            time: 2000
        });
    });
});


/**
 * 显示次日当前时间在相应位置
 * */
function showNextDate() {
    var now = new Date(new Date().getTime() + 24*60*60*1000);
    var str = now.getFullYear() + "-" + fix((now.getMonth() + 1),2) + "-" + fix(now.getDate(),2) + "T" + fix(now.getHours(),2) + ":" + fix(now.getMinutes(),2);
    $("#nextDate").val(str);
}
function fix(num, length) {
    return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}
/**
 * 无需反馈的话，隐藏时间，且传空
 * */
// $('#isNeedReturn').bind('click',function () {
//     if($('#isNeedReturn').val() == 2){
//         $('#nextDate').val('').fadeOut(1000);
//     }else {
//         $('#nextDate').val('').fadeIn(1000);
//         showNextDate();
//     }
// });

function changeRadioValue(){
    if($("input[name='radio']:checked").val() == 2){
        $('#nextDate').val('');
        $('#time1').fadeOut(1000);
    }else {
        $('#nextDate').val('');
        $('#time1').fadeIn(1000);
        showNextDate();
    }
}


function changeQuestion(e) {
    $('#select2 option:selected').val(e);
}

/**
 * 失去焦点事件
 * 3个
 * 1.电话号
 * 2.设备号
 * 3.APP账号
 * */
//1.电话号
$('#phoneNum').blur(function () {
    var phoneNum = $(this).val();
    if(phoneNum.length > 3 && phoneNum.length < 12){
        $.ajax({
            url:global_path + '/cms/service/getCountRecord',
            type:'post',
            dataType:'json',
            data:{
                "loginId":localStorage.loginId,
                "token":localStorage.token,
                "phoneNum":phoneNum
            },
            success:function (res) {
                // debugger;

                $('#searchMe1').remove();
                if(res.code == 200){
                    if(res.data.count != 0){
                        // 号码来访记录的查看
                        var node = '<a id="searchMe1" href="custom_recordHistory.html?phoneNum='+phoneNum+'" target="_blank" class="btn btn-skyBlueSmall">查看</a>';
                        $('#numRecord').html($('#numRecord').html() + node);
                        // $('#numRecord').html(111111111111);

                    }else {

                    }
                    $('#count').text(res.data.count);
                    $('.dad').fadeIn(500);
                }else {
                    layer.msg('error',{icon:5,time:2000});
                }
            }
        });
    }
});
//2.设备号
$('#deviceId').blur(function () {
    var deviceId = $(this).val();
    if(deviceId.length == 15){
        $.ajax({
            url:global_path + '/cms/service/getWearSimpleInfo',
            type:'post',
            dataType:'json',
            data:{
                "loginId":localStorage.loginId,
                "token":localStorage.token,
                "deviceId":deviceId
            },
            success:function (res) {
                $('#searchMe2').remove();
                $('#searchMe4').remove();
                $('.hideThis2').hide();
                $('.hideThis4').hide();
                if(res.code == 200){
                    $('#searchMe2').remove();
                    $('#username1').text(res.data.map.username);
                    $('#age').text(res.data.map.age + '岁');
                    $('#MedicalHistory').text(res.data.map.MedicalHistory);
                    $('#serviceTime').text(res.data.map.serviceTime);
                    var node = '<a id="searchMe2" href="wearUser.html?wearUserId='+res.data.map.wearUserId+'" target="_blank" class="btn btn-skyBlueSmall">查看</a>';
                    $('#seeInfo').html($('#seeInfo').html() + node);
                    $('#count2').text(res.data.count);
                    $('.left').fadeIn(500);  //失去焦点佩戴用户显示
                    // if(res.data.count != 0){
                    //     var node = '<a id="searchMe4" href="custom_recordHistory.html?deviceId='+deviceId+'" target="_blank" class="btn btn-skyBlueSmall">查看</a>';
                    //     $('.hideThis4').html($('.hideThis4').html() + node);
                    // }


                }else {
                    layer.msg(res.msg,{icon:5,time:2000});
                }
            }
        });
    }else{
        layer.msg('设备号不符合规则');
    }
});
//3.APP账号
$('#appUserId').blur(function () {
    var appUserId = $(this).val();
    if(appUserId.length == 11){
        $.ajax({
            url:global_path + '/cms/service/getAppSimpleInfo',
            type:'post',
            dataType:'json',
            data:{
                "loginId":localStorage.loginId,
                "token":localStorage.token,
                "appUserId":appUserId
            },
            success:function (res) {
                $('#searchMe3').remove();
                $('.hideThis3').hide();
                if(res.code == 200){
                    $('#username2').text(res.data.map.username);
                    $('#createTime').text(res.data.map.createTime.substring(0,10));
                    $('#devices').text(res.data.map.count);
                    $('#phoneBrand').text(res.data.map.phoneBrand);
                    $('#appVersion').text(res.data.map.appVersion);
                    // $('#count').text(res.data.map.count);
                    var node = '<a id="searchMe3" href="appUserDetails.html?appUserId='+appUserId+'" target="_blank" class="btn btn-skyBlueSmall">查看</a>';
                    $('#seeInfo2').html($('#seeInfo2').html() + node);
                    $('.right').fadeIn(1000); //失去焦点,app用户显示
                }else {
                    layer.msg(res.msg,{icon:5,time:2000});
                }
            }
        });
    }

});


function change(res) {
    $('#otherInput').removeAttr('name').hide();
    $('#select2').attr('name','questionType').show();
    if(res == '产品硬件'){
        $('#select2').html('<option value="充电问题">充电问题</option>\n' +
            '                    <option value="语音播报">语音播报</option>\n' +
            '                    <option value="待机时间短">待机时间短</option>\n' +
            '                    <option value="系统更新">系统更新</option>\n' +
            '                    <option value="外观问题">外观问题</option>\n' +
            '                    <option value="材质过敏">材质过敏</option>\n' +
            '                    <option value="表带问题">表带问题</option>\n' +
            '                    <option value="硬件操作">硬件操作</option>\n' +
            '                    <option value="设备无法连接">设备无法连接</option>'+
            '                    <option value="SIM使用">SIM使用</option>\n');
    }else if(res == 'APP软件'){
        $('#select2').html('<option value="账号注册">账号注册</option>\n' +
            '                    <option value="APP升级问题">APP升级问题</option>\n' +
            '                    <option value="数据显示">数据显示</option>\n' +
            '                    <option value="APP使用操作">APP使用操作</option>\n' +
            '                    <option value="设备信息解绑">设备信息解绑</option>\n' +
            '                    <option value="睡眠时间咨询">睡眠时间咨询</option>\n' +
            '                    <option value="设备信息绑定">设备信息绑定</option>\n' +
            '                    <option value="设备信息激活">设备信息激活</option>\n' +
            '                    <option value="不符合佩戴要求">不符合佩戴要求</option>\n' +
            '                    <option value="APP数据修改">APP数据修改</option>\n' +
            '                    <option value="健康分析报告">健康分析报告</option>');
    }else if(res == '数据失准'){
        $('#select2').html('<option value="心率数据失准">心率数据失准</option>\n' +
            '                    <option value="血压数据失准">血压数据失准</option>\n' +
            '                    <option value="血氧数据失准">血氧数据失准</option>\n' +
            '                    <option value="反馈异常数据">反馈异常数据</option>');
    }else if(res == '用户回访'){
        $('#select2').html('<option value="新用户回访">新用户回访</option>\n' +
            '                    <option value="日常用户回访">日常用户回访</option>\n' +
            '                    <option value="暂停使用回访">暂停使用回访</option>\n' +
            '                    <option value="亚健康用户回访">亚健康用户回访</option>\n' +
            '                    <option value="失联用户回访">失联用户回访</option>\n' +
            '                    <option value="疾病用户回访">疾病用户回访</option>');
    }else if(res == '预警回访'){
        $('#select2').html('<option value="血压异常回访">血压异常回访</option>\n' +
            '                    <option value="心率异常回访">心率异常回访</option>\n' +
            '                    <option value="血氧异常回访">血氧异常回访</option>\n' +
            '                    <option value="心梗，脑梗预兆回访">心梗，脑梗预兆回访</option>');
    }else if(res == '合作问题'){
        $('#select2').html('<option value="产品代理合作">产品代理合作</option>\n' +
            '                    <option value="广告推广合作">广告推广合作</option>\n' +
            '                    <option value="医疗机构业务合作">医疗机构业务合作</option>\n' +
            '                    <option value="供应商合作">供应商合作</option>\n' +
            '                    <option value="其他合作">其他合作</option>');
    }else if(res == '无效沟通'){
        $('#select2').html('<option value="无人应答">无人应答</option>\n' +
            '                    <option value="电话忙音">电话忙音</option>\n' +
            '                    <option value="拒接电话">拒接电话</option>\n' +
            '                    <option value="停机">停机</option>\n' +
            '                    <option value="接听后挂断">接听后挂断</option>\n' +
            '                    <option value="关机">关机</option>');
    }else if(res == '定位问题') {
        $('#select2').html(' <option value="定位开启">定位开启</option>\n' +
            '                    <option value="定位异常">定位异常</option>\n' +
            '                    <option value="定位失准">定位失准</option>\n' +
            '                    <option value="其他定位问题">其他定位问题</option>');
    }else if(res == '产品服务咨询'){
        $('#select2').html('<option value="咨询服务内容">咨询服务内容</option>\n' +
            '                    <option value="服务流程">服务流程</option>\n' +
            '                    <option value="服务协议问题">服务协议问题</option>\n' +
            '                    <option value="服务期限或规则">服务期限或规则</option>');
    }else if(res == '投诉与建议'){
        $('#select2').html('<option value="用户建议">用户建议</option>\n' +
            '                    <option value="用户投诉">用户投诉</option>');
    }else if(res == '数据采集不到'){
        $('#select2').html('<option value="血压数据采集不到">血压数据采集不到</option>\n' +
            '                    <option value="心率数据采集不到">心率数据采集不到</option>\n' +
            '                    <option value="血氧数据采集不到">血氧数据采集不到</option>\n' +
            '                    <option value="血糖数据采集不到">血糖数据采集不到</option>');
    }else if(res == '故障设备报备'){
        $('#select2').html('<option value="碎屏">碎屏</option>\n' +
            '                    <option value="进水碾压">进水碾压</option>\n' +
            '                    <option value="设备丢失">设备丢失</option>\n' +
            '                    <option value="按键不灵敏">按键不灵敏</option>\n' +
            '                    <option value="表带断裂">表带断裂</option>\n' +
            '                    <option value="后壳有裂痕">后壳有裂痕</option>\n' +
            '                    <option value="不能充电">不能充电</option>\n' +
            '                    <option value="待机时间短">待机时间短</option>\n' +
            '                    <option value="不能开机">不能开机</option>\n' +
            '                    <option value="光波不亮">光波不亮</option>\n' +
            '                    <option value="不能识别sim卡">不能识别sim卡</option>\n' +
            '                    <option value="信号灯常亮">信号灯常亮</option>\n' +
            '                    <option value="定位不准">定位不准</option>\n' +
            '                    <option value="屏幕滑动无反应">屏幕滑动无反应</option>\n' +
            '                    <option value="设备无法连接">设备无法连接</option>\n' +
            '                    <option value="充电线丢失">充电线丢失</option>');
    }else if(res == 'SOS'){
        $('#select2').html('<option value="SOS求救">SOS求救</option>\n' +
            '                    <option value="SOS回访">SOS回访</option>\n' +
            '                    <option value="SOS服务">SOS服务</option>\n' +
            '                    <option value="SOS建议">SOS建议</option>');
    }else if(res == '其他问题'){
        // $('#select2').html('');

        $('#select2').removeAttr('name').hide();
        // $('.newInput').show();
        $('#otherInput').attr('name','questionType').show();
    }
}
