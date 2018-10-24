var obj = {};
var url = window.location.search; //截取"?"以及之后的所有字符串
var str = url.substring(1, url.length); //去除"?"
var arr = str.split('&'); //根据&分割成数组   ["key=value","name=zxm"]
for(var i = 0; i < arr.length; i++) {
    obj[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
}
obj.loginId = localStorage.loginId;
obj.token = localStorage.token;

//隐藏部分数据
var app = new Vue({
    el: '#app',
    data: {
        // type:obj.type,
        text:'',
        arr:[],
        html:'html',
        loginId:localStorage.loginId,
        token:localStorage.token,
        isShow:0,
        isValue:'隐藏',
        infoHtml:'',
        show: true,
        typeName:localStorage.typeName,
        backUrl: ''
    },
    mounted: function() {
        this.backUrl = 'contentList.html?type=' + obj.type;
        this.init();
    },
    computed: {
    },
    methods: {
        init:function () {
            var that = this;
            if(obj.informationId !== '' && obj.informationId !== null && obj.informationId !== undefined){
                $.ajax({
                    type: "POST",
                    url: global_path + '/cms/information/info',
                    data: {
                        "loginId": that.loginId,
                        "token": that.token,
                        "informationId":obj.informationId
                    },
                    dataType:'json',
                    success: function(res){
                        checkToken(res);
                        if(res.code === 200){
                            var data = res.data.info;
                            $("#title").val(data.title);
                            $("#bgImg").attr('src','https://i.iandun.com:8085/'+data.coverImg);
                            var tag = data.tag.split(';');
                            that.arr = tag;
                            that.infoHtml = data.infoHtml;
                            if(data.userSign === 1){
                                that.isShow = 1;
                                that.isValue = '显示';
                            }else{
                                that.isShow = 0;
                                that.isValue = '隐藏';
                            }
                        }else{
                            layer.msg(res.msg,{icon:2,time:2000});
                        }
                    }
                })
            }
        },
        // 点击回车键添加标签
        showMe: function () {
            $('#addBox').fadeIn();
            var that = this;
            if(that.text === ''){
                layer.msg('请输入文字');
            }else {
                that.arr.push(that.text);
                that.text = '';
            }
        },
        //隐藏显示
        isHidden:function(){
            if(this.isValue === '显示'){
                this.isShow = 0;
                this.isValue = '隐藏'
            }else{
                this.isShow = 1;
                this.isValue = '显示'
            }
        },
        // 删除
        deleteMe:function(index){
            this.arr.splice(index,1);
        },
        sub:function(){
           // alert( $(".w-e-text").html());
        },
        // 点击保存
        saveHtml:function(){
            var that = this;
            $.ajax({
                type: "POST",
                url: global_path + '/cms/information/save',
                data: {
                    "loginId": localStorage.loginId,
                    "token": localStorage.token,
                    "title":$("#title").val(),
                    "imgUrl":$("#bgImg").attr("src"),
                    "infoHtml":$(".w-e-text").html(),
                    "useSign":that.isShow,
                    "type":obj.type,
                    "tags":that.arr.join(";"),
                    "informationId": obj.informationId,
                    "content":$(".w-e-text").text()
                },
                dataType:'json',
                success: function(data){
                    checkToken(data);
                    if(data.code === 200){
                        layer.msg(data.msg,{time:1500},function () {
                            window.location.href = 'contentList.html?type=' + obj.type;
                        });
                        // layer.msg(data.msg);

                        // window.location.href = 'contentList.html?type=' + obj.type;
                        // layer.confirm(data.msg,{
                        //     btn: ['返回列表','确定']
                        // },function () {
                        //
                        // },function () {
                        //     layer.msg(data.msg);
                        //     that.isValue = '隐藏';
                        // });
                    }else{
                        layer.msg(data.msg,{time:1500});
                    }
                }
            })
        },
        // closeGetUrl
        closeGetUrl: function () {
            this.show = false;
        },
        // openGetUrl
        openGetUrl: function () {
            this.show = true;
        },
        //      关闭弹框
        closeModel:function(){
            $(".modal").modal("hide");
        },
        // 点击查看弹框弹框  进行预览
        preview:function(){
            $('#previewText').html($(".w-e-text").html());
            $('#previewContent').modal({/*backdrop: 'static',*/ keyboard: true});      // backdrop：’static’指的是点击背景空白处不被关闭； keyboard:false指的是触发键盘esc事件时不关闭。
        }
    },


});
//上传图片
function uploadimg(){
    uploadImg1('newImg','img_show','imgs');
}
//上传图片
function uploadimg2(){
    uploadImg2('newImg2','img_show','imgUrl');
}
// 复制图片路径
function copy(val){
    var Url2=document.getElementById(val).innerText;
    var oInput = document.createElement('input');
    oInput.value = Url2;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    oInput.className = 'oInput';
    oInput.style.display='none';
    layer.msg('复制成功', {
        time: 1000 //2s后自动关闭
    });
}