$(document).ready(function () {
    /**
     * ajax
     * */
    $.ajax({
        url:global_path + '/cms/index/selectIndexData',
        type:'post',
        dataType:'json',
        data:{
            "loginId":localStorage.loginId,
            "token":localStorage.token
        },
        success:function (data) {
            checkToken(data);
            if(data.code == 200){
                //图一
                var appNums = data.data.appNums;
                var arr1 = [];  //时间
                var arr2 = [];  //曲线一
                var arr3 = [];  //曲线二
                for(var i=0;i<appNums.length;i++){
                   arr1.push(appNums[i].date);
                   arr2.push(appNums[i].count);
                }
                var deviceNums = data.data.deviceNums;
                for(var i=0;i<deviceNums.length;i++){
                    arr3.push(deviceNums[i].count);
                }
                arr1.reverse();
                arr2.reverse();
                arr3.reverse();
                chart1(arr1,arr2,arr3);

                // 图二
                var level0Nums = data.data.level0Nums;
                // var arr4 = [];  //时间
                var arr4 = [];  //曲线二
                var arr5 = [];  //曲线一
                for(var i=0;i<level0Nums.length;i++){
                    // arr4.push(level0Nums[i].date);
                    arr4.push(level0Nums[i].count);
                }
                var level1Nums = data.data.level1Nums;
                for(var i=0;i<level1Nums.length;i++){
                    arr5.push(level1Nums[i].count);
                }
                arr4.reverse();
                arr5.reverse();
                chart2(arr1,arr5,arr4);

                //图二
                //列表
                //SOS呼叫数
                var needData = data.data.countList[0];
                console.log(needData.AbnormalData)
                $('#NoDispose').text(needData.AbnormalData);
                //app反馈数
                $('#NoRead').text(needData.NoRead);
                //服务协议未审核数
                $('#NoCheck').text(needData.NoCheck);
                //今日未处理预警数量
                $('#NotDealAlarmCount').text(needData.NotDealAlarmCount);
                // 数据异常
                $('#dataAbort').text(needData.AbnormalData);
                // 失联提醒
                $('#lostRemind').text(needData.loseInCount);

            }
        }
    })
});

/**
 * 图1
 * data1为app数 data2为设备数
 * */
