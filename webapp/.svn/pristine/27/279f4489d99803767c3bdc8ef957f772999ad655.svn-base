var obj = {};
var url = window.location.search; //截取"?"以及之后的所有字符串
var str = url.substring(1, url.length); //去除"?"
var arr = str.split('&'); //根据&分割成数组   ["key=value","name=zxm"]
for(var i = 0; i < arr.length; i++) {
	obj[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
}
obj.loginId = localStorage.loginId;
obj.token = localStorage.token;
console.log(obj);

//隐藏部分数据
var app = new Vue({
	el: '#app',
	data: {
        misDays:'',    //误报天数
		allData: '',
		data1: '',
		age: '',
		ageSign: '',
		phoneNum: '',
		username: '',
		id: '',
        currentAddress: '',
		username1: '',
		nickName: '',
		idCard: '',
		height: '',
		weight: '',
		medicalHistory: '',
		occupation: '',
		remark: '',
		gender: '',
		deviceStatus: '',
		alarmCount: '',
		lastAlarmTime: '',
		emergencyPeople: '',
		emergencyPhone: '',
		deviceId: '',
		sIMPhoneNum: '',
		length: '',
		serviceStartTime: '',
		serviceEndTime: '',
		waySign: '',
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
		healthDaysBeans: [
		    {count:'0'},
		    {count:'0'},
		    {count:'0'},
		    {count:'0'}
		],
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
		cmsHBBDateStatistics:'',
		organCancerAnalysis:'',//分析
		pastTime:'',
		currentTime:'',
		bloodOxygenCurve:'',  //血氧分析
		bloodPressureCurve:'', //血壓分析
		heartRateCurve:'',  //心率
		comprehensiveDiagnosis:'',  //綜合分析
		healthFlag:'',   //身体状态
        sleepMonitoring:{
        	deep:'0时0分',
        	light:'0时0分',
        	totalSleepDuration:'0时0分',
        	sleepConclusion:''
        },
        runningMonitoring:{
        	aerobicExercise:'0时0分',
        	numberOfWalk:'0'
        },
        nearestBloodPressure:'--',
        nearestBloodPressureTime:'-:-',
        nearestHeartRate:'--',
        nearestHeartRateTime:'-:-',
        nearestOxyhemoglobinSaturation:'--',
        nearestOxyhemoglobinSaturatioTime:'-:-',
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
        isPass:'',
        theLowerRightNum:'',
        serviceUseDay : '',
        serviceNoUseDay : '',
        hour1:'0',
        min1:'0',
        hour2:'0',
        min2:'0',
        hour3:'0',
        min3:'0',
        hour4:'0',
        min4:'0',
        totalHour:'0',
        totalMin:'0',
        total:'0',
        deepHour:'0',
        deepMin:'0',
        deepTime:'0',
        lightHour:'0',
        lightMin:'0',
        lightTime:'0',
        runningHour:'0',
        runningMin:'0',
        runningTime:'0',
        attentionLevel:'0', //星星状态
        attentionLevelNew:'0',
        historyWear:[
          {bindingTime:'',deviceId:'',removeBindingTime:''},
          {bindingTime:'',deviceId:'',removeBindingTime:''},
        ],
        binder:[
        
        ],
        deviceVersion:'',
        dateTime:'',
        isInsurance:'', //保险
        isVip:'' ,  //vip
		current:'0' , //当前旋转度数
        serviceImgUrl : '',//服务协议图片路径
        sleepDataList : [],//睡眠数据List
        WalkDataList : {},//步数数据对象
        roleId : localStorage.sign,
        returnText:'',
        returnCount:'',
        lastReturnTime:'',
        callId:'',
        appId:'',
        disposeInfo:"1",
        disposeInfos:[],
        arrLocation:[],  //用户及附近医生的图标
        arrLocationImg:[],  //用户及附近医生的图片
        arrLocationInfo:[],   //用户及附近医生坐标的显示信息
        nearestLocationInfo:'',
        attentionDoctors:[],
        allTheInternalOrgans:{
            bladder:'../../imgs/iframeImgs/organ/bladder_0.png',   //膀胱
            kidney:'../../imgs/iframeImgs/organ/kidney_0.png',   //肾
            liver:'../../imgs/iframeImgs/organ/liver_0.png',   //肝
            stomach:'../../imgs/iframeImgs/organ/stomach_0.png',   //胃
            largeIntestine:'../../imgs/iframeImgs/organ/largeIntestine_0.png', //大肠
            gallBladder:'../../imgs/iframeImgs/organ/gallBladder_0.png',   //胆
            spleen:'../../imgs/iframeImgs/organ/spleen_0.png',   //脾
            lung:'../../imgs/iframeImgs/organ/lung_0.png',   //肺
            heart:'../../imgs/iframeImgs/organ/heart_0.png',    //心
            smallIntestine:'../../imgs/iframeImgs/organ/smallIntestine_0.png',    //小肠
            lymph:'../../imgs/iframeImgs/organ/lymph_0.png',    //淋巴
            pericardium:'../../imgs/iframeImgs/organ/pericardium_0.png',   //心包
            spine:'../../imgs/iframeImgs/organ/spine_0.png',   //脊椎
            reproductive:'../../imgs/iframeImgs/organ/reproductive_0.png'   //生殖
        }
    },
	mounted: function() {
        // $("#userType option:selected").text('佩戴用户');
		this.init();
		this.processProgress();
        this.getDoctorData();  //加载医生列表以及定位
//      this.pastTime = new Date().format(getMonth()+1)+"月"+new Date().format(.getDate())+"日"+" "+"00:00";
        var hour = new Date().getMonth()+1;
        var day = new Date().getDate();
        if(hour<10){
        	hour = "0" + hour
        }
        if(day<10){
        	day = "0"+ day
        }
        this.pastTime = hour+'月'+day+"日"+" "+"00:00";
	},
	computed: {
    },
	methods: {
	    /*点击电子档案跳转到电子档案页面*/
        hrefToElec:function(){
          window.open('../scanner/elecRecord.html?wearUserId=' + obj.wearUserId);
        },
	    // 点击添加工单进行弹框
        addWorkOrder:function(){
            $('#addWorkOrder').modal({backdrop: 'static', keyboard: false});
        },
        // 点击工单记录进行跳转
        workOrderList:function(){
            window.open('custom_recordHistory.html?deviceId='+this.deviceId);
        },
//		点击编辑 出现弹框
		edit1:function () {   
            $('#edit').modal({backdrop: 'static', keyboard: false});
        },
        //  点击关注 出现弹框
        attention:function(){
        	$('#attention').modal({backdrop: 'static', keyboard: false});
        },
        //  点击佩戴历史 出现弹框
        wearHistory:function(){
        	$('#wearHistory').modal({/*backdrop: 'static',*/ keyboard: false});
        },
        //  点击更换设备 出现弹框
        replace:function(){
        	$('#replace').modal({backdrop: 'static', keyboard: false});
        },
        //  点击解除绑定 出现弹框
        relieve:function(){
        	$('#relieve').modal({backdrop: 'static', keyboard: false});
        },
//      点击设置服务期限
        revise:function(){
        	$('#revise').modal({backdrop: 'static', keyboard: false});
        },
//      关闭弹框
        closeModel:function(){
        	$(".modal").modal("hide");
        },
//      点击关注里面的星星
        changeAttentionLevel:function(index){
        	this.attentionLevelNew = index;
        },
//      回访
        return1:function(){
            $('#returnVisit').modal({backdrop: 'static', keyboard: false});
        },
        // 处理进度
        processProgress:function(){
            var that = this;
            $.ajax({
                type: "post",
                url: global_path+"/cms/alarm/getDisposeInfoByWearUserId",
                cache: false,
                //禁用缓存
                data: {
                    loginId:localStorage.loginId,
                    token:localStorage.token,
                    wearUserId:obj.wearUserId
                },
                //传入组装的参数
                dataType: "json",
                success: function(result) {
                    if(result.code == 200){
                        // var data = result.data.DisposeInfos;
                        that.disposeInfos = result.data.DisposeInfos;
                    }
                }
            });

        },
        // 点击回访中的提交处理
        returnSubmit:function(){
            var that = this;
            $.ajax({
                url: global_path + '/cms/alarm/addDisposeInfoByWearUser',
                type:'post',
                dataType:'json',
                data:{
                    loginId:localStorage.loginId,
                    token:localStorage.token,
                    wearUserId:obj.wearUserId,
                    disposeInfo:that.returnText
                },
                success:function (res) {
                    if(res.code === 200){
                        layer.msg(res.msg,{icon:6,time:2000});
                        that.closeModel();
                        that.returnText = '';
                        setTimeout(function(){
                            window.location.reload();
                        },1000)
                    }else {
                        layer.msg(res.msg,{icon:5,time:2000});
                    }

                }
            })
        },
//      确定
        submit1:function(){
        	var that = this;
        	obj.ageNum = that.ageSign;
           $.ajax({
		        url: global_path + '/cms/wearUser/updateAgeSign',
		        type:'post',
		        dataType:'json',
		        data:obj,
		        success:function (res) {
           			if(res.code == 200){
                // $('#updateAge').attr('disabled','disabled');
                		that.ageSign = obj.ageNum;
                		layer.msg(res.msg,{icon:6,time:2000});
            		}else {
                		layer.msg(res.msg,{icon:5,time:2000});
            		}
       			}
            })
        },
        // 点击误报天数 出现弹框
        misInformation:function(){
            $('#misInformationList').modal({backdrop: 'static', keyboard: false});
            this.dataTables();
        },
        // 误报列表请求数据
        dataTables: function () {
            var that = this;
            $('#misInformationTable').DataTable({
                bLengthChange: false, //去掉每页显示多少条数据方法
                "info":false, //去掉底部文字
                "lengthMenu": [[5, 10, 25, 50], [5, 10, 25, 50]], //分页长度选项,   -1 "全部"  暂时取消
                "paging": false, //分页
                "ordering": false, //排序
                bStateSave:true,    //操作数据后局部刷新停留在当前页面
                "bSort": false,     //排序
                "bFilter": true, //过滤功能
                "order": [], //[[ 1, "desc" ]]默认排序 第三列
                iDisplayLength: 10,
                destroy: true, //如果需要重新加载的时候请加上这个
                "pagingType": "full_numbers", //分页样式
                "bDeferRender":true,        //     *  当该属性设置为true时，表格每一行新增的元素只有在需要被画出来时才会被DataTable创建出来
                //"scrollY": "auto", //设置高度
                //"scrollCollapse": true, //超出 滑动
                "bJQueryUI":true,      //      是否启用jQueryUI样式
                bProcessing:false,   //加载动画
                "bServerSide": true, //服务端分页
                //            "aaSorting": [[4, "desc"]],
                searching: false, //禁用原生搜索
                "language": { //语言配置
                    "sSearch": "搜索",
                    //          "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "没有检索到数据",
                    "sInfo": "第 _START_ 至 _END_ 条数据 &nbsp;&nbsp;共 _TOTAL_ 条",
                    "sInfoEmpty": "没有数据",
                    "sProcessing": "<img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511524485514&di=7914d6ce1d41cf99f546d04b0c6c3133&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01e423569d041532f875520fd65760.gif'/>", //这里是给服务器发请求后到等待时间显示的 加载gif
                    "sInfoFiltered": "(筛选自 _MAX_ 条数据)",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "前一页",
                        "sNext": "后一页",
                        "sLast": "末页"
                    }
                },
                ajax: function (data, callback, settings) {
                    // var obj = {};
                    // obj.pageSize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
                    // obj.startRow = data.start;//开始的记录序号
                    // // obj.loginId = localStorage.loginId;
                    // // obj.token = localStorage.token;
                    // // obj.wearUserId = obj.wearUserId;
                    // // obj.type = that.sendObj.type;
                    //ajax请求数据
                    $.ajax({
                        type: "post",
                        url: global_path + "/cms/wearUser/getDistortDays",
                        cache: false,  //禁用缓存
                        //传入组装的参数
                        data: {
                            token:localStorage.token,
                            loginId:localStorage.loginId,
                            wearUserId:obj.wearUserId
                        },
                        dataType: "json",
                        success: function (res) {
                            if(res.code === 200){
                                var returnData = {};
                                returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                                returnData.recordsTotal = res.data.total;//返回数据全部记录
                                returnData.recordsFiltered = res.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                                returnData.data = res.data.data;//返回的数据列表
                                callback(returnData);
                            }
                        },
                        error:function(){

                        }
                    });
                },
                columns:
                    [
                        //序号
                        {
                            "data": null,
                            "bSortable": false
                        },
                        //报警时间
                        {
                            "data": "sosTime",
                            "bSortable": false
                        },
                        //处理状态
                        {
                            "data": "state",
                            "bSortable": false,
                            "render":function (data, type, full, meta) {
                                var node = '';
                                if(full.state === '1'){
                                    node = '未处理';
                                }else if(full.state === '2'){
                                    node = '真实';
                                }else if(full.state === '3'){
                                    node = '误报';
                                }else{
                                    node = '其他';
                                }
                                return node;
                            }
                        },
                        //处理人
                        {
                            "data": "recordId",
                            "bSortable": false
                        },
                        //处理时间
                        {
                            "data": "recordTime",
                            "bSortable": false
                        }

                    ],
                    "fnDrawCallback": function() { //序号
                        this.api().column(0).nodes().each(function(cell, i) {
                            cell.innerHTML = i + 1;
                        });
                    }
                })
        },
//      点击查看全部绑定 出现弹框
        bind:function(){
            // $('#bind').modal({backdrop: 'static', keyboard: false});
            // backdrop: 'static', 点击背景处不被关闭
            // keyboard: false  按下键盘处的esc不退出
        	$('#bind').modal({ keyboard: false});
        },
       /*
         * 解除绑定
         */
        removeBinding: function() {
        	var that = this;
			//向服务端发送请求
			$.ajax({
				url: global_path + '/cms/device/removeBinding',
				type: 'post',
				dataType: 'json',
				data: obj,
				success: function(res) {
					if(res.code == 200) {
						layer.msg(res.msg, {
							icon: 1
						});
                        location.reload();
					} else {
						layer.msg(res.msg);
					}
					that.closeModel();
				}
			});
		},
		//点击设置服务期限里面的修改截止日期
		submit2:function(){
			var that = this;
			obj.serviceEndTime = $('#serve1').val();
			$.ajax({
              url:global_path + '/cms/service/updateWaySign',
              type:'post',
              dataType:'json',
              data:obj,
		      success:function (res) {
		      	window.location.reload();
		      }
		    })
		},
		// 通过
		pass:function(sign){
			var that = this;
            $.ajax({
                url:global_path+'/cms/wearUser/updataServiceAgreementSign',
                type:'post',
                dataType:'json',
                data:{
                    "loginId": localStorage.loginId,
                    "token": localStorage.token,
                    "wearUserId": obj.wearUserId,
                    "sign":sign,
                },
                success:function(res){
                    if(res.code == 200){
                        layer.msg(res.msg,{
                            icon:6,time:2000
                        });
                        if(res.data.sign == 2)that.isPass == '审核通过';
                        if(res.data.sign == 3)that.isPass == '审核失败';

                    }else{
                        layer.msg(res.msg,{
                            icon:5,time:2000
                        });
                    }
                    $('#serviceTcp').modal('hide');

                }
            })
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
        // 点击有氧运动查看  出现弹框
        exercise:function(){
            $('#exercise').modal({backdrop: 'static', keyboard: false});
            this.runChart();

        },
        runChart:function(){
            // if(obj.startTime == null){
            //     if(new Date().getHours() < 13){
            //         data1.unshift({
            //             name : new Date().getFullYear() + '-' + getNowFormatDate(2).replace('月','-').replace('日','') + ' 13:00:00',
            //             value : 0,
            //             zstatus : 0
            //         });
            //         data1.push({
            //             name : new Date().getFullYear() + '-' + getNowFormatDate(1).replace('月','-').replace('日','') + ' 13:00:00',
            //             value : 0,
            //             zstatus : 0
            //         });
            //     } else {
            //         data1.unshift({
            //             name : new Date().getFullYear() + '-' + getNowFormatDate(1).replace('月','-').replace('日','') + ' 13:00:00',
            //             value : 0,
            //             zstatus : 0
            //         });
            //         data1.push({
            //             name : new Date().getFullYear() + '-' + getNowFormatDate(0).replace('月','-').replace('日','') + ' 13:00:00',
            //             value : 0,
            //             zstatus : 0
            //         });
            //     }
            // }else {
            //     data1.unshift({
            //         name : obj.startTime.substring(0,4) + '-' + getPreDay(obj.startTime.split('-').join('')).replace('月','-').replace('日','') + ' 13:00:00',
            //         value : 0,
            //         zstatus : 1
            //     });
            //     data1.push({
            //         name : obj.startTime + ' 13:00:00',
            //         value : 0,
            //         zstatus : 1
            //     });
            // }
            // var arr1 = [];
            // for(var p = 0; p < data1.length; p ++){
            //     var obj1 = {};
            //     obj1.name = data1[p].name;
            //     obj1.value = [data1[p].name,data1[p].value,2];
            //     // obj1.type = data1[p].zstatus;
            //     obj1.type = 2;
            //     arr1.push(obj1);
            // }
            //对应容器
            var sleepWatch = echarts.init(document.getElementById('runChart'));
            //配置项
            var option = {
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
                        if(params[0].data.value[1] == '1'){
                            res += '<p>状态:有氧运动</p>';
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
                                        return '#36b864';
                                    }else if(index_color[2] == 2){
                                        return '#36b864';
                                    }else{
                                        return '#36b864';
                                    }
                                }
                            }
                        },
                        data:['06/02', '06/20', '04/18', '10/14', '02/27', '11/03', '08/17']
                    }
                ]
            };
            //配置项生成统计图
            sleepWatch.setOption(option);
        },
        // 点击睡眠查看  出现弹框
        cancerCheck:function(){
            $('#cancerRisk').modal({backdrop: 'static', keyboard: false});
            this.cancerChart();
        },
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
		/**
		 * 更换设备
		 */
        changeDevice: function () {
            var that = this;
            obj.newDeviceId = $('#newDeviceId').val();
            obj.checkCode = $('#checkCode').val();
            $.ajax({
                url: global_path + '/cms/device/changeDevice',
                type: 'post',
                dataType: 'json',
                data: obj,
                success: function (res) {
                    if (res.code == 200) {
                        layer.msg(res.msg, {icon: 1});
                    } else {
                        layer.msg(res.msg);
                    }
                    that.closeModel();
                    location.reload();
                }
            });
        },
