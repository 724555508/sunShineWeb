var main = new Vue({
    el: '#main',
    data: {
        map: {
            AllSOSNum: 0,
            TodaySOSNum: 0,
            illness: 0,
            noDispose: 0,
            unknown: 0,
            risks: 0,
            unusually: 0
        },
        sosList: [],
        date: '',
        dateArr: [],
        riskArr: [756,558,174,253,843,845,123,144,647,963,254,125,484,512,663,231,524,890,254,125,174,253,843,845,756,558,174,253,444,325],
        userArr: []
    },
    mounted: function () {
        var _this = this;
        //数据
        _this.ajaxInit();
        //日期数组
        for(let i = 0; i < 30; i ++){
            _this.dateArr.push(_this.getNeedDate(i))
        }
        _this.dateArr = _this.dateArr.reverse();
        //十分钟刷新一次
        setInterval(this.reload,600000);
        //如果有sos实时预警，则后台推送，前端刷
        this.sosSend();

    },
    methods: {
        /**
         * 数据
         * */
        ajaxInit: function () {
            var _this = this;
            $.ajax({
                url: global_path + '/cms/agent/selectSosData',
                type: 'post',
                dataType: 'json',
                data: {
                    loginId: localStorage.loginId,
                    token: localStorage.token
                },
                success: function (res) {
                    checkToken(res);
                    if(res.code === 200){
                        _this.map.AllSOSNum = res.data.map.AllSOSNum;
                        _this.map.TodaySOSNum = res.data.map.TodaySOSNum;
                        _this.map.illness = res.data.map.illness;
                        _this.map.noDispose = res.data.map.noDispose;
                        _this.map.unknown = res.data.map.unknown;
                        _this.map.unusually = res.data.map.unusually;
                        _this.sosList = res.data.sosList;
                        _this.date = res.data.date;
                        _this.userArr = res.data.list.reverse();
                        //饼图
                        _this.pieImg();
                        //折线图
                        _this.lineImg();
                    }
                },
                error: function () {
                    layer.msg('网络异常');
                }
            })
        },
        /**
         * 饼图
         * *月*日用户肿瘤风险汇总
         * */
        pieImg: function () {
            var _this = this;
            //容器
            var pieImg = echarts.init(document.getElementById('pieImg'));
            //配置
            var option = {
                //标题
                title:{
                    text:_this.date + '用户肿瘤风险汇总',
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
                    right: 80,
                    top: 80,
                    data: ['数据不足','未见异常','器官肿瘤风险','有肿瘤风险'],
                    textStyle:{
                        color: '#fff',
                        fontWeight: 100,
                        fontSize: 16,
                        padding: 10
                    },
                    formatter: function(name) {
                        if(name === '数据不足'){
                            return ' 数据不足: ' + _this.map.unknown;
                        }else if(name === '未见异常'){
                            return ' 未见异常: ' + _this.map.unusually;
                        }else if(name === '有肿瘤风险'){
                            return ' 有肿瘤风险: ' + _this.map.illness;
                        }else if(name === '器官肿瘤风险'){
                            return ' 器官肿瘤风险: ' + _this.userArr[_this.userArr.length - 1];
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
                        color:['rgba(241,241,241,1)','green', 'rgba(239,201,119,1)','rgba(251,93,93,1)','#d91dff'],
                        hoverAnimation:true,    //扇形打开效果
                        startAngle:250,         //起始角度
                        roseType: false,
                        type: 'pie',
                        radius: '65%',
                        center: ['35%', '50%'], //位置：x轴 y轴
                        data:[
                            {
                                name: '数据不足',
                                value: _this.map.unknown
                            },
                            {
                                name: '未见异常',
                                value: _this.map.unusually
                            },
                            {
                                name: '器官肿瘤风险',
                                value: _this.map.illness
                            },
                            {
                                name: '有肿瘤风险',
                                value: _this.riskArr[29]
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
                                    fontSize : 20    //文字的字体大小
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
        /**
         * 折线图
         * */
        lineImg: function () {
            var _this = this;
            var lineImg = echarts.init(document.getElementById('lineImg'));
            var option = {
                title:{
                    text: '用户肿瘤风险趋势',
                    left: '0',
                    top: 0,
                    textStyle:{
                        color: '#fff',
                        fontWeight: 100,
                        fontSize: 30
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                /*legend: {
                    data:['肿瘤风险用户','器官风险用户']
                },*/
                grid: {
                    left: '30px',
                    right: '15px',
                    bottom: '30px',
                    containLabel: false
                },
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
                    data: _this.dateArr
                },
                yAxis: {
                    type: 'value',
                    axisLine: { //y轴颜色
                        show: false,
                        lineStyle: {
                            color: "#F7FCFF",
                            width:0
                        }
                    },
                    axisLabel: { //强制显示
                        show:false,
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
                        name:'器官风险用户',
                        type:'line',
                        itemStyle : {
                            normal : {
                                lineStyle:{
                                    color:'#EA4A4A '
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
                        data:_this.userArr
                    },
                   /* {
                        name:'肿瘤风险用户',
                        type:'line',
                        data:_this.riskArr,
                        itemStyle : {
                            normal : {
                                lineStyle:{
                                    color:'#0096FF'
                                },
                                label: {
                                    show: true,
                                    position: 'top',  //顶端显示value值 0则不显示
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: "12"
                                    },
                                    formatter: function(params) {
                                        if ( params.value === 0) {
                                            return '';
                                        } else {
                                            return params.value;
                                        }
                                    }
                                },
                            }
                        }
                    },*/
                ]
            };
            lineImg.clear();
            //配置项生成统计图
            lineImg.setOption(option);
        },
        /**
         * 时间
         * */
        getNeedDate: function (t) {
            var date = new Date(new Date() - t * 24 * 60 * 60 * 1000);
            var mon = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
            var day = date.getDate() > 10 ? date.getDate() : '0' + (date.getDate());
            return mon + '/' + day;
        },
        /**
         * 页面刷新
         * */
        reload: function () {
            window.location.reload();
        },
        /**
         * sos后台推送
         * */
        sosSend: function () {
            var _this = this;
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
                    if(result.content == 2){
                        _this.reload();
                    }
                }
            });

        }

    }
});