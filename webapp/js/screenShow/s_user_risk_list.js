var app = new Vue({
    el: '#app',
    data: {
        areaName: '安顿',
        flag : 0,
        autoNum: 1,
        list: [],
        loginId: localStorage.loginId,
        token: localStorage.token,
        counts: 3,
        reloadCounts: 15,
        healthFlag: 0,
        cmsWearUserInfo:{
            addressInfo: '安顿',
            deviceStatus: '',
            weight:'',
            stature:'',
            age: 0,
            ageSign: '',
            alarmCount: 0,
            binder: [],
            birthday: '',
            deviceId: '',
            deviceVersion: '2',
            electricQuantity: '60',
            emergencyPeople: '',
            emergencyPhone: '',
            gender: '1',
            historyWear: [],
            idCard: '',
            isAttention: 0,
            isInsurance: 0,
            isPass: 0,
            isVip: 0,
            lastAlarmTime: '',
            locationShowSign: 0,
            medicalHistory: '',
            occupation: '',
            phoneNum: '',
            remark: '',
            sIMPhoneNum: '',
            serviceEndTime: '',
            username: '',
            voiceSign: 0,
            waySign: 2,
            isWear: ''
        },
        actualData: {
            activeBloodOxygen: '',
            activeBloodPressure: '',
            id: '',
            nearestSleepSign: '',
            nearestSportSign: '',
            nearestWalk: '',
            nearestWalkTime: '',
            restHeartRate: '',
            restingHeartRateReverse: '',
            tWearUserId: '',
            nearestBloodPressure: '--',
            nearestBloodPressureTime: '-:-',
            nearestHeartRate: '--',
            nearestHeartRateTime: '-:-',
            nearestOxyhemoglobinSaturatioTime: '-:-',
            nearestOxyhemoglobinSaturation: '--',
            tiredHeartRate: ''
        },
        monitoringDetails:{
            conclusion1:'',
            conclusion2:'',
            conclusion3:'',
            bpData: [],
            hrData: [],
            boData: []
        },
        healthDaysBeans:{
            health: '',
            subHealth: '',
            ill: '',
            noData: ''
        },
        allTheInternalOrgans: {
            bladder: 0,
            gallBladder: 0,
            heart: 0,
            kidney: 0,
            largeIntestine: 0,
            liver: 0,
            lung: 0,
            lymph: 0,
            pericardium: 0,
            smallIntestine: 0,
            spine: 0,
            spleen: 0
        }
    },
    computed: function () {

    },
    mounted: function () {
        this.getInit();
        //图片摆放
        this.imgLocation();
    },
    methods: {
        getInit: function () {
            var _this = this;
            $.ajax({
                url : global_path + '/Agent/BigShow/listAlarmPerson',
                type : 'post',
                dataType : 'json',
                data: {
                    loginId: _this.loginId,
                    token: _this.token
                },
                success: function (res) {
                    checkToken(res);
                    if(res.code === 200){
                        //地区名称
                        _this.areaName = res.data.areaName;

                        //用户列表
                        _this.list = res.data.list;
                        if(_this.list.length >= 60){
                            _this.list = _this.list.slice(0,60);
                        }
                        //雷达扫描接入
                        $('#markStar,#shan,.markStar').fadeIn(500);
                        //总数
                        _this.flag = res.data.flag;
                        if(_this.flag >= 60){
                            //存随机数
                            _this.autoNum = Math.floor(Math.random() * 59);
                            console.log(_this.autoNum);
                            console.log(_this.list[_this.autoNum].wearUserId);
                        }else {
                            _this.autoNum = Math.floor(Math.random() * (_this.flag - 1));
                        }

                        //定时器，显示用户信息
                        var timer = setInterval(function () {
                            if(_this.counts >= 0){
                                _this.counts --;
                            }else {
                                $('.userMsgBox').fadeIn(2000).css('display','table');
                                window.clearInterval(timer);
                                _this.userMsg();
                            }

                        },1000)
                    }else {
                        layer.msg(res.msg);
                    }

                }
            })
        },
        /**
         * userMsg
         * */
        userMsg: function () {
            var _this = this;
            //ajax
            $.ajax({
                url : global_path + '/cms/wearUser/selectWearUserInfo',
                type : 'post',
                dataType : 'json',
                data: {
                    loginId: _this.loginId,
                    token: _this.token,
                    wearUserId: _this.list[_this.autoNum].wearUserId
                },
                success: function (res) {
                    checkToken(res);
                    if(res.code === 200){
                        //个人信息
                        _this.cmsWearUserInfo.addressInfo = res.data.cmsWearUserInfo.addressInfo;
                        // 居住地址从第9位开始全部转换为*
                        if(localStorage.sign !=1){
                            if(_this.cmsWearUserInfo.addressInfo && _this.cmsWearUserInfo.addressInfo){
                                var place = _this.cmsWearUserInfo.addressInfo
                                place = place.split('') //转化为数组
                                place.slice(0,9); //截取前九位
                                _this.cmsWearUserInfo.addressInfo = place.slice(0,13).join('')+'********' //转化为字符串
                            }
                        }
                        _this.cmsWearUserInfo.age = res.data.cmsWearUserInfo.age;
                        _this.cmsWearUserInfo.ageSign = res.data.cmsWearUserInfo.ageSign;
                        _this.cmsWearUserInfo.alarmCount = res.data.cmsWearUserInfo.alarmCount;
                        _this.cmsWearUserInfo.binder = res.data.cmsWearUserInfo.binder;
                        _this.cmsWearUserInfo.birthday = res.data.cmsWearUserInfo.birthday;
                        _this.cmsWearUserInfo.deviceId = res.data.cmsWearUserInfo.deviceId;
                        _this.cmsWearUserInfo.deviceVersion = res.data.cmsWearUserInfo.deviceVersion;
                        _this.cmsWearUserInfo.electricQuantity = res.data.cmsWearUserInfo.electricQuantity;
                        _this.cmsWearUserInfo.emergencyPeople = res.data.cmsWearUserInfo.emergencyPeople;
                        // 紧急联系人中间1位转化成*
                        if(localStorage.sign !=1){
                            if( _this.cmsWearUserInfo.emergencyPeople != '' && _this.cmsWearUserInfo.emergencyPeople != null){
                                var name1 =  _this.cmsWearUserInfo.emergencyPeople;
                                name1 = name1.split('');
                                name1.splice(1,1,'*');
                                _this.cmsWearUserInfo.emergencyPeople = name1.join('');
                            }
                        }
                        _this.cmsWearUserInfo.emergencyPhone = res.data.cmsWearUserInfo.emergencyPhone;
                        // 紧急联系电话中间4为变成*
                        if(localStorage.sign !=1){
                            if( _this.cmsWearUserInfo.emergencyPhone != '' &&  _this.cmsWearUserInfo.emergencyPhone != null){
                                var tel =  _this.cmsWearUserInfo.emergencyPhone;
                                tel = tel.split(''); //转化为数组
                                tel.splice(3,4,'****') ; //从下标位3替换*
                                _this.cmsWearUserInfo.emergencyPhone = tel.join(''); //转化为字符串
                            }
                        }
                        _this.cmsWearUserInfo.gender = res.data.cmsWearUserInfo.gender;
                        _this.cmsWearUserInfo.historyWear = res.data.cmsWearUserInfo.historyWear;
                        _this.cmsWearUserInfo.idCard = res.data.cmsWearUserInfo.idCard;
                        //身份证号后8位转换为*
                        if(localStorage.sign !=1){
                            if( _this.cmsWearUserInfo.idCard != '' &&  _this.cmsWearUserInfo.idCard != null){
                                var card = _this.cmsWearUserInfo.idCard;
                                card = card.split(''); //转化为数组   ["4", "1", "0", "7", "8", "2", "1", "9", "9", "9", "0", "8", "0", "8", "8", "8", "8", "8"]
                                card.splice(10,8,'********');  //["4", "1", "0", "7", "8", "2", "1", "9", "9", "********"]
                                _this.cmsWearUserInfo.idCard = card.join('') //410782199********
                            }
                        }
                        _this.cmsWearUserInfo.isAttention = res.data.cmsWearUserInfo.isAttention;
                        _this.cmsWearUserInfo.isInsurance = res.data.cmsWearUserInfo.isInsurance;
                        _this.cmsWearUserInfo.isPass = res.data.cmsWearUserInfo.isPass;
                        _this.cmsWearUserInfo.isVip = res.data.cmsWearUserInfo.isVip;
                        _this.cmsWearUserInfo.lastAlarmTime = res.data.cmsWearUserInfo.lastAlarmTime;
                        _this.cmsWearUserInfo.location = res.data.cmsWearUserInfo.location;
                        _this.cmsWearUserInfo.locationShowSign = res.data.cmsWearUserInfo.locationShowSign;
                        _this.cmsWearUserInfo.medicalHistory = res.data.cmsWearUserInfo.medicalHistory;
                        _this.cmsWearUserInfo.occupation = res.data.cmsWearUserInfo.occupation;
                        _this.cmsWearUserInfo.phoneNum = res.data.cmsWearUserInfo.phoneNum;
                        // 手机号中间4位转化为*
                        if( localStorage.sign !=1){
                            if( _this.cmsWearUserInfo.phoneNum != '' &&  _this.cmsWearUserInfo.phoneNum != null){
                                var tel =  _this.cmsWearUserInfo.phoneNum;
                                tel = tel.split(''); //转化为数组
                                tel.splice(3,4,'****') ; //从下标位3替换*
                                _this.cmsWearUserInfo.phoneNum = tel.join(''); //转化为字符串
                            }
                        }
                        _this.cmsWearUserInfo.remark = res.data.cmsWearUserInfo.remark;
                        _this.cmsWearUserInfo.sIMPhoneNum = res.data.cmsWearUserInfo.sIMPhoneNum;
                        _this.cmsWearUserInfo.serviceEndTime = res.data.cmsWearUserInfo.serviceEndTime;
                        _this.cmsWearUserInfo.serviceImgUrl = res.data.cmsWearUserInfo.serviceImgUrl;
                        _this.cmsWearUserInfo.serviceResidue = res.data.cmsWearUserInfo.serviceResidue;
                        _this.cmsWearUserInfo.serviceStartTime = res.data.cmsWearUserInfo.serviceStartTime;
                        _this.cmsWearUserInfo.username = res.data.cmsWearUserInfo.username;
                        // 隐藏姓名中间1位
                        if( localStorage.sign !=1){
                            if( _this.cmsWearUserInfo.username != '' && _this.cmsWearUserInfo.username != null){
                                var name1 =  _this.cmsWearUserInfo.username;
                                name1 = name1.split('');
                                name1.splice(1,1,'*');
                                _this.cmsWearUserInfo.username = name1.join('');
                            }
                        }
                        _this.cmsWearUserInfo.voiceSign = res.data.cmsWearUserInfo.voiceSign;
                        _this.cmsWearUserInfo.waySign = res.data.cmsWearUserInfo.waySign;
                        _this.cmsWearUserInfo.stature = res.data.cmsWearUserInfo.stature;
                        _this.cmsWearUserInfo.weight = res.data.cmsWearUserInfo.weight;
                        switch (res.data.cmsWearUserInfo.deviceStatus){
                            case 0:
                                _this.cmsWearUserInfo.deviceStatus = '未知';
                                break;
                            case 1:
                                _this.cmsWearUserInfo.deviceStatus = '工作中';
                                break;
                            case 2:
                                _this.cmsWearUserInfo.deviceStatus = '离手';
                                break;
                            case 3:
                                _this.cmsWearUserInfo.deviceStatus = '充电中';
                                break;
                            case 4:
                                _this.cmsWearUserInfo.deviceStatus = '失联';
                                $('#deviceStatus').css('background-color','#dcdcdc');
                                break;
                            case 5:
                                _this.cmsWearUserInfo.deviceStatus = '关机';
                                break;
                        }
                    }else {
                        layer.msg(res.msg);
                    }


                }
            });
            //ajax
            $.ajax({
                url : global_path + '/cms/wearUser/selectHealthAnalysisModel',
                type : 'post',
                dataType : 'json',
                data: {
                    loginId: _this.loginId,
                    token: _this.token,
                    wearUserId: _this.list[_this.autoNum].wearUserId
                },
                success: function (res) {
                    checkToken(res);
                    if(res.code === 200){
                        //实时数据
                        _this.actualData.activeBloodOxygen = res.data.actualData.activeBloodOxygen;
                        _this.actualData.activeBloodPressure = res.data.actualData.activeBloodPressure;
                        _this.actualData.countArrhythmia = res.data.actualData.countArrhythmia;
                        _this.actualData.id = res.data.actualData.id;
                        _this.actualData.nearestSleepSign = res.data.actualData.nearestSleepSign;
                        _this.actualData.nearestSportSign = res.data.actualData.nearestSportSign;
                        _this.actualData.nearestWalk = res.data.actualData.nearestWalk;
                        _this.actualData.nearestWalkTime = res.data.actualData.nearestWalkTime;
                        _this.actualData.restHeartRate = res.data.actualData.restHeartRate;
                        _this.actualData.restingHeartRateReverse = res.data.actualData.restingHeartRateReverse;
                        _this.actualData.tWearUserId = res.data.actualData.tWearUserId;
                        _this.actualData.tiredHeartRate = res.data.actualData.tiredHeartRate;
                        //健康天数&&饼图
                        _this.healthDaysBeans.health = res.data.healthDaysBeans.health;
                        _this.healthDaysBeans.subHealth = res.data.healthDaysBeans.subHealth;
                        _this.healthDaysBeans.ill = res.data.healthDaysBeans.illness;
                        _this.healthDaysBeans.noData = res.data.healthDaysBeans.healthUnknown;
                        _this.pieImg();
                        //今日实时数据时间设置
                        _this.initActualData(res.data.actualData,_this.actualData);
                        //12个器官
                        if(res.data.monitoringDetails.allTheInternalOrgans !== null && res.data.monitoringDetails.allTheInternalOrgans !== '' && res.data.monitoringDetails.allTheInternalOrgans !== undefined){
                            _this.allTheInternalOrgans = res.data.monitoringDetails.allTheInternalOrgans;
                        }
                        _this.healthFlag = res.data.monitoringDetails.healthFlag;
                        switch (_this.healthFlag){
                            case 1:
                                _this.healthFlag = '健康';
                                $('.illType').css('color','#36b864');
                                break;
                            case 2:
                                _this.healthFlag = '亚健康';
                                $('.illType').css('color','#eaae4f');
                                break;
                            case 3:
                                _this.healthFlag = '疾病';
                                $('.illType').css('color','#ff3333');
                                break;
                            case 0:
                                _this.healthFlag = '未知';
                                $('.illType').css('color','#eee');
                                break;
                        }
                        //折线图相关数据
                        _this.monitoringDetails.conclusion1 = res.data.monitoringDetails.realHRMonitoring.conclusion;
                        _this.monitoringDetails.conclusion2 = res.data.monitoringDetails.realBPMonitoring.conclusion;
                        _this.monitoringDetails.conclusion3 = res.data.monitoringDetails.realBOMonitoring.conclusion;
                        _this.monitoringDetails.hrData = res.data.monitoringDetails.realHRMonitoring.statusData;
                        _this.monitoringDetails.bpData = res.data.monitoringDetails.realBPMonitoring.bpData;
                        _this.monitoringDetails.boData = res.data.monitoringDetails.realBOMonitoring.statusData;
                        if(_this.monitoringDetails.hrData !== null){
                            _this.hrImg();
                        }
                        if(_this.monitoringDetails.bpData !== null){
                            _this.bpImg();
                        }
                        if(_this.monitoringDetails.boData !== null){
                            _this.boImg();
                        }
                        //开启定时器刷新页面
                        _this.reloadHtml()
                    }else {
                        layer.msg(res.msg);
                    }


                }
            })
        },
        /**
         * 12张图摆放
         * 胆、小肠、心、膀胱、     肝、脾、心包、脊椎、     肾、肺、淋巴、大肠
         * */
        imgLocation: function () {
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
                        name: '健康比例统计',
                        color:['#0096ff', '#efc977','#fb5d5d','#f1f1f1'],
                        hoverAnimation:true,    //扇形打开效果
                        startAngle:250,         //起始角度
                        roseType: false,
                        type: 'pie',
                        radius: '80%',
                        center: ['50%', '50%'], //位置：x轴 y轴
                        data:[
                            {
                                name: '健康',
                                value: _this.healthDaysBeans.health
                            },
                            {
                                name: '亚健康',
                                value: _this.healthDaysBeans.subHealth
                            },
                            {
                                name: '疾病',
                                value: _this.healthDaysBeans.ill
                            },
                            {
                                name: '未佩戴',
                                value: _this.healthDaysBeans.noData
                            }
                        ],
                        tooltip:{
                            formatter:'{b}:{c}天,占比{d}%'
                        },
                        label:{            //饼图图形上的文本标签
                            normal:{
                                show:true,
                                position:'inner', //标签的位置
                                textStyle : {
                                    color:'rgba(70,70,70,1)',
                                    fontSize : 12    //文字的字体大小
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
         *心率
         * */
        hrImg: function () {
            var _this = this;
            var dataStr = _this.monitoringDetails.hrData;
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
            if(arrRate.length < 50){
                l =  0;
            }else if(arrRate.length < 100){
                l =  50;
            }else if(arrRate.length < 200){
                l =  75;
            }else if(arrRate.length < 500){
                l =  80;
            }else {
                l =  95;
            }
            var healDays = echarts.init(document.getElementById('hrImg'));//对应容器
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
                        //symbol: 'none', //去掉每个点的小圆点标记
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
            var str = _this.monitoringDetails.bpData;
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
            if(spNeed.length < 50){
                l =  0;
            }else if(spNeed.length < 100){
                l =  50;
            }else if(spNeed.length < 200){
                l =  75;
            }else if(spNeed.length < 500){
                l =  80;
            }else {
                l =  95;
            }
            //对应容器
            var bloodPress = echarts.init(document.getElementById('bpImg'));
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
                        //symbol: 'none', //去掉每个点的小圆点标记
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
                        //symbol: 'none', //去掉每个点的小圆点标记
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
        },
        /**
         *血氧
         * */
        boImg: function () {
            var _this = this;
            var str = _this.monitoringDetails.boData;
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
            var l = 0;
            if(oxArr.length < 50){
                l =  0;
            }else if(oxArr.length < 100){
                l =  50;
            }else if(oxArr.length < 200){
                l =  75;
            }else if(oxArr.length < 500){
                l =  80;
            }else {
                l =  95;
            }
            //对应容器
            var bloodOxygen = echarts.init(document.getElementById('boImg'));
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
                    bottom:"20px",
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
                                    color: 'rgba(0,147,255,0.54)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(0,147,255,0.1)'
                                }])
                            }
                        },
                        itemStyle: {
                            normal: {
                                //颜色设置
                                color: "rgba(0,147,255,1)"
                            }
                        }
                    }

                ]
            };
            //配置项生成统计图
            bloodOxygen.setOption(option);
        },
        /**
         * 初始化实时数据
         * */
        initActualData:function (actualData,that) {
            //最近数据如果不是今天的不展示
            actualData.nearestHeartRateTime != null && actualData.nearestHeartRateTime.substring(0,10) == this.getNowDate(0) ? $(function () {
                that.nearestHeartRate = actualData.nearestHeartRate != null ? actualData.nearestHeartRate : '--';
                that.nearestHeartRateTime = actualData.nearestHeartRateTime != null ? actualData.nearestHeartRateTime.substring(11,16) : '-:-';
            }) : '';
            actualData.nearestBloodPressureTime != null && actualData.nearestBloodPressureTime.substring(0,10) == this.getNowDate(0) ? $(function () {
                that.nearestBloodPressure = actualData.nearestBloodPressure != null ? actualData.nearestBloodPressure.replace(",","/") : '--';
                that.nearestBloodPressureTime = actualData.nearestBloodPressureTime != null ? actualData.nearestBloodPressureTime.substring(11,16) : '-:-';
            }) : '';
            actualData.nearestOxyhemoglobinSaturatioTime != null && actualData.nearestOxyhemoglobinSaturatioTime.substring(0,10) == this.getNowDate(0) ? $(function () {
                that.nearestOxyhemoglobinSaturation = actualData.nearestOxyhemoglobinSaturation != null ? actualData.nearestOxyhemoglobinSaturation : '--';
                that.nearestOxyhemoglobinSaturatioTime = actualData.nearestOxyhemoglobinSaturatioTime != null ? actualData.nearestOxyhemoglobinSaturatioTime.substring(11,16) : '-:-';
            }) : '';
        },
        /**
         * 初始化时间
         * */
        getNowDate: function (t) {
            var date = new Date(new Date() - t * 24 * 60 * 60 * 1000);
            var year = date.getFullYear();
            var mon = date.getMonth() + 1;
            var day = date.getDate();
            mon < 10 ? mon = '0' + mon :  mon;
            day < 10 ? day = '0' + day :  day;
            return year + '-' + mon + '-' + day;
        },
        /**
         * 定时器  刷新页面
         * */
        reloadHtml: function () {
            var _this = this;
            var htmlTimer = setInterval(function () {
                if(_this.reloadCounts < 0){
                    window.location.reload();
                    window.clearInterval(htmlTimer);
                }else {
                    _this.reloadCounts --;
                }
            },1000)
        }
    }
});