var app = new Vue({
    el: '#app',
    data: {

        sendInfo: '',
        phoneNum: '',
        selectSign:'', //下拉框选中标识
        errorPhone:'',
        msg:'',
        startAge:0,  //开始年龄
        endAge:0, //结束年龄
        gender:'',  //性别
        medicalHistory:'',   //病史
        filterMap:{},
        deleteArr:[],

        list:[],
        shaixuanMap:{},
        inputArea:'',
        checkArea:[],
        checkId:[],
        showArea:[],
        input: '',
        inputLength:''

    },
    mounted: function () {
        this.tables();
        this.filterArea();

    },
    methods: {
        // 表格
        tables: function () {
            var _this = this;
            $('#intoHistory').DataTable({
                bLengthChange: false, //去掉每页显示多少条数据方法
                "info": false, //去掉底部文字
                "lengthMenu": [[5, 10, 25, 50], [5, 10, 25, 50]], //分页长度选项,   -1 "全部"  暂时取消
                "paging": true, //分页
                "ordering": false, //排序
                bStateSave: true,    //操作数据后局部刷新停留在当前页面
                "bSort": false,     //排序
                "bFilter": true, //过滤功能
                "order": [], //[[ 1, "desc" ]]默认排序 第三列
                iDisplayLength: 10,
                destroy: true, //如果需要重新加载的时候请加上这个
                "pagingType": "full_numbers", //分页样式
                "bDeferRender": true,        //     *  当该属性设置为true时，表格每一行新增的元素只有在需要被画出来时才会被DataTable创建出来
                //"scrollY": "auto", //设置高度
                //"scrollCollapse": true, //超出 滑动
                "bJQueryUI": true,      //      是否启用jQueryUI样式
                bProcessing: false,   //加载动画
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
                "info": false, //通知
                ajax: function (data, callback, settings) {
                    //封装请求参数
                    var param = {};
                    param.pageSize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
                    param.startRow = data.start;//开始的记录序号
                    param.loginId = localStorage.loginId;
                    param.token = localStorage.token;
                    param.input = $.trim(_this.input);
                    //ajax请求数据
                    $.ajax({
                        type: "post",
                        url: global_path + "/cms/message/listAgentMessage",
                        cache: false,  //禁用缓存
                        data: param,  //传入组装的参数
                        dataType: "json",
                        success: function (result) {
                            checkToken(result);
                            if (result.code === 200) {
                                var returnData = {};
                                returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                                returnData.recordsTotal = result.data.total;//返回数据全部记录
                                returnData.recordsFiltered = result.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                                returnData.data = result.data.datas;//返回的数据列表
                                callback(returnData);
                            }
                        }
                    });
                },
                columns: [
                    //序号
                    {
                        "data": null,
                        "bSortable": false,
                        // "bVisible": false //隐藏列
                    },
                    //下发时间
                    {
                        "data": "createTime",
                        "bSortable": false
                    },
                    //城市
                    {
                        "data": "city",
                        "bSortable": false,
                        "render": function (data, type, full, meta) {
                            var node = "";
                            if(full.city !=null || full.city != '' && full.city.length>8){
                                var remarke = full.city;
                                node = '<span title="'+full.city+'">'+full.city.substring(0,7)+'...</span>';
                            }else{
                                node = full.city;
                            }
                            return node;
                        }
                    },
                    //性质
                    {
                        "data": "",
                        "bSortable": false,
                        "render": function (data, type, full, meta) {
                            var node = "";
                            if (full.nature === 1) {
                                node = '企业';
                            } else if(full.nature === 2){
                                node = '个人';
                            }
                            return node;
                        }
                    },
                    //公司名称
                    {
                        "data": "companyname",
                        "bSortable": false
                    },
                    //负责人
                    {
                        "data": "agentName",
                        "bSortable": false
                    },
                    //手机
                    {
                        "data": "phoneNum",
                        "bSortable": false
                    },
                    //下发内容
                    {
                        "data": "sendInfo",
                        "bSortable": false,
                        "render": function(data, type, full, meta) {
                            var node = "";
                            var remarke = full.sendInfo;
                            if(remarke != null || remarke != ''){
                                if(remarke.length >= 5){
                                    node = '<span title="'+remarke+'">'+remarke.substring(0,5)+'...</span>';
                                }else{
                                    node = remarke;
                                }
                            }
                            return node;
                        }
                    },
                    //操作员
                    {
                        "data": "creater",
                        "bSortable": false
                    },
                    //查看时间
                    {
                        "data": "seeTime",
                        "bSortable": false,
                        "render": function (data, type, full, meta) {
                            var node = "";
                            if (full.seeTime === "" || full.seeTime === null) {
                                node = '暂未查看';
                            } else{
                                node = full.seeTime;
                            }
                            return node;
                        }
                    }
                ],
                "fnDrawCallback": function () { //序号
                    this.api().column(0).nodes().each(function (cell, i) {
                        cell.innerHTML = i + 1;
                    });
                }
            });
        },
        // 筛选区域
        filterArea: function () {
            var that = this;
            //ajax请求数据
            $.ajax({
                type: "post",
                url: global_path + "/cms/agent/queryAgentUser",
                cache: false,  //禁用缓存
                data: {
                    loginId: localStorage.loginId,
                    token: localStorage.token
                },
                //传入组装的参数
                dataType: "json",
                success: function (res) {
                    checkToken(res);
                    that.list = res.data.list;

                    that.shaixuanMap = {};
                    // es6用法
                    var map = new Map();
                    // 以key  value的形式显示
                    for (var key in that.list) {
                        map.set(that.list[key].areaName, that.list[key].areaName + ',' + that.list[key].areaId);
                        map.set(pinyinUtil.getFirstLetter(that.list[key].areaName, false), that.list[key].areaName + ',' + that.list[key].areaId);
                        map.set(pinyinUtil.getFirstLetter(that.list[key].areaName, false).toLowerCase(), that.list[key].areaName + ',' + that.list[key].areaId);
                        map.set(pinyinUtil.getPinyin(that.list[key].areaName, '', false, false), that.list[key].areaName + ',' + that.list[key].areaId);
                    }

                    that.shaixuanMap = map;
                }
            });
        },
        // 搜索区域
        searchArea: function () {
            if(this.inputArea === ''){
                this.filterArea();
                return;
            }
            this.list = [];
            // 通过key来进行搜索 of转化为 ["昌平区", "昌平区,110114"]
            for(var key of this.shaixuanMap){
                console.log(key[0]);
                console.log(this.shaixuanMap.get(key[0]));
                if(key[0].indexOf(this.inputArea)>=0){   //能找到的
                    var obj = {};
                    obj.areaId = this.shaixuanMap.get(key[0]).split(",")[1];  //城市id
                    obj.areaName = this.shaixuanMap.get(key[0]).split(",")[0];  //城市名字
                    this.list.push(obj);
                }
            }


        },
        resetTerm: function () {
            this.input = '';
            this.tables();
        },

        //      关闭弹框
        closeModel:function(){
            $(".modal").modal("hide");
        },
        /**
         *点击筛选区域  进行弹框
         */
        filterAreaTerm () {
            $('#filterTerm').modal({keyboard: false});
            this.inputArea = "";
            // this.filterArea();
            // this.checkId = [];  //每次点击筛选区域的时，让checkId清空
            for(var i=0;i<this.$refs.input.length;i++){   //每次点击筛选区域时让每个多选框checked = false
                this.$refs.input[i].checked = false;
            }
        },
        // 点击筛选区域中的确定按钮把相应的城市添加到桌面上
        filterTermSubmit:function(){
            var that = this;
            // 把多选出来的内容以逗号相隔开
            that.checkArea = $("input:checkbox[name='area']:checked").map(function(index,elem) {
                return $(elem).val();
            }).get().join(',');
            // 选出来的区域转化为数组
            that.checkArea = that.checkArea.split(",");
            // 如果选中区域再追加到数组  ，否则不追加
            for(var i=0;i<that.checkArea.length;i++){
                if(that.checkArea[i] !== ""){
                    that.showArea.push(that.checkArea[i]);
                }
            }
            console.log(that.showArea);
            that.closeModel();
            that.inputLength = $("input:checkbox[name='area']:checked").length;


        },
        // 点击每个input
        inputClick:function(index,event){
            if(this.$refs.input[index].checked === true){   //如果当前点击的多选框为true时
                var ids = event.target.id;  //获取当前id
                this.checkId.push(ids);  //每次点击的id放进一个数组里面
            }
            console.log(this.checkId);

        },
        /**
         * 点击筛选中的内容进行删除
         */
        deleteMe:function(index){
            this.showArea.splice(index,1);  //删除区域
            this.checkId.splice(index,1);     //删除区域相应的删除id
        },
        /**
         * 确定下发
         * */
        enterInto: function () {
            var _this = this;
            var layerMsg = layer.load(1,{ // 此处1没有意义，随便写个东西
                icon: 0, // 0~2 ,0比较好看
                shade: [0.5,'black'] // 黑色透明度0.5背景
            });
            $.ajax({
                url: global_path + '/cms/message/sendMessageToAgent',
                type: 'post',
                dataType: 'json',
                data: {
                    loginId: localStorage.loginId,
                    token: localStorage.token,
                    sendStatus: $('#selectVal').val(),
                    areaIds:JSON.stringify( _this.checkId),
                    messageHtml:$(".w-e-text").html(),
                    messageInfo:$(".w-e-text").text()
                },
                success: function (res) {
                    layer.closeAll(); // 关闭所有
                    checkToken(res);
                    if(res.code === 200){
                        _this.sendInfo = '';
                        _this.deviceIds = '';
                        layer.msg(res.msg);
                        _this.phoneNum = '';
                        _this.sendInfo = '';
                        _this.tables();
                        $(".w-e-text").text("");
                        // _this.checkId = [];
                    }else if(res.code === 300){
                        _this.errorPhone = res.data.errorPhone;
                        _this.msg = res.msg;
                        if(_this.errorPhone.length === 1){
                            layer.msg('该手机号未注册');
                        }else{
                            $('#errorPhone').modal({backdrop: 'static', keyboard: false});
                        }



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
         * 通过手机号搜索
         */


}});
//2.回车登陆
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){
        //enter 键
        //按下enter要做的事

        if(app.inputArea == ''){
            app.filterArea();
            return;
        }
        app.list = [];
        // 通过key来进行搜索 of转化为 ["昌平区", "昌平区,110114"]
        for(var key of app.shaixuanMap){
            console.log(key[0]);
            console.log(app.shaixuanMap.get(key[0]));
            if(key[0].indexOf(app.inputArea)>=0){   //能找到的
                var obj = {};
                obj.areaId = app.shaixuanMap.get(key[0]).split(",")[1];  //城市id
                obj.areaName = app.shaixuanMap.get(key[0]).split(",")[0];  //城市名字
                app.list.push(obj);
            }
        }
    }
};