//		保存关注度
        saveSatr:function(){
        	var that = this
        	$.ajax({
              url:global_path + '/cms/device/addDeviceToAttention',
              type:'post',
              dataType:'json',
              data:{
              	"loginId": localStorage.loginId,
            	"token": localStorage.token,
            	"wearUserId": obj.wearUserId,
                "attentionLevel":that.attentionLevelNew
        	  },
		      success:function (res) {
		      	if(res.code == 200) {
		      		layer.msg(res.msg);
		      		that.attentionLevel = that.attentionLevelNew;
		      	}
		      	that.closeModel();
		      }
		    })
		},
		/*
		 * 保存备注
		 */
		saveRemake:function(){
			if($('#remarkVal').val() == null || $('#remarkVal').val() == ''){
        		layer.msg('请填写备注',{time:2000});
        		return;
    		}
    		obj.remark = $('#remarkVal').val();
    		var that = this;
    		$.ajax({
       		 	url: global_path + '/cms/wearUser/addRemark',
        		type:'post',
        		dataType:'json',
        		data:obj,
        		success:function (res) {
            		if(res.code == 200){
               		 	that.remark = $('#remarkVal').val();
                		layer.msg(res.msg,{icon:6,time:2000});
            		}else {
                		layer.msg(res.msg,{icon:5,time:2000});
            		}
            		that.closeModel();
        		}

    		})
		},
		//查看设备详情
		toDeviceDetail:function(){
			window.open('deviceDetails.html?deviceId='+this.deviceId);
		},
		getHtml:function(){  //点击对比数据跳到历史数据页面
            window.open('historyData.html?wearUserId='+obj.wearUserId);
		},
		skip:function(){
		  // window.location.href = 'SosWarningList.html'
		},
        // 点击对比历史跳到历史数据页面
		comparativeHistory:function(){
			window.open('historyData.html?wearUserId='+obj.wearUserId);
		},
        // 点击查看历史健康解析
        healthAnalytic:function(){
            window.open('historyHealthAnalysis.html?wearUserId='+obj.wearUserId);
        },
		servicePass:function(){
		  if(this.isPass == '无'){
		  	 return;
		  }
		  if(localStorage.sign !== '0' && localStorage.sign !== '1'){
		      return;
          }
		  //
		  $('#serviceTcp').modal('show');
		},
		// 点击旋转
		rotate:function(){
            this.current = (this.current+90)%360;
            $('#img1').css('transform','rotate('+this.current+'deg)');
		},
		init: function() {
			var that = this;
			// 用户基本信息
			$.ajax({
				type: "post",
				url: global_path + "/cms/wearUser/selectWearUserInfo",
				cache: false, //禁用缓存
				data: obj,
				dataType: "json",
				success: function(result) {
					checkToken(result);
					if(result.code == 200) {
						this.allData = result.data.cmsWearUserInfo;
						that.misDays =  this.allData.days;    //误报天数
						that.data1 = this.allData.addressInfo; //居住地址
						that.returnCount = this.allData.returnCount; //回访次数
						that.lastReturnTime = this.allData.lastReturnTime; //上次回访时间
                        that.attentionDoctors = this.allData.attentionDoctors;  //关注医生的列表
//                      居住地址从第9位开始全部转换为*
                        if(localStorage.sign !=0 && localStorage.sign !=1){
	                        var place = that.data1;
		                    place = place.split('');  //转化为数组
		                    place.slice(0,9); //截取前九位
                            that.data1 = place.slice(0,13).join('')+'********' //转化为字符串
                        }
						that.phoneNum = this.allData.phoneNum; //手机号
                        //手机号后中间4位转换为*
						if(localStorage.sign !=0 && localStorage.sign !=1){
						    if(that.phoneNum != '' && that.phoneNum != null){
                                var tel = that.phoneNum
                                tel = tel.split('') //转化为数组
                                tel.splice(3,4,'****')  //从下标位3替换*
                                that.phoneNum = tel.join('') //转化为字符串
                            }
						}
						that.age = this.allData.age;
						that.ageSign = this.allData.ageSign;
						that.username = this.allData.username;
//						姓名第二位替换成*
						if(localStorage.sign !=0 && localStorage.sign !=1){
						    if(that.username != '' && that.username != null){
                                var name1 = that.username
                                name1 = name1.split('')
                                name1.splice(1,1,'*')
                                that.username = name1.join('');
                            }
						}
						that.binder = this.allData.binder;
//						点击查看全部绑定  手机号中间4位转成*
						if(localStorage.sign !=0 && localStorage.sign !=1){
						  for(var i in that.binder){
                        	var id2 = that.binder[i].id;
		                    id2 = id2.split('') //转化为数组   
		                    id2.splice(3,4,'****')  //从下标位3替换*
                            that.binder[i].id = id2.join('') //转化为字符串
                          }
						}
						 
						if(this.allData.binder != '' && this.allData.binder != null){
							that.id = this.allData.binder[0].id;
							// 弹框添加工单
							that.callId = that.id;     //来电号码
							that.appId = that.id;     //app账号
                           //手机号中间转换为*
							if(localStorage. sign!=0 && localStorage.sign !=1){
                                 id1 = that.id.split('') //转化为数组
                                 id1.splice(3,4,'****')  //从下标位3替换*
	                             id1.join('') //转化为字符串
                                 that.id = id1.join('');
							} 
							that.username1 = this.allData.binder[0].username;
						    that.nickName = this.allData.binder[0].nickName;
						}
						that.attentionLevel = this.allData.attentionLevel;  //星星状态
						that.attentionLevelNew = this.allData.attentionLevel;
						that.idCard = this.allData.idCard;
						if(localStorage.sign !=0 && localStorage.sign !=1){
							//身份证号后8位转换为*
	                        var card = that.idCard
	                        card = card.split('') //转化为数组   ["4", "1", "0", "7", "8", "2", "1", "9", "9", "9", "0", "8", "0", "8", "8", "8", "8", "8"]
	                        card.splice(10,8,'********')  //["4", "1", "0", "7", "8", "2", "1", "9", "9", "********"]
                            that.idCard = card.join('') //410782199********
						}
						that.height = this.allData.stature;
						that.weight = this.allData.weight;
						that.medicalHistory = this.allData.medicalHistory;
						that.occupation = this.allData.occupation;
						that.remark = this.allData.remark;
						that.currentAddress = this.allData.currentAddress;
						that.serviceImgUrl = "https://i.iandun.com:8085/"+this.allData.serviceImgUrl;
						// that.location = this.allData.location != '' ? this.allData.location.split(',') : '';
						// (localStorage.sign != 0 &&  localStorage.sign != 1) ? '' : that.locationMap(that.location) ;

						//判断性别
						if(this.allData.gender == 1) {
							that.gender = '男';
						}else{
							that.gender = '女';
						}
						//判断佩戴状态
						if(this.allData.deviceStatus == 0) {
							that.deviceStatus = '未知';
						} else if(this.allData.deviceStatus == 1) {
							that.deviceStatus = '工作中';
						} else if(this.allData.deviceStatus == 2) {
							that.deviceStatus = '离手';
						} else if(this.allData.deviceStatus == 3) {
							that.deviceStatus = '充电中';
						} else if(this.allData.deviceStatus == 4) {
							that.deviceStatus = '失联';
						} else if(this.allData.deviceStatus == 5) {
							that.deviceStatus = '关机';
						}
						that.alarmCount = this.allData.alarmCount;
						that.lastAlarmTime = this.allData.lastAlarmTime != null && this.allData.lastAlarmTime != '' ? this.allData.lastAlarmTime.substring(0,this.allData.lastAlarmTime.length-2) : '';
						that.emergencyPeople = this.allData.emergencyPeople;
                        // 姓名第二位替换成*
                        if(localStorage.sign !=0 && localStorage.sign !=1){
                            if(that.emergencyPeople != '' && that.emergencyPeople != null){
                                var name1 = that.emergencyPeople
                                name1 = name1.split('')
                                name1.splice(1,1,'*')
                                that.emergencyPeople = name1.join('');
                            }
                        }
						that.emergencyPhone = this.allData.emergencyPhone;
                        //手机号中间转换为*
                        if(localStorage. sign!=0 && localStorage.sign !=1){
                            if(that.emergencyPhone != '' && that.emergencyPhone != null){
                                id1 = that.emergencyPhone.split('') //转化为数组
                                id1.splice(3,4,'****')  //从下标位3替换*
                                id1.join('') //转化为字符串
                                that.emergencyPhone = id1.join('');
                            }

                        }
                        that.deviceId = this.allData.deviceId;
                        that.sIMPhoneNum = this.allData.sIMPhoneNum;
                        //手机号中间转换为*
                        if(localStorage. sign!=0 && localStorage.sign !=1){
                            if(that.sIMPhoneNum != '' && that.sIMPhoneNum != null){
                                id1 = that.sIMPhoneNum.split('') //转化为数组
                                id1.splice(3,4,'****')  //从下标位3替换*
                                id1.join('') //转化为字符串
                                that.sIMPhoneNum = id1.join('');
                            }

                        }
                  // 判断合伙人权限  不给显示审核状态
                        if(localStorage.sign !=0 && localStorage.sign !=1){
                            that.isPass = '';
                        }else{
                            //                      判断服务协议状态
                            if(this.allData.isPass == 0){
                                that.isPass = '无';
                            }else if(this.allData.isPass == 1){
                                that.isPass = '待审';
                            }else if(this.allData.isPass == 2){
                                that.isPass = '审核通过';
                            }else if(this.allData.isPass == 3){
                                that.isPass = '审核失败';
                            }
                        }

                        
                        that.length = this.allData.historyWear.length
                      
//                      if(localStorage.sign !=0 && localStorage.sign !=1){
//	                        var id1 = this.allData.historyWear
//		                    id1 = tel.split('') //转化为数组   
//		                    id1.splice(3,4,'****')  //从下标位3替换*
//	                        id1.join('') //转化为字符串
//						} 
//                      手机号中间4位换成*

                        //服务器    
//                      服务天数计算
						that.serviceStartTime = this.allData.serviceStartTime == null ? '' : this.allData.serviceStartTime.substring(0, this.allData.serviceStartTime.length - 11);
						that.serviceEndTime = this.allData.serviceEndTime == null ? '' : this.allData.serviceEndTime.substring(0, this.allData.serviceEndTime.length - 11);
						if(that.serviceStartTime != '' && that.serviceEndTime != null){
							startTime = new Date(that.serviceStartTime.substring(0,10)).getTime();
							endTime = new Date(that.serviceEndTime).getTime();
							nowTime = new Date().getTime();
							that.serviceUseDay = parseInt((nowTime - startTime)/1000/60/60/24);   //计算天数
							that.serviceNoUseDay = parseInt((endTime - nowTime)/1000/60/60/24);
						}
                        that.deviceVersion = this.allData.deviceVersion
						//判断租赁  收买
						if(this.allData.waySign == 1) {
							that.waySign = '租赁'
						} else if(this.allData.waySign == 2) {
							that.waySign = '售卖'
						}
						
//						弹框佩戴历史
                       if(this.allData.historyWear != null && this.allData.historyWear != ''){
                       	 that.historyWear = this.allData.historyWear;
                       }
                       that.isInsurance = this.allData.isInsurance; //保险
                       that.isVip = this.allData.isVip; //vip用户
					}
				},
				error: function() {
          
				}
			});

			// 肿瘤信息
			$.ajax({
				type: "post",
				url: global_path + "/cms/wearUser/selectAnalysisCount",
				cache: false, //禁用缓存
				data: obj,
				dataType: "json",
				success: function(result) {
					if(result.data.organCancerCountBean != null && result.data.organCancerCountBean != ''){
						that.arr1 = result.data.organCancerCountBean.splice(0, 5); //截取organCancerCountBean前5个数组
						that.arr2 = result.data.organCancerCountBean;
					}
					if(result.data.organCancerAnalysis != null && result.data.organCancerAnalysis != ''){
						that.organCancerAnalysis = result.data.organCancerAnalysis;
					}

//					判断是否为空对象
					if(JSON.stringify(result.data.bloodOxygenStatisticsMap) != '{}')that.bloodOxygenStatisticsMap = result.data.bloodOxygenStatisticsMap;//血氧
                    if(JSON.stringify(result.data.bloodPressureStatisticsMap) != '{}')that.bloodPressureStatisticsMap = result.data.bloodPressureStatisticsMap;//血压
					if(JSON.stringify(result.data.heartRateStatisticsMap) != '{}')that.heartRateStatisticsMap = result.data.heartRateStatisticsMap;//心率
				
					
                    that.date1 = result.data.date;
                    that.cmsHBBDateStatistics = result.data.cmsHBBDateStatistics;
                    that.currentTime = getCurrentTime();
//                  服务报告信息
                    that.theLowerRightNum = result.data.theLowerRightNum;
                    that.dateTime = result.data.dateTime; //健康  睡眠状态  日期
                    if(result.data.sleepADWalkADExercise !=null && result.data.sleepADWalkADExercise !=''){
                    	  //睡眠+步数+有氧运动
	                    if(result.data.sleepADWalkADExercise !=null && result.data.sleepADWalkADExercise !=''){
	                    	that.hour1 = parseInt(result.data.sleepADWalkADExercise.analysisTime/60/60);  //小时
	                    	that.min1 = parseInt(result.data.sleepADWalkADExercise.analysisTime/60) % 60;  //分
	                    }
	//                  步数统计
	                    that.sleepADWalkADExercise.walkNum = result.data.sleepADWalkADExercise.walkNum;

	                    //睡眠柱状图数据list
                        that.sleepDataList = result.data.sleepADWalkADExercise.sleepDataList;
                        //步数柱状图数据map
                        that.WalkDataList = result.data.sleepADWalkADExercise.WalkDataList;
                    }
                  
//                   把分钟转化为时 ,分
                    if(result.data.sleepADWalkADExercise.sleepBean != null){
                    	var dataBean = result.data.sleepADWalkADExercise.sleepBean;
                    	that.sleepADWalkADExercise.sleepBean = dataBean;
                    	
                    	var time = parseInt(dataBean.totalTime/60/60);	//小时向下取整
//                       总睡眠
                        that.hour2 = parseInt(dataBean.totalTime/60/60); //小时
                        that.min2 = parseInt((dataBean.totalTime-(parseInt(dataBean.totalTime/60/60))*60*60)/60); //分
                        if(dataBean.totalTime != 0){
                        	that.hour2+"时"+that.min2+"分";
                        }
//                      深睡时间
                        that.hour3 = parseInt(dataBean.deepSleepTime/60/60);//小时
                        that.min3 = parseInt((dataBean.deepSleepTime-(parseInt(dataBean.deepSleepTime/60/60))*60*60)/60); //分
                        if(dataBean.deepSleepTime != 0){
                        	that.hour3+"时"+that.min3+"分";
                        }
                         //浅睡眠
                        that.hour4 = parseInt(dataBean.lightSleepTime/60/60); //小时
                        that.min4 = parseInt((dataBean.lightSleepTime-(parseInt(dataBean.lightSleepTime/60/60))*60*60)/60); //分
                        if(dataBean.lightSleepTime != 0){
                        	that.hour4+"时"+that.min4+"分";
                        }
                    }
                    
                    

//
				},
				error: function() {

				}
			})
			
          //器官模型
           $.ajax({
  				type: "post",
  				url: global_path + "/cms/wearUser/selectHealthAnalysisModel",
  				cache: false, //禁用缓存
  				data: obj,
  				dataType: "json",
  				success: function(result) {
  					if(result.code == 200) {
//                      layer.msg(result.msg);
                        if(result.msg != ''){
                           layer.msg(result.msg,{time:2000});
                        }
//							判断身体状态
							if( result.data.monitoringDetails.healthFlag == 0){
  								that.healthFlag ='未知';
  								$('.left_left .text .top .body span').css('color','#efeff4');
  								// $('.dot .illType').css('color','#efeff4');
  							}else if(result.data.monitoringDetails.healthFlag == 1){
  								that.healthFlag ='健康';
  								$('.left_left .text .top .body span').css('color','#37b864');
  								// $('.dot .illType').css('color','#37b864');
	  						}else if(result.data.monitoringDetails.healthFlag == 2){
  								that.healthFlag ='亚健康';
  								$('.left_left .text .top .body span').css('color','#e9ad4f');
  								// $('.dot .illType').css('color','#e9ad4f');
  							}else if(result.data.monitoringDetails.healthFlag == 3){
  								that.healthFlag ='疾病';
  								$('.left_left .text .top .body span').css('color','#EA4A4A');
  								// $('.dot .illType').css('color','#EA4A4A');
  							}
  							var organ = result.data.monitoringDetails.allTheInternalOrgans;
  							//14个器官
							if(organ !== null && organ !== '' && organ !== undefined){
						    	// that.allTheInternalOrgans = result.data.monitoringDetails.allTheInternalOrgans;
                                /*调用*/
                                that.setOrganImgs('bladder',organ.bladder);
                                that.setOrganImgs('stomach',organ.stomach);
                                that.setOrganImgs('reproductive',organ.reproductive);
                                that.setOrganImgs('gallBladder',organ.gallBladder);
                                that.setOrganImgs('heart',organ.heart);
                                that.setOrganImgs('smallIntestine',organ.smallIntestine);
                                that.setOrganImgs('spleen',organ.spleen);
                                that.setOrganImgs('pericardium',organ.pericardium);
                                that.setOrganImgs('largeIntestine',organ.largeIntestine);
                                that.setOrganImgs('kidney',organ.kidney);
                                that.setOrganImgs('spine',organ.spine);
                                that.setOrganImgs('liver',organ.liver);
                                that.setOrganImgs('lung',organ.lung);
                                that.setOrganImgs('lung',organ.lung);
                            }

  					    if(result.data.monitoringDetails.bloodOxygenCurve != null && result.data.monitoringDetails.bloodOxygenCurve != ''){
  					    	that.bloodOxygenCurve = result.data.monitoringDetails.bloodOxygenCurve
  					    } //血氧
  					    if(result.data.monitoringDetails.bloodPressureCurve != null && result.data.monitoringDetails.bloodPressureCurve != ''){
  					    	that.bloodPressureCurve = result.data.monitoringDetails.bloodPressureCurve;
  					    }
  						   //血压
  						   
  						if(result.data.monitoringDetails.heartRateCurve != null && result.data.monitoringDetails.heartRateCurve != ''){
  					    	that.heartRateCurve = result.data.monitoringDetails.heartRateCurve;
  					    }      //心率
  					    if(result.data.monitoringDetails.comprehensiveDiagnosis != null && result.data.monitoringDetails.comprehensiveDiagnosis != ''){
  					    	that.comprehensiveDiagnosis = result.data.monitoringDetails.comprehensiveDiagnosis;
  					    } //综合

//						睡眠状态
//                      把分钟化成时  分
                        if(result.data.monitoringDetails.sleepMonitoring  != null){
                            var dataBean = result.data.monitoringDetails.sleepMonitoring;

                            // that.sleepMonitoring = dataBean;
                            // var time = parseInt(dataBean.totalTime/60/60);	//小时向下取整
//                       总睡眠
                            that.totalHour = parseInt(dataBean.totalSleepDuration/60/60); //小时
                            that.totalMin = parseInt((dataBean.totalSleepDuration-(parseInt(dataBean.totalSleepDuration/60/60))*60*60)/60); //分
                            if(dataBean.totalSleepDuration != 0){
                                that.totalHour+"时"+that.totalMin+"分";
                            }
//                      深睡时间
                            that.deepHour = parseInt(dataBean.deep/60/60);//小时
                            that.deepMin = parseInt((dataBean.deep-(parseInt(dataBean.deep/60/60))*60*60)/60); //分
                            if(dataBean.deep != 0){
                                that.deepHour+"时"+that.deepMin+"分";
                            }
                            //浅睡眠
                            that.lightHour = parseInt(dataBean.light/60/60); //小时
                            that.lightMin = parseInt((dataBean.light-(parseInt(dataBean.light/60/60))*60*60)/60); //分
                            if(dataBean.light != 0){
                                that.lightHour+"时"+that.lightMin+"分";
                            }
                        }
                        if(result.data.monitoringDetails.runningMonitoring != null){
                        	that.runningMonitoring = result.data.monitoringDetails.runningMonitoring;
//                      	that.runningMonitoring = runningTime;
                          //有氧运动 时间
                        	 if(that.runningMonitoring.aerobicExercise.length == 7) { //格式为5小时58分钟
                        		that.runningtHour = that.runningMonitoring.aerobicExercise.substring(0,1);
                        		that.runningMin = that.runningMonitoring.aerobicExercise.substring(3,5);

                        	}else if(that.runningMonitoring.aerobicExercise.length == 3){  //格式为0分钟
                        		that.runningTime = that.runningMonitoring.aerobicExercise.substring(0,1);
                        	}
                        }

                        //饼图数据
                        if(result.data.healthDaysBeans != null && result.data.healthDaysBeans != ''){
                            that.healthDaysBeans = result.data.healthDaysBeans;
                        }
                        pie();
                        
                        //初始化实时数据
                        that.initActualData(result.data.actualData,that);
  					}else {
                        layer.msg(result.msg);
                    }
  				},
  				error:function(){
  					
  				}
  			})


		},
        // 14种器官  用Vue.set改变  来改变数据     Vue.set(数组，制定key，改变的内容)
        setOrganImgs:function (key,value) {
            Vue.set(this.allTheInternalOrgans,key,'../../imgs/iframeImgs/organ/'+key+'_'+value+'.png')
        },
        // 点击血压校准弹框
        // bpCorrect:function(){
        //     $('#bpCorrect1').modal({backdrop: 'static', keyboard: false});
        // },
        /**
 * 获取当前年月日()
 * @param t 0为今天,1为前一天,-1为明天
 * @returns {string}   格式为（yyyy-MM-dd）
 */
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
	 * 初始化实施数据
	 * @param {Object} actualData
	 * @param {Object} that
	 */
	initActualData:function(actualData,that){
		actualData.nearestHeartRateTime != null && actualData.nearestHeartRateTime.substring(0,10) == this.getNowDate(0) ? $(function () {
    		that.nearestHeartRate = actualData.nearestHeartRate != null ? actualData.nearestHeartRate : '--';
    		that.nearestHeartRateTime = actualData.nearestHeartRateTime != null ? actualData.nearestHeartRateTime.substring(11,16) : '-:-';
		}) : $(function () {
    		that.nearestHeartRate = '--';
    		that.nearestHeartRateTime = '-:-';
		});
		actualData.nearestBloodPressureTime != null && actualData.nearestBloodPressureTime.substring(0,10) == this.getNowDate(0) ? $(function () {
		    that.nearestBloodPressure = actualData.nearestBloodPressure != null ? actualData.nearestBloodPressure.replace(",","/") : '--';
    		that.nearestBloodPressureTime = actualData.nearestBloodPressureTime != null ? actualData.nearestBloodPressureTime.substring(11,16) : '-:-';
		}) : $(function () {
    		that.nearestBloodPressure = '--';
    		that.nearestBloodPressureTime = '-:-';
		});
		actualData.nearestOxyhemoglobinSaturatioTime != null && actualData.nearestOxyhemoglobinSaturatioTime.substring(0,10) == this.getNowDate(0) ? $(function () {
    		that.nearestOxyhemoglobinSaturation = actualData.nearestOxyhemoglobinSaturation != null ? actualData.nearestOxyhemoglobinSaturation : '--';
    		that.nearestOxyhemoglobinSaturatioTime = actualData.nearestOxyhemoglobinSaturatioTime != null ? actualData.nearestOxyhemoglobinSaturatioTime.substring(11,16) : '-:-';
		}) : $(function () {
    		that.nearestOxyhemoglobinSaturation = '--';
    		that.nearestOxyhemoglobinSaturatioTime = '-:-';
		});
	},
        // 处理进度
        getDoctorData:function(){
            var that = this;
            that.arrLocation = [];
            that.arrLocationImg = [];
            that.arrLocationInfo = [];
            $.ajax({
                type: "post",
                url: global_path+"/doc/user/listNearByDortor",
                cache: false,
                //禁用缓存
                data: {
                    loginId:localStorage.loginId,
                    token:localStorage.token,
                    wearUserId:obj.wearUserId
                },
                //传入组装的参数
                dataType: "json",
                success: function(res) {
                    if(res.code === 200){
                        /*用户坐标*/
                        that.nearestLocation = res.data.nearestLocation;
                        that.nearestLocation = that.nearestLocation.split(",");
                        that.nearestLocation[0] = parseFloat(that.nearestLocation[0]);
                        that.nearestLocation[1] = parseFloat(that.nearestLocation[1]);
                       /* 附近医生坐标*/
                        var list = res.data.list;
                        for(var i=0;i<list.length;i++){
                            list[i].lonLat = list[i].lonLat.split(',');
                            list[i].lonLat[0] = parseFloat(list[i].lonLat[0]);
                            list[i].lonLat[1] = parseFloat(list[i].lonLat[1]);
                            that.arrLocation .push(list[i].lonLat);
                            that.arrLocationImg[i] = '../../imgs/doctorImgs/doctorLocation.png';
                            that.arrLocationInfo.push(list[i].name);
                        }
                        //用户及附近医生坐标集合
                        that.arrLocation.push(that.nearestLocation);   //[[116.4123,39.906422],[116.4352,39.906933]]
                        /*用户中心点坐标图片*/
                        var userLocationImg = '../../imgs/doctorImgs/userLocation.png';
                        //用户及附近医生坐标图片集合
                        that.arrLocationImg.push(userLocationImg);
                        //用户中心地址
                        that.nearestLocationInfo = res.data.nearestLocationInfo;
                        //用户及附近医生的坐标显示信息
                        that.arrLocationInfo.push(that.nearestLocationInfo);
                        that.locationMap(that.nearestLocation,that.arrLocation,that.arrLocationInfo,that.arrLocationImg);
                    }
                }
            });

        },
		/**
		 * 实时地图定位
		 * */
		locationMap: function (center,lnglats,data,imgs) {
            var map = new AMap.Map('locationBox', {
                resizeEnable: true,
                center: center, //地图中心点
                zoom: 10   //地图显示的缩放级别
            });
            map.plugin(["AMap.ToolBar"], function() {
                map.addControl(new AMap.ToolBar());
            });
            var infoWindow = new AMap.InfoWindow({});     //创建信息窗口对象  ps.高德目前不支持多信息窗口，即使创建多个窗口对象，也只会显示一个
            for(var i= 0;i<lnglats.length;i++) {
                var marker = new AMap.Marker({
                    position: lnglats[i],        //采用默认样式，无需自定义
                    map: map,
                    icon: new AMap.Icon({
                        size: new AMap.Size(56, 56),  //图标尺寸
                        imageSize: new AMap.Size(45,45),  //在页面中所用的图片大小，根据图片尺寸压缩图片 一般都压缩一半
                        image: imgs[i], /*"../img/nowMap.png"*/
                        imageOffset: new AMap.Pixel(0, 0)
                    })
                });
                var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(10, -25)});
                marker.content = data[i];
                marker.on('click', markerClick);
                marker.emit('click', {target: marker});

                function markerClick(e) {
                    infoWindow.setContent(e.target.content);
                    infoWindow.open(map, e.target.getPosition());
                }
            }
            //跳至地图当中导航
            function openAmap(e){
                e.target.markOnAMAP({
                    name:e.target.title,
                    position:e.target.getPosition()
                })
            }
            map.setFitView();
        }
	}
	
});


