
var obj = {};
obj.loginId = localStorage.loginId;
obj.token = localStorage.token;
obj.phoneNum = localStorage.phoneNum;


var app = new Vue({
    el:'#adv',
    data:{
        companyname : '',
        useSign : 2,
        username : '',
        phoneNum : '',
        channel : '',//渠道数量
        bargainTime:'',
        bigNum : '',
        agencyCity : '',
        linkName : '',
        linkPhoneNum : '',
        grantNum : '',//授权号
        all : '0',//所有设备
        sell : '0',//已售设备
        repertory : '0',
        partnerUrl:'#'
    },
    /**
     * 页面加载完成要做的事
     * */
    mounted: function () {
        this.init();
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
            /**
             * ajax获取数据
             * */
            $.ajax({
                url:global_path + '/cms/agent/selectAgentUserInfo',
                type:'post',
                dataType:'json',
                data:obj,
                success:function (res) {
                    if(res.code == 200){
                        that.partnerDetails(res.data.cmsAgentUserBean);
                        that.initTable();
                        /*p3*/
                        that.all = res.data.map.all;
                        that.sell = res.data.map.sell;
                        that.repertory = res.data.map.inKu;

                    }else {
                        layer.msg(res.msg,{
                            icon:2,
                            time:2000
                        })
                    }
                }
            });
        },
        partnerDetails:function (data) {
            this.id = data.id;
            this.companyname = data.companyname;
            this.useSign = data.useSign;
            this.username = data.username;
            this.phoneNum = data.phoneNum;
            this.channel = data.channel;
            this.bargainTime = data.bargainTime;
            this.bigNum = parseInt(data.channel)+1;
            this.agencyCity = data.agencyCity;
            this.linkName = data.linkName;
            this.linkPhoneNum = data.linkPhoneNum;
            this.grantNum = data.grantNum;
            this.partnerUrl = '../partner/addressManage.html?phoneNum='+data.phoneNum;
        },
        initTable:function () {
            var that = this;
            $('#logTable').DataTable({
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
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "暂无数据",
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
                //"info": true, //通知
                ajax: function (data, callback, settings) {
                    obj.id = that.phoneNum;
                    obj.pageSize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
                    obj.startRow = data.start;//开始的记录序号
                    $.ajax({
                        url:global_path + '/cms/agent/selectloginLog',
                        type:'post',
                        dataType:'json',
                        data:obj,
                        success:function (res) {
                            checkToken(res);
                            if(res.code == 200){
                                var returnData = {};
                                returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                                returnData.recordsTotal = res.data.total;//返回数据全部记录
                                returnData.recordsFiltered = res.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                                returnData.data = res.data.logs;//返回的数据列表
                                callback(returnData);
                            }
                        }
                    });
                },
                columns: [
                    //序号
                    {
                        "data": null,
                        "bSortable": false
                    },
                    //上线时间
                    {
                        "data": "createTime",
                        "bSortable": false
                    },
                    //登录地点
                    {
                        "data": "ip",
                        "bSortable": false,
                        "render": function(data, type, full, meta) {
                            var node = "<a href='http://www.ip138.com/ips138.asp?ip="+full.ip+"' target='_blank' >"+full.ip+"</a>";
                            return node;
                        }
                    },
                    //设备
                    {
                        "data": "browserVersion",
                        "bSortable": false
                    }],
                //操作
                // {
                //     "data": "",
                //     "render": function(data, type, full, meta) {
                //         var node = "<a href='advertisementEdit.html?id="+full.id+"' class='btn btn-xs btn-primary btn-skyBlueSmall'>查看</a>";
                //         return node;
                //     }
                // }],
                "fnDrawCallback": function() { //序号
                    this.api().column(0).nodes().each(function(cell, i) {
                        cell.innerHTML = i + 1;
                    });
                }
            });
        }
    }
});