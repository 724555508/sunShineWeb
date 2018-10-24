$(document).ready(function () {

    /**
     *选择区域
     * */
    $('#selectArea').on('click',function () {
        $('#layerArea').modal({backdrop: 'static', keyboard: false});
        show_area_list();
    });
    /**
     * select选择行为
     * */
    $('#selArea').bind('click', function () {
        var a = $(this);
        if(localStorage.sign != 1 && localStorage.sign !=0){
            if(a.val() == 1){
                $('#selectSheng').css('display','block');
                $('#selectShi').css('display','none');
                $('#selectQuxian').css('display','none');
            }else if(a.val() == 2){
                $('#selectSheng').css('display','block');
                $('#selectShi').css('display','none');
                $('#selectQuxian').css('display','none');
            }else if(a.val() == 3){
                $('#selectSheng').css('display','block');
                $('#selectShi').css('display','block');
                $('#selectQuxian').css('display','none');
            }
        }else {
            if(a.val() == 1){
                $('#selectSheng').css('display','block');
                $('#selectShi').css('display','none');
                $('#selectQuxian').css('display','none');
            }else if(a.val() == 2){
                $('#selectSheng').css('display','block');
                $('#selectShi').css('display','block');
                $('#selectQuxian').css('display','none');
            }else if(a.val() == 3){
                $('#selectSheng').css('display','block');
                $('#selectShi').css('display','block');
                $('#selectQuxian').css('display','block');
            }
        }

    });
    /**
     * 地区列表
     * */
    function show_area_list() {
        $.ajax({
            url: global_path + '/cms/area/queryArea',
            type:'post',
            data: {
                "loginId":localStorage.loginId,
                "token": localStorage.token
            },
            dataType:'json',
            success:function(result){
                checkToken(result);
                if(result.code === 200){
                    if(result.data.flag === true){
                        $('#selectSheng').html(template('shengJs',result));
                    }else if(result.data.flag === false){
                        $('.areaLevel').attr('disabled','disabled');
                        $('#selArea').val('3');
                        $('#selectShi').css('display','block');
                        $('#selectSheng').html(template('shengJs',result));
                    }
                }else{
                    layer.msg('获取地区失败!',{
                        icon:2,
                        time:1000
                    });
                }
            }
        });
    }
    $('#selectSheng').bind('click',function () {
        /*选择市*/
        $.ajax({
            url: global_path + '/cms/area/queryArea',
            type:'post',
            data: {
                "loginId":localStorage.loginId,
                "token": localStorage.token,
                "areaParentId":$(this).val()
            },
            dataType:'json',
            success:function(result){
                checkToken(result);
                if(result.code == 200){
                    $('#selectShi').html(template('shiJs',result));
                }else{
                    layer.msg('获取地区失败!',{
                        icon:2,
                        time:1000
                    });
                }
            }
        });
    });
    $('#selectShi').bind('click',function () {
        /*选择区县*/
        $.ajax({
            url: global_path + '/cms/area/queryArea',
            type:'post',
            data: {
                "loginId":localStorage.loginId,
                "token": localStorage.token,
                "areaParentId":$(this).val()
            },
            dataType:'json',
            success:function(result){
                checkToken(result);
                if(result.code == 200){
                    $('#selectQuxian').html(template('quJs',result));
                }else{
                    layer.msg('获取地区失败!',{
                        icon:2,
                        time:1000
                    });
                }
            }
        });
    });

    /**
     * 确认区域 添加到区域Box
     * */
    $('#subArea').on('click',function () {
        var areaSign = $('#selArea').val();
        var areaName,aeraId;
        if(localStorage.sign != 1 && localStorage.sign !=0){
            if(areaSign == 1){

            }else if(areaSign == 2){
                areaName = $('#selectSheng option:selected').html();
                aeraId = $('#selectSheng').val();
            }else if(areaSign == 3){
                areaName = $('#selectShi option:selected').text();
                aeraId = $('#selectShi ').val();
            }
        }else {
            if(areaSign == 1){
                areaName = $('#selectSheng option:selected').html();
                aeraId = $('#selectSheng').val();
            }else if(areaSign == 2){
                areaName = $('#selectShi option:selected').text();
                aeraId = $('#selectShi ').val();
            }else if(areaSign == 3){
                areaName = $('#selectQuxian option:selected').text();
                aeraId = $('#selectQuxian').val();
            }
        }
        //选择好以后填充到已选区域
        $('#allArea').html( $('#allArea').html() + '<div class="areaItem" title="点击删除" data="'+aeraId+'" id="'+aeraId+'">'+areaName+'</div>');
        $('#selectShi').css('display','none');
        //关闭模态窗
        $('#layerArea').modal('hide');
    });

    /**
     * 点击移除某个区域
     * */
    $('.allArea').on('click','.areaItem',function () {
        $(this).remove();
    });

    /**
     * 合伙人性质
     * 当选择企业时，下一栏可自由输入，否则当选择个人时，下一栏自动写个人，且不可操作
     * */
    $('#nature').change('click',function () {
        if($('#nature').val() == '2'){
            $('#conName').val('个人').attr('disabled','disabled');
        }else {
            $('#conName').val('').removeAttr('disabled');
        }
    });

    /**
     *开通增加
     * */
    $('#buildId').on('click',function () {
        var arr = [];
        $('.areaItem').each(function () {
            arr.push($(this).attr('data'));
        });
        arr = JSON.stringify(arr);  //区域数组
        $.ajax({
            url:global_path+'/cms/agent/addAgentUser',
            type:'post',
            dataType:'json',
            data:{
                "loginId":localStorage.loginId,
                "token":localStorage.token,
                "areaSigns":arr,
                "nature":$('#nature').val(),
                "companyName":$('#conName').val(),
                "agentName": $('#agentName').val(),
                "agentPhone": $('#agentPhone').val(),
                "bargainStartTime": $('#startTime').val(),
                "bargainEndTime": $('#endTime').val(),
                "linkName": $('#linkName').val(),
                "linkNamePhone": $('#linkNamePhone').val()
            },
            success:function (result) {
                if(result.code == 200){
                    layer.msg(result.msg,{
                        icon:1,
                        time:2000
                    });
                    $('.buildBox').slideUp("fast");
                    $('.successBox').fadeIn("slow");
                    $('#areaNames').text(result.data.areaNames.join('、'));  //代理区域
                    var needData = result.data.map;
                    $('#nature1').text(needData.nature); //合伙人性质
                    $('#companyName').text(needData.companyName); //合伙人性质
                    $('#agentName1').text(needData.agentName); //负责人姓名
                    $('#agentPhone1').text(needData.agentPhone); //负责人电话
                    $('#linkName1').text(needData.linkName); //联系人姓名
                    $('#linkNamePhone1').text(needData.linkNamePhone); //联系人电话
                    $('#login').text(needData.agentPhone); //密码
                    $('#password').text(needData.password); //密码
                }else {
                    layer.msg(result.msg,{
                        icon:2,
                        time:2000
                    });
                }
            }
        })
    });

    /**
     * 继续添加
     * */
    $('#continue').on('click',function () {
        $('#allArea').html('');
        $('#nature').val('1');
        $('#conName').removeAttr('disabled').val('');
        $('#agentName').val('');
        $('#agentPhone').val('');
        $('#startTime').val('');
        $('#endTime').val('');
        $('#linkName').val('');
        $('#linkNamePhone').val('');
        $('.successBox').fadeOut("fast");
        $('.buildBox').fadeIn("slow");

    })
});