function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "/";
    var month = (date.getMonth() + 1) < 10? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var day = date.getDate() < 10? ("0" + date.getDate()) : date.getDate();
    var currentDate = date.getFullYear() + seperator1 + month + seperator1 + day;
    return currentDate;
}
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
//获取某天日期+时分秒
function getLongTime(s) {
    var date = new Date(new Date() - s * 24 * 60 * 60 * 1000);
    var year = date.getFullYear();
    var mon = date.getMonth() + 1;
    var day= date.getDate();
    var hour= date.getHours();
    var min= date.getMinutes();
    var sec= date.getSeconds();
    mon = mon >= 10 ? mon : '0' + mon;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    min = min >= 10 ? min : '0' + min;
    sec = sec >= 10 ? sec : '0' + sec;
    return year + '-' + mon + '-' + day + ' ' + hour + ':' + min + ':' + sec;
}

//获取当前时间
function getCurrentTime(){
	var date=new Date();
	var strYear = date.getFullYear();
	var strDay = date.getDate();     
	var strMonth = date.getMonth()+1;
	var strHour=date.getHours(); //时
	var strMinute=date.getMinutes(); //分
	var strSecond=date.getSeconds(); //秒
	if(strMonth<10){     
	strMonth="0"+strMonth;     
	}   
	if(strDay<10)     
	{     
	strDay="0"+strDay;     
	}
	if(strHour<10){
	strHour="0"+strHour;
	}   
	if(strMinute<10){
	strMinute="0"+strMinute;
	}
	if(strSecond<10){
	strSecond="0"+strSecond;
	}
	datastr = strMonth+"月"+strDay+" 日"+strHour+":"+strMinute;  
	return datastr;   
}

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


	// line();

    // line();

	//  折线图 
	function line() {
		var bloodPress1 = echarts.init(document.getElementById('bloodOxygenCanvas'));
		option = {
			//  title: {
			//      text: '患病概率变化'
			//  },
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
			},
			grid: {
				left: '3%',
				right: '1%',
				bottom: '3%',
				containLabel: true
			},
			//  toolbox: {
			//      feature: {
			//          saveAsImage: {}
			//      }
			//  },
			xAxis: {
				type: 'category',
				axisLabel: { //标签设置
					color: "#000",
					fontSize: "12"
				},
				axisLine: { //x轴颜色
					show: true,
					lineStyle: {
						color: "#F7FCFF"
					}
				},
				boundaryGap: false,
				data: ['06/02', '06/20', '04/18', '10/14', '02/27', '11/03', '08/17']
			},
			yAxis: {
				type: 'value',
				axisLine: { //y轴颜色
					lineStyle: {
						color: "#fff"
					}
				},
				axisLabel: { //强制显示
					interval: 0,
					textStyle: { //y轴标签颜色
						color: "#000"
					}
				},
				splitLine: {
					show: true,
					lineStyle: { //图里面的轴颜色
						color: '#ddd',
						width: 1
					}
				},
			},
			series: [{
					name: '高血压',
					type: 'line',
					stack: '总量',
					data: [120, 132, 101, 134, 90, 230, 210],
					itemStyle: {
						normal: {
							//颜色设置
							color: "#9013FE"
						}
					}
				},
				{
					name: '心脏病',
					type: 'line',
					stack: '总量',
					data: [220, 182, 191, 234, 290, 330, 310],
					itemStyle: {
						normal: {
							//颜色设置
							color: "#F5A623"
						}
					}
				},
				{
					name: '心律不齐',
					type: 'line',
					stack: '总量',
					data: [150, 232, 201, 154, 190, 330, 410],
					itemStyle: {
						normal: {
							//颜色设置
							color: "#FE6130"
						}
					}
				}
			]
		}
		bloodPress1.clear();
		//配置项生成统计图
		bloodPress1.setOption(option);
	}

})
//饼图
function pie() {
    //对应容器
    var bloodPress = echarts.init(document.getElementById('bloodPressCanvas'));

    option = {
        /* title: {
             text: '天气情况统计',
             subtext: '虚构数据',
             left: 'center'
         },*/
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color:['rgb(0,150,255)','rgb(239,201,119)','#ff3333','#f1f1f1'],
        series: [{
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            // selectedMode: 'single',
            data: [
                {
                    value: app.healthDaysBeans.health, //获取到count值
                    name: '健康'
                },
                {
                    value: app.healthDaysBeans.subHealth,
                    name: '亚健康'
                },
                {
                    value: app.healthDaysBeans.illness,
                    name: '疾病'
                },
                {
                    value: app.healthDaysBeans.healthUnknown,
                    name: '未知'
                }
            ],
            label: { //饼图图形上的文本标签
                normal: {
                    show: true,
                    position: 'inner', //标签的位置
                    textStyle: {
                        color: '#fff',
                        fontSize: 12, //文字的字体大小
//											textAlign:'center'
                    },
                    formatter: function(data) {
                        if(data.data.value == 0) {
                            return '';
                        } else {
                            return data.percent + '%';
                        }
                    }
                }
            },
            //		        itemStyle: {
            //		            emphasis: {
            //		                shadowBlur: 10,
            //		                shadowOffsetX: 0,
            //		                shadowColor: 'rgba(0, 0, 0, 0.5)'
            //		            }
            //		        }
        }]
    };
    bloodPress.clear();
    //配置项生成统计图
    bloodPress.setOption(option);
}
// 点击添加工单进行弹框里面的内容
$('#time1').fadeOut(1000);
/**
 * 点击提交
 * */
