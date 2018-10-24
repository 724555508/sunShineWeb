/**
 * 项目地址
 * */
// var global_path = "http://192.168.100.78:8580/iandun-cms";
var global_path = "http://192.168.100.12:4398/iandun";
// var global_path = "http://39.107.88.176:8480/iandun-cms";
// var global_path = "http://39.107.231.43:8480/iandun-cms";
// var global_path = "https://cms.iandun.com/iandun-cms";
//
//
function log(e) {
    console.log(e);
}

function checkToken(result){
    if(result.code == 101 || result.code == 102){
        layer.msg('账号失效请重新登录',{time:1000});
        setTimeout(function () {
            localStorage.clear();
            parent.location.href='../login.html';
        },2000);
    }
}
function checkTokenIndex(result){
    if(result.code == 101 || result.code == 102){
        localStorage.clear();
        location.href = 'login.html';
    }
}
