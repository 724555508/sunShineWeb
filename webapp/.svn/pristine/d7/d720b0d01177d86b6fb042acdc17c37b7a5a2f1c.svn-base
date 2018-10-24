
var app = new Vue({
    el:'#app',
    data:{
        obj:{
            loginId:localStorage.loginId,
            token:localStorage.token
        },
        version:'',
        electricQuantity:'0',
        workStatus:'',
        useStatus:'',
        deviceId:'',
        checkCode:'',
        createTime : '',
        wearUserName : '',
        ownAppUserId : '',
        accountLinking:'',
        deviceCirculateLogs:[
            {addTime:'',agentName:'',areaName:'',phoneNum:''}
        ],
        activationTime:'',
        serviceStartTime:'',
        serviceEndTime:'',
        nearestCommunicationTime:'',
        nearestStartTime:'',
        monitoringTime:'',
        nearestAddress:'',
        calibrationState:'',
        historyWear:[
          {
        	bindingTime:'',
          	deviceId:'',
          	removeBindingTime:'',
          	id:''
          }
        ],
        wearUserId:'',
        maxCheckTime:'',
        origin:'',
        productionDate:'',
        salesArea:'',
        alesArea:'',
        others:'',
        startCount:'',
        cycleCount:'',
        simNum:'',
        locationCount:0,
        afterSaleLogs:'',
        time:[],
        reason:[],
        sendDate: '',
        sign:localStorage.sign,
        monitoringStrength:""
       
        
    },
    mounted:function(){
        this.init();
        console.log( $('.common-row .common-row>span').attr("class",'switch-off'));
        console.log( $('.common-row .common-row>span').attr("class"));
        // this.dataTables();
    },
    methods:{
        // 如果开启开关  弹框
        meatureButton:function () {
            if($('.common-row .common-row>span')[0].className === 'switch-on'){  //如果开关为开的时候，显示弹框
                // $('#meatureModel').modal('show');
                $('#meatureModel').modal({backdrop: 'static', keyboard: false});
            }else{
                var that = this;
                $.ajax({
                    url:global_path + '/cms/device/updateEnhancedMode',
                    type:'post',
                    dataType:'json',
                    data:{
                        'loginId':localStorage.loginId,
                        'token':localStorage.token,
                        'deviceId':that.deviceId
                    },
                    success: function (res) {
                        checkToken(res);
                        if(res.code === 200){
                            debugger;
                            layer.msg(res.msg,{time:300},function () {
                                location.reload();
                            });
                            that.monitoringStrength = 1; //关
                            $('.common-row .common-row>span').css({"border-color": "rgb(223, 223, 223)","box-shadow":" rgb(223, 223, 223) 0px 0px 0px 0px inset","background-color":"rgb(255, 255, 255)"});
                            $('.common-row .common-row>span').attr("class",'switch-off');

                        }else{
                            layer.msg(res.msg);
                        }
                        setTimeout(function(){
                            window.location.reload();
                        },1000)
                    }
                });
            }
        },
        // 点击测量模式弹框 中确定按钮
        meatureModelBtn:function(){
            var that = this;
            $.ajax({
                url:global_path + '/cms/device/updateEnhancedMode',
                type:'post',
                dataType:'json',
                data:{
                    'loginId':localStorage.loginId,
                    'token':localStorage.token,
                    'deviceId':that.deviceId
                },
                success: function (res) {
                    checkToken(res);
                    if(res.code === 200){
                        layer.msg(res.msg,{time:300},function () {
                            location.reload();
                        });
                        that.monitoringStrength = 0; //开
                        $('.common-row .common-row>span').attr('class','switch-on');
                        $('.common-row .common-row>span').css({"border-color": "rgb(0, 150, 255)","box-shadow":"rgb(0, 150, 255) 0px 0px 0px 16px inset","background-color":"rgb(0, 150, 255)"});
                    }else{
                        layer.msg(res.msg);
                    }
                    $("#meatureModel").modal("hide");
                    setTimeout(function(){
                        window.location.reload();
                    },1000)
                }
            });
        },
        //关闭测量模式弹框
        closeModel1:function(){
            $(".modal").modal("hide");
            setTimeout(function(){
                window.location.reload();
            },1000)
        },
        // 流通日志
        dataTables: function () {
            var that = this;
            $('#detailsTable').DataTable({
                bLengthChange: false, //去掉每页显示多少条数据方法
                "info":false, //去掉底部文字
                "lengthMenu": [[5, 10, 25, 50], [5, 10, 25, 50]], //分页长度选项,   -1 "全部"  暂时取消
                "paging": false, //分页
                "ordering": false, //排序
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
                    //ajax请求数据
                    $.ajax({
                        type: "post",
                        url: global_path + "/cms/device/getDeviceInfo",
                        cache: false,  //禁用缓存
                        data: that.obj,  //传入组装的参数
                        dataType: "json",
                        success: function (res) {
                            // checkToken(res);
                            if(res.code == 200){
                                var deviceInfoBean = res.data.deviceInfoBean;
                                that.wearUserId = deviceInfoBean.wearUserId;
                                that.version = deviceInfoBean.version;  //版本号
                                that.electricQuantity = deviceInfoBean.electricQuantity;  //电量
                                that.workStatus = deviceInfoBean.workStatus;  //工作状态
                                that.useStatus = deviceInfoBean.useStatus; //冻结  、激活
                                // 冻结  激活 改变文字
                                if(that.useStatus === 0){
                                    $('#freeze .h4').text('冻结管理');
                                    $('#freeze #text').text('冻结设备则用户的服务将被终止，显示为已过期，确定冻结该设备吗？');
                                }else if(that.useStatus === -1){
                                    $('#freeze .h4').text('激活管理');
                                    $('#freeze #text').text('激活设备则设备的服务期继续开启，确定激活设备吗？');
                                }
                                that.deviceId = deviceInfoBean.deviceId;  //设备号
                                that.checkCode = deviceInfoBean.checkCode; //验证码
                                that.createTime = that.formatTime(deviceInfoBean.createTime); //入库日期
                                if(localStorage.sign !=0 && localStorage.sign !=1){
                                    if(deviceInfoBean.wearUserName != '' && deviceInfoBean.wearUserName != null){
                                        var name1 = deviceInfoBean.wearUserName;
                                        name1 = name1.split('');
                                        name1.splice(1,1,'*');
                                        deviceInfoBean.wearUserName = name1.join('');
                                    }
                                }
                                that.wearUserName = deviceInfoBean.wearUserName;  //当前佩戴人
                                // if(localStorage.sign !=0 && localStorage.sign !=1){
                                //     if(deviceInfoBean.binder != '' && deviceInfoBean.binder != null){
                                //         for(var i=0;i<deviceInfoBean.binder.length;i++){
                                //             if(deviceInfoBean.binder[i].tAppUserId != '' && deviceInfoBean.binder[i].tAppUserId != null){
                                //                 var name = deviceInfoBean.binder[i].tAppUserId.split('');
                                //                 name.splice(3,4,'****');
                                //                 deviceInfoBean.binder[i].tAppUserId = name.join('');
                                //             }
                                //         }
                                //     }
                                // }
                                // 开关状态
                                that.monitoringStrength = deviceInfoBean.monitoringStrength;
                                console.log(that.monitoringStrength);
                                if(that.monitoringStrength === 0){  //0开  改变开关按钮状态以及改变颜色
                                    // debugger;
                                    $('.common-row .common-row>span').attr('class','switch-on');
                                    $('.common-row .common-row>span').css({"border-color": "rgb(0, 150, 255)","box-shadow":"rgb(0, 150, 255) 0px 0px 0px 16px inset","background-color":"rgb(0, 150, 255)"});
                                       console.log($('.common-row .common-row>span')[0].className)
                                }else if(that.monitoringStrength === 1){ //1关  改变开关按钮状态以及改变颜色
                                    $('.common-row .common-row>span').attr('class','switch-off');
                                    $('.common-row .common-row>span').css({"border-color": "rgb(223, 223, 223)","box-shadow":" rgb(223, 223, 223) 0px 0px 0px 0px inset","background-color":"rgb(255, 255, 255)"});
                                }

                                that.ownAppUserId = deviceInfoBean.binder == '' ? '' : deviceInfoBean.binder[0].tAppUserId; //主账户
                                that.accountLinking = deviceInfoBean.accountLinking; //关联账户
                                if(deviceInfoBean.deviceCirculateLogs != ''&& deviceInfoBean.deviceCirculateLogs  != null){
//                 	 入库日期
                                    for(var i = 0;i<deviceInfoBean.deviceCirculateLogs.length;i++){
                                        deviceInfoBean.deviceCirculateLogs[i].addTime = that.formatTime(deviceInfoBean.deviceCirculateLogs[i].addTime);
                                    }
                                    that.deviceCirculateLogs = deviceInfoBean.deviceCirculateLogs;
                                }
                                that.activationTime = that.formatTime(deviceInfoBean.activationTime); //激活日期
                                that.serviceStartTime = that.formatTime(deviceInfoBean.serviceStartTime); //服务器开始时间
                                that.serviceEndTime = that.formatTime(deviceInfoBean.serviceEndTime); //服务器结束时间
                                that.nearestCommunicationTime = that.formatTime(deviceInfoBean.nearestCommunicationTime); //上次工作时间
                                that.nearestStartTime = that.formatTime(deviceInfoBean.nearestStartTime); //最近开机时间
                                that.monitoringTime = deviceInfoBean.monitoringTime;//监控总时
                                that.nearestAddress = deviceInfoBean.nearestAddress;   //最近定位
                                // 最近定位从第9位开始全部转换为*
                                if(localStorage.sign !=0 && localStorage.sign !=1){
                                    var place = that.nearestAddress;
                                    place = place.split('') //转化为数组
                                    place.slice(0,9); //截取前九位
                                    that.nearestAddress = place.slice(0,13).join('')+'********'; //转化为字符串
                                }
                                that.calibrationState = deviceInfoBean.calibrationState;   //校准状态
//                              历时佩戴
                                if(deviceInfoBean.historyWear != "" && deviceInfoBean.historyWear != null){
                                    if(localStorage.sign !=0 && localStorage.sign !=1){
                                        for(var i=0;i<deviceInfoBean.historyWear.length;i++){
                                            if(deviceInfoBean.historyWear[i].id != '' && deviceInfoBean.historyWear[i].id != null){
                                                var name = deviceInfoBean.historyWear[i].id.split('');
                                                name.splice(1,1,'*');
                                                deviceInfoBean.historyWear[i].id = name.join('');
                                            }
                                        }
                                    }
                                	that.historyWear = deviceInfoBean.historyWear;
                                }
                                that.maxCheckTime = res.data.deviceInfoBean.maxCheckTime;   //校准时间
                                that.origin = deviceInfoBean.origin;
                                that.productionDate = deviceInfoBean.productionDate;
                                that.salesArea = deviceInfoBean.salesArea;
                                that.others = deviceInfoBean.others; //将json字符串转化为json对象
                                that.startCount = deviceInfoBean.startCount;
                                that.cycleCount = deviceInfoBean.cycleCount;
                                that.simNum = deviceInfoBean.simNum;
                                that.locationCount = deviceInfoBean.locationCount;
                                that.afterSaleLogs = deviceInfoBean.afterSaleLogs;
                                that.time = [];
                                that.reason = [];
                                var returnData = {};
                                // returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                                // returnData.recordsTotal = res.data.total;//返回数据全部记录
                                // returnData.recordsFiltered = res.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                                returnData.data = res.data.deviceInfoBean.deviceLogs; //返回的数据列表
                                callback(returnData);
                                that.dataTables1();
                            }else{
                                layer.msg(res.msg);
                            }

                        },
                        error:function(){

                        }
                    });
                },
                columns: [
                    //时间
                    {
                        "data": '', //有return 可以不写
                        "bSortable": false,
                        "render":function (data, type, full, meta) {
                            var node;
                            node = that.formatTime(full.time);  //full指的就是returnData.data
                            return node;
                        }
                    },
//          		操作员
                    {
                        "data":'opter',
                        "bSortable":false
                    },
//                  流程
                    {
                        "data":'info',
                        "bSortable":false
                    }]
            })
        },
        // 工作日志
        dataTables1: function () {
            var that = this;
            $('#workTables').DataTable({
                bLengthChange: false, //去掉每页显示多少条数据方法
                "info":false, //去掉底部文字
                "lengthMenu": [[5, 10, 25, 50], [5, 10, 25, 50]], //分页长度选项,   -1 "全部"  暂时取消
                "paging": false, //分页
                "ordering": false, //排序
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
                    //ajax请求数据
                    $.ajax({
                        type: "post",
                        url: global_path + "/cms/device/listDeviceRunLog",
                        cache: false,  //禁用缓存
                        data: {
                            "deviceId":that.deviceId,
                            "time": that.sendDate,
                            "loginId":localStorage.loginId,
                            "token":localStorage.token

                        },  //传入组装的参数
                        dataType: "json",
                        success: function (res) {
                            // debugger;
                            // checkToken(res);
                            if(res.code == 200){
                                var returnData = {};
                                // returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                                // returnData.recordsTotal = res.data.total;//返回数据全部记录
                                // returnData.recordsFiltered = res.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                                returnData.data = res.data.deviceRunLogs; //返回的数据列表
                                callback(returnData);
                            }else{
                                layer.msg(res.msg);
                            }

                        },
                        error:function(){

                        }
                    });
                },
                columns: [

                    //时间
                    {
                        "data": 'time', //有return 可以不写
                        "bSortable": false
                    },
//          		成功状态
                    {
                        "data":'',
                        "bSortable":false,
                        "render":function (data, type, full, meta) {
                            var node;
                            node = '访问成功';
                            return node;
                        }
                    },
//                  详情内容
                    {
                        "data":'',
                        "bSortable":false,
                        "render":function (data, type, full, meta) {
                            var node;
                            if(full.content === "1") {
                                node = '开机成功';
                            }else if(full.content === '2'){
                                node = '上传SOS';
                            }else if(full.content === '3'){
                                node = '开始充电';
                            }
                            else if(full.content === '4'){
                                node = '充电中';
                            }else if(full.content === '5'){
                                node = '解除充电';
                            }else if(full.content === '6'){
                                node = '上传心率';
                            }else if(full.content === '7'){
                                node = '上传血压';
                            }else if(full.content === '8'){
                                node = '上传血氧';
                            }else if(full.content === '9'){
                                node = '上传步数';
                            }else if(full.content === '10'){
                                node = '上传位置';
                            }else if(full.content === '11'){
                                node = '关机';
                            }else if(full.content === '12'){
                                node = '上传0';
                            }else {
                                node = '未知'
                            }
                            return node;
                        }
                    }]
            })
        },
        init:function(){
            var _this = this;
            var url = window.location.search; //截取"?"以及之后的所有字符串
            var str = url.substring(1, url.length); //去除"?"
            var arr = str.split('&'); //根据&分割成数组   ["key=value","name=zxm"]
            for(var i = 0; i < arr.length; i++) {
                _this.obj[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
            }
            this.dataTables();
        },
        //关闭弹框
        closeModel:function(){
            $(".modal").modal("hide");
        },
        // 点击报废管理出现弹框
        scrapManage:function(){
            if(localStorage.sign !== '0' && localStorage.sign !== '1'){
                layer.msg('权限不足');
            }else {
                $('#scrapReason').modal('show');
            }
        },
        // 点击报废管理的确认按钮
        scrapBtn:function(){
            var that = this;
            $.ajax({
                url:global_path + '/cms/device/updateDeviceToScrap',
                type:'post',
                dataType:'json',
                data:{
                    'loginId':localStorage.loginId,
                    'token':localStorage.token,
                    'deviceId':that.deviceId,
                    'reason':$('#reason').val()
                },
                success: function (result) {
                    checkToken(result);
                    if(result.code == 200){
                        layer.msg(result.msg, {
                            icon: 6,time:2000
                        });
                        setTimeout(function () {
                            window.location.reload();
                        },2000)
                    }else{
                        layer.msg(result.msg, {
                            icon: 5,time:2000
                        });
                    }
                    $(".modal").modal("hide");
                }
            });
        },
//        点击租赁 出现弹框
        rent:function(){
            $('#hire').modal('show');
        },
//      点击激活/冻结 出现弹框
        active:function(){
            $('#freeze').modal('show');
        },
        //点击激活状态的确定按钮
        subBtn1:function(){
        	var that = this;
        	$.ajax({
		        url:global_path + '/cms/device/activateDevice',
		        type:'post',
		        dataType:'json',
		        data: that.obj,
		        success: function (result) {
		            checkToken(result);
		            if(result.code == 200){
		                layer.msg(result.msg, {
		                    icon: 6,time:2000
		                });

		                setTimeout(function () {
		                    window.location.reload();
		                },2000)
		            }else{
		                layer.msg(result.msg, {
		                    icon: 5,time:2000
		                });
		            }
		        }
    		});
        },
        // 点击租赁的确定按钮
        subBtn2:function(){
            var that = this;
            $.ajax({
                url:global_path + '/cms/device/updateDeviceServiceEndTime',
                type:'post',
                dataType:'json',
                data: {
                  "deviceId":that.deviceId,
                  "serviceEndTime":$('#serve1').val(),
                  "loginId":localStorage.loginId,
                  "token":localStorage.token
                },
                success: function (result) {
                    checkToken(result);
                    if(result.code == 200){
                        layer.msg(result.msg, {
                            icon: 6,time:2000
                        });
                        setTimeout(function () {
                            window.location.reload();
                        },2000)
                    }else{
                        layer.msg(result.msg, {
                            icon: 5,time:2000
                        });
                    }
                }
            });
        },
        // 点击激活/冻结 出现弹框
        history:function(){
            $('#wearHistory').modal('show');
        },
        //点击重新分配 出现弹框
        allot:function () {
            var that = this;
            $.ajax({
                url: global_path + '/cms/agent/queryAgentUser',
                type:'post',
                dataType:'json',
                data:that.obj,
                success:function (res) {
                    if(res.code == 200){
                        $("#selectArea").html("");
                        for(var i = 0;i<res.data.list.length;i++){
                            var username = res.data.list[i].username;
                            var areaName = res.data.list[i].areaName;
                            var areaId = res.data.list[i].areaId;
                            var id = res.data.list[i].id;
                            $("#selectArea").append("<option value='"+areaId+'/'+id+"'>"+username+'('+areaName+')'+"</option>");
                        }
                         $('#reapportion').modal('show');
                    }else {
                        layer.msg(res.msg,{icon:5,time:2000});
                    }
                }
            })
           
        },
//    点击重新分配确定按钮
        subBtn:function(){
            var that = this;
            var arr = [];
            arr.push(that.obj.deviceId);
            $.ajax({
                url:global_path + '/cms/device/allocationDevice',
                type:'post',
                data:{
                    'loginId':localStorage.loginId,
                    'token':localStorage.token,
                    'deviceIds':JSON.stringify(arr),
                    'areaId': $('#selectArea').val().split('/')[0],
                    'agentId': $('#selectArea').val().split('/')[1],
                    'isDonate':$('input[name="radio"]:checked').val()
                },
                dataType:'json',
                success:function (res) {
                    checkToken(res);
                    if(res.code == 200){
                        layer.msg(res.msg);
                        $('#reapportion').modal('hide');
                        that.init();
                    }else{
                        layer.msg(res.msg);

                    }
                    setTimeout(function(){
                        window.location.reload();
                    },2000)

                }
            })
        },
//      点击查看跳转到app用户详情页面
        check:function(){
        	this.ownAppUserId == '' ? layer.msg("当前设备没有app用户绑定"):window.open('appUserDetails.html?appUserId='+this.ownAppUserId);  // window.open（url）跳到一个新页面
        },
        // 点击校准 出现弹框
        adjust:function(){
            if(localStorage.sign !== '0' && localStorage.sign !== '1'){
                layer.msg('权限不足');
            }else {
                $('#manualCalibration').modal('show');
            }
        },
        subBtn4:function(){
            var _this = this;
            this.obj.spStandard = $('#spStandard').val();
            this.obj.dpStandard = $('#dpStandard').val();
            $.ajax({
                url:global_path + '/cms/service/updateCalibrate',
                type:'post',
                dataType:'json',
                data: _this.obj,
                success: function (result) {
                    checkToken(result);
                    if(result.code == 200){
                        layer.msg(result.msg, {
                            icon: 6,time:2000
                        });
                        $('#manualCalibration').modal('hide');
                        setTimeout(function () {
                            window.location.reload();
                        },2000)
                    }else{
                        layer.msg(result.msg, {
                            icon: 5,time:2000
                        });
                    }
                }
            });
        },
//      点击设备号
        deviceId1:function(){
        	for(var i=0;i<this.historyWear.length;i++){
        		this.historyWear[i].deviceId != ''? window.open('deviceDetails.html?deviceId='+this.deviceId):'';  //跳转到设备详情页面
        	}
        },
//      点击当前佩戴人
         wearOne:function(){
        	this.wearUserId != ''? window.open('wearUser.html?wearUserId='+this.wearUserId):'';  //跳转到用户详情页面
        },
        formatTime:function(time){
            return time == null || time == '' ? '':time.substring(0,time.length-2);
        }
    }

});


