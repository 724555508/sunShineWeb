/**
 * Created by Administrator on 2017/10/24.
 */

var obj = {};
var url = window.location.search;
var str = url.substring(1,url.length);
var arr = str.split('&');
for(var i = 0; i < arr.length; i ++){
    obj[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
}

$('#loginId').val(localStorage.loginId);        //隐藏域指定loginId和token
$('#token').val(localStorage.token);

if(url != ''){//代表点击查看进入的
    $.ajax({
        type: "POST",
        url: global_path + '/cms/Advertisement/getInitPageByID',
        data: {
            "loginId": localStorage.loginId,
            "token": localStorage.token,
            "id":obj.id
        },
        dataType:'json',
        success: function(data){
            checkToken(data);
            if(data.code == 200){
                $('#title').val(data.data.bean.title);
                var arr = data.data.bean.beginUpdateTime.split(" ");
                $('#nextDate').val(arr[0]+"T"+arr[1].substring(0,arr[1].length-3));
                $('#imgs').val(data.data.bean.imgUrl);
                $('#nowLinkPageImg').removeAttr('src').attr('src',data.data.bean.imgUrl);
            }else{
                layer.msg(data.msg,{icon:2,time:2000});
            }
        },
        error: function () {

        }
    });
} else{
    $.ajax({
        type: "POST",
        url: global_path + '/cms/index/getInitImg',
        data: {
            "loginId": localStorage.loginId,
            "token": localStorage.token
        },
        dataType:'json',
        success: function(data){
            checkToken(data);
            if(data.code == 200){

                $('#nowLinkPageImg').removeAttr('src').attr('src',data.data.initImg);
            }else{
                layer.msg(data.msg,{icon:2,time:2000});
            }
        }
    });
}




$('#changeImgBtn').click(function () {
    $(this).fadeOut(1000);
    $('.uploadBox').fadeIn(1000);
    $('#loginId').val(localStorage.loginId);
    $('#token').val(localStorage.token);
});
$('#cancelChangeBtn').click(function () {
    window.history.go(-1);
    // $('#imgShowBox').html('');
    // $('#uploadImg')[0].reset();
    // $('.uploadBox').hide(1000);
    // $('#changeImgBtn').slideDown(1000);
});


//上传图片
function uploadimg(){
    uploadImg('newImg','img_show','imgs');
}
//保存添加
$("#uploadButton").click(function(){
    var url = global_path + "/cms/Advertisement/addInitPage";
    $.ajax({
        type: "POST",
        url: url,
        dataType:'json',
        data: {
            'loginId':localStorage.loginId,
            'token':localStorage.token,
            'imgUrl': $('#imgs').val(),
            'title':$('#title').val(),
            'time':$('#nextDate').val(),
            'id':obj.id
        },      //参数
        success: function(data){
            if(data.code == 200){
                layer.msg(data.msg,{icon:1,time:2000});
                window.setTimeout(function () {
                    window.history.go(-1);;//返回上级
                },2000)

            }else{
                layer.msg(data.msg,{icon:2,time:2000});
            }
        },
        error: function () {
            layer.msg('上传失败',{icon:2,time:2000});
        }
    });
});