$('#addWorkOrderSubmit').off('click').on('click',function () {
    layer.confirm('确定提交吗？', {
        btn: ['确定','取消'] //按钮
    }, function(){
        //创建保存所有变量字段的对象，用serializeArray把表单所有内容装入此对象
        var data = {};
        data.loginId = localStorage.loginId;
        data.token = localStorage.token;
        data.phoneStatus = $('#callType option:selected').val();   //通话类型
        data.questionParentType = $('#select option:selected').val();  //反馈类型
        data.questionType = $('#select2 option:selected').val();  //反馈子类型
        data.userType = $('#userType option:selected').val();  //用户类型
        data.userCity = $('#city').val();  //用户城市
        data.phoneNum = $('#phoneNum').val();  //手机号
        // data.userName = $('#userName').val();  //用户姓名
        data.deviceId = $('#deviceId').val(); //设备号
        data.appUserId = $('#appUserId').val();  //app账号
        data.questionDetails = $('#txt1').val();  //反馈详情
        data.disposeInfo = $('#txt2').val();  //处理结果
        data.isNeedReturn = $("input[name='radio']:checked").val(); //获取radio的值
        data.nextReturnTime = $('#nextDate').val();  //获取时间
        // $("#recordForm").serializeArray().map(function(x){data[x.name]=x.value;});
        //ajax
        $.ajax({
            url:global_path + '/cms/service/addServiceInfo',
            type:'post',
            dataType:'json',
            data:data,
            success:function (res) {
                if(res.code == 200){
                    layer.msg(res.msg,{icon:6,time:1000},function () {
                        app.closeModel();
                    });
                }else {
                    layer.msg(res.msg,{icon:5,time:1000});
                }
            }
        });
    }, function(){
        layer.msg('已取消', {
            time: 2000
        });
    });
});


