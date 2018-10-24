var obj = {};
var url = window.location.search; //截取"?"以及之后的所有字符串
var str = url.substring(1, url.length); //去除"?"
var arr = str.split('&'); //根据&分割成数组   ["key=value","name=zxm"]
for(var i = 0; i < arr.length; i++) {
    obj[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
}
obj.loginId = localStorage.loginId;
obj.token = localStorage.token;


var app = new Vue({
    el: '#app',
    data: {
        inputText:'',  //文本框的值
        startTime:'',  //开始时间
        endTime:'',    //结束时间
        selectMedicalHistory:'',  //下拉框选中得值
        allcount:'0',
        newcount:'0',
        uncount:'0'

    },
    mounted: function() {
        this.init();
    },
    computed: {

    },
    methods: {
        // 表格
        dataTables: function () {
            var that = this;
            $('#lostTable').DataTable({
                bLengthChange: false, //去掉每页显示多少条数据方法
                "info":false, //去掉底部文字
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
                    var obj = {};
                    obj.pageSize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
                    obj.startRow = data.start;//开始的记录序号
                    obj.loginId = localStorage.loginId;
                    obj.token = localStorage.token;
                    obj.input = that.inputText;
                    obj.startTime = that.startTime;
                    obj.endTime = that.endTime;
                    obj.selectMedicalHistory = that.selectMedicalHistory;
                    //ajax请求数据
                    $.ajax({
                        type: "post",
                        url: global_path + "/cms/appUser/listOutUserByLoginId",
                        cache: false,  //禁用缓存
                        data: obj,  //传入组装的参数
                        dataType: "json",
                        success: function (res) {
                            if(res.code === 200){
                                var returnData = {};
                                returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                                // returnData.recordsTotal = res.data.count;//返回数据全部记录
                                returnData.recordsFiltered = res.data.count;//后台不实现过滤功能，每次查询均视作全部结果
                                returnData.data = res.data.OutUser;//返回的数据列表
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
                    },
                    //姓名
                    {
                        "data": "username",
                        "bSortable": false
                    },
                    //城市
                    {
                        "data": "area_name",
                        "bSortable": false
                    },
                    // 性别
                    {
                        "data": "gender",
                        "bSortable": false,
                        "render":function (data, type, full, meta) {
                            var node = '';
                            if(full.gender === '1'){
                                node = '男';
                            }else{
                                node = '女';
                            }
                            return node;
                        }
                    },
                    //年龄
                    {
                        "data": "age",
                        "bSortable": false
                    },
                    //最后联网时间
                    {
                        "data": "near_time",
                        "bSortable": false
                    },
                    //失联天数
                    {
                        "data": "out_count",
                        "bSortable": false
                    },
                    //提醒时间
                    {
                        "data": "lasttime",
                        "bSortable": false
                    },
                    //备注（提醒内容）
                    {
                        "data": "dispose_raemrk",
                        "bSortable": false,
                        "render": function(data, type, full, meta) {
                            var node = "";
                            // debugger;
                            if(full.dispose_raemrk !== null && full.dispose_raemrk !== '' && full.dispose_raemrk.length > 5){
                                node = '<span title="'+full.dispose_raemrk+'">'+full.dispose_raemrk.substring(0,4)+'...</span>';
                            }else{
                                node = '<span>'+full.dispose_raemrk+'</span>';
                            }
                            return node;
                        }
                    },
                    //操作
                    {
                        "data": "",
                        "render": function(data, type, full, meta) {
                            var node = "<a href='wearUser.html?wearUserId="+full.user_id+"' class='btn btn-skyBlueSmall' target='_blank'>查看</a>";
                            return node;
                        }
                    }],
                "fnDrawCallback": function() { //序号
                    this.api().column(0).nodes().each(function(cell, i) {
                        cell.innerHTML = i + 1;
                    });
                }
            })
        },
        // 初始化的一些东西
        init:function(){
            var that = this;
            $.ajax({
                type: "post",
                url: global_path + "/cms/appUser/getOutCount",
                cache: false,  //禁用缓存
                //传入组装的参数
                data: {
                    loginId:localStorage.loginId,
                    token:localStorage.token
                },
                dataType: "json",
                success: function (res) {
                    if(res.code === 200){
                        var count = res.data;
                        that.allcount = count.allcount;
                        console.log(that.allcount)
                        that.newcount = count.newcount;
                        that.uncount = count.uncount;
                        that.dataTables();
                    }
                },
                error:function(){

                }
            });
        },
        // 点击搜索
        search:function(){
            this.dataTables();
        },
        // 导出excel
        exportList:function(){
            var deviceId = $("#inputText").val();
            window.location.href = global_path + '/cms/excel/ExportOutUserList?loginId='+localStorage.loginId+'&token='+
                localStorage.token+'&deviceId='+deviceId+'&startTime='+this.startTime+'&endTime='+this.endTime;
        },
        // 点击全部
        all:function() {
            this.inputText = '';
            this.dataTables();
        },

    }
});
// 点击回车进行搜索
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){
        app.dataTables();
    }
}