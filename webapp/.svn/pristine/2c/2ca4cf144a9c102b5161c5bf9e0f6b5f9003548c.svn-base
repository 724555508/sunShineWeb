var app = new Vue({
    el: '#app',
    data: {
        clock: '2018年5月8日 12:35:49',
        nameList1: [],
        nameList2: [],
        AllAgentNum: '',
        AllAgent_1_Num: '',
        AllAgent_2_Num: '',
        appUser_MonthToAdd_Top10: '',
        wearUserTop10: '',
        wearUser_MonthToAdd_Top10: '',
        wearUser_MonthToAdd_Top10ArrName: [],
        wearUser_MonthToAdd_Top10ArrVal: [],
        appUser_MonthToAdd_Top10ArrName: [],
        appUser_MonthToAdd_Top10ArrVal: [],
        wearUserTop10ArrName: [],
        wearUserTop10ArrVal: [],
        nameListA: ['无锡市','台州市','济南市','泰安市','晋城市','新疆','东莞市','沈阳市','吉林市','沧州市','唐山市'],
        colors: [
            '#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C',
            '#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD',
            '#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819',
            '#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C',
            '#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD',
            '#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819',
            '#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C',
            '#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD',
            '#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819',
            '#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819',
            '#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C',
            '#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD',
            '#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819',
            '#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C',
            '#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD',
            '#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819','#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819',
            '#429321','#F76B1C','#C86DD7','#009EFD','#F5576C','#F09819'
        ],

    },
    mounted: function () {
        //获取地图信息+图表信息
        this.getMapNameList();
       /* //六十分钟刷新一次
        setInterval(this.reload,3600000);*/
        //时钟
        this.nowTime();
        //时钟每秒变化
        setInterval(this.nowTime,1000);
    },
    methods: {
        getMapNameList: function () {
            var _this = this;
            var map = new AMap.Map("container", {
                mapStyle: 'amap://styles/3231a5f32a73ec49563e93e31ae8d136', //style url  ||开发者key和ID绑定
                zoom: 5,                //缩放等级    level
                zoomEnable:true,           //是否可滚轮缩放
                dragEnable: true,          //是否可拖拽
                resizeEnable: true,         //是否监控地图容器尺寸变化
                keyboardEnable: false,      //键盘控制  '↑' '→' '↓' '←'
                doubleClickZoom: false,     //地图是否可通过双击鼠标放大地图
                center: [114.165808,35.005532]     //坐标  x左加右减    y上减下加    center
            });
            //数据加载
            $.ajax({
                url: global_path + '/cms/agent/getAllAgentShowAreaName',
                type: 'post',
                dataType: 'json',
                data: {
                    loginId: localStorage.loginId,
                    token: localStorage.token
                },
                success: function (res) {
                    checkToken(res);
                    if(res.code === 200){
                        //一级合伙人区域
                        _this.nameList1 = res.data.nameList1;
                        //二级合伙人区域
                        _this.nameList2 = res.data.nameList2;
                        //一级合伙人区域加载
                        for(let i = 0; i < _this.nameList1.length; i ++){
                            _this.loadArea(map,_this.nameList1[i],_this.colors[i]);
                        }
                        //二级合伙人区域加载
                        for(let j = 0; j < _this.nameList2.length; j ++){
                            _this.loadArea(map,_this.nameList2[j],_this.colors[j]);
                        }
                        // for(let j = 0; j < _this.nameListA.length; j ++){
                        //     console.log(_this.nameListA[j]);
                        //     _this.loadArea(map,_this.nameListA[j],_this.colors[j]);
                        // }
                        //总数
                        _this.AllAgentNum = res.data.AllAgentNum;
                        //一级合伙人数
                        _this.AllAgent_1_Num = res.data.AllAgent_1_Num;
                        //二级合伙人数
                        _this.AllAgent_2_Num = res.data.AllAgent_2_Num;
                        //各城市每月佩戴用户增长
                        _this.wearUser_MonthToAdd_Top10 = res.data.wearUser_MonthToAdd_Top10;
                        for(let a = 0; a < _this.wearUser_MonthToAdd_Top10.length; a ++){
                            _this.wearUser_MonthToAdd_Top10ArrName.push(_this.wearUser_MonthToAdd_Top10[a].areaName);
                            _this.wearUser_MonthToAdd_Top10ArrVal.push(_this.wearUser_MonthToAdd_Top10[a].wearUserNum);
                        }
                        //各城市每月佩戴用户增长柱状图
                        _this.cityWearUserAdd();
                        //月app排行前十
                        _this.appUser_MonthToAdd_Top10 = res.data.appUser_MonthToAdd_Top10;
                        for(let b = 0; b < _this.appUser_MonthToAdd_Top10.length; b ++){
                            _this.appUser_MonthToAdd_Top10ArrName.push(_this.appUser_MonthToAdd_Top10[b].areaName);
                            _this.appUser_MonthToAdd_Top10ArrVal.push(_this.appUser_MonthToAdd_Top10[b].appUserNum);
                        }
                        //各城市每月APP用户增长
                        _this.cityAppAdd();
                        //用户总量前十城市
                        _this.wearUserTop10 = res.data.wearUserTop10;
                        for(let c = 0; c < _this.wearUserTop10.length; c ++){
                            _this.wearUserTop10ArrName.push(_this.wearUserTop10[c].areaName);
                            _this.wearUserTop10ArrVal.push(_this.wearUserTop10[c].channelNum);
                        }
                        //用户总量前十城市
                        _this.cityTotalUserAdd();
                    }else {
                        layer.msg(res.msg);
                    }
                }
            });

        },
        /**
         * 行政区域加载
         * */
        loadArea: function (map,addName,color) {
            //加载行政区划插件
            AMap.service('AMap.DistrictSearch', function() {
                var opts = {
                    subdistrict: 1,   //返回下一级行政区
                    extensions: 'all',  //返回行政区边界坐标组等具体信息
                    level: 'city'  //查询行政级别为市
                };
                //实例化DistrictSearch
                district = new AMap.DistrictSearch(opts);
                district.setLevel('district');
                //行政区查询
                district.search(''+ addName +'', function(status, result) {
                    var bounds = result.districtList[0].boundaries;
                    var polygons = [];
                    if (bounds) {
                        for (var i = 0, l = bounds.length; i < l; i++) {
                            //生成行政区划polygon
                            var polygon = new AMap.Polygon({
                                map: map,
                                strokeWeight: 1,
                                path: bounds[i],
                                fillOpacity: 0.3,
                                // fillColor: 'rgba(255,0,0,0.6)',
                                fillColor: color,
                                strokeColor: '#ccc'
                            });
                            polygons.push(polygon);
                        }
                        // map.setFitView();//地图自适应
                    }
                });
            });
        },
        /**
         *各城市每月佩戴用户增长
         * */
        cityWearUserAdd: function () {
            var _this = this;
            /**
             *配置项
             * */
            var helpPersonCounts = echarts.init(document.getElementById('cityWearUserAdd'));
            //指定图表的配置项和数据
            var option = {
                //标题
                title:{
                    text:'各城市本月佩戴用户增长',
                    left: '20px',
                    top: 10,
                    textStyle:{
                        color: 'rgba(155,155,155,1)',
                        fontWeight: 100,
                        fontSize: 20
                    }
                },
                //tooltip
                tooltip: {
                    trigger: 'axis'
                },
                //大小边距调整
                grid:{
                    left: "40px",
                    right:"20px",
                    top:"70px",
                    bottom:"55px",
                    containLabel:false
                },
                //x轴
                xAxis:{
                    type: 'category',
                    data: _this.wearUser_MonthToAdd_Top10ArrName,
                    splitNumber: 10,
                    boundaryGap: true,
                    splitLine:{
                        show:false
                    },
                    axisLabel: {
                        interval:0,
                        rotate: 40,
                        fontSize: 12
                    },
                    axisTick: {
                        show: false//是否显示轴刻度
                    },
                    axisLine: { //x轴颜色
                        lineStyle: {
                            color: "rgba(255,255,255,0.4)"
                        }
                    }
                },
                //y轴
                yAxis:{
                    show: true,
                    type: 'value',
                    splitLine: { //y轴分割线
                        show: true,
                        lineStyle:{
                            type:'dotted',
                            color: "rgba(255,255,255,0.2)"
                        }
                    },
                    axisLine: { //y轴颜色
                        show: false,
                        lineStyle: {
                            color: "rgba(255,255,255,0)"
                        }
                    },
                    axisTick: {
                        show: false//是否显示y轴刻度
                    }
                },
                //数据
                series:[{
                    name:'数量',
                    type:'bar',
                    data: _this.wearUser_MonthToAdd_Top10ArrVal,
                    barWidth : 12,          //柱子宽度
                    itemStyle: {
                        normal: {
                            //顶端显示value值 0则不显示
                           /* label: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: "14"
                                },
                                formatter:function(params){
                                    if(params.value === '0'){
                                        return '';
                                    }else
                                    {
                                        return params.value;
                                    }
                                }
                            },*/
                            //颜色设置 循环
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#0096FF'},
                                    {offset: 0.5, color: '#0096FF'}
                                ]
                            )
                        }
                    }
                }]
            };
            //实用刚才指定的配置项和数据显示图表
            helpPersonCounts.setOption(option);
        },
        /**
         *各城市每月APP用户增长
         * */
        cityAppAdd: function () {
            var _this = this;
            /**
             *配置项
             * */
            var helpPersonCounts = echarts.init(document.getElementById('cityAppAdd'));
            //指定图表的配置项和数据
            var option = {
                //标题
                title:{
                    text:'各城市本月APP用户增长',
                    left: '20px',
                    top: 10,
                    textStyle:{
                        color: 'rgba(155,155,155,1)',
                        fontWeight: 100,
                        fontSize: 20
                    }
                },
                //tooltip
                tooltip: {
                    trigger: 'axis'
                },
                //大小边距调整
                grid:{
                    left: "40px",
                    right:"20px",
                    top:"70px",
                    bottom:"55px",
                    containLabel:false
                },
                //x轴
                xAxis:{
                    type: 'category',
                    data: _this.appUser_MonthToAdd_Top10ArrName,
                    // splitNumber: 7,
                    boundaryGap: true,
                    splitLine:{
                        show:false
                    },
                    axisTick: {
                        show: false//是否显示轴刻度
                    },
                    axisLabel: {
                        interval:0,
                        rotate: 40,
                        fontSize: 12
                    },
                    axisLine: { //x轴颜色
                        lineStyle: {
                            color: "rgba(255,255,255,0.4)"
                        }
                    }
                },
                //y轴
                yAxis:{
                    show: true,
                    type: 'value',
                    splitLine: { //y轴分割线
                        show: true,
                        lineStyle:{
                            type:'dotted',
                            color: "rgba(255,255,255,0.2)"
                        }
                    },
                    axisLine: { //y轴颜色
                        show: false,
                        lineStyle: {
                            color: "rgba(255,255,255,0)"
                        }
                    },
                    axisTick: {
                        show: false//是否显示y轴刻度
                    }
                },
                //数据
                series:[{
                    name:'数量',
                    type:'bar',
                    data: _this.appUser_MonthToAdd_Top10ArrVal,
                    barWidth : 12,          //柱子宽度
                    itemStyle: {
                        normal: {
                            //顶端显示value值 0则不显示
                            /*label: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: "14"
                                },
                                formatter:function(params){
                                    if(params.value === '0'){
                                        return '';
                                    }else
                                    {
                                        return params.value;
                                    }
                                }
                            },*/
                            //颜色设置 循环
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#7ED321'},
                                    {offset: 0.5, color: '#7ED321'}
                                ]
                            )
                        }
                    }
                }]
            };
            //实用刚才指定的配置项和数据显示图表
            helpPersonCounts.setOption(option);
        },
        /**
         *用户总量前十城市
         * */
        cityTotalUserAdd: function () {
            var _this = this;
            /**
             *配置项
             * */
            var helpPersonCounts = echarts.init(document.getElementById('cityTotalUserAdd'));
            //指定图表的配置项和数据
            var option = {
                //标题
                title:{
                    text:'用户总量本月前十城市',
                    left: '20px',
                    top: 10,
                    textStyle:{
                        color: 'rgba(155,155,155,1)',
                        fontWeight: 100,
                        fontSize: 20
                    }
                },
                //tooltip
                tooltip: {
                    trigger: 'axis'
                },
                //大小边距调整
                grid:{
                    left: "40px",
                    right:"20px",
                    top:"70px",
                    bottom:"55px",
                    containLabel:false
                },
                //x轴
                xAxis:{
                    type: 'category',
                    data: _this.wearUserTop10ArrName,
                    // splitNumber: 7,
                    boundaryGap: true,
                    splitLine:{
                        show:false
                    },
                    axisTick: {
                        show: false//是否显示轴刻度
                    },
                    axisLabel: {
                        interval:0,
                        rotate: 40,
                        fontSize: 12
                    },
                    axisLine: { //x轴颜色
                        lineStyle: {
                            color: "rgba(255,255,255,0.4)"
                        }
                    }
                },
                //y轴
                yAxis:{
                    show: true,
                    type: 'value',
                    splitLine: { //y轴分割线
                        show: true,
                        lineStyle:{
                            type:'dotted',
                            color: "rgba(255,255,255,0.2)"
                        }
                    },
                    axisLine: { //y轴颜色
                        show: false,
                        lineStyle: {
                            color: "rgba(255,255,255,0)"
                        }
                    },
                    axisTick: {
                        show: false//是否显示y轴刻度
                    }
                },
                //数据
                series:[{
                    name:'数量',
                    type:'bar',
                    data: _this.wearUserTop10ArrVal,
                    barWidth : 12,          //柱子宽度
                    itemStyle: {
                        normal: {
                            //顶端显示value值 0则不显示
                            /*label: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: "14"
                                },
                                formatter:function(params){
                                    if(params.value === '0'){
                                        return '';
                                    }else
                                    {
                                        return params.value;
                                    }
                                }
                            },*/
                            //颜色设置 循环
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#EA4A4A'},
                                    {offset: 0.5, color: '#EA4A4A'}
                                ]
                            )
                        }
                    }
                }]
            };
            //实用刚才指定的配置项和数据显示图表
            helpPersonCounts.setOption(option);
        },
        /**
         * 获取时间函数
         * 获取时间 "yyyy-MM-dd HH:MM:SS"
         * */
        /**
         * 显示本地时钟
         * */
        nowTime: function () {
            var _this = this;
            var date = new Date();
            var y = date.getFullYear();
            var mon = date.getMonth() + 1;
            var d = date.getDate();
            var h = date.getHours();
            var min = date.getMinutes();
            var s = date.getSeconds();
            h < 10 ? h = '0' + h : h;
            min < 10 ? min = '0' + min : min;
            s < 10 ? s = '0' + s : s;
            _this.clock = y + '年' + mon + '月' + d + '日 ' + h + ':' + min + ':' + s;
        },
        /**
         * 页面刷新
         * */
        reload: function () {
            window.location.reload();
        }
    }
});