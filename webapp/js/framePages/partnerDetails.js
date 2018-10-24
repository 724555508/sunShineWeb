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
obj.loginId = localStorage.loginId;
obj.token = localStorage.token;


var app = new Vue({
    el:'#adv',
    data:{
        companyname : '',
        useSign : 2,
        username : '',
        phoneNum : '',
        channel : '',//渠道数量
        bargainTime:'', //有效期
        bigNum : '',
        agencyCity : '',
        linkName : '',
        linkPhoneNum : '',
        grantNum : '',//授权号
        all : '',//所有设备
        sell : '',//已售设备
        repertory : '',
        partnerUrl:'#',
        id:"",
        agentName:'',
        areas:[],   //选择的城市区域以及areaID
        agentPhone:'',
        bargainEndTime:'',
        linkUserName:'',
        linkPhone:'',
        nature:'',
        companyname1:'',
        ids:[]   //选择区域的城市areaID

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
            var that = this;
            /**
             * ajax获取数据
             * */
            $.ajax({
                url:global_path + '/cms/agent/selectAgentUserInfo',
                type:'post',
                dataType:'json',
                data:obj,
                success:function (res) {
                    if(res.code == 200){
                        that.partnerDetails(res.data.cmsAgentUserBean);
                        that.initTable();
                        /*p3*/
                        that.all = res.data.map.all;
                        that.sell = res.data.map.sell;
                        that.repertory = res.data.map.all-res.data.map.sell;
                    }else {
                        layer.msg(res.msg,{
                            icon:2,
                            time:2000
                        })
                    }
                }
            });
        },
        partnerDetails:function (data) {
            this.companyname = data.companyname;
            this.useSign = data.useSign;
            this.username = data.username;
            this.phoneNum = data.phoneNum;
            this.channel = data.channel;
            this.bigNum = parseInt(data.channel)+1;
            this.bargainTime = data.bargainTime;
            this.agencyCity = data.agencyCity;
            this.linkName = data.linkName;
            this.linkPhoneNum = data.linkPhoneNum;
            this.grantNum = data.grantNum;
            this.partnerUrl = '../partner/addressManage.html?phoneNum='+data.phoneNum;
            this.id = data.id;
        },
        initTable:function () {
            var that = this;
            $('#logTable').DataTable({
            	bLengthChange: false, //去掉每页显示多少条数据方法
    	        "info":false, //去掉底部文字
                "lengthMenu": [[5, 10, 25, 50], [5, 10, 25, 50]], //分页长度选项,   -1 "全部"  暂时取消
                "paging": true, //分页
                "ordering": false, //排序
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
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "暂无数据",
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
                //"info": true, //通知
                ajax: function (data, callback, settings) {
                    obj.id = that.phoneNum;
                    obj.pageSize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
                    obj.startRow = data.start;//开始的记录序号
                    $.ajax({
                        url:global_path + '/cms/agent/selectloginLog',
                        type:'post',
                        dataType:'json',
                        data:obj,
                        success:function (res) {
                            checkToken(res);
                            if(res.code == 200){
                                var returnData = {};
                                returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                                returnData.recordsTotal = res.data.total;//返回数据全部记录
                                returnData.recordsFiltered = res.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                                returnData.data = res.data.logs;//返回的数据列表
                                callback(returnData);
                            }
                        }
                    });
                },
                columns: [
                    //序号
                    {
                        "data": null,
                        "bSortable": false
                    },
                    //上线时间
                    {
                        "data": "createTime",
                        "bSortable": false
                    },
                    //登录地点
                    {
                        "data": "ip",
                        "bSortable": false,
                        "render": function(data, type, full, meta) {
                            var node = "<a href='http://www.ip138.com/ips138.asp?ip="+full.ip+"' target='_blank' >"+full.ip+"</a>";
                            return node;
                        }
                    },
                    //设备
                    {
                        "data": "browserVersion",
                        "bSortable": false
                    }],
                    //操作
                    // {
                    //     "data": "",
                    //     "render": function(data, type, full, meta) {
                    //         var node = "<a href='advertisementEdit.html?id="+full.id+"' class='btn btn-xs btn-primary btn-skyBlueSmall'>查看</a>";
                    //         return node;
                    //     }
                    // }],
                "fnDrawCallback": function() { //序号
                    this.api().column(0).nodes().each(function(cell, i) {
                        cell.innerHTML = i + 1;
                    });
                }
            });
        },
        //      关闭弹框
        closeModel:function(){
            $(".modal").modal("hide");
        },
        /**
         * 点击编辑进行弹框  对弹框里面的内容初始化
         */
        edit:function(){
            $('#editModel').modal({backdrop: 'static', keyboard: false});
            var that = this;
            /**
             * ajax获取数据
             * */
            $.ajax({
                url:global_path + '/cms/agent/getAgentIdInfo',
                type:'post',
                dataType:'json',
                data:{
                    loginId:localStorage.loginId,
                    token:localStorage.token,
                    agentId:that.id
                },
                success:function (res) {
                    if(res.code === 200){
                        var beans = res.data.beans;
                        that.agentName = beans.agentName;  //负责人姓名
                        that.areas = beans.areas;    //负责区域
                        that.agentPhone = beans.agentPhone;    //负责人手机号
                        that.bargainEndTime = beans.bargainEndTime.slice(0,10); //  合同结束时间
                        that.linkUserName = beans.linkUserName;  //联系人
                        that.linkPhone = beans.linkPhone;    //联系人电话
                        that.nature = beans.nature;      //合伙人性质
                        // 初始化的城市id
                        that.ids = [];
                        for(var j = 0;j < that.areas.length;j++){
                            that.ids.push(that.areas[j].areaId);
                        }
                        console.log(that.ids);
                        /*初始化选中*/
                        if(that.nature === "1"){
                            $("#nature").find("option[value = '1']").attr("selected","selected");
                        }else if(that.nature === "2"){
                            $("#nature").find("option[value = '2']").attr("selected","selected");
                        }
                        that.companyname1 = beans.companyname;      //企业名称
                    }else {
                        layer.msg(res.msg,{
                            icon:2,
                            time:2000
                        })
                    }
                }
            });
        },
        /*删除某个区域  删除时 相对应的城市id也相应删除*/
        deleteMe:function(index){
            this.areas.splice(index,1);
            this.ids.splice(index,1);
            console.log(this.ids);
        },
        /**
         *
         *编辑确定
         */
        editSubmit:function(){
            var that = this;
            /**
             * ajax获取数据
             * */
            $.ajax({
                url:global_path + '/cms/agent/updateAgentInfo',
                type:'post',
                dataType:'json',
                data:{
                    loginId:localStorage.loginId,
                    token:localStorage.token,
                    id:that.id,
                    nature:$('#nature').val(),
                    companyname:that.companyname1,
                    agentName:that.agentName,
                    agentPhone:that.agentPhone,
                    bargainEndTime:that.bargainEndTime,
                    linkUserName:that.linkUserName,
                    linkPhone:that.linkPhone,
                    areas:JSON.stringify(that.ids)
                },
                success:function (res) {
                    if(res.code === 200){
                        layer.msg(res.msg);
                        that.closeModel();
                        setTimeout(function(){
                            window.location.reload();
                        },1000)
                    }else {
                        layer.msg(res.msg,{
                            icon:2,
                            time:2000
                        })
                    }
                }
            });
        },
    }
});

