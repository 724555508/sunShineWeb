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
        count:'0',
        allAlarmCount:'0',
        todayAlarmCount:'0',
        alarmList:[
            {username:''}
        ],
        level:'',
        date:'',
        dataX:[],
        dataY:[],
        lineX:[],
        lineY:[]
    },
    mounted:function(){
        this.getData();
        //六十分钟刷新一次
        setInterval(this.reload,600000);
    },
    methods:{
        init:function(){
        },
        getData:function(){
            var that = this;
            $.ajax({
                url:global_path + '/cms/agent/selectAlarmData',
                type:'post',
                dataType:'json',
                data:obj,
                success:function (res) {
                    checkToken(res);
                    var data = res.data;
                    that.count = data.count;
                    that.allAlarmCount = data.allAlarmCount;
                    that.todayAlarmCount = data.todayAlarmCount;
                    if(data.alarmList != null || data.alarmList != ''){
                        that.alarmList = data.alarmList;
                        for(var i in that.alarmList){
                            // 对用户名中间一位进行隐藏
                            if(that.alarmList[i].username != '' && that.alarmList[i].username){
                                var name1 = that.alarmList[i].username;
                                name1 = name1.split('');
                                name1.splice(1,1,'*');
                                that.alarmList[i].username = name1.join('');
                            }
                            if(that.alarmList[i].level == 2){
                                if(that.alarmList[i].status == 2){
                                    that.status = '脑梗风险预警'
                                }else{
                                    that.status = '心梗风险预警'
                                }
                            }
                        }
                    }
                    that.date = data.date;
                    // 柱状图
                    that.dataX= [];
                    that.dataY= [];
                    for(var key in data.riskMap){
                        that.dataX.push(key);
                        that.dataY.push(data.riskMap[key]);
                    }
                    // 折线图
                    that.lineX= [];
                    that.lineY= [];
                    for(var key in data.disposeTimeSlotNum){
                        that.lineX.push(key);
                        that.lineY.push(data.disposeTimeSlotNum[key]);
                    }
                    that.bar();
                    that.line();
                },
                error:function(){

                }
            })

        },
        // 柱状图
        bar:function(){
            var that = this;
            // that.max = '';
            var barCanvas = echarts.init(document.getElementById('barCanvas'));
            // app.title = '坐标轴刻度与标签对齐';
            option = {
                grid: {
                    left: '1%',
                    right: '1%',
                    bottom: '0%',
                    containLabel: true
                },
                dataZoom:{
                    type:'inside'
                    // start: 0,
                    // end: 90
                },
                xAxis: {
                    data: that.dataX,
                    axisLabel: {
                        inside: false,  //让x轴的文字在外面显示
                        textStyle: {
                            color: '#a3a3a3',
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
                    splitLine: { //y轴分割线
                        show: true,
                        lineStyle:{
                            type:'dotted',
                            color: "rgba(255,255,255,0.2)"
                        }
                    }

                },
                series: [
                    { // For shadow
                        type: 'bar',
                        barWidth : 48,//柱图宽度
                        itemStyle:{
                            normal:{
                                color:'rgba(0,0,0,0.05)',
                                //顶端显示value值 0则不显示
                                label: {
                                    show: true,
                                    position: 'top',  //顶端显示value值 0则不显示
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: "20"
                                    },
                                    formatter: function(params) {
                                        //params.value === 1 ||
                                        if ( params.value == 0) {
                                            return '';
                                        } else {
                                            return params.value;
                                        }
                                    }
                                },
                            }
                        },
                        barGap:'-100%',
                        barCategoryGap:'40%',
                        // data: dataShadow,
                        animation: false
                    },
                    {
                        type: 'bar',
                        barWidth:48,
                        itemStyle: {
                            // 在默认状态下的样式
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#F09819 '},
                                        {offset: 0.7, color: '#FF5858 '}
                                    ]
                                ),
                                label: {
                                    show: true,
                                    position: 'top',  //顶端显示value值 0则不显示
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: "24"
                                    },
                                    formatter: function(params) {
                                        //params.value === 1 ||
                                        if ( params.value == 0) {
                                            return '';
                                        } else {
                                            return params.value;
                                        }
                                    }
                                },

                            },
                        },
                        data: that.dataY
                    }
                ]
            };

// Enable data zoom when user click bar.
//             var zoomSize = 6;
//             myChart.on('click', function (params) {
//                 console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
//                 myChart.dispatchAction({
//                     type: 'dataZoom',
//                     startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
//                     endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
//                 });
//             });
            barCanvas.clear();
            //配置项生成统计图
            barCanvas.setOption(option);
        },
        line:function(){
            var that = this;
            var lineCanvas = echarts.init(document.getElementById('lineCanvas'));
            option = {
                title: {
                    text: '',
                    textStyle:{
                        color:'#fff',
                        fontSize:'18'
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '20px',
                    right: '20px',
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
                    data: that.lineX
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
                            color: "#1F1F1F",
                            fontSize:'16'
                        }
                    },
                    axisTick: {
                        show: false//是否显示y轴刻度
                    },
                    show:true,
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
                        name:'预警服务进度',
                        type:'line',
                        color:'#0096FF',
                        // stack: '总量',
                        itemStyle : {
                            normal : {
                                lineStyle:{
                                    color:'#0096FF'
                                },
                                label: {
                                    show: true,
                                    position: 'top',  //顶端显示value值 0则不显示
                                    textStyle: {
                                        color: '#FFF',
                                        fontSize: "14"
                                    },
                                    formatter: function(params) {
                                        //params.value === 1 ||
                                        if ( params.value == 0) {
                                            return '';
                                        } else {
                                            return params.value;
                                        }
                                    }
                                },
                            }
                        },
                        data:that.lineY
                    }
                ]
            };
            lineCanvas.clear();
//             //配置项生成统计图
            lineCanvas.setOption(option);
        },
        /**
         * 页面刷新
         * */
        reload: function () {
            window.location.reload();
        }
    }
})