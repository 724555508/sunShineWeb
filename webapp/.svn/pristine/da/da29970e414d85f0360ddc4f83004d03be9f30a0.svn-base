$(document).ready(function () {
    /**
     * 鼠标吸附特效
     * */
    /*var config = {
        vx: 2,	//小球x轴速度,正为右，负为左
        vy: 2,	//小球y轴速度
        height: 5,	//小球高宽，其实为正方形，所以不宜太大
        width: 5,
        count: 300,		//点个数
        color: "121, 162, 185", 	//点颜色
        stroke: "130,255,255", 		//线条颜色
        dist: 6000, 	//点吸附距离
        e_dist: 10000, 	//鼠标吸附加速距离
        max_conn: 10 	//点到点最大连接数
    };*/
    //调用
    // CanvasParticle(config);
    /**
     * 粒子背景特效
     * */
    /*$('body').particleground({
        dotColor: '#cce2e8',
        lineColor: '#133b88',
        directionX: 'center'
    });*/


    /**
    * 判断是否本地缓存有login&&token
    * 如果有，则跳转主页
    * 否则停留在本页 做登陆验证
    * */
   $.ajax({
       url:global_path + '/cms/user/checkToken',
       type:'post',
       data:{
          "loginId":localStorage.loginId,
          "token":localStorage.token
       },
       dataType:'json',
       success:function (result) {
            if(result.code == 200){
                layer.msg('自动登陆成功',{
                    icon:1,
                    time:1000
                });
                setTimeout(function () {
                    $("#loginId").val(localStorage.loginId);
                    window.location.href = 'index.html';
                },1000)
            }else {

            }
       }
   });

   /**
    * 登陆 分两种形式{1.点击登陆，2.回车登陆}
    * */
   //1.点击登陆按钮登陆
   $('#loginBtn').on('click',function () {
       $.ajax({
           url: global_path + "/cms/user/login",
           type: 'post',
           dataType:'json',
           data:{
               "loginId":$("#loginId").val(),
               "password":$("#pwd").val()
           },
           success:function (result) {
               if(result.code == 200){
                  layer.msg(result.msg,{
                     icon:1,
                     time:1000
                  });
                  setTimeout(function () {
                      localStorage.username = result.data.cmsUserBean.username;
                      localStorage.loginId = result.data.cmsUserBean.loginId;
                      localStorage.token = result.data.cmsUserBean.token;
                      localStorage.phoneNum = result.data.cmsUserBean.phoneNum;
                      localStorage.sign = result.data.cmsUserBean.sign;
                      window.location.href = 'index.html';
                  },1000)
               }else {
                   layer.msg(result.msg,{
                       icon:2,
                       time:2000
                   });
               }
           }
       })
   });
   //2.回车登陆
    document.onkeydown=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13){
           //enter 键
           //按下enter要做的事
            $.ajax({
                url: global_path + "/cms/user/login",
                type: 'post',
                dataType:'json',
                data:{
                    "loginId":$("#loginId").val(),
                    "password":$("#pwd").val()
                },
                success:function (result) {
                    if(result.code == 200){
                        layer.msg(result.msg,{
                            icon:1,
                            time:1000
                        });
                        setTimeout(function () {
                            localStorage.username = result.data.cmsUserBean.username;
                            localStorage.loginId = result.data.cmsUserBean.loginId;
                            localStorage.token = result.data.cmsUserBean.token;
                            localStorage.phoneNum = result.data.cmsUserBean.phoneNum;
                            localStorage.sign = result.data.cmsUserBean.sign;
                            window.location.href = 'index.html';
                        },1000)
                    }else {
                        layer.msg(result.msg,{
                            icon:2,
                            time:2000
                        });
                    }
                }
            })
        }
    };
});