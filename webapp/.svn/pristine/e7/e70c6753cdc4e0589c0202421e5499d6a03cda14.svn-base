//隐藏部分数据
var app = new Vue({
    el: '#app',
    data: {
        startTime:'',
        endTime:'',
        num:1,
        inputText:'',
        startDate:'',
        endDate:''
    },
    mounted: function() {
        this.dataTables();
        /*初始化兑换码时间*/
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        var startDate = year + "-" + month + "-" + day;  //不能写年月
        var endDate = year+1 + "-" + month + "-" + day;
        this.startTime = startDate;
        this.endTime = endDate;
    },
    computed: {

    },
    methods: {
        getNowDate: function (t) {
            var date = new Date(new Date() + 365*24*60*60*1000);
            var year = date.getFullYear();
            var mon = date.getMonth() + 1;
            var day = date.getDate();
            mon < 10 ? mon = '0' + mon :  mon;
            day < 10 ? day = '0' + day :  day;
            return year + '-' + mon + '-' + day;
        },
        dataTables: function () {
            var that = this;
            $('#exchangeCodeTable').DataTable({
                bLengthChange: false, //去掉每页显示多少条数据方法
                "info":false, //去掉底部文字
                "lengthMenu": [[5, 10, 25, 50], [5, 10, 25, 50]], //分页长度选项,   -1 "全部"  暂时取消
                "paging": true, //分页
                "ordering": false, //排序
                // bStateSave:true,    //操作数据后局部刷新停留在当前页面
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
                    var param = {};
                    param.pageSize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
                    param.startRow = data.start;//开始的记录序号
                    //param.page = (data.start / data.length)+1;//当前页码
                    //param.orderby=data.orderBys;
                    param.loginId=localStorage.loginId;
                    param.token=localStorage.token;
                    param.input = that.inputText;
                    param.application = $('#selectVal').val();
                    param.useSign =  $('#selectVal2').val();

                    //ajax请求数据
                    $.ajax({
                        type: "post",
                        url: global_path + "/cms/service/listCdkeys",
                        cache: false,  //禁用缓存
                        //传入组装的参数
                        data: param,
                        dataType: "json",
                        success: function (res) {
                            if(res.code === 200){

                                var returnData = {};
                                returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                                returnData.recordsTotal = res.data.total;//返回数据全部记录
                                returnData.recordsFiltered = res.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                                returnData.data = res.data.list;//返回的数据列表
                                callback(returnData);

                            }
                        },
                        error:function(){

                        }
                    });
                },
                columns: [
                    //序号
                    {
                        "data": null,
                        "bSortable": false
                        // "bVisible":false //隐藏列
                    },
                    //兑换码
                    {
                        "data": "cdkey",
                        "bSortable": false
                    },
                    //生成时间
                    {
                        "data": "createTime",
                        "bSortable": false
                    },
                    //可使用时间段
                    {
                        "data": "",
                        "bSortable": false,
                        "render": function(data, type, full, meta) {
                            var node = "";
                            var startTime = full.startTimeIsAllowed.slice(0,10);
                            var endTime = full.endTimeIsAllowed.slice(0,10);
                            console.log(startTime);
                            node = startTime + '一' + endTime;
                            return node;
                        }
                    },
                    //适用范围
                    {
                        "data": "",
                        "bSortable": false,
                        "render": function(data, type, full, meta) {
                            var node = "";
                            if(full.application === 1){
                                node = "血糖";
                            }else if(full.application === 2){
                                node = "肿瘤";
                            }
                            return node;
                        }
                    },
                    //兑换状态
                    {
                        "data": "",
                        "bSortable": false,
                        "render": function(data, type, full, meta) {
                            var node = "";
                            if(full.useSign === 1){
                                node = "已使用";
                            }else if(full.useSign === 2){
                                node = "未使用";
                            }
                            return node;
                        }
                    },
                    //账号
                    {
                        "data": "appUserId",
                        "bSortable": false
                    },
                    //佩戴人
                    {
                        "data": "wearUserName",
                        "bSortable": false
                    },
                    //兑换时间
                    {
                        "data": "useTime",
                        "bSortable": false
                    }],
                "fnDrawCallback": function() { //序号
                    this.api().column(0).nodes().each(function(cell, i) {
                        cell.innerHTML = i + 1;
                    });
                }
            })
        },
        // 点击搜索
        search:function(){
            this.dataTables();
        },
        // 点击导出
        getOut:function(){
            var application = $('#selectVal').val();
            var useSign = $('#selectVal2').val();
            window.open(global_path + '/cms/excel/ExcelCdkeys?' + "loginId="  + localStorage.loginId + "&token=" + localStorage.token + "&input=" + this.inputText + "&application=" + $('#selectVal').val() + "&useSign=" + $('#selectVal2').val());
        },
        //      关闭弹框
        closeModel:function(){
            $(".modal").modal("hide");
        },
        // 点击添加兑换码
        addexchangeCode:function(){
            $('#addexchangeCode1').modal({backdrop: 'static', keyboard: false});
            // console.log(this.typeName);
            // this.channelName = this.typeName;
        },
        // 点击兑换码中的确定按钮
        addSubmit:function(){
            var that = this;
            $.ajax({
                type: "post",
                url: global_path + "/cms/service/addCdkeys",
                cache: false,  //禁用缓存
                data: {
                    loginId:localStorage.loginId,
                    token:localStorage.token,
                    startTimeIsAllowed:that.startTime,
                    endTimeIsAllowed:that.endTime,
                    num:that.num,
                    application:$('#selectVal3').val()
                },
                //传入组装的参数
                dataType: "json",
                success: function (res) {
                    if(res.code === 200){
                        that.closeModel();
                        layer.msg(res.msg,{time:2000});
                        setTimeout(function(){
                            window.location.reload();
                        },1000)
                    }else{
                        layer.msg(res.msg);
                    }
                },
                error:function(){

                }
            });
        }



    }
});
// function getNewDate(){
//     var date = new Date();
//     var year = date.getFullYear();
//     var month = date.getMonth() + 1;
//     var day = date.getDate();
//     if (month < 10) {
//         month = "0" + month;
//     }
//     if (day < 10) {
//         day = "0" + day;
//     }
//     var startDate = year + "年" + month + "月" + day;
//     var endDate = year+1 + "年" + month + "月" + day;
// }
// console.log(getNewDate().startDate);