/**
 * 显示次日当前时间在相应位置
 * */
function showNextDate() {
    var now = new Date(new Date().getTime() + 24*60*60*1000);
    var str = now.getFullYear() + "-" + fix((now.getMonth() + 1),2) + "-" + fix(now.getDate(),2) + "T" + fix(now.getHours(),2) + ":" + fix(now.getMinutes(),2);
    $("#nextDate").val(str);
}
function fix(num, length) {
    return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}
/**
 * 无需反馈的话，隐藏时间，且传空
 * */
// $('#isNeedReturn').bind('click',function () {
//     if($('#isNeedReturn').val() == 2){
//         $('#nextDate').val('').fadeOut(1000);
//     }else {
//         $('#nextDate').val('').fadeIn(1000);
//         showNextDate();
//     }
// });

function changeRadioValue(){
    if($("input[name='radio']:checked").val() == 2){
        $('#nextDate').val('');
        $('#time1').fadeOut(1000);
    }else {
        $('#nextDate').val('');
        $('#time1').fadeIn(1000);
        showNextDate();
    }
}


function changeQuestion(e) {
    $('#select2 option:selected').val(e);
}

/**
 * 失去焦点事件
 * 3个
 * 1.电话号
 * 2.设备号
 * 3.APP账号
 * */
