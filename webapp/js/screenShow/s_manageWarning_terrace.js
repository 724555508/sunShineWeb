var app = new Vue({
    el: '#main',
    data: {
        showAreaName: '安顿',
        countMap: {
            allNum: 0,
            illnessNum: 0,
            riskNum: 0
        },
        dataList: [
            {
                info: ''
            }
        ],
        sign: 0,
        mark: 0,
        //个人信息
        infoBean: {
            currentAddress: '',
            age: 0,
            gender: '',
            medicalHistory: '',
            username: '',
            deviceStatus: '',
            city: '',
            province: ''
        },
        //实时数据
        actualData: {
            nearestBloodPressure: '--/--',
            nearestBloodPressureTime: '--:--',
            nearestHeartRate: '--',
            nearestHeartRateTime: '--:--',
            nearestOxyhemoglobinSaturation: '--',
            nearestOxyhemoglobinSaturatioTime: '--:--'
        },
        //综合分析
        monitoringDetails: {
            //综合诊断
            comprehensiveDiagnosis: '',
            healthFlag: 0,
            //心率
            realHRMonitoring: {
                statusData: [],
                conclusion: '',
                hrCount: '0',
                hrMax: '0',
                hrMin: '0'
            },
            //血压
            realBPMonitoring: {
                bpData: [],
                conclusion: '',
                bpCount: '0',
                bpMax: '0',
                bpMin: '0'
            },
        },
        leftUserName:''
    },
    mounted: function () {
        this.getAjaxList();
    },
    methods: {
        /**
         * 向上滚动
         * 获取第一个li的高度，向上margin-top -li的高度，然后移到ul的最后一个li下面
         * setInterval定时器 每个x秒执行一次，用animate做滚动效果
         * */
        initPage: function () {
            // var lH = $('.list li').height() + 32;
            var _this = this,
                lH = 120;
            _this.sign = _this.dataList.length;

            $('.left').css({'height': $('.right').height()});
            setInterval(function(){
                $('.list li').eq(0).animate({marginTop: -lH,opacity: 0},'slow',function(){
                    $('.list li').eq(0).css('margin-top','').appendTo('.list').animate({opacity:1});
                });
                _this.mark ++;
                if(_this.mark === _this.sign){
                    window.location.reload();
                }
                _this.getUserInfo();
            },15000);
        },
        /**
         * ajax数据列表
         * */
        getAjaxList: function () {
            var _this = this;
            $.ajax({
                url: global_path +'/Agent/BigShow/getWearUserListByAgentId',
                type: 'post',
                dataType: 'json',
                data: {
                    loginId: localStorage.loginId,
                    token: localStorage.token
                },
                success: function (res) {
                    if(res.code === 200){
                        _this.dataList = res.data.beans;
                        // 对左边姓名做权限
                        for(var i in _this.dataList){
                            if( _this.dataList[i].userName != '' && _this.dataList[i].userName != null){
                                var name1 =  _this.dataList[i].userName;
                                name1 = name1.split('');
                                name1.splice(1,1,'*');
                                _this.dataList[i].userName = name1.join('');
                            }
                        }
                        _this.countMap.allNum = res.data.countMap.allNum;
                        _this.countMap.illnessNum = res.data.countMap.illnessNum;
                        _this.countMap.riskNum = res.data.countMap.riskNum;
                        _this.showAreaName = res.data.showAreaName;
                        _this.initPage();
                        // setTimeout(_this.initPage,1000);
                        _this.getUserInfo();
                    }else {
                        layer.msg(res.msg);
                    }
                },
                error: function () {
                    layer.msg('网络异常');
                }
            })
        },
        /**
         * 根据id查询该用户信息
         * */
        getUserInfo: function () {
            var _this = this;
            $.ajax({
                url: global_path + '/Agent/BigShow/getWearUserInfoByWearUserId',
                type: 'post',
                dataType: 'json',
                data: {
                    loginId: localStorage.loginId,
                    token: localStorage.token,
                    wearUserId: _this.dataList[_this.mark].wearUserId
                },
                success: function (res) {
                    if(res.code === 200){
                        //用户信息
                        _this.infoBean.username = res.data.infoBean.username;
                        // 对姓名做权限
                        if(  _this.infoBean.username != '' &&   _this.infoBean.username != null){
                            var name1 =   _this.infoBean.username;
                            name1 = name1.split('');
                            name1.splice(1,1,'*');
                            _this.infoBean.username= name1.join('');
                        }

                        _this.infoBean.province = res.data.infoBean.province;
                        _this.infoBean.city = res.data.infoBean.city;
                        _this.infoBean.currentAddress = res.data.infoBean.currentAddress;
                        _this.infoBean.age = res.data.infoBean.age;
                        _this.infoBean.gender = res.data.infoBean.gender;
                        _this.infoBean.medicalHistory = res.data.infoBean.medicalHistory;
                        _this.infoBean.deviceStatus = res.data.infoBean.deviceStatus;
                        //实时数据
                        var mon = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
                        var day = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate();
                        var dateStr = mon + '-' + day;
                        //时间判空且是否为当日，是则加载数据否则不显示
                        //心率
                        if(res.data.actualData.nearestBloodPressureTime !== null && res.data.actualData.nearestBloodPressureTime.substring(5,10) === dateStr){
                            _this.actualData.nearestBloodPressure = res.data.actualData.nearestBloodPressure;
                            _this.actualData.nearestBloodPressureTime = res.data.actualData.nearestBloodPressureTime;
                        }else {
                            _this.actualData.nearestBloodPressure = '--';
                            _this.actualData.nearestBloodPressureTime = '--:--';
                        }
                        //血压
                        if(res.data.actualData.nearestHeartRateTime !== null && res.data.actualData.nearestHeartRateTime.substring(5,10) === dateStr){
                            _this.actualData.nearestHeartRate = res.data.actualData.nearestHeartRate;
                            _this.actualData.nearestHeartRateTime = res.data.actualData.nearestHeartRateTime;
                        }else {
                            _this.actualData.nearestHeartRate = '--/--';
                            _this.actualData.nearestHeartRateTime = '--:--';
                        }
                        //血氧
                        if(res.data.actualData.nearestOxyhemoglobinSaturatioTime !== null && res.data.actualData.nearestOxyhemoglobinSaturatioTime.substring(5,10) === dateStr){
                            _this.actualData.nearestOxyhemoglobinSaturation = res.data.actualData.nearestOxyhemoglobinSaturation;
                            _this.actualData.nearestOxyhemoglobinSaturatioTime = res.data.actualData.nearestOxyhemoglobinSaturatioTime;
                        }else {
                            _this.actualData.nearestOxyhemoglobinSaturation = '--';
                            _this.actualData.nearestOxyhemoglobinSaturatioTime = '--:--';
                        }
                        //综合诊断
                        _this.monitoringDetails.comprehensiveDiagnosis = res.data.monitoringDetails.comprehensiveDiagnosis;
                        _this.monitoringDetails.healthFlag = res.data.monitoringDetails.healthFlag;
                        //心率数据
                        _this.monitoringDetails.realHRMonitoring.statusData = res.data.monitoringDetails.realHRMonitoring.statusData;
                        _this.monitoringDetails.realHRMonitoring.conclusion = res.data.monitoringDetails.realHRMonitoring.conclusion;
                        _this.monitoringDetails.realHRMonitoring.hrCount = res.data.cmsHBBDateStatistics.hrCount;
                        _this.monitoringDetails.realHRMonitoring.hrMax = res.data.cmsHBBDateStatistics.hrMax;
                        _this.monitoringDetails.realHRMonitoring.hrMin = res.data.cmsHBBDateStatistics.hrMin;
                        //血压
                        _this.monitoringDetails.realBPMonitoring.bpData = res.data.monitoringDetails.realBPMonitoring.bpData;
                        _this.monitoringDetails.realBPMonitoring.conclusion = res.data.monitoringDetails.realBPMonitoring.conclusion;
                        _this.monitoringDetails.realBPMonitoring.bpCount = res.data.cmsHBBDateStatistics.bpCount;
                        _this.monitoringDetails.realBPMonitoring.bpMax = res.data.cmsHBBDateStatistics.bpMax;
                        _this.monitoringDetails.realBPMonitoring.bpMin = res.data.cmsHBBDateStatistics.bpMin;
                        //心率折线图
                        _this.hrImg();
                        //血压折线图
                        _this.bpImg();
                    }else {
                        layer.msg(res.msg);
                    }
                },
                error: function () {
                    layer.msg('网络异常');
                }
            })
        },
        /**
         *心率
         * */
        hrImg: function () {
            var _this = this;
            var dataStr = _this.monitoringDetails.realHRMonitoring.statusData;
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
            var l = 0;
            /*if(arrRate.length < 50){
                l =  0;
            }else if(arrRate.length < 100){
                l =  50;
            }else if(arrRate.length < 200){
                l =  75;
            }else if(arrRate.length < 500){
                l =  80;
            }else {
                l =  95;
            }*/
            var healDays = echarts.init(document.getElementById('heartCharts'));//对应容器
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
                        color:"rgba(255,255,255,0.2)",
                        fontSize: "12"
                    },
                    axisLine: { //x轴颜色
                        show: false,
                        lineStyle: {
                            color: "rgba(255,255,255,0.2)"
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
                    show:false,
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
                    bottom:"20px",
                    containLabel:false
                },
                //数据
                series:[
                    //心率
                    {
                        name:'心率',
                        type:'line',            //折线图
                        symbol: 'none', //去掉每个点的小圆点标记
                        data:arrRate,      //动态data
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(229,101,100,0.54)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(229,101,100,0.1)'
                                }])
                            }
                        },
                        itemStyle: {
                            normal: {
                                //颜色设置
                                color: "rgba(229,101,100,1)"
                            }
                        }
                    }
                ]
            };
            //配置项生成统计图
            healDays.setOption(option);
        },
        /**
         *血压
         * */
        bpImg: function () {
            var _this = this;
            var str = _this.monitoringDetails.realBPMonitoring.bpData;
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
            var l = 0;
            /*if(spNeed.length < 50){
                l =  0;
            }else if(spNeed.length < 100){
                l =  50;
            }else if(spNeed.length < 200){
                l =  75;
            }else if(spNeed.length < 500){
                l =  80;
            }else {
                l =  95;
            }*/
            //对应容器
            var bloodPress = echarts.init(document.getElementById('bloodCharts'));
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
                        color:"rgba(255,255,255,0.2)",
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
                    show:false,
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
                    bottom:"20px",
                    containLabel:false
                },
                //数据
                series:[
                    //高压
                    {
                        name:'高压',
                        type:'line',            //折线图
                        symbol: 'none', //去掉每个点的小圆点标记
                        data:spNeed,      //动态data
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(243,171,89,0.54)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(243,171,89,0.1)'
                                }])
                            }
                        },
                        itemStyle: {
                            normal: {
                                //颜色设置
                                color: "rgba(243,171,89,1)"
                            }
                        }
                    },
                    //低压
                    {
                        name:'低压',
                        type:'line',            //折线图
                        symbol: 'none', //去掉每个点的小圆点标记
                        data:bpNeed,      //动态data
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(188,140,239,0.54)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(188,140,239,0.1)'
                                }])
                            }
                        },
                        itemStyle: {
                            normal: {
                                //颜色设置
                                color: "rgba(188,140,239,1)"
                            }
                        }
                    }

                ]
            };
            //配置项生成统计图
            bloodPress.setOption(option);
        }
    }
});

