var obj = {};
var url = window.location.search; //截取"?"以及之后的所有字符串
var str = url.substring(1, url.length); //去除"?"
var arr = str.split('&'); //根据&分割成数组   ["key=value","name=zxm"]
for(var i = 0; i < arr.length; i++) {
    obj[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
}
obj.loginId = localStorage.loginId;
obj.token = localStorage.token;
console.log(obj);
var app = new Vue({
    el: '#app',
    data: {
        createTime:'',
        createId:'',
        messageHtml:''
    },
    mounted: function () {
        this.getAjaxData();

    },
    methods: {
        getAjaxData:function(){
            var that = this;
            $.ajax({
                type: "post",
                url: global_path + "/cms/message/getAgentMessageInfo",
                cache: false,  //禁用缓存
                data: {  //传入组装的参数
                    loginId:localStorage.loginId,
                    token:localStorage.token,
                    id:obj.id
                },
                dataType: "json",
                success: function (res) {
                    checkToken(res);
                    if (res.code === 200) {
                        var bean = res.data.bean;
                        that.createTime = bean.createTime;
                        that.createId = bean.createId;
                        that.messageHtml = bean.messageHtml;

                        // var returnData = {};
                        // returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                        // returnData.recordsTotal = result.data.total;//返回数据全部记录
                        // returnData.recordsFiltered = result.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                        // returnData.data = result.data.datas;//返回的数据列表
                        // callback(returnData);
                    }
                }
            });
        }

    }});
