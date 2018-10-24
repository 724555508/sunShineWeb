var obj = {};
var url = window.location.search;       //截取"?"以及之后的所有字符串
var str = url.substring(1,url.length);  //去除"?"
var arr = str.split('&');               //根据&分割成数组   ["key=value","name=zxm"]
for(var i = 0; i < arr.length; i ++){
    obj[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
}


$(document).ready(function () {

    showBindList();
});




/**
 * nav切换操作
 * */
$('.navChange').on('click','.changeNav',function () {
    $(this).attr('data','1').css({'borderBottom':'2px solid rgb(0,150,255)','backgroundColor':'#fff'}).siblings().removeAttr('data').css({'borderBottom':'none','backgroundColor':'#fff'});
    if($(this).attr('status') == 1){
        $('.bindBox').fadeIn(500);
        $('.appBox').css('display','none');
        $('#startTime').val('');
        $('#endTime').val('');
        $('#inputText').val('');
        showBindList();
    }else if($(this).attr('status') == 2){
        $('.bindBox').css('display','none');
        $('.appBox').fadeIn(500);
        $('#startTime').val('');
        $('#endTime').val('');
        $('#inputText').val('');
        showAppList();
    }
});

/**
 * showBindList
 * */
function showBindList(){
    $('#bindTable').DataTable({
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
        //"info": true, //通知
        ajax: function (data, callback, settings) {
            //封装请求参数
            var param = {};
            param.pageSize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.startRow = data.start;//开始的记录序号
            //param.page = (data.start / data.length)+1;//当前页码
            //param.orderby=data.orderBys;
            param.loginId=localStorage.loginId;
            param.token=localStorage.token;
            param.startTime=$('#startTime').val();
            param.endTime=$('#endTime').val();
            param.input=$.trim($('#inputText').val());
            //2018年1月12日新增:iocn为查询所有服务协议未审核的数据
            param.icon=obj.icon;
            //ajax请求数据
            $.ajax({
                type: "post",
                url: global_path + "/cms/wearUser/listWearUserByLoginId",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    checkToken(result);
                    if(result.code == 200){

                        $('#AllCount').text(parseInt(result.data.map.AllApp)+parseInt(result.data.map.AllWearUser));
                        $('#AllApp').text(result.data.map.AllApp);
                        $('#AllWearUser').text(result.data.map.AllWearUser);
                        $('#ActivedAppThisMonth').text(result.data.map.ActivedAppThisMonth);
                        $('#ActivedWearUserThisDay').text(result.data.map.ActivedWearUserThisDay);
                        var returnData = {};
                        returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                        returnData.recordsTotal = result.data.total;//返回数据全部记录
                        returnData.recordsFiltered = result.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                        returnData.data = result.data.WearUser;//返回的数据列表
                        callback(returnData);
                    }
                    /*5个统计*/
                    /*$('#AllSOSNum').text(result.data.map.AllSOSNum);
                    $('#NoDispose').text(result.data.map.NoDispose);
                    $('#TodaySOSNum').text(result.data.map.TodaySOSNum);
                    $('#AllIsNotTrue').text(result.data.map.AllIsNotTrue);
                    $('#AllIsNotTrue').text(result.data.map.AllIsNotTrue);*/

                }
            });
        },
        columns: [
            //序号
            {
                "data": null,
                "bSortable": false
            },
            //手机
            {
                "data": "phoneNum",
                "bSortable": false
            },
            //姓名
            {
                "data": "username",
                "bSortable": false,
                "render":function (data, type, full, meta) {
                    var node = '';
                    if(full.isRecord == 1){
                        node = '<div style="white-space:nowrap;">'+full.username+'&nbsp;<img src="../../imgs/iframeImgs/icon1002.png" width="19" height="19"></div>';
                    }else {
                        node = '<span>'+full.username+'</span>';
                    }

                    return node;
                }
            },
            //城市
            {
                "data": "address",
                "bSortable": false
            },
            //性别
            {
                "data": "",
                "bSortable": false,
                "render":function (data, type, full, meta) {
                    var node = '';
                    if(full.gender == 1){
                        node = '男';
                    }else if(full.gender == 2){
                        node = '女';
                    }else {
                        node = '未知';
                    }
                    return node;
                }
            },
            //年龄
            {
                "data": "age"
            },
            //激活时间
            {
                "data": "activationTime"
            },
            //剩余服务期
            {
                "data": "useDueString"
            },
            //协议
            {
                "data":"isPass",
                "render":function (data, type, full, meta) {
                    var node;
                    if(full.isPass == 0){
                        node = '无';
                    }else if(full.isPass == 1){
                        node = '待审';
                    }else if(full.isPass == 2){
                        node = '审核通过';
                    }else if(full.isPass == 3){
                        node = '审核失败';
                    }else{
                        node = '未知状态';
                    }
                    return node;
                }
            },
            //关注
            {
                "data": "alarmCount",
                "render":function (data, type, full, meta) {
                    var node;
                    if(full.type == 2){
                        node = '已关注';
                    }else {
                        node = '未关注';
                    }
                    return node;
                }
            },
            //状态
            {
                "data": "",
                "render":function (data, type, full, meta) {
                    var node;
                    if(full.useDueSign == 1){
                        node = '过期';
                    }else if(full.useDueSign == 2){
                        node = '正常';
                    }else {
                        node = '未知';
                    }
                    return node;
                }
            },
            //最近佩戴
            {
                "data": "nearestTime"
            },
            //类型
            {
                "data": "sign"
            },
            //操作
            {
                "data": "",
                "render": function(data, type, full, meta) {
                    var node = "<a href='wearUser.html?wearUserId="+full.wearUserId+"' target='_blank' class='btn btn-xs btn-primary btn-skyBlueSmall'>查看</a>";
                    return node;
                }
            }],
        "fnDrawCallback": function() { //序号
            this.api().column(0).nodes().each(function(cell, i) {
                cell.innerHTML = i + 1;
            });
        }
    });
}

