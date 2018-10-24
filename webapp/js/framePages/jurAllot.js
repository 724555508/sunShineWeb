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

var app = new Vue({
    el: '#app',
    data:{
        loginId: localStorage.loginId,
        token: localStorage.token,
        roleId: obj.roleId,
        data: '',
        roleName:'角色'
    },
    /**
     * 页面加载完成要做的事
     * */
    mounted: function () {
        this.init();
    },
    methods:{
        init:function () {
            var _this = this;
            $.ajax({
                url: global_path + '/cms/user/getRoleRermissionList',
                type: 'post',
                dataType: 'json',
                data: {
                    loginId: _this.loginId,
                    token: _this.token,
                    roleId: _this.roleId
                },
                success:function (res) {
                    if(res.code === 200){
                        _this.data = res.data.bean;
                        _this.roleName = res.data.roleName;
                    }else {
                        layer.msg(res.msg,{icon:2,time:2000});
                    }

                }
            })
        },
        handleClick:function (sign,id,index1,index2) {
            var _this = this;
            $.ajax({
                url: global_path + '/cms/user/updateRoleRermission',
                type: 'post',
                dataType: 'json',
                data: {
                    loginId: _this.loginId,
                    token: _this.token,
                    roleId: _this.roleId,
                    resourceId: id
                },
                success:function (res) {
                    if(res.code === 200){
                        sign == true ? sign = false : sign = true;
                        _this.data[index1].son[index2].has = sign;
                        layer.msg(res.msg,{icon:1,time:2000});
                    }else {
                        layer.msg(res.msg,{icon:2,time:2000});
                    }
                }
            })
        },
        handleClick0:function (sign,id,index1) {
            var _this = this;
            $.ajax({
                url: global_path + '/cms/user/updateRoleRermission',
                type: 'post',
                dataType: 'json',
                data: {
                    loginId: _this.loginId,
                    token: _this.token,
                    roleId: _this.roleId,
                    resourceId: id
                },
                success:function (res) {
                    if(res.code === 200){
                        sign == true ? sign = false : sign = true;
                        _this.data[index1].has = sign;
                        layer.msg(res.msg,{icon:1,time:2000});
                    }else {
                        layer.msg(res.msg,{icon:2,time:2000});
                    }
                }
            })
        }
    }
});