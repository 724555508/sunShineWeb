/**
 * Created by Administrator on 2017/12/14.
 */
orderFormList();

/**
 * 表格信息
 * */
function orderFormList(){
    $('#orderTable').DataTable({
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
            url: global_path + "/Agent/orderForm/listOnlineOrder",
            type: "POST",
            dataType:'json',
            data: {
                "loginId": localStorage.loginId,
                "token": localStorage.token,
                "input": $('#deviceId').val(),
                "goodsType":$("#selectVal").val()
            },
            dataSrc: function (data) {
                checkToken(data);
                if (data.code == 200) {
//                    $('#stock').text(data.data.map.all);    //库存
//                    $('#alreadyActive').text(data.data.map.all);      //已激活
//                    $('#totalDevices').text(data.data.map.all);         //全部设备
                    return data.data.cmsOnlineOrderBean;
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
            // 订单编号
            {
                "data": "orderFormId",
                "bSortable": false
            },
            // 支付时间
            {
                "data": "payDate",
                "bSortable": false
            },
            // 账号
            {
                "data": "appUserId",
                "bSortable": false
            },
            // 佩戴人
            {
                "data": "wearUserName",
                "bSortable": false
            },
            // 支付方式
            {
                "data": "orderFormId",
                "bSortable": false,
                "render": function(data, type, full, meta) {
                    var node = '';
                    if (full.accountType === "1") {
                        node = "支付宝";
                    } else if (full.accountType === "2") {
                        node = "微信";
                    } else {
                        node = '未知'
                    }
                    return node;
                }
            },
            // 订单金额
            {
                "data": "totalMoney",
                "bSortable": false
            },
            // 订单类型
            {
                "data": "type",
                "bSortable": false,
                "render": function(data, type, full, meta) {
                    var node = '';
                    if (full.type === "0") {
                        node = "基础服务";
                    }else if (full.type === "1") {
                        node = "增值服务";
                    }else {
                        node = '未知'
                    }
                    return node;
                }
            },
            //商品名称
            {
                "data": "",
                "bSortable": false,
                "render": function(data, type, full, meta) {
                    var node = '';
                    if (full.goodsId == 'L2017901' || full.goodsId == 'S2017901') {
                        node = "安顿一代";
                    } else if (full.goodsId == 'L2017902' || full.goodsId == 'S2017902') {
                        node = "安顿二代";
                    } else if (full.goodsId == 'I2017801') {
                        node = "10万元保险";
                    } else if (full.goodsId == 'V2017701') {
                        node = "安顿VIP";
                    }else if (full.goodsId == 'I2018001') {
                        node = "血糖监测";
                    }else if (full.goodsId == 'I2018002') {
                        node = "肿瘤风险";
                    } else {
                        node = '未知'
                    }
                    return node;
                }
            },
            //支付状态
            {
                "data": "applyStatus",
                "bSortable": false,
                "render": function(data, type, full, meta) {
                    var node = '';
                    if (full.applyStatus === 1) {
                        node = "下单完成";
                    } else if (full.applyStatus === 2) {
                        node = "支付完成";
                    } else if (full.applyStatus === 3) {
                        node = "订单关闭";
                    } else if (full.applyStatus === 4) {
                        node = "订单完成";
                    } else if (full.applyStatus === 5) {
                        node = "已发货";
                    } else if (full.applyStatus === 6) {
                        node = "已收货";
                    } else if (full.applyStatus === 7) {
                        node = "已过期";
                    } else if (full.applyStatus === 8) {
                        node = "已退货";
                    } else {
                        node = '未知'
                    }
                    return node;
                }
            },
            //操作
            {
                "data": "",
                "render": function(data, type, full, meta) {
                    var node = '<a class="btn btn-primary btn-xs btn-skyBlueSmall" href="../framePages/orderDetails.html?orderFormId=' + full.orderFormId + '">查看</a>';
                    // if (full.applyStatus == 2) {
                    //     node = '<button class="btn btn-primary btn-xs btn-skyBlueSmall" onclick="sendGoods(\''+full.orderFormId+'\')">发货</button>';ss
                    // }else {
                    //     node = '<button class="btn btn-primary btn-xs btn-skyBlueSmall" onclick="seeMsg(\''+full.orderFormId+'\')">查看</button>';
                    // }
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
	orderFormList();
});
/**
 * 全部
 * */
$('#seeAll').on('click', function () {
    $('#deviceId').val('');
    orderFormList();
});

/**
 * 点击兑换码管理  进行跳转
 */
$('.hrefTo').click(function(){
   window.location.href='../framePages/exchangeCodeManage.html';
});
/*判断合伙人权限*/
if(localStorage.sign === '0' || localStorage.sign === '1'){
    $('.hrefTo').show();
}else{
    $('.hrefTo').hide();
}
/**
 * 发货
 * */
function sendGoods(orderFormId) {
    $('#sendModal').modal({backdrop: 'static', keyboard: true});
    $.ajax({
        url:global_path + '/Agent/orderForm/listAllExpress',
        type:'post',
        dataType:'json',
        data:{
            "loginId":localStorage.loginId,
            "token":localStorage.token
        },
        success:function (res) {
            if(res.code == 200){
                $('#selectWay').html(template('selectJs',res));
            }else {
                layer.msg(res.msg,{icon:2,time:2000});
            }

        }

    });
    //发货
    $('#sendGoodsBtn').off('click').on('click',function () {
        console.log(new Date());
        layer.confirm('确定发货吗？', {
            btn: ['发货','取消'] //按钮
        }, function(){
            $.ajax({
                url:global_path + '/Agent/orderForm/sendGoods',
                type:'post',
                dataType:'json',
                data:{
                    "loginId":localStorage.loginId,
                    "token":localStorage.token,
                    "orderFormId":orderFormId,
                    "expressOrderId":$('#expressOrderId').val(),
                    "deviceId":$('#deviceId2').val(),
                    "expressId":$('#selectWay').val()
                },
                success:function (res) {
                    if(res.code == 200){
                        layer.msg(res.msg,{icon:1,time:2000});
                        $('#orderFormId').val('');
                        $('#deviceId2').val('');
                        $('#sendModal').modal('hide');
                        orderFormList();
                    }else {
                        layer.msg(res.msg,{icon:2,time:2000});
                    }
                }

            })
        }, function(){
            layer.msg('已取消', {
                time: 1000
            });
        });
    });
}

/**
 * 查看发货信息
 * */
function seeMsg(orderFormId) {
    $.ajax({
        url:global_path + '/Agent/orderForm/selectOrderInfo',
        type:'post',
        dataType:'json',
        data:{
            "loginId":localStorage.loginId,
            "token":localStorage.token,
            "orderFormId":orderFormId
        },
        success:function (res) {
            if(res.code == 200){
                $('#seeModal').modal({backdrop: 'static', keyboard: true});
                var data = res.data.bean;
                //1
                $('#applyTime').text(data.applyTime);
                $('#takePerson').text(data.takePerson);
                $('#takePhoneNum').text(data.takePhoneNum);
                $('#takeAddress').text(data.takeAddress);
                $('#goodsId').text(data.goodsId);
                $('#goodsNum').text(data.goodsNum);
                $('#totalMoney').text(data.totalMoney);
                data.accountType == 1 ? data.accountType = '支付宝' :(data.accountType == 2 ? data.accountType = '微信' : data.accountType = '');
                $('#accountType').text(data.accountType);
                //2
                $('#sendCity').text(data.sendCity);
                $('#agentName').text(data.agentName);
                $('#agentPhoneNum').text(data.agentPhoneNum);
                $('#sendAddress').text(data.sendAddress);
                $('#deviceId3').text(data.deviceId);
                $('#sendTime').text(data.sendTime);
                $('#waySign').text(data.waySign);
                $('#expressName').text(data.expressName);
                $('#expressOrderId3').text(data.expressOrderId);

            }else {
                layer.msg(res.msg,{icon:2,time:2000});
            }
        }
    })
}
//点击确定要做的事
$('#seeBtn,#closeSendModal').on('click',function () {
    $('#seeModal').modal('hide');
    //1
    $('#applyTime').text('');
    $('#takePerson').text('');
    $('#takePhoneNum').text('');
    $('#takeAddress').text('');
    $('#goodsId').text('');
    $('#goodsNum').text('');
    $('#totalMoney').text('');
    $('#accountType').text('');
    //2
    $('#sendCity').text('');
    $('#agentName').text('');
    $('#agentPhoneNum').text('');
    $('#sendAddress').text('');
    $('#deviceId3').text('');
    $('#sendTime').text('');
    $('#waySign').text('');
    $('#expressName').text('');
    $('#expressOrderId3').text('');
});

