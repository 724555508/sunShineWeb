var app = new Vue({
    el: '#app',
    data: {
        input: '',
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
        deleteArr:[]
    },
    mounted: function () {
        this.tables();

    },
    methods: {
        tables: function () {
            var _this = this;
            $('#intoHistory').DataTable({
                bLengthChange: false, //去掉每页显示多少条数据方法
                "info":false, //去掉底部文字
                "lengthMenu": [[5, 10, 25, 50], [5, 10, 25, 50]], //分页长度选项,   -1 "全部"  暂时取消
                "paging": true, //分页
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
                        url: global_path + "/cms/message/getSendMessageList",
                        cache: false,  //禁用缓存
                        data: param,  //传入组装的参数
                        dataType: "json",
                        success: function (result) {
                            checkToken(result);
                            if(result.code === 200){
                                var returnData = {};
                                returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                                returnData.recordsTotal = result.data.total;//返回数据全部记录
                                returnData.recordsFiltered = result.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                                returnData.data = result.data.cmsMessages;//返回的数据列表
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
                        "bVisible":false //隐藏列
                    },
                    //下发时间
                    {
                        "data": "createTime",
                        "bSortable": false
                    },
                    //app账号
                    {
                        "data": "userId",
                        "bSortable": false
                    },
                    //下发内容
                    {
                        "data": "content",
                        "bSortable": false,
                        "render": function(data, type, full, meta) {
                            var node = "";
                            if(full.content !=null || full.content != '' && full.content.length>8){
                                var remarke = full.content;
                                node = '<span title="'+full.content+'">'+full.content.substring(0,7)+'...</span>';
                            }else{
                                node = full.content;
                            }
                            return node;
                        }

                    },
                    //操作员
                    {
                        "data": "createId",
                        "bSortable": false
                    },
                    //查看时间
                    {
                        "data": "readTime",
                        "bSortable": false
                    }
                ],
                "fnDrawCallback": function() { //序号
                    this.api().column(0).nodes().each(function(cell, i) {
                        cell.innerHTML = i + 1;
                    });
                }
            });
        },
        resetTerm: function () {
            this.input = '';
            this.tables();
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
                    url: global_path + '/cms/message/sendMessage',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        loginId: localStorage.loginId,
                        token: localStorage.token,
                        content: _this.sendInfo,
                        phoneNums: _this.phoneNum,
                        sendStatus:_this.selectSign
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
                        }else if(res.code === 300){
                            _this.errorPhone = res.data.errorPhone;
                            _this.msg = res.msg;
                            $('#errorPhone').modal({backdrop: 'static', keyboard: false});
                            // if(_this.errorPhone.length === 1){
                            //     layer.msg('该手机号未注册');
                            // }else{
                            //     $('#errorPhone').modal({backdrop: 'static', keyboard: false});
                            // }



                        }else {
                            layer.msg(res.msg);
                        }
                    },
                    error: function () {
                        layer.msg('网络异常');
                    }
                })
            },
        //      关闭弹框
        closeModel:function(){
            $(".modal").modal("hide");
        },
        /**
         *点击筛选条件  进行弹框
         */
        filterTerm:function(){
            $('#filterTerm').modal({backdrop: 'static', keyboard: false});
        },
        // 弹框中选中的信息
        getfilterTerm:function(){
            var that = this;
            var  text = $("input:checkbox[name='message']:checked").map(function(index,elem) {
                return $(elem).val();
            }).get().join(',');
            that.gender = $('#radio1 input:radio:checked').val();
            that.medicalHistory =  text;
        },
        /**
         * 点击筛选中确定按钮
         */
        filterTermSubmit:function(){
            var that = this;
            that.getfilterTerm();
            that.filterTermSubmitajax();
            console.log()
        },
        /**
         * 请求数据
         */
        filterTermSubmitajax:function(){
            var that  = this;
            var map = {};
            map.gender = that.gender;  //性别
            map.startAge = that.startAge;  //开始年龄
            map.endAge = that.endAge;  //结束年龄
            map.medicalHistory = that.medicalHistory;  //病史
            $.ajax({
                url: global_path + '/cms/message/listFilterUser',
                type: 'post',
                dataType: 'json',
                data: {
                    loginId: localStorage.loginId,
                    token: localStorage.token,
                    filterJson:JSON.stringify(map)
                },
                success: function (res) {
                    layer.closeAll(); // 关闭所有
                    checkToken(res);
                    if(res.code === 200){
                        that.filterMap = res.data.filterMap;
                        console.log(that.filterMap);
                        that.phoneNum = res.data.list.join('\n');  //手机号以换行显示
                        that.closeModel();
                        $('.selectContent').fadeIn(2000);  //显示删选条件内容

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
         * 点击筛选中的内容进行删除
         */
        deleteMe:function(index,event){
            var that = this;
            Vue.delete(that.filterMap,index); //删除对象的方法
            console.log((event.target.id));  //获取点击当前的id
            if(event.target.id == 'mhString'){    //为当前id时让相关的值变为空
                that.medicalHistory = '';
            }else if(event.target.id == 'gender'){
                that.gender = '';
            }else if(event.target.id == 'age'){
                that.startAge = '';
                that.endAge = '';
            }
            this.filterTermSubmitajax();  //调用ajax
        },
     }
});
// 当下拉框选中的时候
$('#select').change(function(){
    if($("#select option:checked").text() === '佩戴人'){
        $('#shaixuan').fadeIn(2000); //显示筛选按钮
    }else{
        $('#shaixuan').fadeOut(2000); //隐藏筛选按钮
        $('.selectContent').fadeOut(2000);  //隐藏删选条件内容
        app.phoneNum = '';
        app.sendInfo = '';
    }
})