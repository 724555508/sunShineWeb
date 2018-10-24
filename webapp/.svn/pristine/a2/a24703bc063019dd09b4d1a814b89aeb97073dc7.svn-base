var obj = {};
var url = window.location.search;       //截取"?"以及之后的所有字符串
var str = url.substring(1,url.length);  //去除"?"
var arr = str.split('&');               //根据&分割成数组   ["key=value","name=zxm"]
for(var i = 0; i < arr.length; i ++){
    obj[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
}


$(document).ready(function () {
    showWearUserList();
});

function showWearUserList(){
    $('#bindTable').DataTable({
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
            param.startTime=$('#startTime').val();
            param.endTime=$('#endTime').val();
            param.input=$.trim($('#inputText').val());
            param.medicalHistory=$('#selectMedicalHistory').val();
            param.orderByNearestTime=$('#selectVal').val();
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

                }
            });
        },
        columns: [
            //序号
            {
                "data": null,
                "bSortable": false
            },
           /* //手机
            {
                "data": "phoneNum",
                "bSortable": false
            },*/
            //姓名
            {
                "data": "",
                "bSortable": false,
                "render":function (data, type, full, meta) {
                    // 合伙人权限  不给展示小电话
                    if(localStorage.sign !=0 && localStorage.sign !=1){
                        $('.img2').hide();
                    }else{
                        $('.img2').show();
                    }

                    // 姓名中间4位隐藏
                    // if(localStorage.sign !=0 && localStorage.sign !=1){
                    //     if(full.username != '' && full.username != null){
                    //         var name1 = full.username
                    //         name1 = name1.split('')
                    //         name1.splice(1,1,'*')
                    //         full.username = name1.join('');
                    //     }
                    // }

                    var node = '';
                    if(full.isRecord == 1){
                        if(localStorage.sign !== '0' && localStorage.sign !== '1'){
                            node = '<div style="white-space:nowrap;">'+full.username+'&nbsp;</div>';
                        }else {
                            node = '<div style="white-space:nowrap;">'+full.username+'&nbsp;<img src="../../imgs/iframeImgs/icon1002.png" width="19" height="19" class="img2"></div>';
                        }

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
           /* //剩余服务期
            {
                "data": "useDueString"
            },*/
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

// if(localStorage.sign === 0 || localStorage.sign === 1){
//     $('#protocol').css('display','block');
// }
$('#search').on('click',function () {

    showWearUserList();

});

/**
 * 按下回车键
 * @param event
 */
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){
        showWearUserList();
    }
};



/**
 * 全部
 * */
$('#all').on('click',function () {
        $('#startTime').val('');
        $('#endTime').val('');
        $('#inputText').val('');
        $('#selectMedicalHistory').val('');
        $('#selectVal').val('');
        showWearUserList();
});
/**
 * 导出
 * */
$('#getOut').on('click',function () {
    var str = $('#inputText').val();
    var start = $('#startTime').val();
    var end = $('#endTime').val();
    var medicalHistory = $('#selectMedicalHistory').val();
    var orderByNearestTime = $('#selectVal').val();
    window.location.href = global_path + '/cms/excel/ExportWearUserList?loginId='+localStorage.loginId+'&token='+
    localStorage.token+'&input='+str+'&startTime='+start+'&endTime='+end+'&medicalHistory='+medicalHistory+'&orderByNearestTime='+orderByNearestTime;

});


