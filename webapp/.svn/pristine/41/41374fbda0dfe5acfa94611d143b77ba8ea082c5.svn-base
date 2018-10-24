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
 * ajax获取数据
 * */
$.ajax({
    url:global_path + '/cms/appUser/selectAppUserInfo',
    type:'post',
    dataType:'json',
    data:obj,
    success:function (res) {
        if(res.code == 200){
            appDetails(res.data.userBean);
        }else {
            layer.msg(res.msg,{
                icon:2,
                time:2000
            })
        }
    }
});

/**
 * appDetails function
 * */
function appDetails(data){
    /*part1*/
    // 姓名第二位替换成*
    if(localStorage.sign !=0 && localStorage.sign !=1){
        if(data.username != '' && data.username != null){
            var name1 = data.username
            name1 = name1.split('')
            name1.splice(1,1,'*')
            data.username = name1.join('');
        }
    }
    $('#username').text(data.username);

    data.gender == 1 ? data.gender = '男' : (data.gender == 2 ? data.gender = '女' : data.gender = ' ');
    $('#sex').text(data.gender);
    $('#age').text(data.age);
    $('#address').text(data.address);
    //手机号后中间4位转换为*
    if(localStorage.sign != 0 && localStorage.sign != 1){
        if(data.phoneNum != '' && data.phoneNum != null){
            var tel = data.phoneNum
            tel = tel.split(''); //转化为数组
            tel.splice(3,4,'****');  //从下标位3替换*
            data.phoneNum = tel.join('') //转化为字符串
        }
    }
    $('#phoneNum').text(data.phoneNum);
    $('#createTime').text(data.createTime);
    $('#lastLoginTime').text(data.lastLoginTime);
    //头像
    if(data.headImg != ''){
        $('#headImg').removeAttr('src').attr('src','https://i.iandun.com:8085/'+data.headImg);
    }else if(data.gender === '男'){
        $('#headImg').removeAttr('src').attr('src','../../imgs/iframeImgs/u10.png');
    }else if(data.gender === '女'){
        $('#headImg').removeAttr('src').attr('src','../../imgs/iframeImgs/u20.png');
    }

    /*part3*/
    for(var key in data.wearUserMap){
        $('#listBox').html($('#listBox').html() + '<a target="_blank" href="wearUser.html?wearUserId='+key+'">'+data.wearUserMap[key]+'</a>')
    }

}