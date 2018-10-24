var obj = {};
var url = window.location.search;
var str = url.substring(1,url.length);
var arr = str.split('&');
for(var i = 0; i < arr.length; i ++){
    obj[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
}

var app = new Vue({
    el:'#adv',
    data:{
        title:'',//标题
        imgs:'',//封面图url
        linkUrl:'',//跳转链接
        selected:'1',
        selected2:'1',
        useSign:'1',
        loginId:'',
        token:'',
        showsValue:'隐藏',
        showsValNum:'1',
        id:''
    },
    /**
     * 页面加载完成要做的事
     * */
    mounted: function () {
        this.init();
    },
    /**
     * 方法集合
     * */
    methods: {
        /**
         * 页面初始化做的事儿
         * */
        init:function () {
            this.loginId = localStorage.loginId;
            this.token = localStorage.token;
        },
        /**
         * 查看
         * */
        uploadimg:function () {
            var that = this;
            uploadAdvImg('newImg','img_show','imgs',that);
        },
        /**
         * 提交
         */
        submit:function(){
            if(this.id != null && this.id != ''){
                //如果ID值不是空的,则应该走修改的流程
                this.update();
                return;
            }
            //新增流程
            var that = this;
            $.ajax({
                type: "post",
                url: global_path + "/cms/Advertisement/addAdvertisement",
                cache: false,  //禁用缓存
                data: {
                    loginId:that.loginId,
                    token:that.token,
                    title:that.title,
                    imgUrl:that.imgs,
                    linkUrl:that.linkUrl,
                    productVal:that.selected,
                    modulesVal:that.selected2,
                    useSign:that.showsValNum
                },  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    checkToken(result);
                    if(result.code == 200){
                        layer.msg(result.msg,{time:2000},function () {
                            window.history.go(-1);
                        });
                    }else{
                        layer.msg(result.msg,{time:2000});
                    }
                }
            });
        },
        /**
         * 重置
         */
        reset:function(){
            console.log(this.useSign+'sada');
            this.title = '';
            this.imgs = '';
            this.linkUrl = '';
            this.selected = '1';
            this.selected2 = '1';
        },
        /**
         * 点击隐藏/显示
         */
        shows: function () {
            var _this = this;
            _this.showsValue === '隐藏' ? _this.showsValue ='显示' : _this.showsValue ='隐藏';
            _this.showsValue === '隐藏' ? _this.showsValNum ='1' : _this.showsValNum ='2';
        },
        /**
         * 根据ID查询轮播详情
         */
        selectById: function () {
            var that = this;
            $.ajax({
                type: "post",
                url: global_path + "/cms/Advertisement/getAdvertisementById",
                cache: false,  //禁用缓存
                data: {
                    loginId:that.loginId,
                    token:that.token,
                    id:that.id
                },  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    checkToken(result);
                    if(result.code == 200){
                        var res = result.data.bean;
                        that.title = res.remark;
                        that.selected = res.product;
                        that.selected2 = res.modules;
                        that.linkUrl = res.linkUrl;
                        that.imgs = "https://i.iandun.com:8085/"+res.picUrl;
                        $('#imgShowBox').children("img").remove();
                        $('#imgShowBox').append('<img src="'+that.imgs+'" width="200">');
                    }else{
                        layer.msg(result.msg,{time:2000});
                    }
                }
            });
        },
        /**
         * 修改
         */
        update:function(){
            var that = this;
            $.ajax({
                type: "post",
                url: global_path + "/cms/Advertisement/updateAdvertisement",
                // cache: false,  //禁用缓存
                data: {
                    loginId:that.loginId,
                    token:that.token,
                    title:that.title,
                    imgUrl:that.imgs,
                    linkUrl:that.linkUrl,
                    productVal:that.selected,
                    modulesVal:that.selected2,
                    useSign:that.showsValNum,
                    id:that.id
                },  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    checkToken(result);
                    if(result.code == 200){
                        layer.msg(result.msg,{time:2000},function () {
                            that.selectById();
                        });
                    }else{
                        layer.msg(result.msg,{time:2000});
                    }
                }
            });
        }
    }
});

/**
 * 如果url是空的,代表是点击查看进入的
 */
if(url != ''){
    app.init();
    app.id = obj.id;
    app.selectById();
}
