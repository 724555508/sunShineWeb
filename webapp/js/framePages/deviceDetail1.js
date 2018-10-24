
var obj = {};
var url = window.location.search;       //截取"?"以及之后的所有字符串
var str = url.substring(1,url.length);  //去除"?"
var arr = str.split('&');               //根据&分割成数组   ["key=value","name=zxm"]
for(var i = 0; i < arr.length; i ++){
    obj[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
}
obj.loginId = localStorage.loginId;
obj.token = localStorage.token;
/**
 * 加载设备详情数据
 * */
$.ajax({
    url:global_path + '/cms/device/getDeviceInfo',
    type:'post',
    dataType:'json',
    data: obj,
    success: function (result) {
    	checkToken(result);
    	if(result.code == 200){
    		var resultData = result.data.deviceInfoBean;
    		//版本
    		if(resultData.version == 1){
    			$("#bigFont").text("安顿一代");
    		}else if(resultData.version == 2){
    			$("#bigFont").text("安顿二代");
    		}else{
    			$("#bigFont").text("未知");
    		}
    		//电量
    		$("#electricQuantity").text(resultData.electricQuantity + "%");
    		//设备状态
    		if(resultData.workStatus == 1){
    			$("#workStatus").text("工作中");
    		}else if(resultData.workStatus == 2){
    			$("#workStatus").text("离手");
    		}else if(resultData.workStatus == 3){
    			$("#workStatus").text("充电中");
    		}else if(resultData.workStatus == 4){
    			$("#workStatus").text("失联");
    		}else{
    			$("#workStatus").text("未知");
    		}
    		//是否激活
    		if(resultData.useDueSign == 1){
    			$("#useDusSign").text("过期");
    		}else if(resultData.useDueSign == 2){
    			$("#useDusSign").text("未过期");
    		}else{
    			$("#useDusSign").text("未知");
    		}
    		//状态(激活/冻结)
			if(resultData.useStatus == 0){
				$('#active').text("冻结");
			}else if(resultData.useStatus == -1){
                $('#active').text("激活");
			}
    		
    		//最近接入时间
    		$("#nearestCommunicationTime").text(resultData.nearestCommunicationTime.substring(0,resultData.nearestCommunicationTime.length-2));
    		//设备型号
    		if(resultData.version == 1){
    			$("#version").text("安顿一代");
    		}else if(resultData.version == 2){
    			$("#version").text("安顿二代");
    		}else{
    			$("#version").text("未知");
    		}
    		//设备id
    		$("#deviceId").text(resultData.deviceId);
    		//校验码
    		$("#checkCode").text(resultData.checkCode);
    		//产地
    		$("#origin").text(resultData.origin);
    		//生产日期
    		$("#productionDate").text(resultData.productionDate.substring(0,resultData.productionDate.length-2));
    		//入库日期
    		$("#createTime").text(resultData.createTime.substring(0,resultData.createTime.length-2));
    		//所属市场
    		$("#market").text(resultData.market);
    		//所属合伙人
    		$("#agentName").text(resultData.agentName);
    		//联系电话
    		$("#agentPhone").text(resultData.agentPhone);
    		//地址
    		$("#agentAddress").text(resultData.agentAddress);
    		//出库时间
    		$("#allocateTime").text(resultData.allocateTime.substring(0,resultData.allocateTime.length-2));
    		//激活时间
    		$("#activationTime").text(resultData.activationTime.substring(0,resultData.activationTime.length-2));
    		//佩戴人
    		$("#wearUserName").html('<a target="_blank" href="wearUser.html?wearUserId='+resultData.wearUserId+'">'+resultData.wearUserName+'</a>');
    		//主账号
    		$("#mainAccount").text(resultData.mainAccount);
    		//服务形式
    		if(resultData.waySign == 1){
    			$("#waySign").text("租赁");
    		}else if(resultData.waySign == 2){
    			$("#waySign").text("购买");
    		}else{
    			$("#waySign").text("未知");
    		}
    		//服务期
    		$("#serviceTime").text(resultData.serviceStartTime.slice(0,10) + "~" + resultData.serviceEndTime.slice(0,10));
    		//续费次数
    		$("#renewalNum").text(resultData.renewalNum);
    		//续费总额
    		$("#renewalAll").text(resultData.renewalAll);
    		//监控总时
    		$("#monitoringTime").text(resultData.monitoringTime);
    		//关联账户
    		$("#accountLinking").text(resultData.accountLinking);
    		//校准状态
    		if(resultData.calibrationState == 1){
    			$("#calibrationState").text("成功");
    		}else if(resultData.calibrationState == 2){
    			$("#calibrationState").text("失败");
    		}else if(resultData.calibrationState == 3){
    			$("#calibrationState").text("未回复");
    		}else if(resultData.calibrationState != '' && resultData.calibrationState == 0){
    			$("#calibrationState").text("开机未校准");
    		}else if(resultData.calibrationState == ''){
    			$("#calibrationState").text("未知");
    		}

    		//切换服务形式
			$('#waySign').on('click',function () {
                $('#layer').modal({backdrop: 'static', keyboard: false});//点击出现模态窗，并且esc,空白点击，不会关闭
				$('#serviceStartTime').val(resultData.serviceStartTime.slice(0,10));
            });
            //查看全部绑定
            for(var i = 0; i < resultData.binder.length; i ++){
                resultData.binder[i].isOwnerUsername == 1 ? resultData.binder[i].isOwnerUsername = '主账户' : resultData.binder[i].isOwnerUsername = '子账户';

                $('#allUsers').html($('#allUsers').html() + '<div class="row"><div class="col-sm-4">账号:'+resultData.binder[i].tAppUserId+'</div>' +
                    '<div class="col-sm-4">账户昵称:'+resultData.binder[i].nickname+'</div><div class="col-sm-4">' +
                    '级别:'+resultData.binder[i].isOwnerUsername+'</div></div><hr/>');
            }

			/**
			 * 修改服务形式
			 * */
            $('#changeBtn').on('click',function () {
                changeSign(resultData.wearUserId);
            });
    	}else if(result.code == 100){
    		layer.msg('' + result.msg, {
                icon: 2,time:2000
            });
    	}
    }
});


/**
 * changeSign
 * */
function changeSign(wearUserId) {
    $.ajax({
        url:global_path + '/cms/service/updateWaySign',
        type:'post',
        dataType:'json',
        data: {
            "loginId":localStorage.loginId,
            "token":localStorage.token,
            "wearUserId":wearUserId,
            "waySign":$('#newWaySign').val(),
            "serviceEndTime":$('#serviceEndTime').val()
        },
        success: function (result) {
        	checkToken(result);
        	if(result.code == 200){
        		$('#layer').modal('hide');
                layer.msg(result.msg,{
                    icon:1,
                    time:2000
                });
                setTimeout(function () {
                    window.location.reload();
                },2000)

			}else {
        		layer.msg(result.msg,{
        			icon:2,
					time:2000
				})
			}
        }
    })
}

/**
 * 查看全部
 * */
$('#seeAll').on('click',function () {
    $('#layer2').modal({backdrop: 'static', keyboard: false});//点击出现模态窗，并且esc,空白点击，不会关闭
});

/**
 * 手动校准模态框
 */
$('#check').on('click',function(){
    $('#layer3').modal({backdrop: 'none', keyboard: false});//点击出现模态窗，并且esc,空白点击，不会关闭
});
/**
 * 处理校准
 */
$('#deal').on('click',function(){
    obj.spStandard = $('#spStandard').val();
	obj.dpStandard = $('#dpStandard').val();
    $.ajax({
        url:global_path + '/cms/service/updateCalibrate',
        type:'post',
        dataType:'json',
        data: obj,
        success: function (result) {
            checkToken(result);
            if(result.code == 200){
                layer.msg(result.msg, {
                    icon: 6,time:2000
                });
                setTimeout(function () {
                    window.location.reload();
                },2000)
			}else{
                layer.msg(result.msg, {
                    icon: 5,time:2000
                });
			}
        }
    });
});

/**
 * 激活/冻结设备
 */
$('#active').on('click',function(){
    $.ajax({
        url:global_path + '/cms/device/activateDevice',
        type:'post',
        dataType:'json',
        data: obj,
        success: function (result) {
            checkToken(result);
            if(result.code == 200){
                layer.msg(result.msg, {
                    icon: 6,time:2000
                });
                setTimeout(function () {
                    window.location.reload();
                },2000)
            }else{
                layer.msg(result.msg, {
                    icon: 5,time:2000
                });
            }
        }
    });
});
