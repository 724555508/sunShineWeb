/**
 * Created by Administrator on 2017/12/14.
 */



deviceList();
if(localStorage.sign == '5'){
    $('#allActiveBtn').hide();
}




/**
 * 表格信息
 * */
function deviceList(){
    $('#statusTable').DataTable({
        "lengthMenu": [[5, 10, 25, 50], [5, 10, 25, 50]], //分页长度选项,   -1 "全部"  暂时取消
        //"paging": true, //分页
        //"ordering": false, //排序
        //"bSort": false,     //排序
        //"bFilter": true, //过滤功能
        "order": [], //[[ 1, "desc" ]]默认排序 第三列
        iDisplayLength: 10,
        destroy: true, //如果需要重新加载的时候请加上这个
        "pagingType": "full_numbers", //分页样式
        "bDeferRender":true,        //     *  当该属性设置为true时，表格每一行新增的元素只有在需要被画出来时才会被DataTable创建出来
        //"scrollY": "auto", //设置高度
        //"scrollCollapse": true, //超出 滑动
        "bJQueryUI":true,      //      是否启用jQueryUI样式
        bProcessing:false,   //加载动画
        "bServerSide": false, //服务端分页
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
        ajax: { //请求url
            url: global_path + "/Agent/device/listDevice",
            type: "POST",
            //dataType:'json',
            data: {
                "loginId": localStorage.loginId,
                "token": localStorage.token,
                "deviceId": $.trim($('#deviceId').val())
            },
            dataSrc: function (data) {
                checkToken(data);
                if (data.code == 200) {
//                    $('#stock').text(data.data.map.all);    //库存
//                    $('#alreadyActive').text(data.data.map.all);      //已激活
//                    $('#totalDevices').text(data.data.map.all);         //全部设备
                    return data.data.agentDeviceBeans;
                } else if (data.code == 100) {
                    console.log(data.msg);
                }
            }
        },
        columns: [
            //序号
            {
                "data": null,
                "bSortable": false
            },
            //deviceId
            {
                "data": "deviceId",
                "bSortable": false
            },
            //租赁/销售
            {
                "data": "",
                "render": function(data, type, full, meta) {
                    var node = '';
                    if (full.waySign == 5 || full.waySign == 6) {
                        node = "租赁";
                    } else if (full.waySign == 3 || full.waySign == 4) {
                        node = "购买";
                    } else {
                        node = '未知'
                    }
                    return node;
                },
                "bSortable": false
            },
            //合伙人
            {
                "data": "agentName",
                "bSortable": false
            },
            //区域
            {
                "data": "areaName",
                "bSortable": false
            },
            //服务开始时间
            {
                "data": "",
                "bSortable": false,
                "render": function(data, type, full, meta) {
                    var node = '';
                    if (full.serviceStartTime != null || full.serviceStartTime != '') {
                        node = full.serviceStartTime.substring(0,full.serviceStartTime.length-2);
                    }
                    return node;
                },
            },
            //操作
            {
                "data": "",
                "render": function(data, type, full, meta) {
                    var node = "<a class='btn btn-skyBlueSmall' target='_blank' href='../framePages/deviceDetails.html?deviceId=" + full.deviceId+"'>&ensp;查看&ensp;</a>";
                    return node;
                },
                "bSortable": false
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
$('#searchBtn').on('click', function () {
    deviceList();
});
/**
 * 全部
 * */
$('#seeAll').on('click', function () {
    $('#deviceId').val('');
    deviceList();
});

/**
 * 租转售
 * */
//租转售
function changeDeviceState(deviceId){
    /*弹框提示*/
    layer.confirm('是否将'+deviceId+'由租转为售，此操作不可回滚', {
        btn: ['确定','取消'] //按钮
    }, function(){
        var url = global_path + "/cms/device/updateDeviceOther";
        $.post(
            url, {
                "loginId": localStorage.loginId,
                "token": localStorage.token,
                "deviceId": deviceId
            }, function (data) {
                checkToken(data);
                if (data.code == 200) {
                    layer.msg('操作成功', {icon: 1});
                    deviceList();
                    //console.log(data.msg);
                } else {
                    layer.msg('操作失败', {icon: 1});
                }
            }
            , "json")
    }, function(){

    });
}

/**
 * 批量分配设备
 * */
$('#allActiveBtn').off('click').on('click', function () {
    $('#activeMsg').text("");
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

$('#closeActive').on('click',function () {
    window.location.reload();
})

