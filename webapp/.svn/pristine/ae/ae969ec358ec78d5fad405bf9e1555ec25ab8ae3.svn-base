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
obj.loginId = localStorage.loginId;
obj.token = localStorage.token;
var app = new Vue({
    el:'#app',
    data: {
        data:[],
        dataxAxis:[],
        datayAxis:[],
        dayTime1:[],
        deviceValue1:[],
        appValue1:[],
        dayTime2:[],
        deviceValue2:[],
        appValue2:[],
        dayTime3:[],
        deviceValue3:[],
        appValue3:[]
    },
    mounted:function(){
        this.getData();
        //十分钟刷新一次
        setInterval(this.reload,600000);
    },
    methods:{
        init:function(){
        },
        getData:function(){
            var that = this;
            $.ajax({
                url:global_path + '/cms/agent/selectMedicalHistoryAndUserGrowth',
                type:'post',
                dataType:'json',
                data:obj,
                success:function (res) {
                    checkToken(res);
                    that.data = res.data.medicalHistory;
                    // console.log(that.data[0].count);
                    that.dataxAxis = []; //柱状图x轴数据
                    that.datayAxis = []; //柱状图Y轴数据
                    if(that.data.length != '' || that.data.length != undefined){
                        for(var i=0;i<that.data.length;i++){
                            that.dataxAxis.push(that.data[i].medicalHistory);
                            that.datayAxis.push(that.data[i].count);
                        }
                    }
                    // 每天的数据
                    var deviceData1 = res.data.appNums_day;  //佩戴用户
                    that.dayTime1 = [];
                    that.deviceValue1 = [];
                    for(var key in deviceData1){
                        that.deviceValue1.push(deviceData1[key]);
                        that.dayTime1.push(key);
                    }
                    var appData1 = res.data.deviceNums_day;  //app用户
                    that.appValue1 = [];
                    for(var key in appData1){
                        that.appValue1.push(appData1[key]);
                    }
                    // 每周数据
                    var deviceData2 = res.data.deviceNums_week;  //佩戴用户
                    that.dayTime2 = [];
                    that.deviceValue2 = [];
                    for(var key in deviceData2){
                        that.deviceValue2.push(deviceData2[key]);
                        that.dayTime2.push(key);
                    }
                    var appData2 = res.data.appNums_week;  //app用户
                    that.appValue2 = [];
                    for(var key in appData2){
                        that.appValue2.push(appData2[key]);
                    }
                    // 每月数据
                    var deviceData3 = res.data.deviceNums_month;  //佩戴用户
                    that.dayTime3 = [];
                    that.deviceValue3 = [];
                    for(var key in deviceData3){
                        that.deviceValue3.push(deviceData3[key]);
                        that.dayTime3.push(key);
                    }
                    var appData3 = res.data.appNums_month;  //app用户
                    that.appValue3 = [];
                    for(var key in appData3){
                        that.appValue3.push(appData3[key]);
                    }

                    that.bar();
                    that.line1();
                    that.line2();
                    that.line3();
                    that.pieImg();

                },
                error:function(){

                }
            })

        },
        // 柱状图
        bar:function(){
            var that = this;
            // that.max = '';
            var barCanvas = echarts.init(document.getElementById('barEcharts'));
            // app.title = '坐标轴刻度与标签对齐';
            option = {
                // title: {
                //     text: '特性示例：渐变色 阴影 点击缩放',
                //     subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
                // },
                grid: {
                    left: '1%',
                    right: '1%',
                    bottom: '8%',
                    // top:'5%',
                    containLabel: true
                },
                dataZoom:{
                    type:'inside'
                    // start: 0,
                    // end: 90
                },
                xAxis: {
                    data: that.dataxAxis,
                    axisLabel: {
                        inside: false,  //让x轴的文字在外面显示
                        textStyle: {
                            color: '#fff',
                            fontSize: '14'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#FFFFFF"//x轴颜色

                        }
                    },
                    z: 10
                },
                yAxis: {
                    // type : 'value',
                    // axisLine: { //y轴颜色
                    //     lineStyle: {
                    //         color: "#F5f5f5"
                    //     }
                    // },
                    // splitLine:{
                    //     show:true,
                    //     lineStyle:{
                    //         color:'#F3F3F3',
                    //         width: 3
                    //     }
                    // }
                    axisLine: { //不要y轴坐标轴
                        show: false
                    },
                    axisTick: {  //y轴刻度不显示
                        show: false,
                        axisLine : {onZero: false},
                    },
                    axisLabel: {  //不显示坐标值
                        textStyle: {
                            color: '#1F1F1F'
                        },
                    },
                    splitLine: { //y轴分割线  变成虚线
                        show: true,
                        lineStyle:{
                            type:'dotted',
                            color: "rgba(255,255,255,0.2)"
                        }
                    }

                },
                series: [
                    // { // For shadow
                    //     type: 'bar',
                    //     barWidth : 48,//柱图宽度
                    //     itemStyle:{
                    //         normal:{
                    //             color:'rgba(0,0,0,0.05)',
                    //             //顶端显示value值 0则不显示
                    //             label: {
                    //                 show: true,
                    //                 position: 'top',  //顶端显示value值 0则不显示
                    //                 textStyle: {
                    //                     color: '#fff',
                    //                     fontSize: "12"
                    //                 },
                    //                 formatter: function(params) {
                    //                     //params.value === 1 ||
                    //                     if ( params.value == 0) {
                    //                         return '';
                    //                     } else {
                    //                         return params.value;
                    //                     }
                    //                 }
                    //             },
                    //         }
                    //     },
                    //     barGap:'-100%',
                    //     barCategoryGap:'40%',
                    //     // data: dataShadow,
                    //     animation: false
                    // },
                    {
                        type: 'bar',
                        barWidth:48,
                        itemStyle: {
                            // 在默认状态下的样式
                            normal: {
                                color: function(params) {
                                    //首先定义一个数组
                                    var colorList = [   //给每个柱子设置不同的颜色
                                        '#ff3333','#F76B1C ','#B4EC51','#009EFD',
                                        '#F5576C', '#F09819'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                               /* label: {
                                    show: true,
                                    position: 'top',  //顶端显示value值 0则不显示
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: "18"
                                    },
                                    formatter: function(params) {
                                        //params.value === 1 ||
                                        if ( params.value == 0) {
                                            return '';
                                        } else {
                                            return params.value;
                                        }
                                    }
                                },*/

                            },
                        },
                        data: that.datayAxis
                    }
                ]
            };
            barCanvas.clear();
            //配置项生成统计图
            barCanvas.setOption(option);
        },
        // 饼图
        pieImg: function () {
            var _this = this;
            //容器
            var pieImg = echarts.init(document.getElementById('pieCanvas'));
            //配置
            var option = {
                //标题
                title:{
                    // text:_this.date + '用户健康状况汇总',
                    left: '0',
                    top: 0,
                    textStyle:{
                        color: '#fff',
                        fontWeight: 100,
                        fontSize: 30
                    }
                },
                //图例
                legend: {
                    type: 'plain',
                    show: true,
                    orient: 'vertical',
                    right: 40,
                    top: 'center',
                    data: ['冠心病','心梗','糖尿病','脑卒中','腔梗','高血压'],
                    textStyle:{
                        color: '#fff',
                        fontWeight: 100,
                        fontSize: 16,
                        padding: 5
                    },
                    formatter: function(name) {
                        if(name === '冠心病'){
                            return ' 冠心病 ' /*+ _this.data[0].count*/;
                        }else if(name === '心梗'){
                            return ' 心梗 ' /*+ _this.data[1].count*/;
                        }else if(name === '糖尿病'){
                            return ' 糖尿病 ' /*+ _this.data[2].count*/;
                        }else if(name === '脑卒中'){
                            return ' 脑卒中 ' /*+ _this.data[3].count*/;
                        }else if(name === '腔梗'){
                            return ' 腔梗' /*+ _this.data[4].count*/;
                        }else if(name === '高血压'){
                            return ' 高血压 ' /*+ _this.data[5].count*/;
                        }
                    }
                },
                //鼠标悬浮提示
                tooltip : {
                    trigger: 'item'
                },
                //大小边距调整
                grid:{
                    left: "0%",
                    right:"0%",
                    top:"0%",
                    bottom:"0%",
                    containLabel:false
                },
                series : [
                    {
                        color:['#ff3333 ','#F76B1C ', '#B4EC51 ','#009EFD','#F5576C','#F09819'],
                        hoverAnimation:true,    //扇形打开效果
                        startAngle:250,         //起始角度
                        roseType: false,
                        type: 'pie',
                        radius: '65%',
                        center: ['35%', '50%'], //位置：x轴 y轴
                        data:[
                            {
                                name: '冠心病',
                                value: _this.data[0].count
                            },
                            {
                                name: '心梗',
                                value:_this.data[1].count
                            },
                            {
                                name: '糖尿病',
                                value: _this.data[2].count
                            },
                            {
                                name: '脑卒中',
                                value: _this.data[3].count
                            },
                            {
                                name: '腔梗',
                                value: _this.data[4].count
                            },
                            {
                                name: '高血压',
                                value: _this.data[5].count
                            }
                        ],
                        tooltip:{
                            formatter:'{b}:{c},占比{d}%'
                        },
                        label:{            //饼图图形上的文本标签
                            normal:{
                                show:true,
                                position:'inner', //标签的位置
                                textStyle : {
                                    color:'rgba(0,0,0,0.6)',
                                    fontSize : 15    //文字的字体大小
                                },
                                formatter:function (data) {
                                    if(data.data.value === 0){
                                        return '';
                                    }else {
                                        return data.percent + '%';
                                    }
                                }
                            }
                        },

                    }
                ]
            };
            //作图
            pieImg.setOption(option);
        },
        // 折线图
        line1:function(){
            var that = this;
            var lineChart1 = echarts.init(document.getElementById('lineChart1'));
            option = {
                title: {
                    text: '每日新增服务数量',
                    textStyle:{
                        color:'#fff',
                        fontSize:'18'
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                // legend: {
                //     data:['佩戴用户','APP用户']
                // },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '0',
                    containLabel: true
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: 'category',
                    axisLabel :{//标签设置
                        color:"#a3a3a3",
                        fontSize: "14"
                    },
                    axisTick: {  //去掉x轴刻度线
                        show: false
                    },
                    axisLine: { //x轴颜色
                        show: false,
                        lineStyle: {
                            color: "#F7FCFF"
                        }
                    },
                    boundaryGap: false,
                    data: that.dayTime1.reverse()
                },
                yAxis: {
                    type: 'value',
                    axisLine: { //y轴颜色
                        lineStyle: {
                            color: "#F7FCFF",
                            width:0
                        }
                    },
                    axisLabel: { //强制显示
                        interval: 0,
                        textStyle: { //y轴标签颜色
                            color: "#a3a3a3",
                            fontSize:'14'
                        }
                    },
                    axisTick: {
                        show: false//是否显示y轴刻度
                    },
                    // show:true,
                    // min: 50,
                    // max: 100,
                    // splitNumber: 4,
                    splitLine: { //y轴分割线
                        show: true,
                        lineStyle:{
                            type:'dotted',
                            color: "rgba(255,255,255,0.2)"
                        }
                    },
                },
                series: [
                    {
                        name:'APP用户',
                        type:'line',
                        itemStyle : {
                            normal : {
                                lineStyle:{
                                    color:'#FB5D5D'
                                }
                            }
                        },
                        data:that.appValue1.reverse()
                    },
                    {
                        name:'佩戴用户',
                        type:'line',
                        itemStyle : {
                            normal : {
                                lineStyle:{
                                    color:'#0096FF'
                                }
                            }
                        },
                        data:that.deviceValue1.reverse()
                    }

                ]
            };
            lineChart1.clear();
//             //配置项生成统计图
            lineChart1.setOption(option);
        },
        line2:function(){
            var that = this;
            var lineChart2 = echarts.init(document.getElementById('lineChart2'));
            option = {
                title: {
                    text: '每周新增服务数量',
                    textStyle:{
                        color:'#fff',
                        fontSize:'18'
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                // legend: {
                //     data:['邮件营销','联盟广告']
                // },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '0',
                    containLabel: true
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: 'category',
                    axisLabel :{//标签设置
                        color:"#a3a3a3",
                        fontSize: "14"
                    },
                    axisTick: {  //去掉x轴刻度线
                        show: false
                    },
                    axisLine: { //x轴颜色
                        show: false,
                        lineStyle: {
                            color: "#F7FCFF"
                        }
                    },
                    boundaryGap: false,
                    data: that.dayTime2.reverse()
                },
                yAxis: {
                    type: 'value',
                    axisLine: { //y轴颜色
                        lineStyle: {
                            color: "#F7FCFF",
                            width:0
                        }
                    },
                    axisLabel: { //强制显示
                        interval: 0,
                        textStyle: { //y轴标签颜色
                            color: "#a3a3a3",
                            fontSize:'14'
                        }
                    },
                    axisTick: {
                        show: false//是否显示y轴刻度
                    },
                    // show:true,
                    // min: 50,
                    // max: 100,
                    // splitNumber: 4,
                    splitLine: { //y轴分割线
                        show: true,
                        lineStyle:{
                            type:'dotted',
                            color: "rgba(255,255,255,0.2)"
                        }
                    },
                },
                series: [
                    {
                        name:'APP用户',
                        type:'line',
                        itemStyle : {
                            normal : {
                                lineStyle:{
                                    color:'#FB5D5D'
                                }
                            }
                        },
                        data:that.appValue2.reverse()
                    },
                    {
                        name:'佩戴用户',
                        type:'line',
                        itemStyle : {
                            normal : {
                                lineStyle:{
                                    color:'#0096FF'
                                }
                            }
                        },
                        data:that.deviceValue2.reverse()
                    }

                ]
            };
            lineChart2.clear();
//             //配置项生成统计图
            lineChart2.setOption(option);
        },
        line3:function(){
            var that = this;
            var lineChart3 = echarts.init(document.getElementById('lineChart3'));
            option = {
                title: {
                    text: '每月新增服务数量',
                    textStyle:{
                        color:'#fff',
                        fontSize:'18'
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                // legend: {
                //     data:['邮件营销','联盟广告']
                // },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '0',
                    containLabel: true
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: 'category',
                    axisLabel :{//标签设置
                        color:"#a3a3a3",
                        fontSize: "14"
                    },
                    axisTick: {  //去掉x轴刻度线
                        show: false
                    },
                    axisLine: { //x轴颜色
                        show: false,
                        lineStyle: {
                            color: "#F7FCFF"
                        }
                    },
                    boundaryGap: false,
                    data: that.dayTime3.reverse()
                },
                yAxis: {
                    type: 'value',
                    axisLine: { //y轴颜色
                        lineStyle: {
                            color: "#F7FCFF",
                            width:0
                        }
                    },
                    axisLabel: { //强制显示
                        interval: 0,
                        textStyle: { //y轴标签颜色
                            color: "#a3a3a3",
                            fontSize:'14'
                        }
                    },
                    axisTick: {
                        show: false//是否显示y轴刻度
                    },
                    // show:true,
                    // min: 50,
                    // max: 100,
                    // splitNumber: 4,
                    splitLine: { //y轴分割线
                        show: true,
                        lineStyle:{
                            type:'dotted',
                            color: "rgba(255,255,255,0.2)"
                        }
                    },
                },
                series: [
                    {
                        name:'APP用户',
                        type:'line',
                        itemStyle : {
                            normal : {
                                lineStyle:{
                                    color:'#FB5D5D'
                                }
                            }
                        },
                        data:that.appValue3.reverse()
                    },
                    {
                        name:'佩戴用户',
                        type:'line',
                        itemStyle : {
                            normal : {
                                lineStyle:{
                                    color:'#0096FF'
                                }
                            }
                        },
                        data:that.deviceValue3.reverse()
                    }

                ]
            };
            lineChart3.clear();
//             //配置项生成统计图
            lineChart3.setOption(option);
        },
        /**
         * 页面刷新
         * */
        reload: function () {
            window.location.reload();
        }
    }
});