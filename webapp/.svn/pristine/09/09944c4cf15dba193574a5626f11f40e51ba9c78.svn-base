$(document).ready(function () {
    var urlAjax = 'https://cms.iandun.com/iandun-cms/cms/agent/getAuthorization';
    // var urlAjax = 'https://k.iandun.com/iandun-agent/getAuthorization';
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
    /**
     * 搜索
     * */
    $('#search').on('click',function () {
        if($.trim($('#input').val()).length < 2){
            layer.msg('请正确输入查询项',{
                time: 2000,
                icon: 2
            })
        }else{
            $.ajax({
                url:urlAjax,
                type:'post',
                dataType:'json',
                data:{
                    "input": $.trim($('#input').val())
                },
                success:function (data) {
                    if(data.code ==1011){
                        if(data.data.cmsAuthorizationBeans.length <= 0){
                            $('.conTitle').fadeIn(100);
                            $('.lists').fadeIn(100);
                            $('#lists').html(' <div class="noneRes"><img src="imgs/none.png" alt="无结果" width="56"/></div> <div class="noneText">没有查到经销商信息！</div>');
                        }else{
                            $('.conTitle').fadeIn(100);
                            $('#lists').html(template('result',data));     //template模板填充
                        }
                    }else {
                        $('#input').val('');
                        $('.conTitle').fadeOut(100);
                        $('#lists').html('');
                        layer.msg('没有查到经销商信息',{
                            time: 2000,
                            icon: 2
                        })
                    }
                }
            })
        }

    });

    /**
     * 页面加载时传编码
     * */
    $.ajax({
        url:urlAjax,
        type:'post',
        dataType:'json',
        data:obj,
        success:function (data) {
            if(data.code ==1011){
                $('#input').val(obj.input);
                $('.conTitle').fadeIn(100);
                $('#lists').html(template('result',data));     //template模板填充
            }
        }
    })
});