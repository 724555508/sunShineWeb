
var app = new Vue({
    el:'#app',
    data:{
        id : '',
        count : '',
        allAlarmCount : '',
        todayNotAlarmCount : '',
        todayIsDisposeCount : '',
        input : '',
        wearUserId : '',//佩戴用户ID
        loginId : '',
        token : '',
        username : '',//用户名
        gender : '',
        age : '',
        medicalHistory : '',
        lastAlarmTime : '',
        alarmCount : '',
        sIMPhoneNum : '',
        phoneNum : '',
        addressInfo : '',
        emergencyPeople : '',
        emergencyPhone : '',
        primaryNumber : '',
        heartRateCurve : '',//心率分析
        bloodPressureCurve : '',//血压分析
        bloodOxygenCurve : '',//血氧分析
        comprehensiveDiagnosis : '',//综合诊断
        //实时数据
        nearestHeartRate : '--',//最近心率
        nearestBloodPressure : '--',//最近血压
        nearestOxyhemoglobinSaturation : '--',//最近血氧
        nearestHeartRateTime : '',//最近心率时间
        nearestBloodPressureTime : '',//最近血压时间
        nearestOxyhemoglobinSaturatioTime : '',//最近血氧时间
        historyHref : '',
        wearUserInfoHref : '',
        disposeInfo : '',//处理方案详细
        response_Is_Success : false,
        startTime:'',
        endTime:'',
        deviceStatus:'佩戴中',
        deviceId:'',
        isDispose:1,
        historyHealthAnalysis:'',
        startAge:'',
        endAge:'',
        callId:'',
        appId:'',
        startTime1:'', //搜索开始时间
        endTime1:'',  //搜索截止时间
        input2:'',
        disposeInfos:[],
        requestName:'',//最后一次请求记录
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
    /**
     * 页面加载完成要做的事
     * */
    mounted: function () {
        this.loginId = localStorage.loginId;
        this.token = localStorage.token;
        this.startTime = this.getNowDate(7);
        this.endTime = this.getNowDate(0);
        $(".dataTables_scroll .dataTables_scrollBody").css("borderBottom","0px solid #fff");
        var that = this;
        // var table = $('#warningTable').DataTable();
        $('#warningTable tbody').on('click', 'tr', function () {
            // console.log(table.row( this )[0][0]);

            $('#userMsg').animate({'opacity':'0'});
            $(this).css({'background-color':'#0096ff','color':'#fff'});
            $(this).siblings().css({'background-color':'#fff','color':'#000'});

            //############## start #############这个是截取佩戴用户ID
            var html = $(this)[0].lastChild.innerHTML;
            that.wearUserId = html.substring((html.indexOf("value=")+7),html.indexOf("\" class="));
            //############## end #############
            //############## start #############这个是截取每条信息的ID
            var html2 = $($(this)[0])[0].innerHTML;
            that.id = html2.substring((html2.indexOf("none;\">")+7),html2.indexOf("</span></td><td>"));
            //############## end #############


            that.loadUserInfo();//加载用户数据
            that.loadHealthAnalysisModel();//加载器官模型数据
            $('#userMsg').animate({'opacity':'1'});
        } );

        // $('#dispose>ul').scrollTop( $('#dispose>ul')[0].scrollHeight );
        this.init();
        // $('#warningTable').dataTable().fnDraw(false);
    },
    /**
     * 方法集合
     * */
    methods: {
        /**
         * 页面初始化做的事儿
         * */
        init:function () {
            var that = this;
            $('#warningTable').DataTable({
                "lengthMenu": [[5, 10, 25, 50], [5, 10, 25, 50]], //分页长度选项,   -1 "全部"  暂时取消
                "paging": true, //分页
                "ordering": false, //排序
                "bSort": false,     //排序
                "bFilter": true, //过滤功能
                "order": [], //[[ 1, "desc" ]]默认排序 第三列
                iDisplayLength: 10,
                destroy: true, //如果需要重新加载的时候请加上这个
                bStateSave:true,    //操作数据后局部刷新停留在当前页面
                "pagingType": "full_numbers", //分页样式
                "bDeferRender":true,        //     *  当该属性设置为true时，表格每一行新增的元素只有在需要被画出来时才会被DataTable创建出来
                "scrollY": "500px", //设置高度
                "scrollCollapse": true, //超出 滑动
                "bJQueryUI":true,      //      是否启用jQueryUI样式
                bProcessing:false,   //加载动画
                "bServerSide": true, //服务端分页
//            "aaSorting": [[4, "desc"]],
                searching: false, //禁用原生搜索
                "language": { //语言配置
                    "sSearch": "搜索",
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "没有检索到数据",
                    "sInfo": "显示 _START_ 至 _END_ 条 &nbsp;&nbsp;共 _TOTAL_ 条",
                    "sInfoEmpty": "没有数据",
                    "sProcessing": "<img src=''/>", //这里是给服务器发请求后到等待时间显示的 加载gif
                    "sInfoFiltered": "(筛选自 _MAX_ 条数据)",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "前一页",
                        "sNext": "后一页",
                        "sLast": "末页"
                    }
                },
                bLengthChange: false,
                "info": true ,//通知
                ajax: function(data, callback, settings) {//封装请求参数
                    var param = {};
                    param.pageSize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
                    param.startRow = data.start;//开始的记录序号
                    param.loginId = localStorage.loginId;
                    param.token = localStorage.token;
                    param.startAge = that.startAge;
                    param.endAge = that.endAge;
                    // param.input = $.trim(that.input);
                    //ajax请求数据
                    $.ajax({
                        type: "post",
                        url: global_path+"/cms/alarm/getAlarmInformList",
                        cache: false,
                        //禁用缓存
                        data: param,
                        //传入组装的参数
                        dataType: "json",
                        success: function(result) {
                            that.requestName = 'init';
                            that.count = result.data.map.count;
                            that.allAlarmCount = result.data.map.allAlarmCount;
                            that.todayNotAlarmCount = result.data.map.todayNotAlarmCount;
                            that.todayIsDisposeCount = result.data.map.todayIsDisposeCount;

                            var returnData = {};
                            returnData.draw = data.draw; //这里直接自行返回了draw计数器,应该由后台返回
                            returnData.recordsTotal = result.data.total; //返回数据全部记录
                            returnData.recordsFiltered = result.data.total; //后台不实现过滤功能，每次查询均视作全部结果
                            returnData.data = result.data.alarmInformBeans; //返回的数据列表
                            if(result.data.alarmInformBeans != ''){
                                //把第一个用户的ID塞进去,页面加载完直接显示第一个用户的数据
                                that.wearUserId = result.data.alarmInformBeans[0].wearUserId;
                                that.id = result.data.alarmInformBeans[0].id;
                                setTimeout(function () {
                                    that.loadUserInfo();//加载用户数据
                                    that.loadHealthAnalysisModel();//加载器官模型数据
                                    $('#userMsg').animate({'opacity':'1'});
                                },1000);
                            }
                            callback(returnData);
                            $("table.dataTable tbody tr:first").css("background-color","#0096ff");
                        }
                    });
                },
                columns: [
                    //序号
                    {
                        "data": null,
                        "bSortable": false,
                        "bVisible":false//隐藏列
                    },
                    //姓名
                    {
                        "data": "username",
                        "bSortable": false
                    },
                    //城市
                    {
                        "data": "city",
                        "bSortable": false
                    },
                    //性别
                    {
                        "data": "",
                        "render": function(data, type, full, meta) {
                            var node = '';
                            if(full.gender == '1'){
                                node = '男';
                            }else if(full.gender == '2'){
                                node = '女';
                            }else{
                                node = '未知';
                            }
                            return node;
                        }
                    },
                    //年龄
                    {
                        "data": "age"
                    },
                    //类型
                    {
                        "data": "",
                        render: function(data, type, full, meta) {
                            var node = '';
                            if(full.level == 0){
                                node = '<span style="color: #c9a22a;">● <span style="color: #000">预警</span></span><span style="display: none;">'+full.id+'</span>';
                            }else if(full.level == 1){
                                node = '<span style="color: red;">● 疾病</span><span style="display: none;">'+full.id+'</span>';
                            }else if(full.level == 2){
                                node = '<span style="color: red;font-weight: 800;font-size: 14px;">● 危险</span><span style="display: none;">'+full.id+'</span>';
                            }else{
                                node = '<span style="color: blue;">● 未知</span><span style="display: none;">'+full.id+'</span>';
                            }
                            return node;
                        }
                    },
                    //次数
                    {
                        "data": "count"
                    },
                    //上次处理
                    {
                        "data": "disTimeStr"
                    },
                    //描述
                    {
                        "data": "msg",
                        "render": function(data, type, full, meta) {
                            var node = "";
                            if(full.msg !=null || full.msg != '' && full.msg.length>8){
                                var remarke = full.msg;
                                node = '<span title="'+full.msg+'">'+full.msg.substring(0,7)+'...</span>';
                            }else{
                                node = full.msg;
                            }
                            return node;
                        }
                    },
                    //操作
                    {
                        "data": "",
                        "render": function(data, type, full, meta) {
                            // 这儿这个return内容不要改，会有麻烦。如果执意要改，请一并把第60行的内容也改掉
                            var node1 = "<button value="+full.wearUserId+" class='btn btn-xs btn-primary btn-skyBlueSmall' onclick='overLook()'>忽略</button>";
                            return node1;
                        }
                    }]
                // "fnDrawCallback": function() { //序号
                //     this.api().column(0).nodes().each(function(cell, i) {
                //         cell.innerHTML = i + 1;
                //     });
                // }
            });

        },
        //      关闭弹框
        closeModel:function(){
            $(".modal").modal("hide");
        },
        /**
         * 点击添加工单进行弹框
         */
        // 点击添加工单进行弹框
        addWorkOrder:function(){
            $('#addWorkOrder').modal({backdrop: 'static', keyboard: false});
        },
        // 点击工单记录进行跳转
        workOrderList:function(){
            window.open('custom_recordHistory.html?deviceId='+this.deviceId);
        },
        /**
         * 查看
         * */
        search:function () {
            $('#warningTable tbody').html("");
            var that = this;
            var select = $("#selectVal").val();
            if(that.input === null && that.input === '' && select === '' && that.input2 === ''){
                console.log(that.input);        /* && select === '' && that.input2 === ''*/
                that.init();
            }else{
                $('#warningTable').DataTable({
                    "lengthMenu": [[5, 10, 25, 50], [5, 10, 25, 50]], //分页长度选项,   -1 "全部"  暂时取消
                    "paging": true, //分页
                    "ordering": false, //排序
                    "bSort": false,     //排序
                    "bFilter": true, //过滤功能
                    "order": [], //[[ 1, "desc" ]]默认排序 第三列
                    iDisplayLength: 10,
                    destroy: true, //如果需要重新加载的时候请加上这个
                    "pagingType": "full_numbers", //分页样式
                    "bDeferRender":true,        //     *  当该属性设置为true时，表格每一行新增的元素只有在需要被画出来时才会被DataTable创建出来
                    bStateSave:false,    //操作数据后局部刷新停留在当前页面
                    "scrollY": "500px", //设置高度
                    "scrollCollapse": true, //超出 滑动
                    "bJQueryUI":true,      //是否启用jQueryUI样式
                    bProcessing:false,   //加载动画
                    "bServerSide": true, //服务端分页
//            "aaSorting": [[4, "desc"]],
                    searching: false, //禁用原生搜索
                    "language": { //语言配置
                        "sSearch": "搜索",
                        "sLengthMenu": "每页显示 _MENU_ 条记录",
                        "sZeroRecords": "没有检索到数据",
                        "sInfo": "显示 _START_ 至 _END_ 条 &nbsp;&nbsp;共 _TOTAL_ 条",
                        "sInfoEmpty": "没有数据",
                        "sProcessing": "<img src=''/>", //这里是给服务器发请求后到等待时间显示的 加载gif
                        "sInfoFiltered": "(筛选自 _MAX_ 条数据)",
                        "oPaginate": {
                            "sFirst": "首页",
                            "sPrevious": "前一页",
                            "sNext": "后一页",
                            "sLast": "末页"
                        }
                    },
                    bLengthChange: false,
                    "info": true ,//通知
                    ajax: function(data, callback, settings) {//封装请求参数
                        var param = {};
                        param.pageSize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
                        param.startRow = data.start;//开始的记录序号
                        param.loginId = localStorage.loginId;
                        param.token = localStorage.token;
                        param.input = that.input;
                        param.startTime = that.startTime1;  //起始时间
                        param.endTime = that. endTime1;   //截止时间
                        param.count = that.input2; //数量
                        param.msgInfo = $('#selectVal').val(); //数量

                        // param.input = $.trim(that.input);
                        //ajax请求数据
                        $.ajax({
                            type: "post",
                            url: global_path+"/cms/alarm/serachAlarmList",
                            cache: false,
                            //禁用缓存
                            data: param,
                            //传入组装的参数
                            dataType: "json",
                            success: function(result) {
                                that.requestName = 'search';
                                that.loadHealthAnalysisModel();
                                var returnData = {};
                                returnData.draw = data.draw; //这里直接自行返回了draw计数器,应该由后台返回
                                returnData.recordsTotal = result.data.total; //返回数据全部记录
                                returnData.recordsFiltered = result.data.total; //后台不实现过滤功能，每次查询均视作全部结果
                                returnData.data = result.data.alarmInformBeans; //返回的数据列表
                                if(result.data.alarmInformBeans != ''){
                                    //把第一个用户的ID塞进去,页面加载完直接显示第一个用户的数据
                                    that.wearUserId = result.data.alarmInformBeans[0].wearUserId;
                                    that.id = result.data.alarmInformBeans[0].id;
                                    setTimeout(function () {
                                        that.loadUserInfo();//加载用户数据
                                        that.loadHealthAnalysisModel();//加载器官模型数据
                                        $('#userMsg').animate({'opacity':'1'});
                                    },1000);
                                }
                                callback(returnData);
                            }
                        });
                    },
                    columns: [
                        //序号
                        {
                            "data": null,
                            "bSortable": false,
                            "bVisible":false//隐藏列
                        },
                        //姓名
                        {
                            "data": "username",
                            "bSortable": false
                        },
                        //城市
                        {
                            "data": "city",
                            "bSortable": false
                        },
                        //性别
                        {
                            "data": "",
                            "render": function(data, type, full, meta) {
                                var node = '';
                                if(full.gender == '1'){
                                    node = '男';
                                }else if(full.gender == '2'){
                                    node = '女';
                                }else{
                                    node = '未知';
                                }
                                return node;
                            }
                        },
                        //年龄
                        {
                            "data": "age"
                        },
                        //类型
                        {
                            "data": "",
                            render: function(data, type, full, meta) {
                                var node = '';
                                if(full.level == 0){
                                    node = '<span style="color: #c9a22a;">● <span style="color: #000">预警</span></span><span style="display: none;">'+full.id+'</span>';
                                }else if(full.level == 1){
                                    node = '<span style="color: red;">● 疾病</span><span style="display: none;">'+full.id+'</span>';
                                }else if(full.level == 2){
                                    node = '<span style="color: red;font-weight: 800;font-size: 14px;">● 危险</span><span style="display: none;">'+full.id+'</span>';
                                }else{
                                    node = '<span style="color: blue;">● 未知</span><span style="display: none;">'+full.id+'</span>';
                                }
                                return node;
                            }
                        },
                        //次数
                        {
                            "data": "count"
                        },
                        //上次处理
                        {
                            "data": "disTimeStr"
                        },
                        //描述
                        {
                            "data": "msg",
                            "render": function(data, type, full, meta) {
                                var node = "";
                                if(full.msg !=null || full.msg != '' && full.msg.length>8){
                                    var remarke = full.msg;
                                    node = '<span title="'+full.msg+'">'+full.msg.substring(0,7)+'...</span>';
                                }else{
                                    node = full.msg;
                                }
                                return node;
                            }
                        },
                        //操作
                        {
                            "data": "",
                            "render": function(data, type, full, meta) {
                                var node1 = "<button value="+full.wearUserId+" class='btn btn-xs btn-primary btn-skyBlueSmall' onclick='overLook()'>忽略</button>";
                                return node1;
                            }
                        }],
                    "fnDrawCallback": function() { //序号
                        this.api().column(0).nodes().each(function(cell, i) {
                            cell.innerHTML = i + 1;
                        });
                    }
                });

            }
        },

        /**
         * 加载右边模块用户详情数据
         */
        loadUserInfo:function () {
            var that = this;
            $.ajax({
                type: "post",
                url: global_path+"/cms/wearUser/selectWearUserInfo",
                cache: false,
                //禁用缓存
                data: {
                    loginId:that.loginId,
                    token:that.token,
                    wearUserId:that.wearUserId
                },
                //传入组装的参数
                dataType: "json",
                success: function(result) {
                    if(result.code == 200){
                        var userInfo = result.data.cmsWearUserInfo;
                        that.initUserInfo(userInfo,that);


                    }
                }
            });
        },
        initUserInfo:function (userInfo,that) {
            that.deviceId = userInfo.deviceId;
            that.username = userInfo.username;
            that.historyHealthAnalysis = 'historyHealthAnalysis.html?wearUserId=' + that.wearUserId;
            that.gender = userInfo.gender == '1' ? userInfo.gender = '男' : userInfo.gender = '女';
            that.age = userInfo.age;
            that.medicalHistory = userInfo.medicalHistory;
            that.lastAlarmTime = userInfo.lastAlarmTime == null ? userInfo.lastAlarmTime = '' : userInfo.lastAlarmTime = userInfo.lastAlarmTime.substring(5,7)+"月"+userInfo.lastAlarmTime.substring(8,10)+"日"+userInfo.lastAlarmTime.substring(11,13)+"时"+userInfo.lastAlarmTime.substring(14,16)+"分";
            that.alarmCount = userInfo.alarmCount;
            that.sIMPhoneNum = userInfo.sIMPhoneNum;
            that.phoneNum = userInfo.phoneNum;
            that.addressInfo = userInfo.addressInfo;
            that.emergencyPeople = userInfo.emergencyPeople;
            that.emergencyPhone = userInfo.emergencyPhone;
            that.primaryNumber = userInfo.binder.length == 0 ? userInfo.binder = '' : userInfo.binder = userInfo.binder[0].id;
            // 弹框添加工单
            that.callId = that.primaryNumber;     //来电号码
            that.appId = that.primaryNumber;     //app账号
            that.historyHref = 'historyData.html?wearUserId=' + that.wearUserId;
            that.wearUserInfoHref = 'wearUser.html?wearUserId=' + that.wearUserId;
            userInfo.isInsurance == 1 ? $('#isInsurance').css('display','inline-block') : $('#isInsurance').css('display','none')
            userInfo.isVip == 1 ? $('#isVip').css('display','inline-block') : $('#isVip').css('display','none')
            if(userInfo.deviceStatus == 0) that.deviceStatus = '未知';
            if(userInfo.deviceStatus == 1) that.deviceStatus = '工作中';
            if(userInfo.deviceStatus == 2) that.deviceStatus = '离手';
            if(userInfo.deviceStatus == 3) that.deviceStatus = '充电中';
            if(userInfo.deviceStatus == 4) that.deviceStatus = '失联';
            if(userInfo.deviceStatus == 5) that.deviceStatus = '关机';
        },
        /**
         * 加载右边模块健康分析模型数据 及预警处理信息
         */
        loadHealthAnalysisModel:function () {
            var that = this;
            $.ajax({
                type: "post",
                url: global_path+"/cms/wearUser/selectHealthAnalysisModel",
                cache: false,
                //禁用缓存
                data: {
                    loginId:that.loginId,
                    token:that.token,
                    wearUserId:that.wearUserId
                },
                //传入组装的参数
                dataType: "json",
                success: function(result) {
                    if(result.code == 200){
                        var healthModel = result.data.monitoringDetails;
                        that.initHealthAnalysisModel(healthModel,that);
                        var actualData = result.data.actualData;
                        if(actualData != null){
                            that.initActualData(actualData,that);
                        }
                    }
                }
            });
            $.ajax({
                type: "post",
                url: global_path+"/cms/alarm/getDisposeInfoByWearUserId",
                cache: false,
                //禁用缓存
                data: {
                    loginId:that.loginId,
                    token:that.token,
                    wearUserId:that.wearUserId
                },
                //传入组装的参数
                dataType: "json",
                success: function(result) {
                    if(result.code == 200){
                        // var data = result.data.DisposeInfos;
                        that.disposeInfos = result.data.DisposeInfos;
                        // for(var i=0;i<disposeInfos.length;i++){
                        //     console.log()
                        // }
                        // if(data != null){
                        //     // $('#dispose').html('');
                        //     for(var i = 0;i<data.length;i++){
                        //         var disId = data[i].disposeId;
                        //         var time = data[i].disposeTime == null ? '未知时间':data[i].disposeTime.substring(5,7)+'月'+data[i].disposeTime.substring(8,10)+'日'+data[i].disposeTime.substring(11,13)+'时'+data[i].disposeTime.substring(14,16)+'分'+data[i].disposeTime.substring(17,19)+'秒';
                        //         console.log(time);
                        //         // $('#dispose').html( $('#dispose').html() + '<li><span>'+time+'</span>'+disId+'</li>');
                        //         // $('#dispose').html( $('#dispose').html() + '<li class="li1">'+data[i].disposeRemark+'</li>');
                        //     }
                        var timer = window.setTimeout(function () {
                            $('#dispose .kfProgress').scrollTop( $('#dispose .kfProgress')[0].scrollHeight );
                            // $('#dispose .kfProgress').animate( {scrollTop: $('#dispose .kfProgress')[0].scrollHeight}, {duration: 1000,easing: "swing"} );
                        }, 500)
                        // }
                    }
                }
            });
        },
        initHealthAnalysisModel:function (healthModel,that) {
            that.heartRateCurve = healthModel.heartRateCurve;
            that.bloodPressureCurve = healthModel.bloodPressureCurve;
            that.bloodOxygenCurve = healthModel.bloodOxygenCurve;
            that.comprehensiveDiagnosis = healthModel.comprehensiveDiagnosis;
            if(healthModel.healthFlag == 1){
                $('#illType').text('健康').css('color','rgb(54,184,100)');   //part3 结论
            }else if(healthModel.healthFlag == 2){
                $('#illType').text('亚健康').css('color','rgb(255,153,0)');   //part3 结论
            }else if(healthModel.healthFlag == 3){
                $('#illType').text('疾病').css('color','rgb(234,74,74)');   //part3 结论
            }else{
                $('#illType').text('未明确').css('color','rgb(179,179,179)');   //part3 结论
            }
            var organ = healthModel.allTheInternalOrgans;        //内脏健康数组
            //14个器官
            if(organ !== null && organ !== '' && organ !== undefined){
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
        },
        // 14种器官  用Vue.set改变  来改变数据     Vue.set(数组，制定key，改变的内容)
        setOrganImgs:function (key,value) {
            Vue.set(this.allTheInternalOrgans,key,'../../imgs/iframeImgs/organ/'+key+'_'+value+'.png')
        },

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
        initActualData:function (actualData,that) {
            //最近数据如果不是今天的不展示
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
        CallPhone:function () {
            if(this.phoneNum == '' || this.phoneNum == null){
                layer.msg('该佩戴人未完善电话信息');
                return;
            }
            this.disposeInfo = '拨打了'+this.username+'电话,手机号:'+this.phoneNum;
            this.addDisposeInfo();
        },
        CallEmergencyPhone:function () {
            if(this.emergencyPhone == '' || this.emergencyPhone == null){
                layer.msg('该佩戴人无紧急联系电话');
                return;
            }
            this.disposeInfo = '拨打了'+this.emergencyPeople+'电话,手机号:'+that.emergencyPhone;
            this.addDisposeInfo();
        },
        Call120:function () {
            this.disposeInfo = '安顿系统给'+this.username+'提供救护车服务';
            this.addDisposeInfo();
        },
        /**
         * 点击处理完成
         */
        submitFinish:function () {
            if(this.disposeInfo == '' || this.disposeInfo == null){
                layer.msg('处理方案不能为空');
                return;
            }
            if(this.disposeInfo.length>500){
                layer.msg('字符超长');
                return;
            }
            this.addDisposeInfo();

        },
        /**
         * 请求后台（持久化处理方案）
         */
        addDisposeInfo:function () {
            var that = this;
            $.ajax({
                type: "post",
                url: global_path+"/cms/alarm/addDisposeInfo",
                cache: false,
                //禁用缓存
                data: {
                    loginId:that.loginId,
                    token:that.token,
                    wearUserId:that.wearUserId,
                    disposeInfo:that.disposeInfo,
                    id:that.id,
                    isDispose:that.isDispose
                },
                //传入组装的参数
                dataType: "json",
                success: function(result) {
                    if(result.code == 200){
                        that.successOperate();

                        that.disposeInfo = '';   //清空
                        that.isDispose = 1;
                    }else{
                        layer.msg(result.msg);
                    }
                }
            });
        },
        // 点击来电反馈
        phoneFeedBack:function(){
            var that = this;
            $.ajax({
                type: "post",
                url: global_path+"/cms/service/getRecordInfo",
                cache: false,
                //禁用缓存
                data: {
                    loginId:that.loginId,
                    token:that.token,
                    deviceId:that.deviceId
                },
                //传入组装的参数
                dataType: "json",
                success: function(result) {
                    if(result.code == 200){
                        if(result.data.bean.map !== {} || result.data.bean.map !== null){
                            window.open("custom_recordHistory.html?deviceId="  + that.deviceId);


                        }else{
                            layer.msg('该设备号没有客服记录');
                        }
                    }else{
                        layer.msg(result.msg);
                    }
                }
            });
        },
        /**
         * 导出列表
         */
        exportList:function(){
            var start = this.startTime;
            var end = this.endTime;

            window.location.href = global_path + '/cms/excel/ExportAlarmList?loginId='+localStorage.loginId+'&token='+
                localStorage.token+'&startTime='+start+'&endTime='+end;
        },
        successOperate:function () {
            layer.msg('提交成功',{time:2000});
            var that = this;

            // var time = new Date().getMonth()+1+'月'+new Date().getDate()+'日'+new Date().getHours()+'时'+new Date().getSeconds()+'分'+new Date().getMinutes()+'秒';
            // $('#dispose').append('<li><span>'+time+'</span>'+that.disposeInfo+'</li>');
            // $('#dispose').scrollTop( $('#dispose')[0].scrollHeight );
            setTimeout(function () {
                if(that.requestName == 'search'){
                    that.search();
                }else{
                    that.init();
                }

                // location.reload();
            },1000);
        },
        // 点击下发语音出现弹框
        voiceModel:function(){
            $('#voice').modal({backdrop: 'static', keyboard: false});
        },
        // 点击紧急提示出现弹框
        instancyTips:function(){
            $('#tips').modal({backdrop: 'static', keyboard: false});
        },
        // 点击紧急提示的保存
        saveSend:function(){
            var _this = this;
            $.ajax({
                url: global_path + '/cms/alarm/sendUrgentReminder',
                type: 'post',
                dataType: 'json',
                data: {
                    loginId: _this.loginId,
                    token: _this.token,
                    deviceIds:_this.deviceId,
                    sendInfo:$("#sendVal").val()
                },
                success:function (res) {
                    // if(res.code === 200){
                    //     layer.msg(res.msg,{icon:1,time:2000});
                    //     _this.deviceId = '';
                    //     _this.init();
                    // }else {
                    //     layer.msg(res.msg,{icon:2,time:2000});
                    // }
                    $(".modal").modal("hide");
                    $('#sendVal').val(""); //清空文本消息
                }
            })
        },
        //关闭弹框
        closeModel:function(){
            $(".modal").modal("hide");
        },
        /**
         * 点击下发要进行的操作
         * */
        handleSend: function () {
            var _this = this;
            layer.confirm('确认下发吗？', {
                btn: ['确认','取消'] //按钮
            }, function(){
                layer.msg('下发中');
                //点击确认后，显示下发中，进行ajax操作
                $.ajax({
                    url: global_path + '/cms/voice/sendVoice',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        loginId: _this.loginId,
                        token: _this.token,
                        deviceId: _this.deviceId,
                        voiceSign:$('#selectVoice').val()
                    },
                    success:function (res) {
                        if(res.code === 200){
                            layer.msg(res.msg,{icon:1,time:2000});
                            _this.deviceId = '';
                            _this.init();
                        }else {
                            layer.msg(res.msg,{icon:2,time:2000});
                        }
                        $(".modal").modal("hide");
                    }
                })
            }, function(){
                layer.msg('已取消', {
                    icon:1,
                    time: 1000
                });
            });

        }
    }
});

document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){
        app.search();
    }
}


/**
 * 12张图摆放
 * 胆、小肠、心、膀胱、       肝、脾、心包、脊椎、       肾、肺、淋巴、大肠
 * */
$(function(){
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
    $(".dot").css({"left":dotLeft+10,"top":dotTop+35});
    //设置图片位置
    $(".boxImg").each(function(index, element){
        $(this).css({"left":Math.sin((ahd*index))*radius+dotLeft,"top":Math.cos((ahd*index))*radius+dotTop});
    });
});
// 点击忽略当前行删除
function overLook() {
    app.disposeInfo = '已忽略';
    app.isDispose = 2;
    app.addDisposeInfo();
}
function showMsg(remark,that){
    layer.tips(remark, $(that), {
        tips: [2, '#3595CC'],
        time: 5000
    });
}

function closeTips(){
    layer.closeAll('tips');
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
                    console.log(res)
                    layer.msg(res.msg,{icon:6,time:1000},function () {
                         app.closeModel();
                    });
                }else {
                    layer.msg(res.msg,{icon:5,time:2000});
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
