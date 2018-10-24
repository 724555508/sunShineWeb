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
        channelName:'',  //频道名字
        loginId:localStorage.loginId,
        token:localStorage.token
    },
    mounted: function() {
        this.dataTables();
    },
    computed: {

    },
    methods: {

        dataTables: function () {
            var that = this;
            $('#ChannelTable').DataTable({
                bLengthChange: false, //去掉每页显示多少条数据方法
                "info":false, //去掉底部文字
                "lengthMenu": [[5, 10, 25, 50], [5, 10, 25, 50]], //分页长度选项,   -1 "全部"  暂时取消
                "paging": false, //分页
                "ordering": false, //排序
                // bStateSave:true,    //操作数据后局部刷新停留在当前页面
                "bSort": false,     //排序
                "bFilter": true, //过滤功能
                "order": [], //[[ 1, "desc" ]]默认排序 第三列
                iDisplayLength: 10,
                destroy: true, //如果需要重新加载的时候请加上这个
                "pagingType": "full_numbers", //分页样式
                "bDeferRender":true,        //     *  当该属性设置为true时，表格每一行新增的元素只有在需要被画出来时才会被DataTable创建出来
                //"scrollY": "auto", //设置高度
                //"scrollCollapse": true, //超出 滑动
                "bJQueryUI":true,      //      是否启用jQueryUI样式
                bProcessing:false,   //加载动画
                "bServerSide": true, //服务端分页
                //            "aaSorting": [[4, "desc"]],
                searching: false, //禁用原生搜索
                "language": { //语言配置
                    "sSearch": "搜索",
                    //          "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "没有检索到数据",
                    "sInfo": "第 _START_ 至 _END_ 条数据 &nbsp;&nbsp;共 _TOTAL_ 条",
                    "sInfoEmpty": "没有数据",
                    "sProcessing": "<img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511524485514&di=7914d6ce1d41cf99f546d04b0c6c3133&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01e423569d041532f875520fd65760.gif'/>", //这里是给服务器发请求后到等待时间显示的 加载gif
                    "sInfoFiltered": "(筛选自 _MAX_ 条数据)",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "前一页",
                        "sNext": "后一页",
                        "sLast": "末页"
                    }
                },
                ajax: function (data, callback, settings) {
                    // var obj = {};
                    // obj.pageSize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
                    // obj.startRow = data.start;//开始的记录序号
                    // obj.loginId = localStorage.loginId;
                    // obj.token = localStorage.token;
                    // obj.input = that.inputText;
                    // obj.type = that.sendObj.type;
                    //ajax请求数据
                    $.ajax({
                        type: "post",
                        url: global_path + "/cms/information/listInformationType",
                        cache: false,  //禁用缓存
                        //传入组装的参数
                        data: {
                            loginId :localStorage.loginId,
                            token:localStorage.token
                        },
                        dataType: "json",
                        success: function (res) {
                            if(res.code === 200){
                                var returnData = {};
                                returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                                returnData.recordsTotal = res.data.total;//返回数据全部记录
                                returnData.recordsFiltered = res.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                                returnData.data = res.data.list;//返回的数据列表
                                callback(returnData);

                            }
                        },
                        error:function(){

                        }
                    });
                },
                columns: [
                    //序号
                    {
                        "data": null,
                        "bSortable": false,
                        "bVisible":false //隐藏列
                    },
                    //频道名称
                    {
                        "data": "typeName",
                        "bSortable": false
                    },
                    //文章数量
                    {
                        "data": "articleNum",
                        "bSortable": false
                    },
                    //显示数量
                    {
                        "data": "showNum",
                        "bSortable": false
                    },
                    //推荐数量
                    {
                        "data": "isHotNum",
                        "bSortable": false
                    },
                    // 顺序
                    {
                        "data": "remark",
                        "bSortable": false,
                        "render":function (data, type, full, meta) {
                            // debugger;
                            var node = '';
                            if(full.useSign === 0){
                                node = '/';
                            }else {
                                if(meta.row == 0){
                                         node = '<div class="changeDirection">' +
                                         '<div onclick="changeLocation('+full.id+',-1)"><img src="../../imgs/iframeImgs/throwBottom.png" alt=""></div>' +
                                         '</div>';
                                 }else if(meta.row == (meta.settings.aiDisplay.length -1)){
                                         node = '<div class="changeDirection">' +
                                        '<div onclick="changeLocation('+full.id+',1)"><img src="../../imgs/iframeImgs/throwUp.png" alt=""></div>' +
                                        '</div>';
                                 }else{
                                         node = '<div class="changeDirection">' +
                                    '<div onclick="changeLocation('+full.id+',1)"><img src="../../imgs/iframeImgs/throwUp.png" alt=""></div>' +
                                    '<div onclick="changeLocation('+full.id+',-1)"><img src="../../imgs/iframeImgs/throwBottom.png" alt=""></div>' +
                                    '</div>';
                                 }
                            }
                            return node;
                        }
                    },
                    //操作
                    {
                        "data": "",
                        "render": function(data, type, full, meta) {
                            var node = "<a href='contentList.html?type="+full.id+"' class='check'>查看</a>";
                            return node;
                        }
                    }],
                "fnDrawCallback": function() { //序号
                    this.api().column(0).nodes().each(function(cell, i) {
                        cell.innerHTML = i + 1;
                    });
                }
            })
        },

        //      关闭弹框
        closeModel:function(){
            $(".modal").modal("hide");
        },
        // 点击添加弹框
        addChannel:function(){
            $('#createChannel').modal({backdrop: 'static', keyboard: false});
        },
        // 点击确定中的添加按钮
        addSubmit:function(){
            var _this = this;
            $.ajax({
                type: "post",
                url: global_path + "/cms/information/saveInformationType",
                cache: false,  //禁用缓存
                //传入组装的参数
                data: {
                    loginId :localStorage.loginId,
                    token:localStorage.token,
                    typeName:_this.channelName,
                    imgUrl:$("#bgImg").attr("src")
                },
                dataType: "json",
                success: function (res) {
                    if(res.code === 200){
                        $("#bgImg").attr('src','https://i.iandun.com:8085/'+res.coverImg);
                        _this.closeModel();
                        layer.msg(res.msg,{time:300},function () {
                            location.reload();
                        });
                    }else if(res.code === 100){
                        layer.msg(res.msg);
                    }
                },
                error:function(){

                }
            });
        }

    }
});


function uploadimg(){
    uploadImg1('newImg','img_show','imgs');
}

// 点击顺序
function changeLocation(id, sign) {
    $.ajax({
        url: global_path + '/cms/information/orderByInformationType',
        type: 'post',
        dataType: 'json',
        data: {
            informationTypeId: id,
            Up_Down: sign,
            loginId: localStorage.loginId,
            token: localStorage.token
        },
        success: function (res) {
            checkToken(res);
            if(res.code === 200){
                layer.msg(res.msg);
                app.dataTables();
            }else {
                layer.msg(res.msg);
            }
        }
    })

}
