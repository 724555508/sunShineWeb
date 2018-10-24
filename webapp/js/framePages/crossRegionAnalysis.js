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
        sign:localStorage.sign,
        deviceId:'',
        checkCode:'',
        areaName:'',
        agentName:'',
        addressCity:'',
        wearUserName:'',
        activationTime:'',
        status:'',
        beFleeGoodsAreaName:'',
        linkUserName:'',
        linkPhoneNum:'',
        dealResult:'',
        arrCity:[],
        arrValue:[],
        arrColor:[],
        arrays:[],
        arr2:[],
        locationStatistical:[],
        optSign:'',
        id:'',
        isT:''
    },
    mounted: function() {
        this.init();

    },
    computed: {

    },
    methods: {
        /**
         * 初始化内容
         */
        init:function(){
            var that = this;
            //ajax请求数据
            $.ajax({
                type: "post",
                url: global_path + "/cms/transregionalAnalysis/getDeviceTransregionalAnalysisInfo",
                cache: false,  //禁用缓存
                //传入组装的参数
                data: {
                    loginId : localStorage.loginId,
                    token : localStorage.token,
                    deviceId:obj.deviceId
                },
                dataType: "json",
                success: function (res) {
                    if(res.code === 200){
                        var data = res.data.bean;
                        that.deviceId = data.deviceId;          //设备号
                        that.checkCode = data.checkCode;         //校验码
                        that.areaName = data.areaName;          //所属市场
                        that.agentName = data.agentName;          //合伙人
                        that.addressCity = data.addressCity;          //居住地
                        that.wearUserName = data.wearUserName;          //佩戴人
                        that.activationTime = data.activationTime;          //激活时间
                        that.status = data.status;          //窜货认定（0.疑是窜货 1.正常 2.窜货 3.申诉中）
                        that.beFleeGoodsAreaName = data.beFleeGoodsAreaName;          //被窜货市场
                        that.linkUserName = data.linkUserName;          //联系人
                        that.linkPhoneNum = data.linkPhoneNum;          //联系电话
                        that.id = data.id;    //传回的id
                        that.isT = data.isT;    //判断是窜货还是被窜货
                        if( that.dealResult !== null ||  that.dealResult !== ''){
                            that.dealResult = data.dealResult;       //处理结果处理结果（1.被窜市场未处理 2.已赔偿 3.已和解 4.已撤销）
                        }
                        if(that.addressStatistical !== null ||  that.addressStatistical !== ''){
                            that.addressStatistical = data.addressStatistical;   //位置统计
                            that.arrCity = [];
                            that.arrValue = [];
                            that.arrColor = ['#4897d8','#ffdb5c','#fa6e59','#f8a055','#b3de81','#ff4447','#ffccbb','#b6c9ea','b8ef6b','#6bffcb',
                            'a18eff','ff8ed0','#ba5536','#a1d6e2','#4d648d'];
                            if(that.addressStatistical.length > 0){
                                for(var i=0;i<that.addressStatistical.length;i++){
                                    that.arrCity.push(that.addressStatistical[i].city);
                                    that.arrValue.push(that.addressStatistical[i].count);
                                    that.arrays[i] = {
                                        value:that.arrValue[i],
                                        name:that.arrCity[i]
                                    }
                                }
                                that.arr2 = [
                                    {value: 335, name: "滨州市"},
                                    {value: 310, name: "未知"},
                                    {value: 234, name: "连云港市"},
                                    {value: 135, name: "邢台市"}
                                ];
                                console.log(that.arr2)
                                console.log(that.arrCity)
                                console.log(that.arrays)
                                console.log(eval(that.addressStatistical))
                                that.pieImg();
                            }

                        }
                        if( that.locationStatistical !== '' ||  that.locationStatistical !==null){
                            that.locationStatistical = data.locationStatistical;   //定位统计
                            /*判断定位位置是否为空，如果为空，改变li背景颜色*/
                            for(var i=0;i<that.locationStatistical.length;i++){
                                var node = '';
                                if(that.locationStatistical[i].res === '' || that.locationStatistical[i].res === '未知'){
                                    node =  '<li class="bj">'+
                                        '<p class="dw">'+that.locationStatistical[i].data+'</p>'+
                                        '<div>'+that.locationStatistical[i].res+'</div>'+
                                        '</li>'
                                }else{
                                    node =  '<li>'+
                                        '<p class="dw">'+that.locationStatistical[i].data+'</p>'+
                                        '<div>'+that.locationStatistical[i].res+'</div>'+
                                        '</li>'

                                }
                                $('.ul2').append(node);
                            }
                        }

                    }
                },
                error:function(){

                }
            });
        },
        /**
         * 饼图
         */
        pieImg: function () {
            var that = this;
            //容器
            var pieImg = echarts.init(document.getElementById('pieChart'));
            //配置
            var option = {
                //标题
                title:{
                    text:'位置统计',
                    left: 0,
                    top: 0,
                    textStyle:{
                        color: '#4A4A4A',
                        fontWeight: 70,
                        fontSize: 20,
                        fontFamily:'PingFangSC-Semibold'
                    }
                },
                //图例
                legend: {
                    type: 'plain',
                    show: true,
                    orient: 'vertical',
                    right: 10,
                    top: 40,
                    bottom:0,
                    data: that.arrCity,
                    textStyle:{
                        color: '#4a4a4a',
                        fontWeight: 100,
                        fontSize: 14,
                        // padding: 0,
                        fontFamily:'PingFangSC-Regular'
                    },
                    formatter: function(name) {
                        for(var i=0;i<that.arrCity.length;i++){
                            if(name === that.arrCity[i]){
                                return that.arrCity[i];
                            }
                        }
                        // if(name === '归属地'){
                        //     // return ' 健康: ' + _this.map.health;
                        //     return ' 健康';
                        // }else if(name === '异地'){
                        //     return ' 异地: ' + _this.map.subHealth;
                        // }else if(name === '异地'){
                        //     return ' 异地: ' + _this.map.illness;
                        // }else if(name === '异地'){
                        //     return ' 异地: ' + _this.map.QMI;
                        // }else if(name === '异地'){
                        //     return ' 异地: ' + _this.map.cerebral;
                        // }
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
                        color:that.arrColor,
                        hoverAnimation:true,    //扇形打开效果
                        startAngle:250,         //起始角度
                        roseType: false,
                        type: 'pie',
                        radius: '80%',
                        center: ['35%', '54%'], //位置：x轴 y轴
                        data:that.arrays,
                       /* data:[
                            {
                                name: '归属地',
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
                            }
                        ],*/
                        tooltip:{
                            formatter:'{b},占比{d}%'
                        },
                        label:{            //饼图图形上的文本标签
                            normal:{
                                show:true,
                                position:'inner', //标签的位置
                                textStyle : {
                                    color:'rgba(255,255,255,1)',
                                    fontSize : 14    //文字的字体大小
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
         * 查看设备
         */
        checkDevice:function() {
            window.open('deviceDetails.html?deviceId='+obj.deviceId);
        },
        //      关闭弹框
        closeModel:function(){
            $(".modal").modal("hide");
        },
        /**
         * 撤销窜货弹框
         */
        repealCrossRegion:function(){
            $('#repealCrossRegion').modal({backdrop: 'static', keyboard: false});
        },
        /**
         * 点击撤销窜货确定按钮
         */
        repealCrossSubmit:function () {
            var that = this;
            that.optSign = 1;
            $.ajax({
                type: "post",
                url: global_path + "/cms/transregionalAnalysis/cancelTransregional",
                cache: false,  //禁用缓存
                //传入组装的参数
                data: {
                    loginId: localStorage.loginId,
                    token: localStorage.token,
                    optSign:that.optSign,
                    tid:that.id
                },
                dataType: "json",
                success: function (res) {
                    if (res.code === 200) {
                        that.closeModel();
                        layer.msg(res.msg);
                    }else{
                        layer.msg(res.msg);
                    }
                }
            })
        },
        /**
         * 驳回申诉弹框
         */
        rejectComplaint:function(){
            $('#rejectComplaint').modal({backdrop: 'static', keyboard: false});
        },
        /**
         * 点击驳回申诉确定按钮
         */
        rejectComplaintSubmit:function(){
            var that = this;
            this.optSign = 2;
            $.ajax({
                type: "post",
                url: global_path + "/cms/transregionalAnalysis/cancelTransregional",
                cache: false,  //禁用缓存
                //传入组装的参数
                data: {
                    loginId: localStorage.loginId,
                    token: localStorage.token,
                    optSign:that.optSign,
                    tid:that.id
                },
                dataType: "json",
                success: function (res) {
                    if (res.code === 200) {
                        that.closeModel();
                        layer.msg(res.msg);
                        window.location.reload();
                    }else{
                        layer.msg(res.msg);
                    }
                }
            })

        },
        /**
         * 提交申诉弹框
         */
        complaintSubmit:function(){
            $('#complaintSubmit').modal({backdrop: 'static', keyboard: false});
        },
        /**
         * 点击提交申诉的确定按钮
         */
        ComplaintSubmit:function(){
            var that = this;
            $.ajax({
                type: "post",
                url: global_path + "/cms/transregionalAnalysis/submitApli",
                cache: false,  //禁用缓存
                //传入组装的参数
                data: {
                    loginId: localStorage.loginId,
                    token: localStorage.token,
                    tid:that.id
                },
                dataType: "json",
                success: function (res) {
                    if (res.code === 200) {
                        that.closeModel();
                        layer.msg(res.msg);
                    }else{
                        layer.msg(res.msg);
                    }
                }
            })

        },
        /**
         * 点击收到赔偿弹框
         */
        receiveCompensation:function(){
            $('#receiveCompensation').modal({backdrop: 'static', keyboard: false});
        },
        /**
         * 点击收到赔偿的确定按钮
         */
        compensationSubmit:function(){
            var that = this;
            that.partnerSign = 2;
            $.ajax({
                type: "post",
                url: global_path + "/cms/transregionalAnalysis/dealTransregional",
                cache: false,  //禁用缓存
                //传入组装的参数
                data: {
                    loginId: localStorage.loginId,
                    token: localStorage.token,
                    optSign:that.partnerSign,
                    tid:that.id
                },
                dataType: "json",
                success: function (res) {
                    if (res.code === 200) {
                        that.closeModel();
                        layer.msg(res.msg);
                    }else{
                        layer.msg(res.msg);
                    }
                }
            })

        },
        /**
         * 点击同意和解弹框
         */
        agreePeace:function(){
            $('#agreePeace').modal({backdrop: 'static', keyboard: false});
        },
        /**
         * 点击同意和解的确定按钮
         */
        agreeSubmit:function(){
            var that = this;
            that.partnerSign = 3;
            $.ajax({
                type: "post",
                url: global_path + "/cms/transregionalAnalysis/dealTransregional",
                cache: false,  //禁用缓存
                //传入组装的参数
                data: {
                    loginId: localStorage.loginId,
                    token: localStorage.token,
                    optSign:that.partnerSign,
                    tid:that.id
                },
                dataType: "json",
                success: function (res) {
                    if (res.code === 200) {
                        that.closeModel();
                        layer.msg(res.msg);
                    }else{
                        layer.msg(res.msg);
                    }
                }
            })

        }
    },


});

