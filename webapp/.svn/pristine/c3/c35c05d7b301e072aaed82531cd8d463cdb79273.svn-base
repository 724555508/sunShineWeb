var obj = {};
var url = window.location.search; //截取"?"以及之后的所有字符串
var str = url.substring(1, url.length); //去除"?"
var arr = str.split('&'); //根据&分割成数组   ["key=value","name=zxm"]
for(var i = 0; i < arr.length; i++) {
    obj[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
}
obj.loginId = localStorage.loginId;
obj.token = localStorage.token;
console.log(localStorage.typeName);
//隐藏部分数据
var app = new Vue({
    el: '#app',
    data: {
        type:obj.type,
        loginId:localStorage.loginId,
        token:localStorage.token,
        coverImg:'',
        createTime:'',
        title:'',
        infoHtml:'',
        likecount:'0',
        readcount:'0',
        createId:'',
        isHot:'未推荐',
        show: true,
        isValue:'隐藏',
        list:[],  //评论列表
        total:'',
        startRowList:[0],
        typeName:localStorage.typeName,
        backUrl:'',
        commentCount:'0'
    },
    mounted: function() {
        this.init();
        this.backUrl = 'contentList.html?type=' + obj.type;
        this.commentList(0);
    },
    computed: {
        // 推荐未推荐的切换
        activeClass:function(){
            return {
                btn:this.isHot === '推荐',
                btn1:this.isHot === '未推荐'
            }
        },
        // 隐藏  显示的切换
        activeClass1:function(){
            return {
                btn3:this.isValue === '显示',
                btn4:this.isValue === '隐藏'
            }
        }
    },
    methods: {
        init:function () {
            var that = this;
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
                        that.commentCount = res.data.commentCount;
                        that.coverImg = 'https://i.iandun.com:8085/' + data.coverImg;
                        that.createTime = data.createTime;
                        that.title = data.title;
                        that.infoHtml = data.infoHtml;
                        that.readcount = data.readcount;
                        that.likecount = data.likecount;
                        that.createId  = data.createId;
                        that.isHot  = data.isHot;
                        if(that.isHot === 1){

                            that.isHot = '推荐';
                        }else{
                            that.isHot = '未推荐';
                        }
                        that.isValue  = data.userSign;
                        if(that.isValue === 0){

                            that.isValue = '隐藏';
                        }else{
                            that.isValue = '显示';
                        }
                    }else{
                        layer.msg(res.msg,{icon:2,time:2000});
                    }
                }
            })
        },
        // 点击推荐 /未推荐
        reCommend:function () {
            var that = this;
            $.ajax({
                type: "POST",
                url: global_path + '/cms/information/updateIsHot',
                data: {
                    "loginId": that.loginId,
                    "token": that.token,
                    "informationId":obj.informationId
                },
                dataType:'json',
                success: function(res){
                    checkToken(res);
                    if(res.code === 200){
                        layer.msg(res.msg,{icon:1,time:2000});
                        if(that.isHot === '推荐'){

                            that.isHot = '未推荐';
                        }else{
                            that.isHot = '推荐';
                        }
                    }else{
                        layer.msg(res.msg,{icon:2,time:2000});
                    }
                }
            })
        },
        // 点击编辑
        edit:function(){
            window.location.href = 'createContent.html?informationId=' + obj.informationId +'&type=' + obj.type;
        },
        //隐藏显示
        isHidden:function(){
            var that = this;
            $.ajax({
                type: "POST",
                url: global_path + '/cms/information/updateIsShow',
                data: {
                    "loginId": that.loginId,
                    "token": that.token,
                    "informationId":obj.informationId
                },
                dataType:'json',
                success: function(res){
                    checkToken(res);
                    if(res.code === 200){
                        layer.msg(res.msg,{icon:1,time:2000});
                        if(that.isValue === '显示'){
                            that.isValue = '隐藏';
                        }else{
                            that.isValue = '显示'
                        }
                    }else{
                        layer.msg(res.msg,{icon:2,time:2000});
                    }
                }
            })
        },
        // 删除内容
        deleteContent:function(){
            var that = this;
            layer.confirm('确认删除么', function(){
                $.ajax({
                    type: "POST",
                    url: global_path + '/cms/information/deleteInformation',
                    data: {
                        "loginId": that.loginId,
                        "token": that.token,
                        "informationId":obj.informationId
                    },
                    dataType:'json',
                    success: function(res){
                        checkToken(res);
                        if(res.code === 200){
                            layer.msg(res.msg,{icon:1,time:1500},function () {
                                window.history.go(-1);
                            });

                        }else{
                            layer.msg(res.msg,{icon:2,time:2000});
                        }
                    }
                })
            },function () {
                layer.msg("已取消");
            });

        },
        // 评论列表内容
        commentList:function(startRow){
            var that = this;
            $.ajax({
                type: "POST",
                url: global_path + '/cms/information/listComment',
                data: {
                    "loginId": that.loginId,
                    "token": that.token,
                    "informationId":obj.informationId,
                    'startRow':startRow
                },
                dataType:'json',
                success: function(res){
                    checkToken(res);
                    if(res.code === 200){
                        // 把 数据追加list
                        that.list = that.list.concat(res.data.list);
                        that.total = res.data.total;
                        console.log( this.total);
                        // 每次加载20条数据
                        if(startRow == 0){
                            if(that.total%20 == 0){
                                var num = parseInt( that.total/20);
                            }else{
                                var num = parseInt( that.total/20)+1;
                            }
                            // debugger;
                            for(var k = 1;k < num;k++){
                                that.startRowList.push(that.startRowList[that.startRowList.length-1]+20);
                            }
                            console.log( that.startRowList);
                        }


                    }else{
                        layer.msg(res.msg,{icon:2,time:2000});
                    }
                }
            })
        },
        // 加载更多
        loadMore:function(){
            console.log(this.startRowList.length);
            // 点击加载更多 删除数组第一个 显示条数为数组当前第一个
            if(this.startRowList.length !== 1){
                this.startRowList.splice(0,1);
                this.commentList(this.startRowList[0]);
            }else{
                layer.msg('没有更多数据了');
            }
        },
        // 删除某一条评论
        deleteComment:function(index){
            var that = this;
            layer.confirm('确定要删除么吗？', function(){

                $.ajax({
                    type: "POST",
                    url: global_path + '/cms/information/deleteComment',
                    data: {
                        "loginId": that.loginId,
                        "token": that.token,
                        "commentId":that.list[index].commentId
                    },
                    dataType:'json',
                    success: function(res){
                        checkToken(res);
                        if(res.code === 200){
                            layer.msg(res.msg,{icon:1,time:1500});
                            that.list.splice(index,1);   //删除当前行
                        }else{
                            layer.msg(res.msg,{icon:2,time:2000});
                        }
                    }
                })
            });


        }
    },


});