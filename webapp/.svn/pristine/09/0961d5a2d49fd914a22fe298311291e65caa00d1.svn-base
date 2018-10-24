var app = new Vue({
    el: '#main',
    data: {
        cmsOutUsers:[],
        sign1:0,
        mark1:0,
        allCount:'0',
        dealCount:'0',
        notDealCount:'0',
        list:[],
        sign2:0,
        mark2:0,
        arrData:[],
        boCount:'0',
        bpCount:'0',
        hrCount:'0',
        notRemind:'0',
        remind:'0'
    },
    mounted: function () {
        this.leftGetUserInfo();
        this.rightGetUserInfo();
    },
    methods: {
        /**
         * 向上滚动
         * 获取第一个li的高度，向上margin-top -li的高度，然后移到ul的最后一个li下面
         * setInterval定时器 每个x秒执行一次，用animate做滚动效果
         * */
        initPage: function () {
            var _this = this,
                lH = 110;
            _this.sign1 = _this.cmsOutUsers.length;
            // $('.left').css({'height': $('.right').height()});
            setInterval(function(){
                $('.left .list li').eq(0).animate({marginTop: -lH,opacity: 0},'slow',function(){
                    $('.left .list li').eq(0).css('margin-top','').appendTo('.left .list').animate({opacity:1});
                });
                // _this.mark1 ++;
                // if(_this.mark1 === _this.sign1){
                //     window.location.reload();
                // }
            },5000);
        },
        initPage1: function () {
            var _this = this,
                lH = 110;
            _this.sign2 = _this.list.length;
            // $('.left').css({'height': $('.right').height()});
            setInterval(function(){
                $('.right .list li').eq(0).animate({marginTop: -lH,opacity: 0},'slow',function(){
                    $('.right .list li').eq(0).css('margin-top','').appendTo('.right .list').animate({opacity:1});
                });
                // _this.mark2 ++;
                // if(_this.mark2 === _this.sign2){
                //     window.location.reload();
                // }
            },5000);
        },
        // 左边用户数据
        leftGetUserInfo:function(){
            var that = this;
            $.ajax({
                url: global_path +'/cms/wearUser/getLossUserMapData',
                type: 'post',
                dataType: 'json',
                data: {
                    loginId: localStorage.loginId,
                    token: localStorage.token
                },
                success: function (res) {
                    if(res.code === 200){
                        // 左边用户列表数据
                        that.cmsOutUsers = res.data.cmsOutUsers;
                        // 失联状态管理统计数
                        var map = res.data.map;
                        that.allCount = map.allCount;
                        that.dealCount = map.dealCount;
                        that.notDealCount = map.notDealCount;
                        that.initPage();

                    }else {
                        layer.msg(res.msg);
                    }
                },
                error: function () {
                    layer.msg('网络异常');
                }
            })
        },
        //右边用户数据
        rightGetUserInfo:function(){
            var that = this;
            $.ajax({
                url: global_path +'/cms/wearUser/getExceptionDataMap',
                type: 'post',
                dataType: 'json',
                data: {
                    loginId: localStorage.loginId,
                    token: localStorage.token
                },
                success: function (res) {
                    if(res.code === 200){
                        // 右边用户列表数据
                        that.list = res.data.list;
                        // // 数据异常用户监控
                        var countMap = res.data.countMap;
                        that.boCount = countMap.boCount;
                        that.bpCount = countMap.bpCount;
                        that.hrCount = countMap.hrCount;
                        that.notRemind = countMap.notRemind;
                        that.remind = countMap.remind;
                        that.initPage1();
                    }else {
                        layer.msg(res.msg);
                    }
                },
                error: function () {
                    layer.msg('网络异常');
                }
            })
        },
    }
});