/**
 * showAppList
 * */
function showAppList(){
    $('#appTable').DataTable({
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
        //"info": true, //通知
        ajax: function (data, callback, settings) {
            //封装请求参数
            var param = {};
            param.pageSize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.startRow = data.start;//开始的记录序号
            param.loginId=localStorage.loginId;
            param.token=localStorage.token;
            param.startTime=$('#startTime').val();
            param.endTime=$('#endTime').val();
            param.input=$.trim($('#inputText').val());
            //ajax请求数据
            $.ajax({
                type: "post",
                url: global_path + "/cms/appUser/listAppUserByLoginId",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    checkToken(result);
                   if(result.code == 200){
                       var returnData = {};
                       returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                       returnData.recordsTotal = result.data.total;//返回数据全部记录
                       returnData.recordsFiltered = result.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                       returnData.data = result.data.userList;//返回的数据列表
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
            //手机
            {
                "data": "phoneNum",
                "bSortable": false
            },
            //昵称
            {
                "data": "username",
                "bSortable": false
            },
            //城市
            {
                "data": "address",
                "bSortable": false
            },
            //性别
            {
                "data": "",
                "bSortable": false,
                "render":function (data, type, full, meta) {
                    var node = '';
                    if(full.gender == 1){
                        node = '男';
                    }else if(full.gender == 2){
                        node = '女';
                    }else {
                        node = '未知';
                    }
                    return node;
                }
            },
            //年龄
            {
                "data": "age"
            },
            //注册时间
            {
                "data": "createTime"
            },
            //关联设备
            {
                "data": "relateDeviceNo"
            },
            //最近登录
            {
                "data": "lastLoginTime"
            },
            //类型
            /*{
                "data": "useDueTime",
                "render":function (data, type, full, meta) {
                    var node;
                    if(full.state == 1){
                        node = '未处理';
                    }else if(full.state == 2){
                        node = '真实';
                    }else if(full.state == 3){
                        node = '误报';
                    }else {
                        node = '其他';
                    }
                    return node;
                }
            },*/
            //操作
            {
                "data": "",
                "render": function(data, type, full, meta) {
                    var node = "<a href='appUserDetails.html?appUserId="+full.appUserId+"' target='_blank' class='btn btn-xs btn-primary btn-skyBlueSmall'>查看</a>";
                    return node;
                }
            }],
        "fnDrawCallback": function() { //序号
            this.api().column(0).nodes().each(function(cell, i) {
                cell.innerHTML = i + 1;
            });
        }
    });
}

/**
 *搜索
 * 此处需要判断是佩戴人列表还是APP列表
 * 判断条件：看两个标签哪个里面有  data 的属性 并且属性值为  1
 * */
$('#search').on('click',function () {
    if($('#bindUserBtn').attr('data') == 1){
        showBindList();
    }else if($('#appUserBtn').attr('data') == 1){
        showAppList();
    }
});

/**
 * 按下回车键
 * @param event
 */
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){
        if($('#bindUserBtn').attr('data') == 1){
            showBindList();
        }else if($('#appUserBtn').attr('data') == 1){
            showAppList();
        }
    }
}



/**
 * 全部
 * 此处依然判断是哪个列表
 * 判断条件：看两个标签哪个里面有  data 的属性 并且属性值为  1
 * */
$('#all').on('click',function () {
    if($('#bindUserBtn').attr('data') == 1){
        $('#startTime').val('');
        $('#endTime').val('');
        $('#inputText').val('');
        showBindList();
    }else if($('#appUserBtn').attr('data') == 1){
        $('#startTime').val('');
        $('#endTime').val('');
        $('#inputText').val('');
        showAppList();
    }
});
/**
 * 导出
 * */
$('#getOut').on('click',function () {
    var str = $('#inputText').val();
    var start = $('#startTime').val();
    var end = $('#endTime').val();
    if($('#bindUserBtn').attr('data') == 1){
        window.location.href = global_path + '/cms/excel/ExportWearUserList?loginId='+localStorage.loginId+'&token='+
            localStorage.token+'&input='+str+'&startTime='+start+'&endTime='+end;
    }else if($('#appUserBtn').attr('data') == 1){
        window.location.href = global_path + '/cms/excel/ExportAppUserList?loginId='+localStorage.loginId+'&token='+
            localStorage.token+'&input='+str+'&startTime='+start+'&endTime='+end;
    }
});


