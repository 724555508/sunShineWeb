
$(document).ready(function () {

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
    /**
     * 加载记录
     * */
    var id = '';
    adviceHistory();
    function adviceHistory() {
        $.ajax({
            url: global_path + '/cms/service/getRecordInfo',
            type: 'post',
            dataType: 'json',
            data: obj,
            success: function (res) {
                if (res.code == 200) {
                    //头  head
                    var recordUser = res.data.bean.recordUser;
                    if (recordUser != null) {
                        $('#phoneNum').text(recordUser.id);
                        $('#userCity').text(recordUser.userCity);
                        $('#username').text(recordUser.username);
                        $('#userType').text(recordUser.userType);
                    }
                    //问题
                    var map = res.data.bean.map;
                    var needArr = [];
                    for (var key in map) {
                        needArr.push({key: eval('(' + key + ')'), value: map[key]});
                    }
                    for (var i = 0; i < needArr.length; i++) {
                        //呼叫方式
                        if (needArr[i].key[0].phoneStatus == 1) {
                            needArr[i].key[0].phoneStatus = '主动呼出';
                        } else if (needArr[i].key[0].phoneStatus == 2) {
                            needArr[i].key[0].phoneStatus = '主动呼入';
                        } else if (needArr[i].key[0].phoneStatus == 3) {
                            needArr[i].key[0].phoneStatus = '客服回访';
                        }
                        //是否需要继续回访
                        for (var j = 0; j < needArr[i].value.length; j++) {
                            if (needArr[i].value[j].isNeedReturn == 1) {
                                needArr[i].value[j].isNeedReturn = '需要回访';
                            } else {
                                needArr[i].value[j].isNeedReturn = '无需回访';
                            }
                        }
                    }
                    console.log(needArr);
                    $('#mainHtml').html(template('mainJs', needArr));
                    window.location = "#bottom";
                }
                //点击某次评论
                $('.main').on('click', '.box .smallBox', function () {
                    $(".main .box .smallBox").removeClass('active');
                    $(this).addClass('active');
                    id = $(this).attr('id');
                });
            }
        })

    /**
     * 提交
     * */
    $('.main').on('click','.smallBox',function () {
        var _this = this;
        id = $(_this).attr('id');
        $('.smallBox').css('border','none');
        $(_this).css('border','2px solid #0096FF');
        console.log(id);
    });
    $('#subBtn').on('click',function () {
        $.ajax({
            url:global_path + '/cms/service/addRecord',
            type:'post',
            dataType:'json',
            data:{
                "loginId":localStorage.loginId,
                "token":localStorage.token,
                "id":id,
                "isNeedReturn":$('#isNeedReturn').val(),
                "nextReturnTime":$('#nextDate').val(),
                "disposeInfo":$('#textarea').val()
            },
            success:function (res) {
                if(res.code == 200){
                    id='';
                    $('#textarea').val('');
                    layer.msg(res.msg,{icon:6,time:2000});
                    adviceHistory();
                }else {
                    layer.msg(res.msg,{icon:5,time:2000});
                }
            }
        })
    });

    /**
     * 无需反馈的话，隐藏时间，且传空
     * */
    $('#isNeedReturn').bind('click',function () {
        if($('#isNeedReturn').val() == 2){
            $('#nextDate').val('').fadeOut(1000);
        }else {
            $('#nextDate').val('').fadeIn(1000);
            showNextDate();
        }
    });
    /**
     * 显示次日当前时间在相应位置
     * */
    function showNextDate() {
        var now = new Date(new Date().getTime() + 24*60*60*1000);
        var str = now.getFullYear() + "-" + fix((now.getMonth() + 1),2) + "-" + fix(now.getDate(),2) + "T" + fix(now.getHours(),2) + ":" + fix(now.getMinutes(),2);
        $("#nextDate").val(str);
    }
    function fix(num, length) {
        return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
    }



    }});

