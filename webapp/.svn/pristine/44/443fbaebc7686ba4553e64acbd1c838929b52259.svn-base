/**
 * Created by zxm01 on 2017/10/19.
 */

/***********************************************时间*/
nowTime ();
function nowTime (){
    var date = new Date();
    var y = date.getFullYear();
    var mon = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var min = date.getMinutes();
    var s = date.getSeconds();
    h < 10 ? h = '0' + h : h;
    min < 10 ? min = '0' + min : min;
    s < 10 ? s = '0' + s : s;
    var needTime = y + '年' + mon + '月' + d + '日 ' + h + ':' + min + ':' + s;
    $('#nowTime').text(needTime);
}
setInterval(nowTime,1000);
/**********************************************************地区判断*/
getThisIdArea();
/**********************************************************用户列表展示*/
///************从后台获取所有用户*/
var userListCounts;
var userListMsg;
getUserList();
function getUserList(){
    $.ajax({
        url : global_path + '/Agent/BigShow/listAlarmPerson',
        type : 'post',
        dataType : 'json',
        data: {
            "loginId" : localStorage.loginId,
            "token" : localStorage.token
        },
        success : function (data) {
            checkToken(data);
            if(data.code == 200){
                $('#totalCount').text(data.data.list.length);
                userListMsg = data.data.list;
                userListCounts = data.data.flag;
                changeStrHtml(userListMsg);
            }


        }
    })
}
/**
 * 显示用户头像+用户名（不足60补全60）
 * */
function changeStrHtml(data){
    var imgUrl; //头像地址
    var html;   //创建空html
    for(var i = 0; i < data.length; i ++){
        //判断头像性别
        if(data[i].gender == 1){
            imgUrl = '../../imgs/iframeImgs/u11.png';
        }else if(data[i].gender == 2 || data[i].gender == -1){
            imgUrl = '../../imgs/iframeImgs/u21.png';
        }
        //html写入
        if(i <= 9){
            html = '<div class="userMsg"><img src="'+imgUrl+'" alt=""/><div class="userNickName">'+data[i].username+'</div></div>';
            $('#line1').html( $('#line1').html() + html);
        }else if(i <= 19){
            html = '<div class="userMsg"><img src="'+imgUrl+'" alt=""/><div class="userNickName">'+data[i].username+'</div></div>';
            $('#line2').html( $('#line2').html() + html);
        }else if(i <= 29){
            html = '<div class="userMsg"><img src="'+imgUrl+'" alt=""/><div class="userNickName">'+data[i].username+'</div></div>';
            $('#line3').html( $('#line3').html() + html);
        }else if(i <= 39){
            html = '<div class="userMsg"><img src="'+imgUrl+'" alt=""/><div class="userNickName">'+data[i].username+'</div></div>';
            $('#line4').html( $('#line4').html() + html);
        }else if(i <= 49){
            html = '<div class="userMsg"><img src="'+imgUrl+'" alt=""/><div class="userNickName">'+data[i].username+'</div></div>';
            $('#line5').html( $('#line5').html() + html);
        }else if(i <= 59){
            html = '<div class="userMsg"><img src="'+imgUrl+'" alt=""/><div class="userNickName">'+data[i].username+'</div></div>';
            $('#line6').html( $('#line6').html() + html);
        }else{

        }
        $('#markStar,#shan,.markStar').fadeIn(500);
    }
}
/**
 * 每隔5-15s 发一次ajax
 * */
