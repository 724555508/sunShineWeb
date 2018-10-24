/**
 * 获取url传的参数
 * */
var obj = {};
var url = window.location.search;       //截取"?"以及之后的所有字符串
var str = url.substring(1,url.length);  //去除"?"
var arr = str.split('&');               //根据&分割成数组   ["key=value","name=zxm"]
for(var i = 0; i < arr.length; i ++){
    obj[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
}
obj.loginId = localStorage.loginId;
obj.token = localStorage.token;
console.log(obj);


/**
 * 地区列表1
 * */
show_area_list();
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
            if(result.code == 200){
                $('#selectSheng').html(template('shengJs',result));
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
 * 地区列表2
 * */
show_area_list2();
function show_area_list2() {
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
            if(result.code == 200){
                $('#selectSheng1').html(template('shengJs',result));
            }else{
                layer.msg('获取地区失败!',{
                    icon:2,
                    time:1000
                });
            }
        }
    });
}
$('#selectSheng1').bind('click',function () {
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
                $('#selectShi1').html(template('shiJs',result));
            }else{
                layer.msg('获取地区失败!',{
                    icon:2,
                    time:1000
                });
            }
        }
    });
});
$('#selectShi1').bind('click',function () {
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
                $('#selectQuxian1').html(template('quJs',result));
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
 * 展示已存地址
 * */
seeMsg();
function seeMsg() {
    $.ajax({
        url:global_path + '/cms/agent/selectAgentAddress',
        type:'post',
        dataType:'json',
        data:{
            "loginId":localStorage.loginId,
            "token":localStorage.token,
            "agentId":obj.phoneNum
        },
        success:function (res) {
            $('#sendCompanyname').val(res.data.agentAddres.sendCompanyname);
            $('#sendLinkName').val(res.data.agentAddres.sendLinkName);
            $('#sendLinkPhone').val(res.data.agentAddres.sendLinkPhone);
            $('#sendAddressInfo').val(res.data.agentAddres.sendAddressInfo);
            $('#takeCompanyname').val(res.data.agentAddres.takeCompanyname);
            $('#takeLinkName').val(res.data.agentAddres.takeLinkName);
            $('#takeLinkPhone').val(res.data.agentAddres.takeLinkPhone);
            $('#takeAddressInfo').val(res.data.agentAddres.takeAddressInfo);
        }
    });
}
/**
 *编辑相应状态
 * */
$('.form-control').attr('disabled','disabled').addClass('cannot');
$('#edit1').on('click',function () {
    $('.send .form-control').removeAttr('disabled').removeClass('cannot');
    $('#allArea1').slideDown(1000);
    $('#oneArea1').slideUp(1000);
    $('#edit1').fadeOut('1000');
    $('#en1').fadeIn('1000');
});
$('#edit2').on('click',function () {
    $('.take .form-control').removeAttr('disabled').removeClass('cannot');
    $('#allArea2').slideDown(1000);
    $('#oneArea2').slideUp(1000);
    $('#edit2').fadeOut('1000');
    $('#en2').fadeIn('1000');
});
/**
 *保存相应状态
 * */
$('#en1').on('click',function () {
    $.ajax({
        url:global_path + '/cms/agent/updateAgentAddress',
        type:'post',
        dataType:'json',
        data:{
            "loginId":localStorage.loginId,
            "token":localStorage.token,
            "agentId":obj.phoneNum,
            "sendCompanyName":$.trim($('#sendCompanyname').val()),
            "sendLinkName":$.trim($('#sendLinkName').val()),
            "sendLinkPhone":$.trim($('#sendLinkPhone').val()),
            "sendProvinecId":$('#selectSheng1').val(),
            "sendCityId":$('#selectShi1').val(),
            "sendAreaId":$('#selectQuxian1').val(),
            "sendAddressInfo":$('#sendAddressIn').val()
        },
        success:function (res) {
            if(res.code == 200){
                layer.msg(res.msg,{icon:1,time:2000});
                $('.send .form-control').attr('disabled','disabled').addClass('cannot');
                $('#allArea1').slideUp(1000);
                $('#oneArea1').slideDown(1000);
                $('#edit1').fadeIn('1000');
                $('#en1').fadeOut('1000');
                seeMsg();
            }else {
                layer.msg(res.msg,{icon:2,time:2000});
            }
        }
    });
});
$('#en2').on('click',function () {
    $.ajax({
        url:global_path + '/cms/agent/updateAgentAddress',
        type:'post',
        dataType:'json',
        data:{
            "loginId":localStorage.loginId,
            "token":localStorage.token,
            "agentId":obj.phoneNum,
            "takeCompanyName":$.trim($('#takeCompanyname').val()),
            "takeLinkName":$.trim($('#takeLinkName').val()),
            "takeLinkPhone":$.trim($('#takeLinkPhone').val()),
            "takeProvinecId":$('#selectSheng').val(),
            "takeCityId":$('#selectShi').val(),
            "takeAreaId":$('#selectQuxian').val(),
            "takeAddressInfo":$('#takeAddressIn').val()
        },
        success:function (res) {
            if(res.code == 200){
                layer.msg(res.msg,{icon:1,time:2000});
                $('.take .form-control').attr('disabled','disabled').addClass('cannot');
                $('#allArea2').slideUp(1000);
                $('#oneArea2').slideDown(1000);
                $('#edit2').fadeIn('1000');
                $('#en2').fadeOut('1000');
                seeMsg();
            }else {
                layer.msg(res.msg,{icon:2,time:2000});
            }
        }
    });
});
