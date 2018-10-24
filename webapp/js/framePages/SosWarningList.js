$(document).ready(function () {
    /**
     *SOS列表
     * */
    showSOSTable();

});
/**
 * showSOSTable()
 * */
function showSOSTable(){
    $('#SosTable').DataTable({
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
            //ajax请求数据
            $.ajax({
                type: "post",
                url: global_path + "/cms/service/getSOSList",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    checkToken(result);
                    //setTimeout仅为测试延迟效果
                    //setTimeout(function () {
                    //封装返回数据
                    /*四个统计*/
                    $('#AllSOSNum').text(result.data.map.AllSOSNum);
                    $('#NoDispose').text(result.data.map.NoDispose);
                    $('#TodaySOSNum').text(result.data.map.TodaySOSNum);
                    $('#AllIsNotTrue').text(result.data.map.AllIsNotTrue);
                    var returnData = {};
                    returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.recordsTotal = result.data.total;//返回数据全部记录
                    returnData.recordsFiltered = result.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = result.data.CmsSOSInfoList;//返回的数据列表
                    //console.log(returnData);
                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                    callback(returnData);
                    //}, 200);
                }
            });
        },
        columns: [
            //序号
            {
                "data": null,
                "bSortable": false
            },
            //设备号
            {
                "data": "node",
                "bSortable": false,
                "render": function(data, type, full, meta) {
                    var node = "<a class='aStyle' target='_blank' href='wearUser.html?wearUserId=" + full.wearUserId+"'>"+ full.deviceId + "</a>";
                    return node;
                }

            },
            //报警时间
            {
                "data": "sosTime",
                "bSortable": false,
                "render":function (data, type, full, meta) {
                    var node;
                    node = full.sosTime.slice(0,4)+'/'+full.sosTime.slice(4,6)+'/'+full.sosTime.slice(6,8)+' '+full.sosTime.slice(8,10)+':'+full.sosTime.slice(10,12)+':'+full.sosTime.slice(12,14);
                    return node;
                }
            },
            //佩戴人
            {
                "data": "username",
                "bSortable": false
            },
            //佩戴人手机
            {
                "data": "phoneNum",
                "bSortable": false
            },
            //地址
            {
                "data": "address"
            },
            //性别
            {
                "data": "useDueTime",
                "render":function (data, type, full, meta) {
                    var node;
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
            //报警次数
            {
                "data": "alarmCount"
            },
            //处理状态
            {
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
            },
            //操作
            {
                "data": "",
                "render": function(data, type, full, meta) {
                    var node = '';
                    if(full.state == 1){
                        node = '<button type="button" class="btn btn-primary btn-xs btn-skyBlueSmall" onclick="dealMsg(\''+full.wearUserId+"\',"+full.sosTime+')">&#8194;处理&#8194;</button>';
                    }else{
                        node = '<button type="button" disabled="disabled" class="btn btn-xs">已处理</button>';
                    }
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
 * 点击处理
 * 1.出现弹层(modal)
 * 2.ajax传值
 * 3.确定处理
 * */
function dealMsg(wearUserId,sosTime) {
    $('#layer').modal({
        backdrop: 'static',
        keyboard: false
    });
    $('#loginId').val(localStorage.loginId);
    $('#token').val(localStorage.token);
    $('#wearUserId').val(wearUserId);
    $('#sosTime').val(sosTime);

    $('#dealSOS').off('click').on('click', function() {
        /*弹出确认框*/
        layer.confirm('确定处理完成吗？', {
                btn: ['确定', '取消'] //按钮
            },
            function() {
                //确定此操作 ajax
                var data = {};
                $("#SOSForm").serializeArray().map(function(x) {
                    data[x.name] = x.value;
                }); //转换对对象形式
                console.log(data);
                $.ajax({
                    url: global_path + "/cms/service/addSOSComment",
                    type: 'post',
                    dataType: 'json',
                    data: data,
                    success: function(result) {
                        checkToken(result);
                        if (result.code == 200) {
                            layer.msg(result.msg, {
                                icon: 1
                            });
                            $('#SOSForm')[0].reset();
                            $('#layer').modal('hide');
                            $("#SosTable").dataTable().fnDraw(false);
                        } else {
                            layer.msg('' + result.msg, {
                                icon: 2
                            });
                        }
                    },
                    error: function() {}
                });
            },
            function() {
                layer.msg('已取消', {
                    time: 2000
                });
            });
    })
}

/**
 * 搜索
 * */
$('#search').on('click',function () {
    showSOSTable();
});


document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){
        showSOSTable();
    }
}


/**
 * 全部
 * */
$('#all').on('click',function () {
    $('#startTime').val('');
    $('#endTime').val('');
    $('#inputText').val('');
    showSOSTable();
});

/**
 * 导出excel
 * */
$('#getOut').on('click',function () {
    window.open(global_path + '/cms/service/exportSOSExcel?' + "loginId=" + localStorage.loginId + "&token=" + localStorage.token + "&startTime=" + $('#startTime').val() + "&endTime=" + $('#endTime').val());
});

/**
 * SOS开关
 * */
var status;

$.ajax({
    url:global_path + '/cms/service/getWorkState',
    type:'post',
    dataType:'json',
    data:{
        "loginId":localStorage.loginId,
        "token":localStorage.token
    },
    success: function (result) {
        checkToken(result);
        if(result.code == 200){
            status = result.data.state;
            if(status == 1){
                $('#img1').attr('src','../../imgs/working1.png');
                $('#img2').attr('src','../../imgs/closing1.png');
            }else{
            	 $('#img1').attr('src','../../imgs/working2.png');
                $('#img2').attr('src','../../imgs/closing2.png');

            }
        }else{

        }
    }
});
$('#changeBtn').off('click').on('click', function () {
    status == 1 ?  status = 2 :  status = 1;
    
//   if(status == 1){
//              $('#nowStatus1').text('上班');
//              $('#img1').attr('src','../../imgs/working1.png')
//              
//   }else{
//              $('#nowStatus2').text('下班');
//              $('#img2').attr('src','../../imgs/closing1.png')
//  }
    $.ajax({
        url:global_path + '/cms/service/updateWorkState',
        type:'post',
        dataType:'json',
        data:{
            "loginId":localStorage.loginId,
            "token":localStorage.token,
            "state": status
        },
        success: function (result) {
            checkToken(result);
            if(result.code == 200){
                layer.msg(result.msg,{
                    icon:1,
                    time:3000
                });
                if(status == 1){
                    $('#img1').attr('src','../../imgs/working1.png');
                	$('#img2').attr('src','../../imgs/closing1.png');
                }else{
                    $('#img1').attr('src','../../imgs/working2.png');
                	$('#img2').attr('src','../../imgs/closing2.png');
                }
            }else{
                layer.msg(result.msg,{
                    icon:1,
                    time:2000
                });
            }
        }
    })
});
