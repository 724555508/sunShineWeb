var obj = {};
var url = window.location.search;       //截取"?"以及之后的所有字符串
var str = url.substring(1,url.length);  //去除"?"
var arr = str.split('&');               //根据&分割成数组   ["key=value","name=zxm"]
for(var i = 0; i < arr.length; i ++){
    obj[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
}

var app = new Vue({
    el: '#app',
    data: {
        list:[],  //列表内容
        isActive:0,  //是否选中的状态
        date:'',    //健康解析时间  以及点击当前li传给后台日期
        // 肿瘤风险提示表格内容
        arr1:[
            {organName:'肺',organCancerCount:0},
            {organName:'肾',organCancerCount:0},
            {organName:'胆',organCancerCount:0},
            {organName:'小肠',organCancerCount:0},
            {organName:'膀胱',organCancerCount:0}
        ],
        arr2:[
            {organName:'脊椎',organCancerCount:0},
            {organName:'淋巴',organCancerCount:0},
            {organName:'大肠',organCancerCount:0},
            {organName:'脾',organCancerCount:0},
            {organName:'肝',organCancerCount:0}
        ],
        // 分析依据心率  血压  血样
        heartRateStatisticsMap:{
            avgValue : '0',
            conclusion : '',
            count : '0',
            imagesCanSee : '',
            maxValue : '0',
            measureTime : '0',
            minValue : '0'
        }, //心率
        bloodPressureStatisticsMap:{//血压
            avgValue : '0',
            conclusion : '',
            count : '0',
            imagesCanSee : '',
            maxValue : '0',
            measureTime : '0',
            minValue : '0'
        },
        bloodOxygenStatisticsMap:{  //血氧
            avgValue : '0',
            conclusion : '',
            count : '0',
            imagesCanSee : '',
            maxValue : '0',
            measureTime : '0',
            minValue : '0'
        },
        date1:'',
        // 睡眠状态
        sleepADWalkADExercise:{
            analysisTime:'0',
            sleepBean:{
                conclusion:'',
                deepSleepTime:'0时0分',
                lightSleepTime:'0时0分',
                totalTime:'0时0分'
            },
            walkNum:'0'
        },
        hour1:'0',
        min1:'0',
        hour2:'0',
        min2:'0',
        hour3:'0',
        min3:'0',
        hour4:'0',
        min4:'0',
        // 健康解析数据
        healthFlag:'',   //身体状态
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
        },
        bloodOxygenCurve:'',  //血氧分析
        bloodPressureCurve:'', //血壓分析
        heartRateCurve:'',  //心率
        comprehensiveDiagnosis:'',  //綜合分析
        dateTime:'',
        organCancerAnalysis:'',//分析
        states:''
    },
    mounted: function() {
        var date =  new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        month =(month<10 ? "0"+month:month);
        $("#date").val(year + "-" + month);
        this.init();

    },
    computed: {
    },
    methods: {
        init:function(){
            this.time();
            // this.getUserInfo(index);
        },
        // 选中时间请求接口  加载列表
        time:function(){
            var _this = this;
            $.ajax({
                url: global_path + "/cms/wearUser/getHistoryAnalysis",
                type: 'post',
                dataType: 'json',
                data: {
                    date:$("#date").val(),
                    wearUserId:obj.wearUserId,
                    loginId:localStorage.loginId,
                    token:localStorage.token
                },
                success: function(result) {
                    checkToken(result);
                    if (result.code === 200) {
                        // layer.msg(result.msg, {
                        //     icon: 1
                        // });
                        _this.list = result.data.list;
                        // if(_this.list.length !== 0){
                        _this.getUserInfo(0);
                        // }

                    } else {
                        layer.msg('' + result.msg, {
                            icon: 2
                        });
                    }

                },
                error: function() {}
            });
        },
        // 每行列表选中改变颜色
        changeClass:function(index){

            // this.singleLi(index);
        },
        // 点击每行li进行的操作 , 每行列表选中改变颜色
        singleLi:function(index){
            this.isActive = index;
            debugger;
            // 请求之前layer加载层
            layer.load(1, {
                shade: [0.7,'#fff'] //0.1透明度的白色背景
            });
            this.getUserInfo(index);

        },
        // 获取用户信息内容
        getUserInfo(index){
            var _this = this;
            if(_this.list !== '' || _this.list !== null || _this.list !== undefined){
                _this.date = _this.list[index].date;
            }
            $.ajax({
                url: global_path + "/cms/wearUser/getHisAnalysisInfo",
                type: 'post',
                dataType: 'json',
                data: {
                    date:_this.list[index].date,
                    wearUserId:obj.wearUserId,
                    loginId:localStorage.loginId,
                    token:localStorage.token
                },
                success: function(result) {
                    layer.closeAll('loading'); //请求后关闭加载层
                    checkToken(result);
                    if (result.code == 200) {
                        if(result.msg != ''){
                            layer.msg(result.msg,{time:2000});
                        }
                        // 肿瘤风险
                        if(result.data.organCancerCountBean != null && result.data.organCancerCountBean != ''){
                            _this.arr1 = result.data.organCancerCountBean.splice(0, 5); //截取organCancerCountBean前5个数组
                            _this.arr2 = result.data.organCancerCountBean;
                        }
                        // 判断是否为空对象  分析依据
                        if(JSON.stringify(result.data.bloodOxygenStatisticsMap) != '{}')_this.bloodOxygenStatisticsMap = result.data.bloodOxygenStatisticsMap;//血氧
                        if(JSON.stringify(result.data.bloodPressureStatisticsMap) != '{}')_this.bloodPressureStatisticsMap = result.data.bloodPressureStatisticsMap;//血压
                        if(JSON.stringify(result.data.heartRateStatisticsMap) != '{}')_this.heartRateStatisticsMap = result.data.heartRateStatisticsMap;//心率
                        _this.date1 = result.data.date;
                        // 睡眠状态
                        if(result.data.sleepADWalkADExercise !=null && result.data.sleepADWalkADExercise !=''){
                            //睡眠+步数+有氧运动
                            if(result.data.sleepADWalkADExercise !=null && result.data.sleepADWalkADExercise !=''){
                                _this.hour1 = parseInt(result.data.sleepADWalkADExercise.analysisTime/60/60);  //小时
                                _this.min1 = parseInt(result.data.sleepADWalkADExercise.analysisTime/60) % 60;  //分
                            }
                            //                  步数统计
                            _this.sleepADWalkADExercise.walkNum = result.data.sleepADWalkADExercise.walkNum;
                            //睡眠柱状图数据list
                            _this.sleepDataList = result.data.sleepADWalkADExercise.sleepDataList;
                            //步数柱状图数据map
                            _this.WalkDataList = result.data.sleepADWalkADExercise.WalkDataList;
                        }
                        //   把分钟转化为时 ,分
                        if(result.data.sleepADWalkADExercise.sleepBean != null){
                            var dataBean = result.data.sleepADWalkADExercise.sleepBean;
                            _this.sleepADWalkADExercise.sleepBean = dataBean;

                            var time = parseInt(dataBean.totalTime/60/60);	//小时向下取整
//                       总睡眠
                            _this.hour2 = parseInt(dataBean.totalTime/60/60); //小时
                            _this.min2 = parseInt((dataBean.totalTime-(parseInt(dataBean.totalTime/60/60))*60*60)/60); //分
                            if(dataBean.totalTime != 0){
                                _this.hour2+"时"+_this.min2+"分";
                            }
//                      深睡时间
                            _this.hour3 = parseInt(dataBean.deepSleepTime/60/60);//小时
                            _this.min3 = parseInt((dataBean.deepSleepTime-(parseInt(dataBean.deepSleepTime/60/60))*60*60)/60); //分
                            if(dataBean.deepSleepTime != 0){
                                _this.hour3+"时"+_this.min3+"分";
                            }
                            //浅睡眠
                            _this.hour4 = parseInt(dataBean.lightSleepTime/60/60); //小时
                            _this.min4 = parseInt((dataBean.lightSleepTime-(parseInt(dataBean.lightSleepTime/60/60))*60*60)/60); //分
                            if(dataBean.lightSleepTime != 0){
                                _this.hour4+"时"+_this.min4+"分";
                            }
                            // 肿瘤风险提示分析数据
                            if(result.data.organCancerAnalysis != null && result.data.organCancerAnalysis != ''){
                                _this.organCancerAnalysis = result.data.organCancerAnalysis;
                            }


                            // 判断身体状态
                            if( result.data.monitoringDetails.healthFlag == 0){
                                _this.healthFlag ='未知';
                                $('.left_right .top .body span').css('color','#efeff4');
                                $('.dot .illType').css('color','#efeff4');
                            }else if(result.data.monitoringDetails.healthFlag == 1){
                                _this.healthFlag ='健康';
                                $('.left_right .top .body span').css('color','#37b864');
                                $('.dot .illType').css('color','#37b864');
                            }else if(result.data.monitoringDetails.healthFlag == 2){
                                _this.healthFlag ='亚健康';
                                $('.left_right .top .body span').css('color','#e9ad4f');
                                $('.dot .illType').css('color','#e9ad4f');
                            }else if(result.data.monitoringDetails.healthFlag == 3){
                                _this.healthFlag ='疾病';
                                $('.left_right .top .body span').css('color','#EA4A4A');
                                $('.dot .illType').css('color','#EA4A4A');
                            }
                            //12个器官
                            if(result.data.monitoringDetails.allTheInternalOrgans !== null && result.data.monitoringDetails.allTheInternalOrgans !== '' && result.data.monitoringDetails.allTheInternalOrgans !== undefined){
                                _this.allTheInternalOrgans = result.data.monitoringDetails.allTheInternalOrgans;
                            }

                            if(result.data.monitoringDetails.bloodOxygenCurve != null && result.data.monitoringDetails.bloodOxygenCurve != ''){
                                _this.bloodOxygenCurve = result.data.monitoringDetails.bloodOxygenCurve
                            } //血氧
                            if(result.data.monitoringDetails.bloodPressureCurve != null && result.data.monitoringDetails.bloodPressureCurve != ''){
                                _this.bloodPressureCurve = result.data.monitoringDetails.bloodPressureCurve;
                            }
                            //血压

                            if(result.data.monitoringDetails.heartRateCurve != null && result.data.monitoringDetails.heartRateCurve != ''){
                                _this.heartRateCurve = result.data.monitoringDetails.heartRateCurve;
                            }      //心率
                            if(result.data.monitoringDetails.comprehensiveDiagnosis != null && result.data.monitoringDetails.comprehensiveDiagnosis != ''){
                                _this.comprehensiveDiagnosis = result.data.monitoringDetails.comprehensiveDiagnosis;
                            } //综合
                        }
                        _this.changeClass(index);
                    } else {
                        layer.msg('' + result.msg, {
                            icon: 2
                        });
                    }
                },
                error: function() {}
            });
        },
        // 点击肿瘤风险查看  出现弹框
        cancerCheck:function(){
            $('#cancerRisk').modal({backdrop: 'static', keyboard: false});
            this.cancerChart();
        },
        // 肿瘤风险折线图
        cancerChart:function(){
            var data1 = [
                {name:'2018-02-12 00:00:00',value: 1, zstatus: 1},
                {name:'2018-02-13 00:00:00',value: 1, zstatus: 1},
                {name:'2018-02-14 00:00:00',value: 1, zstatus: 1},
                {name:'2018-02-15 00:00:00',value: 1, zstatus: 1},
                {name:'2018-02-16 00:00:00',value: 1, zstatus: 2},
                {name:'2018-02-17 00:00:00',value: 1, zstatus: 3},
                {name:'2018-02-18 00:00:00',value: 1, zstatus: 2},
                {name:'2018-02-19 00:00:00',value: 1, zstatus: 1},
                {name:'2018-02-20 00:00:00',value: 1, zstatus: 1},
                {name:'2018-02-21 00:00:00',value: 1, zstatus: 1},
                {name:'2018-02-22 00:00:00',value: 1, zstatus: 1},
                {name:'2018-02-23 00:00:00',value: 1, zstatus: 1},
                {name:'2018-02-24 00:00:00',value: 1, zstatus: 1},
                {name:'2018-02-25 00:00:00',value: 1, zstatus: 1},
                {name:'2018-02-26 00:00:00',value: 1, zstatus: 3},
                {name:'2018-02-27 00:00:00',value: 1, zstatus: 3},
                {name:'2018-02-28 00:00:00',value: 1, zstatus: 3},
                {name:'2018-03-01 00:00:00',value: 1, zstatus: 1},
                {name:'2018-03-02 00:00:00',value: 1, zstatus: 2},
                {name:'2018-03-03 00:00:00',value: 1, zstatus: 2},
                {name:'2018-03-04 00:00:00',value: 1, zstatus: 2},
                {name:'2018-03-05 00:00:00',value: 1, zstatus: 2},
                {name:'2018-03-06 00:00:00',value: 1, zstatus: 2},
                {name:'2018-03-07 00:00:00',value: 1, zstatus: 2},
                {name:'2018-03-08 00:00:00',value: 1, zstatus: 1},
                {name:'2018-03-09 00:00:00',value: 1, zstatus: 1},
                {name:'2018-03-10 00:00:00',value: 1, zstatus: 1},
                {name:'2018-03-11 00:00:00',value: 1, zstatus: 1},
                {name:'2018-03-12 00:00:00',value: 1, zstatus: 1},
                {name:'2018-03-13 00:00:00',value: 1, zstatus: 1},
                {name:'2018-03-14 00:00:00',value: 1, zstatus: 1},
                {name:'2018-03-15 00:00:00',value: 1, zstatus: 1},
                {name:'2018-03-16 00:00:00',value: 1, zstatus: 3},
                {name:'2018-03-17 00:00:00',value: 1, zstatus: 3},
                {name:'2018-03-18 00:00:00',value: 1, zstatus: 3},
                {name:'2018-03-19 00:00:00',value: 1, zstatus: 3}
            ];
            // var arr1 = [];
            // for(var p = 0; p < data1.length; p ++){
            //     var obj1 = {};
            //     obj1.name = data1[p].organStatusTime;
            //     obj1.value = [data1[p].organStatusTime,1,data1[p].organStatus];
            //     obj1.type = data1[p].organStatus;
            //     arr1.push(obj1);
            // }
            //对应容器
            var sleepWatch = echarts.init(document.getElementById('cancerChart'));
            //配置项
            var option = {
                /*title: {
                    text: '脾部肿瘤异常提示趋势'
                },*/
                legend: {
                    data: ['', 'bar2'],
                    align: 'left'
                },
                //tooltip
                tooltip: {
                    trigger: 'axis',
                    backgroundColor:'rgba(255,255,255,0.7)',
                    borderWidth:'1',
                    borderColor :'#0096FF',
                    textStyle:{
                        color:'#464646'
                    },
                    formatter: function (params) {
                        var res = '<div><p>日期：' + params[0].axisValueLabel.substring(0,5) + '</p></div>';
                        if(params[0].data.type == '1'){
                            res += '<p>状态:无异常</p>';
                        }else if(params[0].data.type == '3'){
                            res += '<p>状态:异常</p>'
                        }else if(params[0].data.type == '0'){
                            res += '<p>状态:数据不足</p>'
                        }else {
                            return;
                        }
                        return res;
                    }
                },
                //x轴
                xAxis:{
                    type: 'time',
                    boundaryGap: false,
                    splitLine:{
                        show:false
                    },
                    axisLabel :{//标签设置
                        color:"rgba(70,70,70,0.6)",
                        fontSize: "12"
                    },
                    axisLine: { //x轴颜色
                        show: false,
                        lineStyle: {
                            color: "#fff"
                        }
                    }
                },
                //y轴
                yAxis:{
                    type: 'value',
                    show:false,
                    min: 0,
                    max: 1,
                    splitNumber: 0,
                    axisLine: { //y轴颜色
                        lineStyle: {
                            color: "#eee"
                        }
                    },
                    axisTick: {
                        show: false//是否显示y轴刻度
                    },
                    axisLabel: { //强制显示
                        interval: 0,
                        textStyle: { //y轴标签颜色
                            color: "#666"
                        }
                    }
                },
                //大小边距调整
                grid:{
                    left: "5%",
                    right:"5%",
                    top:"10px",
                    bottom:"20px",
                    containLabel:false
                },
                //数据
                series:[
                    //
                    {
                        name:'提示趋势',
                        type:'bar',            //折线图
                        symbol: 'none', //去掉每个点的小圆点标记
                        barWidth : 7,          //柱子宽度
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var index_color = params.value;
                                    if(index_color[2] == 1){
                                        return '#5AAC46';
                                    }else if(index_color[2] == 3){
                                        return '#FE6130';
                                    }else{
                                        return '#E4E4E4';
                                    }
                                }
                            }
                        },
                        data:['06/02', '06/20', '04/18', '10/14', '02/27', '11/03', '08/17']
                    }
                ]
            };
            //配置项生成统计图
            sleepWatch.clear();
            sleepWatch.setOption(option);
        },
        // 点击睡眠查看  出现弹框
        sleepStatus:function(){
            $('#sleepStatus').modal({backdrop: 'static', keyboard: false});
            this.sleepChart(this.sleepDataList);

        },
        // 睡眠状态折线图
        sleepChart:function(data1){
            var arr1 = [];
            for(var p = 0; p < data1.length; p ++){
                var obj1 = {};
                obj1.name = data1[p].name;
                obj1.value = [data1[p].name,data1[p].value,data1[p].zstatus];
                obj1.type = data1[p].zstatus;
                arr1.push(obj1);
            }
            //对应容器
            var sleepWatch = echarts.init(document.getElementById('sleepChart'));
            //配置项
            var option = {
                //tooltip
                //tooltip
                tooltip: {
                    trigger: 'axis',
                    backgroundColor:'rgba(255,255,255,0.7)',
                    borderWidth:'1',
                    borderColor :'#0096FF',
                    textStyle:{
                        color:'#464646'
                    },
                    formatter: function (params) {
                        var res = '<div><p>时间：' + params[0].axisValueLabel.substring(0,5) + '</p></div>';
                        if(params[0].data.type == '1'){
                            res += '<p>状态:浅睡</p>';
                        }else if(params[0].data.type == '2'){
                            res += '<p>状态:深睡</p>'
                        }else {
                            return;
                        }
                        return res;
                    }
                },
                //x轴
                xAxis:{
                    type: 'time',
                    boundaryGap: false,
                    splitLine:{
                        show:false
                    },
                    axisLabel :{//标签设置
                        color:"rgba(70,70,70,0.6)",
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
                /*dataZoom:[
                    {
                        type: 'inside',
                        start: 0,
                        end: 20
                    }
                ],*/
                //y轴
                yAxis:{
                    type: 'value',
                    show:false,
                    min: 0,
                    max: 1,
                    splitNumber: 0,
                    axisLine: { //y轴颜色
                        lineStyle: {
                            color: "#eee"
                        }
                    },
                    axisTick: {
                        show: false//是否显示y轴刻度
                    },
                    axisLabel: { //强制显示
                        interval: 0,
                        textStyle: { //y轴标签颜色
                            color: "#666"
                        }
                    }
                },
                //大小边距调整
                grid:{
                    left: "5%",
                    right:"10%",
                    top:"10%",
                    bottom:"45px",
                    containLabel:false
                },
                //数据
                series:[
                    //睡眠
                    {
                        name:'睡眠',
                        type:'bar',            //折线图
                        symbol: 'none', //去掉每个点的小圆点标记
                        barWidth : 2,          //柱子宽度
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var index_color = params.value;
                                    if(index_color[2] == 1){
                                        return '#7FCAFF';
                                    }else if(index_color[2] == 2){
                                        return '#0096FF';
                                    }else{
                                        return '#0096FF';
                                    }
                                }
                            }
                        },
                        data:arr1
                    }
                ]
            };
            //配置项生成统计图
            sleepWatch.setOption(option);
        },
        // 点击步行查看  出现弹框  出现折线图
        walkTotal:function(){
            $('#walking').modal({backdrop: 'static', keyboard: false});
            this.walkChart(this.WalkDataList);

        },
        walkChart:function(data){

            var dateArr = [];
            for(var o = 1; o < 31; o ++){
                if(data[''+getOneDay(o)] != null){
                    dateArr.push([getOneDay(o),data[''+getOneDay(o)]]);
                }else {
                    dateArr.push([getOneDay(o),'0']);
                }

            }
            dateArr = dateArr.reverse();



            var timeDate = [];
            // var value = [];
            for (var i = 0 ; i < data.length ; i ++){
                timeDate.push(data[i].date.substring(5,10));
                // value.push(data[i].actualWalk);
            }
            var healDays = echarts.init(document.getElementById('walkCanvas'));//对应容器
            //配置项
            var option = {
                backgroundColor:'#f4f4f4',  //设置无背景色

                //tooltip
                tooltip: {
                    trigger: 'axis',
                    backgroundColor:'rgba(255,255,255,0.7)',
                    borderWidth:'1',
                    borderColor :'#0096FF',
                    textStyle:{
                        color:'#464646'
                    }
                },
                //x轴
                xAxis:{
                    type: 'time',       //category  time
                    boundaryGap: false,
                    splitLine:{
                        show:false
                    },
                    data:timeDate,
                    axisLabel :{//标签设置
                        color:"rgba(70,70,70,0.6)",
                        fontSize: "12"
                    },
                    axisLine: { //x轴颜色
                        show: false,
                        lineStyle: {
                            color: "#fff"
                        }
                    }
                },
                //y轴
                yAxis:{
                    type: 'value',
                    min: 0,
                    max: 30000,
                    splitNumber: 5,
                    show:true,
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
                            color: "rgba(70,70,70,0.6)"
                        }
                    }
                },
                //大小边距调整
                grid:{
                    left: "45px",
                    right:"0",
                    top:"10px",
                    bottom:"20px",
                    containLabel:false
                },
                //数据
                series:[
                    //心率
                    {	symbol: 'circle',
                        name:'步数',
                        type:'line',           //折线图
                        smooth: true,
                        // symbol: 'none', //去掉每个点的小圆点标记
                        data:dateArr,   //动态data
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    width: 1,
                                    type: 'solid',
                                    shadowColor : 'rgba(0,0,0,0)', //默认透明
                                    shadowBlur: 5,
                                    shadowOffsetX: 3,
                                    shadowOffsetY: 3
                                },
                                //颜色设置
                                color: "#0096FF"
                            }
                        }
                    }
                ]
            };
            //配置项生成统计图
            healDays.setOption(option);
        }
    }
})