/**
 *选择区域
 * */
$('#selectArea').on('click',function () {
    $('#layerArea').modal({backdrop: 'static', keyboard: false});
    show_area_list();
});
/**
 * select选择行为
 * */
$('#selArea').bind('click', function () {
    var a = $(this);
    if(localStorage.sign != 1 && localStorage.sign !=0){
        if(a.val() == 1){
            $('#selectSheng').css('display','block');
            $('#selectShi').css('display','none');
            $('#selectQuxian').css('display','none');
        }else if(a.val() == 2){
            $('#selectSheng').css('display','block');
            $('#selectShi').css('display','none');
            $('#selectQuxian').css('display','none');
        }else if(a.val() == 3){
            $('#selectSheng').css('display','block');
            $('#selectShi').css('display','block');
            $('#selectQuxian').css('display','none');
        }
    }else {
        if(a.val() == 1){
            $('#selectSheng').css('display','block');
            $('#selectShi').css('display','none');
            $('#selectQuxian').css('display','none');
        }else if(a.val() == 2){
            $('#selectSheng').css('display','block');
            $('#selectShi').css('display','block');
            $('#selectQuxian').css('display','none');
        }else if(a.val() == 3){
            $('#selectSheng').css('display','block');
            $('#selectShi').css('display','block');
            $('#selectQuxian').css('display','block');
        }
    }

});
/**
 * 地区列表
 * */
