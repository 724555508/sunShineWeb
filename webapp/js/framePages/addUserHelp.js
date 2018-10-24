/**
 * Created by Administrator on 2018/1/18.
 */
var editor = new Simditor({
    textarea: $('#content')
    //optional options
});
$('#loginId').val(localStorage.loginId);
$('#token').val(localStorage.token);
    /**
     * ��ȡurl���Ĳ���
     * */
    var obj = {};
    var url = window.location.search;    //��ȡ"?"�Լ�֮��������ַ���?
    var str = url.substring(1,url.length);  //ȥ��"?"
    var arr = str.split('&');               //����&�ָ������?   ["key=value","name=zxm"]
    for(var i = 0; i < arr.length; i ++){
        obj[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
    }
    obj.loginId = localStorage.loginId;
    obj.token = localStorage.token;

    if(url != ''){
        showInfo();
    }


function showInfo(){
    var url = global_path + "/cms/appUser/getAppUserHelpInfo";
    $.ajax({
        type:"POST",
        url: url,
        dataType:'json',
        data: {
            'loginId':obj.loginId,
            'token':obj.token,
            'id':obj.id
        },
        success: function(res){
            if(res.code == 200){
                $('#title').val(res.data.bean.title);
                $('#status').val(res.data.bean.status);
                $('.simditor-body').html(res.data.bean.htmltext);
                //if(res.data.bean.picUrls != ''){
                //    var arr = res.data.bean.picUrls.split(',');
                //    for(var i=0;i<arr.length;i++){
                //        $('#imgs').val($('#imgs').val()+arr[i]+',');
                //        $('#imgShowBox').append('<img src="'+arr[i]+'" width="200">');
                //    }
                //}
            }else{
                layer.msg(res.msg,{icon:2,time:2000});
            }
        }
    });
}




function uploadimg(){
    uploadUserHelpImg('newImg','img_show','imgs');
}



//�������?
$("#uploadButton").click(function(){
    var url = global_path + "/cms/appUser/saveAppUserHelp";
    $.ajax({
        type: "POST",
        url: url,
        dataType:'json',
        data: {
            'loginId':obj.loginId,
            'token':obj.token,
            'title':$('#title').val(),
            //'picUrls': $('#imgs').val(),
            'content': $('.simditor-body').html(),
            'status':$('#status').val(),
            'id':url == '' ? 0 : obj.id
        },
        success: function(data){
            if(data.code == 200){
                layer.msg(data.msg,{icon:1,time:2000});
                // window.setTimeout(function () {
                //     window.location.reload();//ˢ��ҳ��
                // },2000)
                $('body').append('<div style="margin-top: 20px;">页面Url为:  '+data.data.url+'</div>');
            }else{
                layer.msg(data.msg,{icon:2,time:2000});
            }
        },
        error: function () {
            layer.msg('�ϴ�ʧ��',{icon:2,time:2000});
        }
    });
});

//��������
$('#cancelChangeBtn').click(function(){
    $('#title').val("");
    $('#imgs').val("");
    $('#imgShowBox').empty();
    $('.simditor-body').html("");
});