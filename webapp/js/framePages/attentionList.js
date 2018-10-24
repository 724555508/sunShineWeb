$(document).ready(function () {
    showAttentionList();
});


function showAttentionList(){
    $('#attentionTable').DataTable({
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
            param.loginId=localStorage.loginId;
            param.token=localStorage.token;
            param.startTime=$('#startTime').val();
            param.endTime=$('#endTime').val();
            param.input=$.trim($('#inputText').val());
            //ajax请求数据
            $.ajax({
                type: "post",
                url: global_path + "/cms/wearUser/getAttentionList",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    checkToken(result);
                    if(result.code == 200){
                        $('#AllCount').text(result.data.total);//总数
                        $('#todaySee').text(result.data.todaySee);
                        $('#todayAdd').text(result.data.todayAdd);
                        var returnData = {};
                        returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                        returnData.recordsTotal = result.data.total;//返回数据全部记录
                        returnData.recordsFiltered = result.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                        returnData.data = result.data.res;//返回的数据列表
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
            //佩戴人
            {
                "data": "username",
                "bSortable": false
            },
            //城市
            {
                "data": "areaName",
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
            //病史
            {
                "data": "medicalHistory",
                "bSortable": false
            },
            //备注
            {
                "data": "remark",
                "render":function (data, type, full, meta) {
                    var node;
                    var remark = full.remark;
                    if(remark.length>5){
                        node = '<span onmousemove="showRemark(&quot;'+remark+'&quot;,this)" onmouseout="closeTips()">'+remark.substring(0,5)+'......</span>';
                    }else{
                        node = remark;
                    }
                    return node;
                }
            },
            //最近佩戴
            {
                "data": "nearestTime"
            },
            //健康状态
            {
                "data": "",
                "render":function (data, type, full, meta) {
                    var node;
                    var sourceData = full.sourceData;
                    if(full.icon == 1){
                        node = '<span onmousemove="showSourceDate(&quot;'+sourceData+'&quot;,this)" onmouseout="closeTips()">健康</span>';
                    }else if(full.icon == 2){
                        node = '<span onmousemove="showSourceDate(&quot;'+sourceData+'&quot;,this)" onmouseout="closeTips()">亚健康</span>';
                    }else if(full.icon == 3){
                        node = '<span onmousemove="showSourceDate(&quot;'+sourceData+'&quot;,this)" onmouseout="closeTips()">疾病</span>';
                    }else {
                        node = '未知';
                    }
                    return node;
                }
            },
            //上次查看
            {
                "data":"lastTime"
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

function showSourceDate(sourceData,that) {
    layer.tips(sourceData+'分析结果', $(that), {
        tips: [2, '#3595CC'],
        time: 5000
    });
}
function showRemark(remark,that){
    layer.tips(remark, $(that), {
        tips: [2, '#3595CC'],
        time: 5000
    });
}

function closeTips(){
    layer.closeAll('tips');
}


/**
 *搜索
 * */
$('#search').on('click',function () {
    showAttentionList();
});

/**
 * 按下回车键
 * @param event
 */
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){
        showAttentionList();
    }
}



/**
 * 全部
 * */
$('#all').on('click',function () {
        $('#startTime').val('');
        $('#endTime').val('');
        $('#inputText').val('');
        showAttentionList();
});
/**
 * 导出
 * */
$('#getOut').on('click',function () {
    var str = $('#inputText').val();
    var start = $('#startTime').val();
    var end = $('#endTime').val();

        window.location.href = global_path + '/cms/excel/ExportAttentionList?loginId='+localStorage.loginId+'&token='+
            localStorage.token+'&input='+str+'&startTime='+start+'&endTime='+end;
});