var sortTime = Math.floor(Math.random()*11)+5;//5-15随机整数
setInterval(function () {
    sortTime --;
    if(sortTime == 0){
        getTheUserMsg(userListMsg,userListCounts);
    }
},1000);
function getTheUserMsg(userListMsg,userListCounts){
    $('.userMsgModal').fadeIn(1000);
    var i = Math.floor(Math.random()*userListCounts);
    var wearUserId = userListMsg[i].wearUserId;
    //用户详情ajax
    $.ajax({
        url: global_path + '/Agent/BigShow/AlarmPersonInfo',
        type: 'post',
        dataType: 'json',
        data:{
            "loginId": localStorage.loginId,
            "token": localStorage.token,
            "wearUserId": wearUserId
        },
        success: function (data) {
            checkToken(data);
            debugger;
            if(data.code == 200){
                thePersonDetails(data.data.info);//用户详情ajax
                //折线图
                var dpList = data.data.map.dpList;  //高压
                var spList = data.data.map.spList;  //低压
                var heartRateList = data.data.map.heartRateList;    //心率
                heartRateLine(heartRateList);//心率折线图
                bloodPressLine(dpList,spList);//血压折线图
            }else{
                layer.msg(data.msg,{
                    icon:2,
                    time:2000
                })
            }
        }
    });
    //每隔15s刷新页面
    setTimeout(function(){
        window.location.reload();
    },15000);
}
/*****************************************************************病例详情function*/
function thePersonDetails (data){
    //头像
    if(data.gender == 1){
        $('#userHeadImg').removeAttr('src').attr('src','../../imgs/iframeImgs/u10.png');
        $('#gender').text('男');
        //姓名
        //$('#healName').text(data.username.slice(0,1)+'先生');
        $('#healName').text(data.username);
    }else{
        $('#userHeadImg').removeAttr('src').attr('src','../../imgs/iframeImgs/u20.png');
        $('#gender').text('女');
        //姓名
        //$('#healName').text(data.username.slice(0,1)+'女士');
        $('#healName').text(data.username);
    }
    //保障
    $('#isPro').css('display','none');
    //vip
    if(data.vipSign == 1){
        $('#isVIP').css('display','block');
    }else{
        $('#isVIP').css('display','none');
    }
    //年龄
    if(data.age == '未知'){
        $('#age').text('年龄未知');
    }else{
        $('#age').text(data.age + '岁');
    }
    //解除警报人数
    //今日危险警报人数
    //关注度
    //病史
    //上次报警时间
    if(data.lastAlarmTime == ''){
        $('#lastWarnTime').text('暂无')
    }else{
        $('#lastWarnTime').text(data.lastAlarmTime);
    }
    //报警次数
    $('#alarmCount').text(data.alarmCount);
    //电话
    $('#phoneNum').text(data.simNum);
    //定位
    $('#add').text(data.location);
    //疾病风险
    $('#illNames').text('暂无风险');
    //状态
    $('#illStatus').text('无');

}
/*****************************************************************模态窗*/
$('.userMsgModal').css('display','none');
$('.closeUserMsg').click(function () {
    $('.userMsgModal').fadeOut(1000);
});
/********************************************************心率血压折线图*/
//心率折线图function
function heartRateLine(data1){
    var l = 100;
    if(data1.length <= 100){
        l = 100;
    }else if(data1.length <= 200){
        l = 60;
    }else if(data1.length <= 300){
        l = 50;
    }else if(data1.length <= 400){
        l = 40;
    }else if(data1.length <= 500){
        l = 30;
    }else if(data1.length <= 600){
        l = 20;
    }else if(data1.length <= 700){
        l = 10;
    }else{
        l = 5;
    }
    var hr = echarts.init(document.getElementById('heartRateLine'));
    var option = {
        //标题
        title:{
            text:'用户心率24小时监测风险点',
            left: '20px',
            top: 10,
            textStyle:{
                color: '#fff',
                fontSize: 15,
                fontWeight: 100
            }
        },
        //tooltip
        tooltip: {
            trigger: 'axis'
        },
        //大小边距调整
        grid:{
            left: "10%",
            right:"10%",
            top:"20%",
            bottom:"20%",
            containLabel:false
        },
        //x轴
        xAxis:{
            type: 'time',
            splitNumber: 7,
            boundaryGap: false,
            splitLine:{
                show:false
            },
            axisLine: { //x轴颜色
                lineStyle: {
                    color: "rgba(255,255,255,0.6)"
                }
            }
        },
        //x轴分割
        dataZoom:[
            {
                type: 'inside',
                start: 0,
                end: l
            }
        ],
        //y轴
        yAxis:{
            show: true,
            type: 'value',
            min: 50,
            max: 150,
            splitNumber: 2,
            splitLine: { //y轴分割线
                show: true,
                lineStyle:{
                    type:'dotted',
                    color:'rgba(255,255,255,0.2)'
                }

            },
            axisLine: { //y轴颜色
                show: false,
                lineStyle: {
                    color: "rgba(255,255,255,0.6)"
                }
            },
            /*axisTick: {
             show: true//是否显示y轴刻度
             },*/
            axisLabel: { //强制显示
                interval: 0,
                textStyle: { //y轴标签颜色
                    color: "rgba(255,255,255,0.6)"
                }
            }
        },
        //数据
        series:[
            {
                name:'心率',
                type:'line',            //折线图
                symbol: 'none', //去掉每个点的小圆点标记
                lineStyle:{
                    normal:{
                        color: '#0096FF'
                    }
                },
                data:data1,
                markPoint:{
                    label:{
                        normal:{
                            color:'auto'
                        }
                    },
                    itemStyle:{
                        normal:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(255,0,0,0.2)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(255,0,0,0.2)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        }
                    },
                    data:[
                        {type:'max',name:'最大值'},
                        {type:'min',name:'最小值'}
                    ]
                },
                smooth: false //是否平滑曲线显示
            }
        ]
    };
    //实用刚才指定的配置项和数据显示图表
    hr.setOption(option);
}
//血压折线图function
function bloodPressLine(dp,sp){
    var l = 100;
    if(dp.length <= 100){
        l = 100;
    }else if(dp.length <= 200){
        l = 60;
    }else if(dp.length <= 300){
        l = 50;
    }else if(dp.length <= 400){
        l = 40;
    }else if(dp.length <= 500){
        l = 30;
    }else if(dp.length <= 600){
        l = 20;
    }else if(dp.length <= 700){
        l = 10;
    }else{
        l = 5;
    }
    var pressImg = echarts.init(document.getElementById('bloodPressLine'));
    var option = {
        title: {
            text: '用户血压24小时监测风险点',
            left: '20px',
            top: 10,
            textStyle:{
                color: '#fff',
                fontSize: 15,
                fontWeight: 100
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        //大小边距调整
        grid:{
            left: "10%",
            right:"10%",
            top:"20%",
            bottom:"20%",
            containLabel:false
        },
        //x轴
        xAxis:{
            type: 'time',
            splitNumber: 7,
            boundaryGap: false,
            splitLine:{
                show:false
            },
            axisLine: { //x轴颜色
                lineStyle: {
                    color: "rgba(255,255,255,0.6)"
                }
            }
        },
        //x轴分割
        dataZoom:[
            {
                type: 'inside',
                start: 0,
                end: l
            }
        ],
        //y轴
        yAxis:{
            show: true,
            type: 'value',
            min: 50,
            max: 200,
            splitNumber: 3,
            splitLine: { //y轴分割线
                show: true,
                lineStyle:{
                    type:'dotted',
                    color:'rgba(255,255,255,0.2)'
                }

            },
            axisLine: { //y轴颜色
                show: false,
                lineStyle: {
                    color: "rgba(255,255,255,0.6)"
                }
            },
            /*axisTick: {
             show: true//是否显示y轴刻度
             },*/
            axisLabel: { //强制显示
                interval: 0,
                textStyle: { //y轴标签颜色
                    color: "rgba(255,255,255,0.6)"
                }
            }
        },
        series: [
            {
                name:'舒张压',
                type:'line',
                data:dp,
                symbol: 'none', //去掉每个点的小圆点标记
                lineStyle:{
                    normal:{
                        color: '#0096FF'
                    }
                },
                markPoint:{
                    itemStyle:{
                        normal:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(255,0,0,0.2)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(255,0,0,0.2)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        }
                    },
                    data:[
                        {type:'max',name:'最大值'},
                        {type:'min',name:'最小值'}
                    ]
                }
                /* markLine: {
                 data: [
                 {type: 'average', name: '平均值'}
                 ]
                 }*/
            },
            {
                name:'收缩压',
                type:'line',
                symbol: 'none', //去掉每个点的小圆点标记
                data:sp,
                color:'#fff',
                lineStyle:{
                    normal:{
                        color: '#F5A623'
                    }
                },
                markPoint:{
                    itemStyle:{
                        normal:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(255,0,0,0.2)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(255,0,0,0.2)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        }
                    },
                    data:[
                        {type:'max',name:'最大值'},
                        {type:'min',name:'最小值'}
                    ]
                }
                /*markLine: {
                 data: [
                 {type: 'average', name: '平均值'}
                 ]
                 }*/
            }
        ]
    };
    pressImg.setOption(option);
}