/**
 * 12张图摆放
 * 胆、小肠、心、膀胱、       肝、脾、心包、脊椎、       肾、肺、淋巴、大肠
 * */
$(function() {
    //中心点横坐标
    var dotLeft = ($(".containerImg").width() - $(".dot").width()) / 2;
    //中心点纵坐标
    var dotTop = ($(".containerImg").height() - $(".dot").height()) / 2;
    //起始角度
    var stard = 0;
    //半径
    var radius = 90;
    //每一个BOX对应的角度;
    var avd = 360 / $(".boxImg").length;
    //每一个BOX对应的弧度;
    var ahd = avd * Math.PI / 180;

    //设置圆的中心点的位置
    $(".dot").css({
        "left": dotLeft,
        "top": dotTop + 20
    });
    //设置图片位置
    $(".boxImg").each(function(index, element) {
        $(this).css({
            "left": Math.sin((ahd * index)) * radius + dotLeft,
            "top": Math.cos((ahd * index)) * radius + dotTop
        });
    });

})
//获取某天日期
function getOneDay(s) {
    var date = new Date(new Date() - s * 24 * 60 * 60 * 1000);
    var year = date.getFullYear();
    var mon = date.getMonth() + 1;
    var day= date.getDate();
    mon = mon >= 10 ? mon : '0' + mon;
    day = day >= 10 ? day : '0' + day;
    return year + '-' + mon + '-' + day;
}


