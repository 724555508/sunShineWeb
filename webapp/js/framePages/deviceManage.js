$(document).ready(function () {
    /**
     * 选择代理商select区域填充
     * 此处用ajax 请求 填写option
     * 插件选择：template
     * */
    $.ajax({
        url:global_path + '/cms/agent/queryAgentUser',
        type:'post',
        dataType:'json',
        data:{
            'loginId':localStorage.loginId,
            'token':localStorage.token
        },
        success:function (result) {
            checkToken(result);
            if(result.code == 200){
                $('#selectVal2').html(template('selectJs',result));     //template模板填充
            }
        }
    });



    /**
     *showDeviceTable列表
     * */
    showDeviceTable();

});
/**
 * showDeviceTable()
 * */
function showDeviceTable(){
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
            param.deviceId=$.trim($('#inputText').val());
            param.waySign=$.trim($('#selectVal').val());
            param.areaId=$.trim($('#selectVal2').val());
            //ajax请求数据
            $.ajax({
                type: "post",
                url: global_path + "/cms/device/getDeviceList",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    checkToken(result);
                    //setTimeout仅为测试延迟效果
                    //setTimeout(function () {
                    //封装返回数据
                    /*7个统计*/
                   $('#allCounts').text(result.data.map.all);
                   $('#internal').text(result.data.map.internal);
                   $('#outOnLoanAll').text(result.data.map.outOnLoanAll);
                   $('#outOnLoanThisDay').text(result.data.map.outOnLoanThisDay);
                   $('#outOnLoanThisMonth').text(result.data.map.outOnLoanThisMonth);
                   $('#outOnLoanThisWeek').text(result.data.map.outOnLoanThisWeek);
                   $('#repertory').text(result.data.map.repertory);
                    var returnData = {};
                    returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.recordsTotal = result.data.total;//返回数据全部记录
                    returnData.recordsFiltered = result.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = result.data.cmsDeviceBeanList;//返回的数据列表
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
            //型号
            {
                "data": "deviceVersion",
                "bSortable": false,
                "render":function (data, type, full, meta) {
                	var node;
                	if(1 == full.deviceVersion){
                		node = "1代";
                	}else if(2 == full.deviceVersion){
                		node = "2代";
                	}else if(3 == full.deviceVersion){
                        node = "3代";
                    }else{
                		node = "未知";
                	}
                	return node;
                }
            },
            //设备号
            {
                "data": "deviceId",
                "bSortable": false
            },
            //版本号
            {
                "data": "versions",
                "bSortable": false
            },
            //所属市场
            {
                "data": "market",
                "bSortable": false
            },
            //出库时间
            {
                "data": "deviceOutTime",
                "bSortable": false
            },
            //库管
            {
                "data": "storekeeper",
                "bSortable": false
            },
            //操作员
            {
                "data": "operaterId",
                "bSortable": false
            },
            //处理状态
            {
                "data": "waySign",
                "render":function (data, type, full, meta) {
                    var node;
                    if(full.waySign == 1){
                        node = '已租';
                    }else if(full.waySign == 2){
                        node = '已售';
                    }else if(full.waySign == 3){
                        node = '未激活';
                    }else {
                        node = '未知';
                    }
                    return node;
                }
            },
            //操作
            {
                "data": "",
                "render": function(data, type, full, meta) {
                    var node = "<a class='btn btn-primary btn-xs btn-skyBlueSmall' target='_blank' href='deviceDetails.html?deviceId=" + full.deviceId+"'>&ensp;查看&ensp;</a>";
                    return node;
                }
            }
            ],
        "fnDrawCallback": function() { //序号
            this.api().column(0).nodes().each(function(cell, i) {
                cell.innerHTML = i + 1;
            });
        }
    });
}

/**
 * 搜索
 * */
$('#search').on('click',function () {
    showDeviceTable();
});

/**
 * 按下回车键
 * @param event
 */
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){
        showDeviceTable();
    }
}

/**
 * 全部
 * */
$('#all').on('click',function () {
    $('#inputText').val('');
    $('.selected').removeAttr('selected').attr('selected','selected');
    showDeviceTable();
});


/**
 * 批量上传设备
 * */
$('#addBtn').off('click').on('click', function () {
    $('#layer1').modal({backdrop: 'static', keyboard: false});
    $('#loginId1').val(localStorage.loginId);
    $('#token1').val(localStorage.token);
    $('#uplBtn').off('click').on('click', function () {
        layer.load(1, {
            shade: [0.1,'#fff'] //0.1透明度的白色背景
        });
        var formData = new FormData($( "#addTemperaturesForm")[0]);
        $.ajax({
            url: global_path+"/cms/excel/ExcelSaveDevice" ,
            type: 'post',
            dataType:'json',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (result) {
                layer.closeAll('loading'); //关闭加载层
                /*$("#allActive").modal('hide');*/
                //$("#activeForm")[0].reset();
                $('#uploadMsg1').text(result.msg).css({"color":"red","fontSize":"22px"});
            }
        });
    })
});

/**
 * 批量分配设备
 * */
$('#allActiveBtn').off('click').on('click', function () {
    $('#allActive').modal({backdrop: 'static', keyboard: false});
    $('#loginIdA').val(localStorage.loginId);
    $('#tokenA').val(localStorage.token);
    $('#actBtn').off('click').on('click', function () {
        layer.load(1, {
            shade: [0.1,'#fff'] //0.1透明度的白色背景
        });
        var formData = new FormData($( "#activeForm" )[0]);
        $.ajax({
            url: global_path+"/cms/excel/ExcelAllocationDevice" ,
            type: 'POST',
            dataType:'json',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (result) {
                layer.closeAll('loading'); //关闭加载层
                /*$("#allActive").modal('hide');*/
                //$("#activeForm")[0].reset();
                $('#activeMsg').text(result.msg).css({"color":"red","fontSize":"22px"});
                if(result.data.map != null){
                	var map = result.data.map;
                	for(var key in map){
                		$('#activeMsg').append("<div style='color:red'>"+key+"成功分配"+map[key]+"台设备"+"</div>");
                	}
                }
            }
        });
    })
});

/**
 * 重置表单操作
 * 关闭模态窗时 该表单重置
 * */
$('#closeActive').off('click').on('click', function () {
    $("#activeForm")[0].reset();
    $('#activeMsg').text('');
    window.location.reload();
});
$('#closeUpload').off('click').on('click', function () {
    $("#addTemperaturesForm")[0].reset();
    $('#uploadMsg1').text('');
});

$('#getOut').on('click',function () {
    var str = $('#inputText').val();
    var selectVal = $('#selectVal').val();
    var selectVal2 = $('#selectVal2').val();
    window.location.href = global_path + '/cms/excel/ExportDeviceList?loginId='+localStorage.loginId+'&token='+
        localStorage.token+'&deviceId='+str+'&waySign='+selectVal+'&areaId='+selectVal2;
});

