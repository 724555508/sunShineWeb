
/**
 * 点击操作
 * */
$('.listBox').on('click','.line1',function () {
    $(this).find('.newMsg').fadeOut(500);
    $(this).siblings().toggle(500);
    $.ajax({
        url:global_path + '/cms/index/seeUserAdvice',
        type:'post',
        dataType:'json',
        data:{
            "loginId":localStorage.loginId,
            "token":localStorage.token,
            "ID":$(this).attr('id')
        },
        success:function (res) {

        }
    })
});

/**
 * 获取app反馈列表
 * */
adviceLists();
function adviceLists() {
    $.ajax({
        url:global_path + '/cms/index/selectUserAdvice',
        type:'post',
        dataType:'json',
        data:{
            "loginId":localStorage.loginId,
            "token":localStorage.token
        },
        success:function (res) {
            if(res.code == 200){
                var data = res.data.list;
                for (var i = 0; i < data.length; i ++){
                    var node;
                    if(data[i].useSign == 0){
                        node = '<div class="list"><div class="line1" id="'+data[i].id+'">' +
                            '<div>'+data[i].username+'</div><div>'+data[i].userId+'</div><div><span class="newMsg">new</span></div><div>'+data[i].creatTime+'</div></div>' +
                            '<div class="line2">'+data[i].advice+'</div></div>';
                    }else {
                        node = '<div class="list"><div class="line1">' +
                            '<div>'+data[i].username+'</div><div>'+data[i].userId+'</div><div></div><div>'+data[i].creatTime+'</div></div>' +
                            '<div class="line2 color">'+data[i].advice+'</div></div>';
                    }
                    $('#listBox').html($('#listBox').html() + node);
                }
            }else {
                layer.msg(res.msg,{icon:2,time:2000});
            }
        }
    })
}
