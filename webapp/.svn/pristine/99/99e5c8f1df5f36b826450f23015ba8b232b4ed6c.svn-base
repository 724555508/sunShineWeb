$(document).ready(function () {
    /**
     *showRepertoryTable
     * */
    showRepertoryTable();

});
/**
 * showRepertoryTable()
 * */
function showRepertoryTable(){
    $('#repertoryTable').DataTable({
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
            //ajax请求数据
            $.ajax({
                type: "post",
                url: global_path + "/cms/device/getDeviceListInKUU",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    checkToken(result);
                    //setTimeout仅为测试延迟效果
                    //setTimeout(function () {
                    //封装返回数据
                    /*3个统计*/
                   $('#repertory').text(result.data.map.repertory);
                   $('#version1').text(result.data.map.version1);
                   $('#version2').text(result.data.map.version2);
                    var returnData = {};
                    returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.recordsTotal = result.data.total;//返回数据全部记录
                    returnData.recordsFiltered = result.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = result.data.cmsDeviceBeans;//返回的数据列表
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
                	}else{
                		node = "未知";
                	}
                	return node;
                }
            },
            //设备号
            {
                "data": "deviceId",
                "bSortable": false,
                "render":function (data, type, full, meta) {
                    var node;
                    node = '<span><a target="_blank" href="deviceDetails.html?deviceId='+full.deviceId+'">'+full.deviceId+'</a></span>';
                    return node;
                }
            },
            //产地
            /*{
                "data": "",
                "bSortable": false,
                "render":function (data, type, full, meta) {
                	var node;
                	return node;
                }
            },*/
            //出厂日期
            /*{
                "data": "",
                "bSortable": false
            },*/
            //入库日期
            {
                "data": "deviceIntoTime",
                "bSortable": false
            },
            //出货价
            /*{
                "data": "",
                "bSortable": false
            },*/
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
            //选择操作
            {
                "data": "",
                "bSortable": false,
                "render":function (data, type, full, meta) {
                    var node;
                    node = '<input type="checkbox" id="'+full.deviceId+'" class="checkMe" name="checkItem">';
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
	showRepertoryTable();
});


document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){
        showRepertoryTable();
    }
}

/**
 * 全部
 * */
$('#all').on('click',function () {
    $('#inputText').val('');
    showRepertoryTable();
});

/**
 * 一键分配
 * */
var arr = [];
$('#allot').on('click',function () {
    arr = [];
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
                $('#selectPartner').html(template('selectJs',result));     //template模板填充
            }
        }
    });
    //提取所有id
    $('input:checkbox[name=checkItem]:checked').each(function () {
        arr.push($(this).attr('id'));
    });
    if(arr.length <= 0){
        layer.msg('请选择设备',{
            icon:2,
            time:2000
        });
        return;
    }
    $('#layer').modal({backdrop: 'static', keyboard: false});
});
/**
 * 提交
 * */
$('#subBtn').on('click',function () {
    layer.confirm('是否确定分配？', {
        btn: ['确定','取消'] //按钮
    }, function(){
        $.ajax({
            url:global_path + '/cms/device/allocationDevice',
            type:'post',
            data:{
                'loginId':localStorage.loginId,
                'token':localStorage.token,
                'deviceIds':JSON.stringify(arr),
                'areaId': $('#selectPartner').val().split('/')[0],
                'agentId': $('#selectPartner').val().split('/')[1],
                'isDonate':$('input[name="radio"]:checked').val()
            },
            dataType:'json',
            success:function (res) {
                checkToken(res);
                if(res.code == 200){
                    layer.msg(res.msg,{
                        icon:1,
                        time:2000
                    });
                    $('#layer').modal('hide');
                    showRepertoryTable();
                }
            }
        })
    }, function(){
        layer.msg('已取消', {
           icon:1,
            time:1000
        });
    });


});
//关闭弹框
$('#closeModel').click(function(){
    $(".modal").modal("hide");
});


/**
 * 全选、取消
 * */
// $('#allAllot').on('click',function () {
//     if($('#allAllot').text() == '全选'){
//         $('#allAllot').text('取消').css('backgroundColor','#a0a0a0');
//         $("input[name='checkItem']").attr('checked','true');
//
//     }else {
//
//         $('#allAllot').text('全选').css('backgroundColor','#0096ff');
//         $("input[name='checkItem']").removeAttr('checked');
//     }
// });


$('#allAllot').on('click',function () {
    var checkInput = $('.checkMe');
    console.log(checkInput.length);
    if($('#allAllot').text() == '全选'){
        $('#allAllot').text('取消').css('backgroundColor','#a0a0a0');
        for(var i=0;i<checkInput.length;i++) {
            checkInput[i].checked = true;   //全选
        }
    }else {

        $('#allAllot').text('全选').css('backgroundColor','#0096ff');
        for(var i=0;i<checkInput.length;i++){
            checkInput[i].checked = false; //取消
        }
    }
});

/**
 * 导出
 * */
$('#getOut').on('click',function () {
    var str = $('#inputText').val();
    window.location.href = global_path + '/cms/excel/ExportKUUDeviceList?loginId='+localStorage.loginId+'&token='+
            localStorage.token+'&deviceId='+str;
});


