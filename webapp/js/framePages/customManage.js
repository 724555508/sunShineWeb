/**
 * 展示列表
 * */
$(document).ready(function () {
    showCustomList()
});
/**
 * showHisData
 * */
function showCustomList(){
    $('#customTable').DataTable({
        "lengthMenu": [[10, 30, 50, 100], [10, 30, 50, 100]], //分页长度选项,   -1 "全部"  暂时取消
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
        ajax: function (data, callback, settings) {
            //封装请求参数
            var param = {};
            //param.pageSize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            //param.startRow = data.start;//开始的记录序号
            param.loginId = localStorage.loginId;
            param.token = localStorage.token;
            param.username = $('#customName').val();
            console.log(param);
            //ajax请求数据
            $.ajax({
                type: "post",
                url: global_path + "/cms/user/getUserList",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    if(result.code == 200){
                        var returnData = {};
                        //returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                        //returnData.recordsTotal = result.data.total;//返回数据全部记录
                        //returnData.recordsFiltered = result.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                        returnData.data = result.data.cmsUsers;//返回的数据列表
                        callback(returnData);
                    }else {
                        layer.msg(result.msg,{
                            icon:2,
                            time:2000
                        })
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
            //账号
            {
                "data": "loginId",
                "bSortable": false
            },
            //姓名
            {
                "data": "username",
                "bSortable": false
            },
            //部门
            {
                "data": "groupId",
                "bSortable": false
            },
            //添加时间
            {
                "data": "createTime",
                "bSortable": false
            },
            //状态
            {
                "data": "createTime",
                "bSortable": false,
                "render":function (data, type, full, meta) {
                    var node = '';
                    if(full.useSign == 1){
                        node = '启用';
                    }else if(full.useSign == 2){
                        node = '停用';
                    }else if(full.useSign == 3){
                        node = '删除';
                    }
                    return node;
                }
            },
            //操作
            {
                "data": "",
                "bSortable": false,
                "render":function (data, type, full, meta) {
                    var node = '';
                    if(full.useSign == 1){
                        node = '<button class="btn btn-skyBlueSmall" onclick="deleteMe(\''+full.loginId+'\')">删除</button>';
                    }else {
                        node = '<button class="btn btn-xs" disabled="disabled">已停用</button>';
                    }

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
 * 删除
 * */
function deleteMe(id) {
    layer.confirm('你要删了我吗', {
        icon:5,
        btn: ['删！','饶你一命'] //按钮
    }, function(){
        $.ajax({
            url:global_path + '/cms/user/deleteUser',
            type:'post',
            dataType:'json',
            data:{
                "loginId": localStorage.loginId,
                "token": localStorage.token,
                "newLoginId": id
            },
            success:function (result) {
                if(result.code == 200){
                    layer.msg(result.msg,{icon:4,time:2000});
                    showCustomList();
                }else {
                    layer.msg(result.msg,{icon:2,time:2000});
                }
            }
        })
    }, function(){
        layer.msg('已取消', {
            time: 2000
        });
    });
}

/**
 * 搜索
 * */
$('#search').on('click',function () {
    showCustomList();
});

/**
 * 按下回车键
 * @param event
 */
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){
        showCustomList();
    }
}

/**
 *新增
 * */
$('#buildBtn').on('click',function () {
    $('#layer1').modal({backdrop: 'static', keyboard: false});
});
/**
 * 取消
 * */
$('#cancel').on('click',function () {
    $('#phoneNum').val('');
    $('#username').val('');
    $('#loginId').val('');
    $('#password').val('');
    $('#layer1').modal('hide');
});
/**
 * 添加
 * */
$('#buildId').on('click',function () {
    $.ajax({
        url:global_path + '/cms/user/addUser',
        type:'post',
        dataType:'json',
        data:{
            "loginId": localStorage.loginId,
            "token": localStorage.token,
            "phoneNum": $('#phoneNum').val(),
            "newLoginId": $('#loginId').val(),
            "username": $('#username').val(),
            "password": $('#password').val()
        },
        success:function (res) {
            if(res.code == 200){
                layer.msg(res.msg,{icon:1,time:2000});
                $('#phoneNum').val('');
                $('#username').val('');
                $('#loginId').val('');
                $('#password').val('');
                $('#layer1').modal('hide');
                showCustomList();
            }else {
                layer.msg(res.msg,{icon:2,time:2000});
            }
        }
    });
});