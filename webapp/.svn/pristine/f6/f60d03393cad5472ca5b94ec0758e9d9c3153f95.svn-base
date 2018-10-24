var app = new Vue({
    el: '#app',
    data: {
        name: '赵郭磊',
        dates: ['06-12','06-13','06-14','06-15','06-16','06-17','06-18','06-19','06-20','06-21'],
        line1: {
            date1: [58,49,58,56,63,49,51,64,61,36],
            date2: [42,36,42,43,41,28,33,64,44,38],
        },
        line2: {
            date1: [119,137,128,129,112,123,145,127,142,99],
            date2: [89,89,88,174,38,44,69,46,28,22]
        }
    },
    mounted: function () {
        localStorage.loginId = 'zhanshi4';
        localStorage.token = '123456';
        localStorage.sign = '1';
        var _this = this;
        _this.ech1();
        _this.ech2();
    },
    methods: {
        ech1: function () {
            var _this = this;
            var chart1 = echarts.init(document.getElementById('chart1'));
            var option = {
                //标题
                title:{
                    text:'唐山用户增长',
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
                    data:_this.dates,
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
                    }
                },
                //数据
                series:[
                    //app用户
                    {
                        name:'app用户',
                        type:'line',            //折线图
                        symbol: 'none', //去掉每个点的小圆点标记
                        lineStyle:{
                            normal:{
                                color:'#A6DE8A'
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
                        data:_this.line1.date1,
                        smooth: true //是否平滑曲线显示
                    },
                    //设备
                    {
                        name:'设备',
                        type:'line',            //折线图
                        symbol: 'none', //去掉每个点的小圆点标记   pin
                        lineStyle:{
                            normal:{
                                color: 'rgba(95,176,255,1)'
                            }
                        },
                        data:_this.line1.date2,
                        smooth: true //是否平滑曲线显示
                    }
                ]
            };
            //实用刚才指定的配置项和数据显示图表
            chart1.setOption(option);
        },
        ech2: function () {
            var _this = this;
            var chart2 = echarts.init(document.getElementById('chart2'));
            var option = {
                //标题
                title:{
                    text:'唐山医疗救助',
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
                    data: _this.dates,
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
                        data: _this.line2.date1,
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
                        data:_this.line2.date2,
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
    }
});