function chart1(data1,data2,data3) {
    var chart1 = echarts.init(document.getElementById('chart1'));
    var option = {
        backgroundColor:'#E7F7FF',
        //标题
        title:{
            text:'用户增长',
            left: '20px',
            top: 10,
            textStyle:{
                color: '#000',
                fontSize: 20,
                fontWeight: 100
            }
        },
        //tooltip
        tooltip: {
            trigger: 'axis'
        },
        //大小边距调整
        grid:{
            left: "5%",
            right:"5%",
            top:"20%",
            bottom:"12%",
            containLabel:false
        },
        //x轴
        xAxis:{
            type: 'category',
            boundaryGap: false,
            splitLine:{
                show:false
            },
            data:data1,
            axisLine: { //x轴颜色
                lineStyle: {
                    color: "rgba(0,0,0,0.6)"
                }
            }
        },
        //y轴
        yAxis:{
            show: true,
            type: 'value',
           /* min: 0,
            max: 50,
            splitNumber: 2,*/
            splitLine: { //y轴分割线
                show: true,
                lineStyle:{
                    type:'dotted',
                    color:'rgba(238,245,247,0.6)'
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
            //app用户
            {
                name:'app用户',
                type:'line',            //折线图
                // sampling: 'average',
                symbol: 'none', //去掉每个点的小圆点标记
                lineStyle:{
                    normal:{
                        color:'#A6DE8A'
                       /* color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: 'red'},
                                {offset: 0.5, color: 'pink'},
                                {offset: 1, color: '#ddd'}
                            ]
                        )*/
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#A6DE8A'
                        }, {
                            offset: 1,
                            color: 'rgba(166, 222, 238,0.1)'
                        }])
                    }
                },
                data:data2,
                markPoint:{
                    label:{
                        normal:{
                            color:'rgba(255,255,255,1)'
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
                                    offset: 0, color: '#A6DE8A' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#E2EDFA' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        }
                    },
                   /* data:[
                        {type:'max',name:'最大值'},
                        {type:'min',name:'最小值'}
                    ]*/
                },
                smooth: true //是否平滑曲线显示
            },
            //设备
            {
                name:'设备',
                type:'line',            //折线图
                // sampling: 'average',
                symbol: 'none', //去掉每个点的小圆点标记   pin
                lineStyle:{
                    normal:{
                        color: 'rgba(95,176,255,1)'
                    }
                },
               /* areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(95,176,255,0.5)'
                        }, {
                            offset: 1,
                            color: 'rgba(95,176,255,0.1)'
                        }])
                    }
                },*/
                data:data3,
                markPoint:{
                    label:{
                        normal:{
                            color:'rgba(95,176,255,1)'
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
                                    offset: 0, color: 'rgba(11,120,227,0.1)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(95,176,255,1)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        }
                    },
                   /* data:[
                        {type:'max',name:'最大值'},
                        {type:'min',name:'最小值'}
                    ]*/
                },
                smooth: true //是否平滑曲线显示
            }
        ]
    };
    //实用刚才指定的配置项和数据显示图表
    chart1.setOption(option);
}
function chart2(data1,data2,data3) {
    var chart2 = echarts.init(document.getElementById('chart2'));
    var option = {
        backgroundColor:'#E7F7FF',
        //标题
        title:{
            text:'医疗救助',
            left: '20px',
            top: 10,
            textStyle:{
                color: '#000',
                fontSize: 20,
                fontWeight: 100
            }
        },
        //tooltip
        tooltip: {
            trigger: 'axis'
        },
        //大小边距调整
        grid:{
            left: "5%",
            right:"5%",
            top:"20%",
            bottom:"12%",
            containLabel:false
        },
        //x轴
        xAxis:{
            type: 'category',
            boundaryGap: false,
            splitLine:{
                show:false
            },
            data:data1,
            axisLine: { //x轴颜色
                lineStyle: {
                    color: "rgba(0,0,0,0.6)"
                }
            }
        },
        //y轴
        yAxis:{
            show: true,
            type: 'value',
            /*min: 0,
            max: 500,
            splitNumber: 2,*/
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
            //救护介入
            {
                name:'疾病',
                type:'line',            //折线图
                // sampling: 'average',
                symbol: 'none', //去掉每个点的小圆点标记
                lineStyle:{
                    normal:{
                        color:'rgba(252,207,122,1)'
                        /* color: new echarts.graphic.LinearGradient(
                             0, 0, 0, 1,
                             [
                                 {offset: 0, color: 'red'},
                                 {offset: 0.5, color: 'pink'},
                                 {offset: 1, color: '#ddd'}
                             ]
                         )*/
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(252,207,122,0.5)'
                        }, {
                            offset: 1,
                            color: 'rgba(252,207,122,0.1)'
                        }])
                    }
                },
                data:data2,
                markPoint:{
                    label:{
                        normal:{
                            color:'rgba(252,207,122,1)'
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
                                    offset: 0, color: 'rgba(252,207,122,0.5)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(252,207,122,0.1)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        }
                    },
                   /* data:[
                        {type:'max',name:'最大值'},
                        {type:'min',name:'最小值'}
                    ]*/
                },
                smooth: true //是否平滑曲线显示
            },
            //预警人数
            {
                name:'预警',
                type:'line',            //折线图
                // sampling: 'average',
                symbol: 'none', //去掉每个点的小圆点标记
                lineStyle:{
                    normal:{
                        color: 'rgba(234,163,245,1)'
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(234,163,245,0.54)'
                        }, {
                            offset: 1,
                            color: 'rgba(234,163,245,0.1)'
                        }])
                    }
                },
                data:data3,
                markPoint:{
                    label:{
                        normal:{
                            color:'rgba(234,163,245,1)'
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
                                    offset: 0, color: 'rgba(234,163,245,0.2)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(234,163,245,1)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        }
                    },
                   /* data:[
                        {type:'max',name:'最大值'},
                        {type:'min',name:'最小值'}
                    ]*/
                },
                smooth: true //是否平滑曲线显示
            }
        ]
    };
    //实用刚才指定的配置项和数据显示图表
    chart2.setOption(option);
}