function show_area_list() {
    $.ajax({
        url: global_path + '/cms/area/queryArea',
        type:'post',
        data: {
            "loginId":localStorage.loginId,
            "token": localStorage.token
        },
        dataType:'json',
        success:function(result){
            checkToken(result);
            if(result.code === 200){
                if(result.data.flag === true){
                    $('#selectSheng').html(template('shengJs',result));
                }else if(result.data.flag === false){
                    $('.areaLevel').attr('disabled','disabled');
                    $('#selArea').val('3');
                    $('#selectShi').css('display','block');
                    $('#selectSheng').html(template('shengJs',result));
                }
            }else{
                layer.msg('获取地区失败!',{
                    icon:2,
                    time:1000
                });
            }
        }
    });
}
$('#selectSheng').bind('click',function () {
    /*选择市*/
    $.ajax({
        url: global_path + '/cms/area/queryArea',
        type:'post',
        data: {
            "loginId":localStorage.loginId,
            "token": localStorage.token,
            "areaParentId":$(this).val()
        },
        dataType:'json',
        success:function(result){
            checkToken(result);
            if(result.code == 200){
                $('#selectShi').html(template('shiJs',result));
            }else{
                layer.msg('获取地区失败!',{
                    icon:2,
                    time:1000
                });
            }
        }
    });
});
$('#selectShi').bind('click',function () {
    /*选择区县*/
    $.ajax({
        url: global_path + '/cms/area/queryArea',
        type:'post',
        data: {
            "loginId":localStorage.loginId,
            "token": localStorage.token,
            "areaParentId":$(this).val()
        },
        dataType:'json',
        success:function(result){
            checkToken(result);
            if(result.code == 200){
                $('#selectQuxian').html(template('quJs',result));
            }else{
                layer.msg('获取地区失败!',{
                    icon:2,
                    time:1000
                });
            }
        }
    });
});

/**
 * 确认区域 添加到区域Box
 * */
$('#subArea').on('click',function () {
    var areaSign = $('#selArea').val();
    var areaName1,aeraId1;
    if(localStorage.sign != 1 && localStorage.sign !=0){
        if(areaSign == 1){

        }else if(areaSign == 2){
            areaName1 = $('#selectSheng option:selected').html();
            aeraId1 = $('#selectSheng').val();
        }else if(areaSign == 3){
            areaName1 = $('#selectShi option:selected').text();
            aeraId1 = $('#selectShi ').val();
        }
    }else {
        if(areaSign == 1){
            areaName1 = $('#selectSheng option:selected').html();
            aeraId1 = $('#selectSheng').val();
        }else if(areaSign == 2){
            areaName1 = $('#selectShi option:selected').text();
            aeraId1 = $('#selectShi ').val();
        }else if(areaSign == 3){
            areaName1 = $('#selectQuxian option:selected').text();
            aeraId1 = $('#selectQuxian').val();
        }
    }
    // var node = '<div class="areaItem" title="点击删除" data="'+aeraId+'" id="'+aeraId+'">'+areaName+
    //             '<img src="../../imgs/iframeImgs/delete1.png">'+
    //     '</div>';
    // $('#allArea').html( $('#allArea').html() + node);
    // 选择好以后填充到已选区域
    app.areas.push({areaId:aeraId1,areaName:areaName1}); //把添加城市区域以及城市id追加到areas数组里面
    app.ids = [];   //把城市areaId放到数组里面
    for(var j = 0;j < app.areas.length;j++){
        app.ids.push(app.areas[j].areaId);
    }
    console.log(app.ids);
    $('#selectShi').css('display','none');
    //关闭模态窗
    $('#layerArea').modal('hide');
});