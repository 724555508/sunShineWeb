var app = new Vue({
    el: '#app',
    data: {
        list: [],
        operateContent: '', //处理内容
        id: '',//要处理的id
        pageNum:"",   //总页数
        current:1,   //当前页数
        shownum:10   //每页显示几条
    },
    mounted: function () {
        this.getListData();
        // this.getListData();

    },
    methods: {
        getListData: function () {
            var that = this;
            // that.current = that.current++;
            $.ajax({
                url:global_path + '/cms/index/selectUserAdvice',
                type:'post',
                dataType:'json',
                data:{
                    loginId:localStorage.loginId,
                    token:localStorage.token,
                    isDeal:$('#selectVal').val(),
                    startRow:(that.current-1) * that.shownum,
                    pageSize:that.shownum
                },
                success:function (res) {
                    checkToken(res);
                    if(res.code == 200){
                        that.list = res.data.list;
                        that.total = res.data.total;
                        if(res.data.total % that.shownum == 0){
                            that.pageNum = res.data.total/ that.shownum;  //总页数=总数据条数/每页展示条数
                        }else if(res.data.total % that.shownum !== 0){
                            that.pageNum = parseInt(res.data.total/ that.shownum) + 1;  //总页数=总数据条数/每页展示条数
                        }
                        that.getPage();
                    }else{
                        layer.msg(res.msg);
                    }
                }
            });
        },
        /**
         * 分页
         */
        getPage:function(){
            var that = this;
            console.log(that.pageNum);
            $(".zxf_pagediv").createPage({
                pageNum: that.pageNum,  //总页数
                // current: that.current,   //当前页
                // shownum: that.shownum,     //每页显示个数，最小值5
                backfun: function(e) {
                    console.log(e);
                    that.current = e.current;
                    $.ajax({
                        url:global_path + '/cms/index/selectUserAdvice',
                        type:'post',
                        dataType:'json',
                        data:{
                            loginId:localStorage.loginId,
                            token:localStorage.token,
                            isDeal:$('#selectVal').val(),
                            startRow:(that.current-1) * that.shownum,
                            pageSize:that.shownum
                        },
                        success:function (res) {
                            checkToken(res);
                            if(res.code == 200){
                                that.list = res.data.list;
                                if(res.data.total % that.shownum == 0){
                                    that.pageNum = res.data.total / that.shownum;
                                }else if(res.data.total % that.shownum !== 0){
                                    that.pageNum = parseInt(res.data.total / that.shownum) + 1;
                                }
                            }else{
                                layer.msg(res.msg);
                            }
                        }
                    });
                }
            });
        },
        /**
         * 关闭弹层
         * */
        closeBox: function () {
            var _this = this;
            _this.operateContent = '';
            $('.dealBox').slideUp(500);
        },
        /**
         * 打开弹层
         * */
        openBox: function () {
            $('.dealBox').slideDown(500);
        },
        /**
         * 点击查看消息详情
         * */
        openMsg: function (id, event) {
            var _this = this;
            _this.id = id;
            $(event.currentTarget).css('background','#eee');
            $(event.currentTarget).siblings().css('background','#fff');
            $(event.currentTarget).children('.content').fadeToggle(500);
            $(event.currentTarget).siblings().children('.content').fadeOut(500);
            //修改data-sign的值
            var sign = $(event.currentTarget).find('.line1').attr('data-sign');
            if(sign === '0'){
                $('.list .line1').attr('data-sign','0');
                $(event.currentTarget).find('.line1').attr('data-sign','1');
                $(event.currentTarget).find('.up').css({'display':'inline'}).siblings('.down').css({'display':'none'});
            }else {
                $(event.currentTarget).find('.line1').attr('data-sign','0');
                $(event.currentTarget).find('.up').css({'display':'none'}).siblings('.down').css({'display':'inline'});
            }
            $(event.currentTarget).siblings().find('.up').css({'display':'none'}).siblings('.down').css({'display':'inline'});

        },
        /**
         * 确定处理
         * */
        addDeal: function () {
            var _this = this;
            layer.confirm('确定处理吗？', {
                btn: ['确定','取消'] //按钮
            }, function(){
                $.ajax({
                    url:global_path + '/cms/index/dealUserAdvice',
                    type:'post',
                    dataType:'json',
                    data:{
                        loginId:localStorage.loginId,
                        token:localStorage.token,
                        ID: _this.id,
                        content: _this.operateContent
                    },
                    success:function (res) {
                        checkToken(res);
                        if(res.code === 200){
                            _this.getListData();
                            _this.closeBox();
                            layer.msg('处理成功！');
                        }else {
                            layer.msg(res.msg);
                        }
                    }
                })
            }, function(){
                layer.msg('已取消', {
                    time: 2000
                });
            });

        },
        /**
         * 点击搜索
         */
        search:function(){
            this.getListData();
            this.list = [];
        }
    }
});