// //1.电话号
// $('#phoneNum').blur(function () {
//     var phoneNum = $(this).val();
//     if(phoneNum.length > 3 && phoneNum.length < 12){
//         $.ajax({
//             url:global_path + '/cms/service/getCountRecord',
//             type:'post',
//             dataType:'json',
//             data:{
//                 "loginId":localStorage.loginId,
//                 "token":localStorage.token,
//                 "phoneNum":phoneNum
//             },
//             success:function (res) {
//                 // debugger;
//
//                 $('#searchMe1').remove();
//                 if(res.code == 200){
//                     if(res.data.count != 0){
//                         // 号码来访记录的查看
//                         var node = '<a id="searchMe1" href="custom_recordHistory.html?phoneNum='+phoneNum+'" target="_blank" class="btn btn-skyBlueSmall">查看</a>';
//                         $('#numRecord').html($('#numRecord').html() + node);
//                         // $('#numRecord').html(111111111111);
//
//                     }else {
//
//                     }
//                     $('#count').text(res.data.count);
//                     $('.dad').fadeIn(500);
//                 }else {
//                     layer.msg('error',{icon:5,time:2000});
//                 }
//             }
//         });
//     }
// });
// //2.设备号
// $('#deviceId').blur(function () {
//     var deviceId = $(this).val();
//     if(deviceId.length == 15){
//         $.ajax({
//             url:global_path + '/cms/service/getWearSimpleInfo',
//             type:'post',
//             dataType:'json',
//             data:{
//                 "loginId":localStorage.loginId,
//                 "token":localStorage.token,
//                 "deviceId":deviceId
//             },
//             success:function (res) {
//                 $('#searchMe2').remove();
//                 $('#searchMe4').remove();
//                 $('.hideThis2').hide();
//                 $('.hideThis4').hide();
//                 if(res.code == 200){
//                     $('#searchMe2').remove();
//                     $('#username1').text(res.data.map.username);
//                     $('#age').text(res.data.map.age + '岁');
//                     $('#MedicalHistory').text(res.data.map.MedicalHistory);
//                     $('#serviceTime').text(res.data.map.serviceTime);
//                     var node = '<a id="searchMe2" href="wearUser.html?wearUserId='+res.data.map.wearUserId+'" target="_blank" class="btn btn-skyBlueSmall">查看</a>';
//                     $('#seeInfo').html($('#seeInfo').html() + node);
//                     $('#count2').text(res.data.count);
//                     $('.left').fadeIn(500);  //失去焦点佩戴用户显示
//                     // if(res.data.count != 0){
//                     //     var node = '<a id="searchMe4" href="custom_recordHistory.html?deviceId='+deviceId+'" target="_blank" class="btn btn-skyBlueSmall">查看</a>';
//                     //     $('.hideThis4').html($('.hideThis4').html() + node);
//                     // }
//
//
//                 }else {
//                     layer.msg(res.msg,{icon:5,time:2000});
//                 }
//             }
//         });
//     }else{
//         layer.msg('设备号不符合规则');
//     }
// });
// //3.APP账号
// $('#appUserId').blur(function () {
//     var appUserId = $(this).val();
//     if(appUserId.length == 11){
//         $.ajax({
//             url:global_path + '/cms/service/getAppSimpleInfo',
//             type:'post',
//             dataType:'json',
//             data:{
//                 "loginId":localStorage.loginId,
//                 "token":localStorage.token,
//                 "appUserId":appUserId
//             },
//             success:function (res) {
//                 $('#searchMe3').remove();
//                 $('.hideThis3').hide();
//                 if(res.code == 200){
//                     $('#username2').text(res.data.map.username);
//                     $('#createTime').text(res.data.map.createTime.substring(0,10));
//                     $('#devices').text(res.data.map.count);
//                     $('#phoneBrand').text(res.data.map.phoneBrand);
//                     $('#appVersion').text(res.data.map.appVersion);
//                     // $('#count').text(res.data.map.count);
//                     var node = '<a id="searchMe3" href="appUserDetails.html?appUserId='+appUserId+'" target="_blank" class="btn btn-skyBlueSmall">查看</a>';
//                     $('#seeInfo2').html($('#seeInfo2').html() + node);
//                     $('.right').fadeIn(1000); //失去焦点,app用户显示
//                 }else {
//                     layer.msg(res.msg,{icon:5,time:2000});
//                 }
//             }
//         });
//     }
//
// });


