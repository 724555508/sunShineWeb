var app = new Vue({
    el: '#app',
    data: {
        map: {
            QMI: 0,
            cerebral: 0,
            health: 0,
            illness: 0,
            subHealth: 0
        },
        sexNum: {
            manNum: 0,
            womanNum: 0,
            percent1: 0,
            percent2: 0
        },
        maleFemaleRatioBeans: []
    },
    mounted: function () {
        this.getUserHealthInfoData();
        //十分钟刷新一次
        setInterval(this.reload,600000);

    },
    methods: {
        /**
         * ajax数据
         * */
        getUserHealthInfoData: function () {
            var _this = this;
            //数据加载
            $.ajax({
                url: global_path + '/cms/agent/selectMaleFemaleRatio',
                type: 'post',
                dataType: 'json',
                data: {
                    loginId: localStorage.loginId,
                    token: localStorage.token
                },
                success: function (res) {
                    checkToken(res);
                    if(res.code === 200){
                        _this.map.QMI = res.data.map.QMI;
                        _this.map.cerebral = res.data.map.cerebral;
                        _this.map.health = res.data.map.health;
                        _this.map.illness = res.data.map.illness;
                        _this.map.subHealth = res.data.map.subHealth;
                        _this.sexNum.manNum = res.data.map.manNum;
                        _this.sexNum.womanNum = res.data.map.womanNum;
                        _this.maleFemaleRatioBeans = res.data.maleFemaleRatioBeans;
                        _this.date = res.data.date;
                        //饼图
                        _this.pieImg();
                        //男女比例柱图
                        _this.sexBarImg();
                        //年龄分布
                        _this.genderBarImg();
                    }else {
                        layer.msg(res.msg);
                    }
                }
            });
        },
        /**
         * 饼图
         * */
        pieImg: function () {
            var _this = this;
            //容器
            var pieImg = echarts.init(document.getElementById('pieImg'));
            //配置
            var option = {
                //标题
                title:{
                    text:_this.date + '用户健康状况汇总',
                    left: '20px',
                    top: 10,
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
                    top: 120,
                    data: ['脑梗风险','心梗风险','疾病','亚健康','健康'],
                    textStyle:{
                        color: '#fff',
                        fontWeight: 100,
                        fontSize: 16,
                        padding: 10
                    },
                    formatter: function(name) {
                        if(name === '健康'){
                            // return ' 健康: ' + _this.map.health;
                            return ' 健康';
                        }else if(name === '亚健康'){
                            return ' 亚健康: ' + _this.map.subHealth;
                        }else if(name === '疾病'){
                            return ' 疾病: ' + _this.map.illness;
                        }else if(name === '心梗风险'){
                            return ' 心梗风险: ' + _this.map.QMI;
                        }else if(name === '脑梗风险'){
                            return ' 脑梗风险: ' + _this.map.cerebral;
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
                        color:['#d91dff','#f16c0e','#fb5d5d','#efc977','green'],
                        hoverAnimation:true,    //扇形打开效果
                        startAngle:250,         //起始角度
                        roseType: false,
                        type: 'pie',
                        radius: '70%',
                        center: ['25%', '50%'], //位置：x轴 y轴
                        data:[
                            {
                                name: '脑梗风险',
                                value: _this.map.cerebral
                            },
                            {
                                name: '心梗风险',
                                value: _this.map.QMI
                            },
                            {
                                name: '疾病',
                                value: _this.map.illness
                            },
                            {
                                name: '亚健康',
                                value: _this.map.subHealth
                            },
                            {
                                name: '健康',
                                value: _this.map.health
                            },




                        ],
                        tooltip:{
                            formatter:'{b}:{c},占比{d}%'
                        },
                        label:{            //饼图图形上的文本标签
                            normal:{
                                show:true,
                                position:'inner', //标签的位置
                                textStyle : {
                                    color:'rgba(255,255,255,1)',
                                    fontSize : 24    //文字的字体大小
                                },
                                formatter:function (data) {
                                    if(data.data.value == 0){
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
         * 男女柱图
         * */
        sexBarImg: function () {
            $('.colorBox').siblings().fadeIn(500);
            var _this = this;
            var totalNum = _this.sexNum.manNum + _this.sexNum.womanNum;
            _this.sexNum.percent1 = (_this.sexNum.manNum / totalNum).toFixed(2) * 100;
            _this.sexNum.percent2 = 100 - _this.sexNum.percent1;
            $('#fill1').animate({'width': _this.sexNum.percent1 + '%'},800);
            $('#fill2').animate({'width': _this.sexNum.percent2 + '%'},800);
        },
        /**
         * 性别年龄分布
         * */
        genderBarImg: function () {
            var _this = this;
            //判断值是否为0，若为0则改为1
            var barArr = _this.maleFemaleRatioBeans;
            console.log(barArr);
            var genderImg = echarts.init(document.getElementById('genderImg'));//对应容器
            var builderJson = {
                "all": 1000,
                "charts": {
                    "20岁以下": barArr[7].manNum,
                    "20-30岁": barArr[6].manNum,
                    "30-40岁": barArr[5].manNum,
                    "40-50岁": barArr[4].manNum,
                    "50-60岁": barArr[3].manNum,
                    "60-70岁": barArr[2].manNum,
                    "70-80岁": barArr[1].manNum,
                    "80岁以上": barArr[0].manNum
                },
                "charts2": {
                    "20岁以下": barArr[7].womenNum,
                    "20-30岁": barArr[6].womenNum,
                    "30-40岁": barArr[5].womenNum,
                    "40-50岁": barArr[4].womenNum,
                    "50-60岁": barArr[3].womenNum,
                    "60-70岁": barArr[2].womenNum,
                    "70-80岁": barArr[1].womenNum,
                    "80岁以上": barArr[0].womenNum
                },
            };
            var option = {
                title: {
                    text: '用户性别年龄分布',
                    textStyle: {
                        color: '#fff',
                        fontSize: '30',
                        fontWeight: 'normal'
                    },
                    left: 20,
                    top: 10
                },
                //鼠标悬浮提示
               /* tooltip : {
                    trigger: 'item'
                },*/
                legend: {
                    type: 'plain',
                    show: true,
                    orient: 'horizontal',
                    right: 40,
                    top: 55,
                    data: ['男用户','女用户'],
                    textStyle:{
                        color: '#fff',
                        fontWeight: 100,
                        fontSize: 16,
                        padding: 10
                    }
                },
                grid: [{
                    top: 150,
                    right: 35,
                    bottom: 50,
                    left: 110,
                    containLabel: false
                }],
                xAxis: [{
                    type: 'value',
                    show: false
                }],
                yAxis: [{
                    show: true,
                    type: 'category',
                    data: Object.keys(builderJson.charts),
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        interval: 0,
                        margin: 80,
                        textStyle: {
                            color: 'rgba(255,255,255,0.5)',
                            align: 'left',
                            fontSize: 16
                        }
                    },
                    boundaryGap: false,
                    axisLine: { //轴颜色
                        show: false,
                        lineStyle: {
                            color: "rgba(0,0,0,1)"
                        }
                    }
                }],
                series: [
                    {
                        name: '男用户',
                        type: 'bar',
                        stack: 'chart',
                        z: 4,
                        barWidth: 35,
                        //柱子宽度
                        label: {
                            normal: {
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                //顶端显示value值 0则不显示
                                label: {
                                    show: true,
                                    position: 'left',
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: "17"
                                    },
                                    formatter: function(params) {
                                        if ( params.value === 0) {
                                            return '';
                                        } else {
                                            // return params.value;
                                            return '';
                                        }
                                    }
                                },
                                barBorderRadius: 2,
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: 'rgba(0,198,251,1)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(0,91,234,1)'
                                }])
                            },
                        },
                        data: Object.keys(builderJson.charts).map(function(key) {
                            return builderJson.charts[key];
                        })
                    },
                    {
                        name: '女用户',
                        z: 3,
                        barWidth: 35,
                        type: 'bar',
                        stack: 'chart',
                        silent: true,
                        itemStyle: {
                            normal: {
                                //顶端显示value值 0则不显示
                               /* label: {
                                    show: true,
                                    position: 'right',
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: "17"
                                    },
                                    formatter: function(params) {
                                        if ( params.value === 0) {
                                            return '0';
                                        } else {
                                            return params.value;
                                        }
                                    }
                                },*/
                                barBorderRadius: 2,
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: 'rgba(240,147,251,1)'
                                },
                                    {
                                        offset: 1,
                                        color: 'rgba(245,87,108,1)'
                                    }])
                            }
                        },
                        // data: Object.keys(builderJson.charts).map(function(key) {
                        //     return builderJson.all - builderJson.charts[key];
                        data: Object.keys(builderJson.charts2).map(function(key) {
                            return builderJson.charts2[key];
                        })
                    }
                ]
            };
            genderImg.setOption(option);
        },
        /**
         * 页面刷新
         * */
        reload: function () {
            window.location.reload();
        }
    }
});