var obj = {};
var url = window.location.search; //截取"?"以及之后的所有字符串
var str = url.substring(1, url.length); //去除"?"
var arr = str.split('&'); //根据&分割成数组   ["key=value","name=xxx"]
for(var i = 0; i < arr.length; i++) {
    obj[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
}
obj.loginId = localStorage.loginId;
obj.token = localStorage.token;
console.log(obj)
//隐藏部分数据
var app = new Vue({
    el: '#app',
    data: {
        deviceId:obj.deviceId,
        inputText:'',
        arrCity:[],   //窜货市场城市数组
        arrCount:[],   //窜货市场数量
        max:'',
        max2:'',
        arr2City:[],   //被窜货市场城市数组
        arr2Count:[],    //被窜货市场城市数组
        all:'0',
        complaint:'0',
        notDeal:'0',

    },
    mounted: function() {
        this.dataTables();

    },
    computed: {

    },
    methods: {
        // 表格
        dataTables: function () {
            var that = this;
            $('#crossRegionTable').DataTable({
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
                    that.arrCity = [];
                    that.arrCount = [];
                    that.arr2City = [];
                    that.arr2Count = [];
                    var obj = {};
                    obj.pageSize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
                    obj.startRow = data.start;//开始的记录序号
                    obj.loginId = localStorage.loginId;
                    obj.token = localStorage.token;
                    obj.input = that.inputText;
                    obj.searchSign = $('#selectVal').val();
                    //ajax请求数据
                    $.ajax({
                        type: "post",
                        url: global_path + "/cms/transregionalAnalysis/listTransregionalAnalysis",
                        cache: false,  //禁用缓存
                        //传入组装的参数
                        data:obj,
                        dataType: "json",
                        success: function (res) {
                            if(res.code === 200){
                               /* header数据*/
                               var topNum = res.data.topNum;
                               that.all = topNum.all;  //总数量
                               that.complaint = topNum.complaint;    //申诉中数量
                               that.notDeal = topNum.notDeal;    //未处理数量
                                // 窜货市场柱状图数据
                                var crossRegionData = res.data.fleeGoodsTop_20;
                                for(var i=0;i<crossRegionData.length;i++){
                                    that.arrCity.push(crossRegionData[i].areaName);
                                    that.arrCount.push(crossRegionData[i].count);
                                }
                                that.max = Math.max.apply( Math, that.arrCount );  //找到窜货市场数量中的最大值
                                // 被窜货市场柱状图数据
                                var byCrossAegionData = res.data.beFleeGoodsTop_20;
                                for(var i=0;i<byCrossAegionData.length;i++){
                                    that.arr2City.push(byCrossAegionData[i].areaName);
                                    that.arr2Count.push(byCrossAegionData[i].count);
                                }
                                that.max2 = Math.max.apply( Math, that.arr2Count );  //找到被窜货市场数量中的最大值
                                that.bar1();
                                that.bar2();
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
                    //型号
                    {
                        "data": "deviceVersion",
                        "bSortable": false
                    },
                    //设备号
                    {
                        "data": "deviceId",
                        "bSortable": false
                    },
                    //窜货市场
                    {
                        "data": "areaName",
                        "bSortable": false
                    },
                    //被窜市场
                    {
                        "data": "beFleeGoodsAreaName",
                        "bSortable": false
                    },
                    // 分析日期
                    {
                        "data": "endTime",
                        "bSortable": false,

                    },
                    //佩戴人
                    {
                        "data": "wearUserName",
                        "bSortable": false
                    },
                    //状态
                    {
                        "data": "",
                        "bSortable": false,
                        "render":function (data, type, full, meta) {
                          var node = '';
                          if(full.status === 3){
                              node =  '<div class="status">'+
                                        '<div class="radius"></div>申诉中'+
                                        '</div>'
                          }else {
                              if(full.dealResult === 0){
                                  node =  '<div class="status">'+
                                      '<div class="radius"></div>未处理'+
                                      '</div>'
                              }else if(full.dealResult === 1){
                                  node =  '<div class="status">'+
                                      '<div class="radius"></div>未处理'+
                                      '</div>'
                              }else if(full.dealResult === 2){
                                  node =  '<div class="status">'+
                                      '<div class="radius"></div>已赔偿'+
                                      '</div>'
                              }else if(full.dealResult === 3){
                                  node =  '<div class="status" style="color:#389E0D;">'+
                                            '已和解'+
                                            '</div>'
                              }else if(full.dealResult === 4){
                                  node =  '<div class="status" style="color:#389E0D;">'+
                                            '已撤销'+
                                           '</div>'
                              }
                          }
                          return node;
                      }
                    },
                    //超出时间
                    {
                        "data": "timeOut",
                        "bSortable": false
                    },
                    //操作
                    {
                        "data": "",
                        "render": function(data, type, full, meta) {
                            var node = "<a href='crossRegionAnalysis.html?deviceId="+full.deviceId+"' class='check'>查看</a>";
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
        /**
         * 窜货市场柱状图
         */
        bar1:function(){
            var that = this;
            // that.max = '';
            var barCanvas = echarts.init(document.getElementById('crossRegionBar'));
            // app.title = '坐标轴刻度与标签对齐';

            option = {
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '0%',
                    top:'7%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : that.arrCity,
                        axisLabel: {
                            interval: 0,
                            inside: false,
                            // rotate: 30, 文本装不下时，让斜着显示
                            textStyle: {
                                color: '#4D4D4D',
                                fontSize:'13px'
                            }
                        },
                        axisLine: {
                            show: false
                        },
                        type : 'category',
                        axisTick: {
                            alignWithLabel: true,
                            show: false
                        }
                    }
                ],
                yAxis : [
                    {
                        min:0,
                        max: 200,
                        // max:that.max+30,
                        type : 'value',
                        axisLine: {   //y轴颜色
                            lineStyle: {
                                color: "#fff"
                            }
                        },
                        splitLine:{
                            show:true,
                            lineStyle:{
                                color:'#E2E9F1',  //页面间隔横线颜色
                                width: 1
                            }
                        }

                    }
                ],
                series : [
                    {
                        name:'直接访问',
                        type:'bar',
                        barWidth: '52px',
                        itemStyle:{
                            normal:{
                                color:'#85A5FF',  //柱子颜色
                                barBorderRadius:[2,2,0,0],   //柱状图圆角
                                //顶端显示value值 0则不显示
                                label: {
                                    show: true,
                                    position: 'top',  //顶端显示value值 0则不显示
                                    textStyle: {
                                        color: ' #4D4D4D',  //每个主子上方数字的颜色
                                        fontSize: "15"
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
                        data:that.arrCount
                    }
                ]
            };

            barCanvas.clear();
            //配置项生成统计图
            barCanvas.setOption(option);
        },
        /**
         * 被窜货市场柱状图
         */
        bar2:function(){
            var that = this;
            // that.max2 = '';
            var barCanvas = echarts.init(document.getElementById('byCrossRegionBar'));
            // app.title = '坐标轴刻度与标签对齐';

            option = {
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '0%',
                    top:'7%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data :  that.arr2City,
                        axisLabel: {
                            interval: 0,
                            inside: false,
                            // rotate: 30, 文本装不下时，让斜着显示
                            textStyle: {
                                color: '#4D4D4D',
                                fontSize:'13px'
                            }
                        },
                        axisLine: {
                            show: false
                        },
                        type : 'category',
                        axisTick: {
                            alignWithLabel: true,
                            show: false
                        }
                    }
                ],
                yAxis : [
                    {
                        min:0,
                        max: 200,
                        // max:that.max2+30,
                        type : 'value',
                        axisLine: {   //y轴颜色
                            lineStyle: {
                                color: "#fff"
                            }
                        },
                        splitLine:{
                            show:true,
                            lineStyle:{
                                color:'#E2E9F1',  //页面间隔横线颜色
                                width: 1
                            }
                        }

                    }
                ],
                series : [
                    {
                        name:'直接访问',
                        type:'bar',
                        barWidth: '52px',
                        itemStyle:{
                            normal:{
                                color:' #5CDBD3',  //柱子颜色
                                barBorderRadius:[2,2,0,0],   //柱状图圆角
                                //顶端显示value值 0则不显示
                                label: {
                                    show: true,
                                    position: 'top',  //顶端显示value值 0则不显示
                                    textStyle: {
                                        color: ' #4D4D4D',  //每个主子上方数字的颜色
                                        fontSize: "15"
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
                        data: that.arr2Count
                    }
                ]
            };

            barCanvas.clear();
            //配置项生成统计图
            barCanvas.setOption(option);
        },

        // 点击搜索
        search:function(){
            this.dataTables();
            // this.inputText = '';
        },
        // 点击全部
        all1:function(){
            this.inputText = '';
            $('#selectVal').val('');
            this.dataTables();
        },
        /*点击窜货地图进行跳转页面*/
        crossRegionMap:function(){
            window.open('crossRegionMap.html');
        },
        /*点击窜货地图进行跳转页面*/
        crossRegionMap1:function(){
            window.open('crossRegionMap.html');
        },
        /*导出excel*/
        exportExcel:function(){
            window.open(global_path + '/cms/service/exportSOSExcel?' + "loginId=" + localStorage.loginId + "&token=" + localStorage.token + "&startTime=" + $('#startTime').val() + "&endTime=" + $('#endTime').val());
        }
    },


});