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
// 超管和客服有权限
if (localStorage.sign == '0' || localStorage.sign == '1'){
    $("#box").show();
}else {
    $("#box").hide();
    $('#attention').hide();
}
var app = new Vue({
    el:'#app',
    data: {
        sign:localStorage.sign,
        areaName:[],
        value1:[],
        value2:[],
        AllApp:'0',
        AllAttention:'0',
        AllVipUser:'0',
        AllWearUser:'0',
        max1: 0,
        max2: 0,
        theDayWearUser:'0',
        theMonthWearUser:'0',
        theDayAppUser:'0',
        theMonthAppUser:'0',
        barOneX: [],
        barOneY: [],
        barTwoX: [],
        barTwoY: [],
        loseInCount:'0',
        AbnormalData:'0'
    },
    mounted:function(){
       this.init();
    },
    methods:{
        init:function(){
            this.initTable();
        },
        initTable:function(){
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
                "bServerSide": false, //服务端分页
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
                    obj.pageSize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
                    obj.startRow = data.start;//开始的记录序号
                    $.ajax({
                        url:global_path + '/cms/wearUser/getUserCenterData',
                        type:'post',
                        dataType:'json',
                        data:obj,
                        success:function (res) {
                            checkToken(res);
                            if(res.code == 200){
                                var list = res.data.data;
                                that.areaName = [];   //地区名
                                that.value1 = [];     //bar柱状图显示的值
                                that.value2 = [];     //bar2柱状图显示的值
                                var info = res.data.map;
                                that.AllApp = info.AllApp;  //app用户
                                that.AllAttention = info.AllAttention;  //关注用户
                                that.AllVipUser = info.AllVipUser; //vip用户
                                that.AllWearUser = info.AllWearUser; //佩戴用户
                                that.loseInCount = info.loseInCount; //失联用户
                                that.AbnormalData = info.AbnormalData; //数据异常用户
                                for(var i=0;i<list.length;i++){
                                    that.areaName.push(list[i].areaName.length > 2 ? list[i].areaName.substring(0,2) : list[i].areaName); //地区名字的个数大于2，截取前两位
                                    that.value1.push(list[i].wearUserNum == undefined ? 0 : list[i].wearUserNum);   //bar柱状图的值如果没有 会返回undefined 那么让值为0
                                    that.value2.push(list[i].appUserNum == undefined ? 0 : list[i].appUserNum);   //bar2柱状图的值如果没有 会返回undefined 那么让值为0
                                }
                                that.max1 = Math.max.apply( Math, that.value1 );  //找到value1的最大值
                                that.max2 = Math.max.apply( Math, that.value2 );   //找到value1的最大值
                                //柱图数据
                                for(var x = 0; x < list.length; x ++){
                                    if(list[x].wearUserNum !== '0'){
                                        that.barOneX.push(list[x].areaName);
                                        that.barOneY.push(list[x].wearUserNum);
                                    }
                                    if(list[x].appUserNum !== '0'){
                                        that.barTwoX.push(list[x].areaName);
                                        that.barTwoY.push(list[x].appUserNum);
                                    }
                                }

                                that.bar();
                                that.bar2();
                                that.theDayWearUser = res.data.map2.theDayWearUser; //新增用户今日新增
                                that.theDayAppUser = res.data.map2.theDayAppUser; //新增app用户今日新增
                                that.theMonthAppUser = res.data.map2.theMonthAppUser;  //新增app用户本月新增
                                that.theMonthWearUser = res.data.map2.theMonthWearUser;  //新增用户本月新增
                                var returnData = {};
                                // returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                                // returnData.recordsTotal = res.data.total;//返回数据全部记录
                                // returnData.recordsFiltered = res.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                                returnData.data = res.data.data;//返回的数据列表
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
                    //城市
                    {
                        "data": "areaName",
                        "bSortable": false
                    },
                    //合伙人
                    {
                        "data": "agentName",
                        "bSortable": false
                    },
                    //二级渠道
                    {
                        "data": "channelNum",
                        "bSortable": false
                    },
                    //佩戴用户
                    {
                        "data": "wearUserNum",
                        "bSortable": false
                    },
                    // APP用户
                    {
                        "data": "appUserNum",
                        "bSortable": false
                    }
                    // //登录地点
                    // {
                    //     "data": "",
                    //     "bSortable": false,
                    //     "render": function(data, type, full, meta) {
                    //         var node = "<a href='http://www.ip138.com/ips138.asp?ip="+full.ip+"' target='_blank' >"+full.ip+"</a>";
                    //         return node;
                    //     }
                    // },
                    // //设备
                    // {
                    //     "data": "browserVersion",
                    //     "bSortable": false
                    // }
                ],
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
        bar:function(){
            var that = this;
            that.max = '';
            var barCanvas = echarts.init(document.getElementById('barCanvas'));
            // app.title = '坐标轴刻度与标签对齐';

            option = {
                color: ['#3398DB'],
                // backgroundColor:'#f5f5f5',
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '50px',
                    top:'5%',
                    containLabel: true
                },
               /* dataZoom:{
                    type:'inside',
                    start: 0,
                    end: 100
                },*/
                xAxis : [{
                    data :that.barOneX,
                    axisLabel: {
                        interval: 0,
                        inside: false,
                        rotate: 30,
                        textStyle: {
                            color: '#4D4D4D',
                            fontSize:'13px'
                        }
                    },
                    axisLine: {
                        show: false
                    },

                    // z: 10,
                    type : 'category',

                    axisTick: {
                        alignWithLabel: true,
                        show: false
                    }
                }],
                yAxis : [
                    {
                        min:0,
                        max:that.max+10,
                        type : 'value',
                        axisLine: { //y轴颜色
                            lineStyle: {
                                color: "#fff"
                            }
                        },
                        splitLine:{
                            show:true,
                            lineStyle:{
                                color:'#E2E9F1',
                                width: 1
                            }
                        }

                    }
                ],
                series : [
                    {
                        name:'新增佩戴用户',
                        type:'bar',
                        barWidth: '20',
                        itemStyle:{
                            normal:{
                                color:'#85A5FF',
                                barBorderRadius:[2,2,0,0],
                                //顶端显示value值 0则不显示
                                label: {
                                    show: true,
                                    position: 'top',  //顶端显示value值 0则不显示
                                    textStyle: {
                                        color: '#4D4D4D',
                                        fontSize: "13"
                                    },
                                    formatter: function(params) {
                                        //params.value === 1 ||
                                        if ( params.value == 0) {
                                            return '';
                                        } else {
                                            return params.value;
                                        }
                                    }
                                },
                            }
                        },
                        data:that.barOneY
                    }
                ]
            };
            barCanvas.clear();
            //配置项生成统计图
            barCanvas.setOption(option);
        },
        bar2:function(){
            var that = this;
            var barCanvas = echarts.init(document.getElementById('barCanvas2'));
            // app.title = '坐标轴刻度与标签对齐';

            option = {
                color: ['#3398DB'],
                // backgroundColor:'#f5f5f5',
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '50px',
                    top:'10%',
                    containLabel: true
                },
              /*  dataZoom:{
                    type:'inside',
                    start: 0,
                    end: 60
                },*/
                xAxis : [
                    {
                        axisLabel: {
                            interval: 0,
                            inside: false,
                            rotate: 30,
                            textStyle: {
                                color: '#4D4D4D',
                                fontSize:'13px'
                            }
                        },
                        axisLine: {
                            show: false
                        },
                        // z: 10,
                        type : 'category',
                        data : that.barTwoX,
                        axisTick: {
                            alignWithLabel: true,
                            show: false
                        }
                    }
                ],
                yAxis : [
                    {
                        min: 0,
                        max: that.max + 10,
                        type : 'value',
                        axisLine: { //y轴颜色
                            lineStyle: {
                                color: "#fff"
                            }
                        },
                        splitLine:{
                            show:true,
                            lineStyle:{
                                color:'#E2E9F1',
                                width: 1
                            }
                        }

                    }
                ],
                series : [
                    {
                        name:'新增人数',
                        type:'bar',
                        barWidth: '20px',
                        itemStyle: {
                            normal: {
                                color:'#85A5FF',  //柱子颜色
                                barBorderRadius:[2,2,0,0],   //柱状图圆角
                                //顶端显示value值 0则不显示
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#4D4D4D',
                                        fontSize: "13"
                                    },
                                    formatter: function(params) {
                                        //params.value === 1 ||
                                        if ( params.value == 0) {
                                            return '';
                                        } else {
                                            return params.value;
                                        }
                                    }
                                },
                            },
                        },
                        data:that.barTwoY
                    }
                ]
            };
            barCanvas.clear();
            //配置项生成统计图
            barCanvas.setOption(option);
        }
    }
});