function change(res) {
    $('#otherInput').removeAttr('name').hide();
    $('#select2').attr('name','questionType').show();
    if(res == '产品硬件'){
        $('#select2').html('<option value="充电问题">充电问题</option>\n' +
            '                    <option value="语音播报">语音播报</option>\n' +
            '                    <option value="待机时间短">待机时间短</option>\n' +
            '                    <option value="系统更新">系统更新</option>\n' +
            '                    <option value="外观问题">外观问题</option>\n' +
            '                    <option value="材质过敏">材质过敏</option>\n' +
            '                    <option value="表带问题">表带问题</option>\n' +
            '                    <option value="硬件操作">硬件操作</option>\n' +
            '                    <option value="设备无法连接">设备无法连接</option>'+
            '                    <option value="SIM使用">SIM使用</option>\n');
    }else if(res == 'APP软件'){
        $('#select2').html('<option value="账号注册">账号注册</option>\n' +
            '                    <option value="APP升级问题">APP升级问题</option>\n' +
            '                    <option value="数据显示">数据显示</option>\n' +
            '                    <option value="APP使用操作">APP使用操作</option>\n' +
            '                    <option value="设备信息解绑">设备信息解绑</option>\n' +
            '                    <option value="睡眠时间咨询">睡眠时间咨询</option>\n' +
            '                    <option value="设备信息绑定">设备信息绑定</option>\n' +
            '                    <option value="设备信息激活">设备信息激活</option>\n' +
            '                    <option value="不符合佩戴要求">不符合佩戴要求</option>\n' +
            '                    <option value="APP数据修改">APP数据修改</option>\n' +
            '                    <option value="健康分析报告">健康分析报告</option>');
    }else if(res == '数据失准'){
        $('#select2').html('<option value="心率数据失准">心率数据失准</option>\n' +
            '                    <option value="血压数据失准">血压数据失准</option>\n' +
            '                    <option value="血氧数据失准">血氧数据失准</option>\n' +
            '                    <option value="反馈异常数据">反馈异常数据</option>');
    }else if(res == '用户回访'){
        $('#select2').html('<option value="新用户回访">新用户回访</option>\n' +
            '                    <option value="日常用户回访">日常用户回访</option>\n' +
            '                    <option value="暂停使用回访">暂停使用回访</option>\n' +
            '                    <option value="亚健康用户回访">亚健康用户回访</option>\n' +
            '                    <option value="失联用户回访">失联用户回访</option>\n' +
            '                    <option value="疾病用户回访">疾病用户回访</option>');
    }else if(res == '预警回访'){
        $('#select2').html('<option value="血压异常回访">血压异常回访</option>\n' +
            '                    <option value="心率异常回访">心率异常回访</option>\n' +
            '                    <option value="血氧异常回访">血氧异常回访</option>\n' +
            '                    <option value="心梗，脑梗预兆回访">心梗，脑梗预兆回访</option>');
    }else if(res == '合作问题'){
        $('#select2').html('<option value="产品代理合作">产品代理合作</option>\n' +
            '                    <option value="广告推广合作">广告推广合作</option>\n' +
            '                    <option value="医疗机构业务合作">医疗机构业务合作</option>\n' +
            '                    <option value="供应商合作">供应商合作</option>\n' +
            '                    <option value="其他合作">其他合作</option>');
    }else if(res == '无效沟通'){
        $('#select2').html('<option value="无人应答">无人应答</option>\n' +
            '                    <option value="电话忙音">电话忙音</option>\n' +
            '                    <option value="拒接电话">拒接电话</option>\n' +
            '                    <option value="停机">停机</option>\n' +
            '                    <option value="接听后挂断">接听后挂断</option>\n' +
            '                    <option value="关机">关机</option>');
    }else if(res == '定位问题') {
        $('#select2').html(' <option value="定位开启">定位开启</option>\n' +
            '                    <option value="定位异常">定位异常</option>\n' +
            '                    <option value="定位失准">定位失准</option>\n' +
            '                    <option value="其他定位问题">其他定位问题</option>');
    }else if(res == '产品服务咨询'){
        $('#select2').html('<option value="咨询服务内容">咨询服务内容</option>\n' +
            '                    <option value="服务流程">服务流程</option>\n' +
            '                    <option value="服务协议问题">服务协议问题</option>\n' +
            '                    <option value="服务期限或规则">服务期限或规则</option>');
    }else if(res == '投诉与建议'){
        $('#select2').html('<option value="用户建议">用户建议</option>\n' +
            '                    <option value="用户投诉">用户投诉</option>');
    }else if(res == '数据采集不到'){
        $('#select2').html('<option value="血压数据采集不到">血压数据采集不到</option>\n' +
            '                    <option value="心率数据采集不到">心率数据采集不到</option>\n' +
            '                    <option value="血氧数据采集不到">血氧数据采集不到</option>\n' +
            '                    <option value="血糖数据采集不到">血糖数据采集不到</option>');
    }else if(res == '故障设备报备'){
        $('#select2').html('<option value="碎屏">碎屏</option>\n' +
            '                    <option value="进水碾压">进水碾压</option>\n' +
            '                    <option value="设备丢失">设备丢失</option>\n' +
            '                    <option value="按键不灵敏">按键不灵敏</option>\n' +
            '                    <option value="表带断裂">表带断裂</option>\n' +
            '                    <option value="后壳有裂痕">后壳有裂痕</option>\n' +
            '                    <option value="不能充电">不能充电</option>\n' +
            '                    <option value="待机时间短">待机时间短</option>\n' +
            '                    <option value="不能开机">不能开机</option>\n' +
            '                    <option value="光波不亮">光波不亮</option>\n' +
            '                    <option value="不能识别sim卡">不能识别sim卡</option>\n' +
            '                    <option value="信号灯常亮">信号灯常亮</option>\n' +
            '                    <option value="定位不准">定位不准</option>\n' +
            '                    <option value="屏幕滑动无反应">屏幕滑动无反应</option>\n' +
            '                    <option value="设备无法连接">设备无法连接</option>\n' +
            '                    <option value="充电线丢失">充电线丢失</option>');
    }else if(res == 'SOS'){
        $('#select2').html('<option value="SOS求救">SOS求救</option>\n' +
            '                    <option value="SOS回访">SOS回访</option>\n' +
            '                    <option value="SOS服务">SOS服务</option>\n' +
            '                    <option value="SOS建议">SOS建议</option>');
    }else if(res == '其他问题'){
        // $('#select2').html('');

        $('#select2').removeAttr('name').hide();
        // $('.newInput').show();
        $('#otherInput').attr('name','questionType').show();
    }
}
/*补0操作*/
function getZero(num){
    if(num<10){
      return  "0" + num;
    }else{
      return "" + num;
    }
}

