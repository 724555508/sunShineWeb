var obj = {};
var url = window.location.search; //截取"?"以及之后的所有字符串
var str = url.substring(1, url.length); //去除"?"
var arr = str.split('&'); //根据&分割成数组   ["key=value","name=xxx"]
for(var i = 0; i < arr.length; i++) {
    obj[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
}
obj.loginId = localStorage.loginId;
obj.token = localStorage.token;
//隐藏部分数据
var app = new Vue({
    el: '#app',
    data: {
        userName:'',
        age:'',
        gender:'',
        isPass:'',
        hospitals:'',
        departments:'',
        positions:'',
        phoneNum:'',
        idCard:'',
        city:'',
        career:'',
        majors:'',
        photo:'',
        career_certificates:'',
        job_certificates:'',
        id_card_certificates:'',
        totalUserCount:'',
        dailyNewCount:'',
        serviceCount:'',
        todayIllnessCount:'',
        todayAlarmCount:'',
        todaySeeCount:'',
        myVal:''
    },
    mounted: function() {
        this.leftGetData();
        this.dataTables();

    },
    computed: {

    },
    methods: {
        /*左边内容请求*/
        leftGetData: function(){
            var that = this;
            $.ajax({
                type: "post",
                url: global_path + "/doc/user/getDoctorInfo",
                cache: false,  //禁用缓存
                //传入组装的参数
                data:{
                    loginId:localStorage.loginId,
                    token:localStorage.token,
                    managerId:obj.managerId
                },
                dataType: "json",
                success: function (res) {
                    if(res.code === 200){
                        var bean = res.data.bean;
                        that.userName = bean.userName;
                        that.age = bean.age;
                        that.gender = bean.gender;
                        that.isPass = bean.isPass;
                        that.hospitals = bean.hospitals;
                        that.departments = bean.departments;
                        that.positions = bean.positions;
                        that.phoneNum = bean.phoneNum;
                        that.idCard = bean.idCard;
                        that.city = bean.city;
                        that.career = bean.career;
                        that.majors = bean.majors;
                        that.city = bean.city;
                        that.city = bean.city;
                        that.city = bean.city;
                        that.photo = bean.photo;
                        that.career_certificates = bean.career_certificates;
                        that.job_certificates = bean.job_certificates;
                        that.id_card_certificates = bean.id_card_certificates;
                        that.totalUserCount = bean.totalUserCount;
                        that.dailyNewCount = bean.dailyNewCount;
                        that.serviceCount = bean.serviceCount;
                        that.todayIllnessCount = bean.todayIllnessCount;
                        that.todayAlarmCount = bean.todayAlarmCount;
                        that.todaySeeCount = bean.todaySeeCount;
                        that.id_card_certificates = bean.id_card_certificates;
                        /*当审核通过时 表格显示，无数据不显示，否则显示*/
                        if(that.isPass !== 1){
                            $('.noData').show();
                            $('#doctorDetailsTable').hide();
                        }else{

                            $('.noData').hide();
                            $('#doctorDetailsTable').show();
                        }
                    }
                },
                error:function(){

                }
            });
        },
        //右边表格请求
        dataTables: function () {
            var that = this;
            $('#doctorDetailsTable').DataTable({
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
                    obj.pageSize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
                    obj.startRow = data.start;//开始的记录序号
                    obj.loginId = localStorage.loginId;
                    obj.token = localStorage.token;
                    //ajax请求数据
                    $.ajax({
                        type: "post",
                        url: global_path + "/doc/user/listManagerUser",
                        cache: false,  //禁用缓存
                        //传入组装的参数
                        data:obj,
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
                    //姓名
                    {
                        "data": "userName",
                        "bSortable": false
                    },
                    //城市
                    {
                        "data": "city",
                        "bSortable": false
                    },
                    //性别
                    {
                        "data": "gender",
                        "bSortable": false
                    },
                    //年龄
                    {
                        "data": "age",
                        "bSortable": false
                    },
                    //状态
                    {
                        "data": "status",
                        "bSortable": false,
                        render:function(data, type, full, meta){
                            var node = "";
                            if(full.status === "1"){
                                node = "过期";
                            }else if(full.status === "2"){
                                node = "正常";
                            }else{
                                node = "未知";
                            }
                            return node;
                        }
                    },
                    //关注时间
                    {
                        "data": "attentionTime",
                        "bSortable": false
                    },
                    //操作
                    {
                        "data": "",
                        "render": function(data, type, full, meta) {
                            var node = "<a href='../framePages/wearUser.html?wearUserId="+full.wearUserId+"' target='_blank' class='check'>查看</a>";
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
        //      关闭弹框
        closeModel:function(){
            $(".modal").modal("hide");
        },
        // 点击查看职业证 预览
        cards1:function(){
            $('#previewCard1').modal({backdrop: 'static', keyboard: true});      // backdrop：’static’指的是点击背景空白处不被关闭； keyboard:false指的是触发键盘esc事件时不关闭。
        },
        // 点击查看工作证  进行预览
        cards2:function(){
            $('#previewCard2').modal({backdrop: 'static', keyboard: true});      // backdrop：’static’指的是点击背景空白处不被关闭； keyboard:false指的是触发键盘esc事件时不关闭。
        },
        // 点击查看身份证  进行预览
        cards3:function(){
            $('#previewCard3').modal({backdrop: 'static', keyboard: true});      // backdrop：’static’指的是点击背景空白处不被关闭； keyboard:false指的是触发键盘esc事件时不关闭。
        },
       /* 审核失败，未审核以及审核中进行弹框*/
        checkFail:function(){
            $('#approveCheck').modal({backdrop: 'static', keyboard: true});
        },
        /*确定认证审核时*/
        checkTermSubmit:function(){
            var that = this;
            $.ajax({
                type: "post",
                url: global_path + "/doc/user/checkDoctorUser",
                cache: false,  //禁用缓存
                //传入组装的参数
                data:{
                    loginId:localStorage.loginId,
                    token:localStorage.token,
                    managerId:obj.managerId,
                    checkSign:that.myVal
                },
                dataType: "json",
                success: function (res) {
                    if(res.code === 200){
                        layer.msg(res.msg);
                        $(".modal").modal("hide");
                        that.myVal = "";
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


});