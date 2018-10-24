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

//隐藏部分数据
var app = new Vue({
    el: '#app',
    data: {
        orderFormId:"",
        orderType:'',
        appUserId:'',
        wearUserName:'',
        takeAddress:'',
        goodsId:'',
        totalMoney:'',
        applyStatus:'',
        accountType:'',
        payDate:''
    },
    mounted: function() {
        this.getAjaxData();
    },
    computed: {

    },
    methods: {
        getAjaxData:function(){
            var that = this;
            //ajax请求数据
            $.ajax({
                type: "post",
                url: global_path + "/Agent/orderForm/selectOrderInfo",
                cache: false,  //禁用缓存
                //传入组装的参数
                data: {
                    loginId:localStorage.loginId,
                    token:localStorage.token,
                    orderFormId:obj.orderFormId
                },
                dataType: "json",
                success: function (res) {
                    if(res.code === 200){
                        var bean = res.data.bean;
                        that.orderFormId = bean.orderFormId;  //订单编号
                        that.orderType = bean.orderType;  //订单类型
                        that.appUserId = bean.appUserId;  //账号
                        that.wearUserName = bean.wearUserName;  //佩戴人
                        that.takeAddress = bean.takeAddress;  //收货地址

                        that.goodsId = bean.goodsId;  //商品名称
                        that. totalMoney = bean. totalMoney;  //订单金额
                        that.applyStatus = bean.applyStatus;  //支付状态
                        that.accountType = bean.accountType;  //支付方式
                        that.payDate = bean.payDate;  //付款时间
                        // var returnData = {};
                        // returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                        // returnData.recordsTotal = res.data.total;//返回数据全部记录
                        // returnData.recordsFiltered = res.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                        // returnData.data = res.data.list;//返回的数据列表
                        // callback(returnData);

                    }
                },
                error:function(){

                }
            });
        }



    }
});

