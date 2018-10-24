/**
 * Created by zxm01 on 2017/12/14.
 * author:zxm
 * Social account: 843631992
 * mail:zxm0146@163.com
 * weChat:xuan0146
 */
var app = new Vue({
    el: '#app',
    data: {
        sign: localStorage.sign,
        loginId: localStorage.loginId,
        token: localStorage.token,
        weekArr: [],        //折线图使用
        dayArr: [],         //折线图使用
        green: 0,           //统计用
        brown: 0,           //统计用
        orange: 0,          //统计用
        gray: 0,            //统计用
        red: 0,             //统计用
        infoWindow: '',     //
        zoom: '',           //缩放等级
        center: [],         //中心点
        devicesInfo: '',    //
        marker: '',         //点创建
        allNum: 0,          //全国
        localNum: 0,        //本地
        actualNum: 0,       //在线
        partnerList: [],    //合伙人列表
        selected: '0',
        addressName: '安顿'
    },
    mounted: function () {
        this.default();
    },
    methods:{
        default: function () {
            var _this = this;
            //本地时间
            setInterval(_this.nowTime,1000);
            //补折线图周数据
            _this.weekArr = [
                this.getNowFormatDate(35),
                this.getNowFormatDate(28),
                this.getNowFormatDate(21),
                this.getNowFormatDate(14),
                this.getNowFormatDate(7),
                this.getNowFormatDate(0)
            ];
            //补柱状图日数据
            _this.dayArr = [
                this.getNowFormatDate(5),
                this.getNowFormatDate(4),
                this.getNowFormatDate(3),
                this.getNowFormatDate(2),
                this.getNowFormatDate(1),
                this.getNowFormatDate(0)
            ];
            //数据置零
            _this.green = 0;
            _this.brown = 0;
            _this.red = 0;
            _this.orange = 0;
            _this.gray = 0;
            //获取地图数据
            _this.getAllData();
            //获取pic数据
            _this.picAjax();
            //加载一次合伙人列表
            // _this.nameList();
            //30分钟刷新一次地图
            setInterval(_this.locationReload,600000);
        },
        /**
         * 显示本地时钟
         * */
        nowTime: function () {
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
            var needTime = y + '年' + mon + '月' + d + '日 ' + h + ':' + min + ':' + s;
            $('.nowTime').text(needTime);
        },
        /**
         * 页面刷新
         * 每隔x分钟刷新一次页面
         * 获取最新实时位置
         * */
        locationReload: function (){
            window.location.reload();
        },
        /**ajax获取
         * data.deviceLocations.devicesInfo 集合点
         * data.deviceLocations.all 所有用户
         * data.deviceLocations.agentAll   本地用户
         * data.deviceLocations.agentOnlineAll  在线用户
         * */
        getAllData: function () {
            var _this = this;
            $.ajax({
                url: global_path + '/Agent/BigShow/selectLocationByLoginId',
                type: 'post',
                data: {
                    loginId: _this.loginId,
                    token: _this.token
                },
                dataType: 'json',
                success: function(result){
                    checkToken(result);
                    if(result.code == 200){
                        _this.allNum = result.data.map.allNum;
                        _this.localNum = result.data.map.localNum;
                        _this.actualNum = result.data.map.actualNum;
                        _this.devicesInfo = result.data.deviceLocationVos; //data获取集合值
                        _this.zoom = result.data.agent.showZoom;
                        _this.center = result.data.agent.showLatlon.split(',');
                        _this.addressName = result.data.agent.showAreaname;
                        //地图
                        _this.setMap(_this.zoom,_this.center,_this.devicesInfo);        //地图1
                    }else{
                        layer.msg(result.msg);
                    }
                }
            });
        },
        /**
         * 地图1
         * */
        setMap: function (zoom,center,data){
            var _this = this;
            var level = parseInt(zoom);
            //初始化地图对象，加载地图
            var map = new AMap.Map("container", {
                mapStyle: 'amap://styles/3231a5f32a73ec49563e93e31ae8d136', //style url  ||开发者key和ID绑定
                zoom:level,        //缩放等级    level
                zoomEnable:false,           //是否可滚轮缩放
                dragEnable: true,       //是否可拖拽
                resizeEnable: true,         //是否监控地图容器尺寸变化
                keyboardEnable: false,      //键盘控制  '↑' '→' '↓' '←'
                doubleClickZoom: false,     //地图是否可通过双击鼠标放大地图
                center: center   //坐标  x左加右减    y上减下加    center
            });
            infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
            for (var i = 0; i < data.length; i++) {
                var url;        //图片
                var str = data[i].location;
                var arr = str.split(',');
                if(data[i].healthLevel == 1){           //健康
                    _this.green ++;
                    url = '../../imgs/mapImages/green01.png';
                }else if(data[i].healthLevel == 2){     //亚健康
                    _this.orange ++;
                    url = '../../imgs/mapImages/orange01.png';
                }else if(data[i].healthLevel == 3){     //疾病
                    _this.brown ++;
                    url = '../../imgs/mapImages/red01.png';
                }else if(data[i].healthLevel == 4){     //正在救护
                    _this.red ++;
                    url = '../../imgs/mapImages/nowHelpYellow.png';
                }else{                                  //未知状态，设置正在分析
                    _this.gray ++;
                    url = '../../imgs/mapImages/blue01.png';
                }

                _this.marker = new AMap.Marker({
                    position: arr,
                    map: map,
                    icon: new AMap.Icon({
                        size: new AMap.Size(18, 18),  //图标大小
                        image: url,
                        imageOffset: new AMap.Pixel(0, 0)
                    })
                });
            }
            /**
             * 无锡老总吹牛逼临时需求需地图上无锡区域加人至一千七百多
             *判断账号，账号对上之后此代码生效
             * */
            if(localStorage.loginId == 18653186188){
                /**
                 * 去掉第二个地图图例说明
                 * */
                $('.bottomImgEx2').hide();
                var url;
                for(var m = 0; m < 1600; m ++){
                    var x = Math.floor(Math.random() * data.length);
                    var arrx = data[x].location.split(',')[0];
                    var arry = data[x].location.split(',')[1];
                    if(Math.random() < 0.5){
                        var arr = [arrx - 1 + 1.1 * Math.random(),arry - 1 + 1.2 * Math.random()];
                    }else {
                        var arr = [arrx - 0.1 * Math.random(),arry - 0.2 * Math.random()];
                    }
                    var r = Math.random();
                    if( r< 0.5){
                        _this.green ++;
                        url = '../../imgs/mapImages/green01.png';
                    }else if(r < 0.7){
                        _this.orange ++;
                        url = '../../imgs/mapImages/orange01.png';
                    }else if(r < 0.75){
                        _this.gray ++;
                        url = '../../imgs/mapImages/red01.png';
                    }else {
                        _this.gray ++;
                        url = '../../imgs/mapImages/blue01.png';
                    }
                    _this.marker = new AMap.Marker({
                        position: arr,
                        map: map,
                        icon: new AMap.Icon({
                            size: new AMap.Size(18, 18),  //图标大小
                            image: url,
                            imageOffset: new AMap.Pixel(0, 0)
                        })
                    });
                }
                $('#agentOnlineAll').text(_this.green + _this.red);
                $('#allPeople').text('2596');
            }

            //加载行政区划插件
            // _this.addArea(map,'清河县','rgba(0,0,0,0.5)');
        },
        /**
         * 加载行政区域
         * */
        addArea: function (map,addName,color) {
            //加载行政区划插件
            AMap.service('AMap.DistrictSearch', function() {
                var opts = {
                    subdistrict: 1,   //返回下一级行政区
                    extensions: 'all',  //返回行政区边界坐标组等具体信息
                    level: 'city'  //查询行政级别为 市
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
                                fillOpacity: 0.7,
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
         * 折线图ajax
         * */
        picAjax: function (){
            var _this = this;
            $.ajax({
                url:global_path+'/Agent/BigShow/selectTheRightImgData',
                type:'post',
                data:{
                    loginId: _this.loginId,
                    token: _this.token
                },
                dataType:'json',
                success:function(result){
                    checkToken(result);
                    if(result.code == 200){
                        var avtiveArr = result.data.list.reverse();    //创建一个数组存每日救助    .reverse()数组倒序。
                        _this.activeUser(avtiveArr);       //每周激活设备数量
                        var dayHelpPeopleArr = result.data.list2.reverse();    //创建一个数组存每日救助    .reverse()数组倒序。
                        _this.helpPersonCounts(dayHelpPeopleArr);         //每日报警人数
                        var dataMap = result.data.map;        //男女分布比例
                        var arr = [];
                        //循环遍历用户分布数据（后改为男女比例分布）
                        for(var key in dataMap){
                            var obj = {};
                            obj.name = key;
                            obj.value = dataMap[key];
                            arr.push(obj);
                        }
                        _this.userAreaPart(arr);
                    }else{
                        layer.msg(result.msg);
                    }
                }
            });
        },
        /**
         * 每周激活设备数量 折线图
         * */
        activeUser: function (activeCounts){
            var _this = this;
            /**
             * 无锡老总吹牛逼临时需求需地图上无锡区域加人至一千七百多
             *判断账号，账号对上之后此代码生效
             * */
            if(localStorage.loginId == 18653186188){
                activeCounts = [120,66,59,49,85,69]
            }

            var activeUser = echarts.init(document.getElementById('activeUser'));
            var option = {
                //标题
                title:{
                    text:'每周激活设备数量',
                    left: '20px',
                    top: 10,
                    textStyle:{
                        color: '#fff',
                        fontWeight: '100',
                        fontSize: 14
                    }
                },
                //工具箱
                /*toolbox:{
                 show:true,
                 feature:{
                 saveAsImage:{
                 show:true       //是否显示下载图片
                 },
                 dataView:{
                 show:true       //数据图表
                 },
                 restore:{
                 show:true       //还原
                 },
                 dataZoom:{
                 show:true       //区域缩放
                 },
                 magicType:{
                 type:['line','bar'] //动态类型切换
                 }
                 }
                 },*/
                //图例
                /*legend:{
                 top: 'bottom',
                 data:['激活人数'],
                 textStyle:{
                 color: '#fff'
                 }
                 },*/
                //tooltip
                tooltip: {
                    trigger: 'axis'
                },
                //x轴
                xAxis:{
                    type: 'category',
                    data: _this.weekArr,
                    splitNumber: 7,
                    boundaryGap: false,
                    splitLine:{
                        show:false
                    },
                    axisLine: { //x轴颜色
                        lineStyle: {
                            color: "rgba(255,255,255,0.6)"
                        }
                    }
                },
                //大小边距调整
                grid:{
                    left: "12%",
                    right:"12%",
                    top:"30%",
                    bottom:"15%",
                    containLabel:false
                },
                //y轴
                yAxis:{
                    show: true,
                    type: 'value',
                    splitLine: { //y轴分割线
                        show: true,
                        lineStyle:{
                            type:'dotted',
                            color:'rgba(255,255,255,0.2)'
                        }

                    },
                    axisLine: { //y轴颜色
                        show: false,
                        lineStyle: {
                            color: "rgba(255,255,255,0.6)"
                        }
                    },
                    /*axisTick: {
                     show: true//是否显示y轴刻度
                     },*/
                    axisLabel: { //强制显示
                        interval: 0,
                        textStyle: { //y轴标签颜色
                            color: "rgba(255,255,255,0.6)"
                        }
                    }
                },
                //数据
                series:[
                    {
                        name:'激活人数',
                        type:'line',            //折线图
                        //symbol: 'none', //去掉每个点的小圆点标记
                        lineStyle:{
                            normal:{
                                color:'#0096FF'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(11,120,227,0.8)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(11,120,227,0.3)'
                                }])
                            }
                        },
                        data:activeCounts,
                        color: 'red',
                        markPoint:{
                            /*data:[
                             {type:'max',name:'最大值'},
                             {type:'min',name:'最小值'}
                             ]*/
                        },
                        smooth: true //是否平滑曲线显示
                        /*markLine:{
                         data:[
                         {type:'average',name:'平均值'}
                         ]
                         }*/
                    }
                ]
            };
            //实用刚才指定的配置项和数据显示图表
            activeUser.setOption(option);
        },
        /**
         * 每日健康风险用户数量 柱状图
         * */
        helpPersonCounts: function (helpData){
            var _this = this;
            /**
             * 无锡老总吹牛逼临时需求需地图上无锡区域加人至一千七百多
             *判断账号，账号对上之后此代码生效
             * */
            if(localStorage.loginId == 18653186188){
                helpData = [45,33,152,49,56,21]
            }
            /**
             *配置项
             * */
            var helpPersonCounts = echarts.init(document.getElementById('helpPersonCounts'));
            //指定图表的配置项和数据
            var option = {
                //标题
                title:{
                    text:'每日健康风险用户数量',
                    left: '20px',
                    top: 10,
                    textStyle:{
                        color: '#fff',
                        fontWeight: 100,
                        fontSize: 14
                    }
                },
                //tooltip
                tooltip: {
                    trigger: 'axis'
                },
                //图例
                /* legend:{
                 top: 'bottom',
                 data:['人数'],
                 textStyle:{
                 color: '#fff'
                 }
                 },*/
                //大小边距调整
                grid:{
                    left: "12%",
                    right:"12%",
                    top:"30%",
                    bottom:"15%",
                    containLabel:false
                },
                //x轴
                xAxis:{
                    type: 'category',
                    data: _this.dayArr,
                    splitNumber: 7,
                    boundaryGap: false,
                    splitLine:{
                        show:false
                    },
                    axisLine: { //x轴颜色
                        lineStyle: {
                            color: "rgba(255,255,255,0.6)"
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
                            type:'dotted'
                        }
                    },
                    axisLine: { //y轴颜色
                        show: false,
                        lineStyle: {
                            color: "rgba(255,255,255,0.6)"
                        }
                    },
                    /*axisTick: {
                     show: true//是否显示y轴刻度
                     },*/
                    axisLabel: { //强制显示
                        interval: 0,
                        textStyle: { //y轴标签颜色
                            color: "rgba(255,255,255,0.6)"
                        }
                    }
                },
                //数据
                series:[{
                    name:'人数',
                    type:'bar',
                    data: helpData,
                    barWidth : 10,          //柱子宽度
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
                                    if(params.value==0){
                                        return '';
                                    }else
                                    {
                                        return params.value;
                                    }
                                }
                            },*/
                            //颜色设置 循环
                            color: function (params){
                                var colorList = ['#0096FF'];
                                return colorList[params.dataIndex];
                            }
                        }
                    }
                }]
            };
            //实用刚才指定的配置项和数据显示图表
            helpPersonCounts.setOption(option);
        },
        /**
         * 用户性别分布 饼状图图
         * */
        userAreaPart: function (data){
            /**
             * 无锡老总吹牛逼临时需求需地图上无锡区域加人至一千七百多
             *判断账号，账号对上之后此代码生效
             * */
            if(localStorage.loginId == 18653186188){
                data = [
                    {
                        name:'女',
                        value: 785
                    },
                    {
                        name:'男',
                        value: 864
                    }
                ]
            }
            /**
             * 配置项
             * */
            var userAreaPart = echarts.init(document.getElementById('userAreaPart'));
            var option = {
                /*标题、副标题、位置*/
                title:{
                    text:'用户性别分布',
                    left: '20px',
                    top: 10,
                    textStyle:{
                        color: '#fff',
                        fontWeight: '100',
                        fontSize: 14
                    }
                },
                /*鼠标悬浮提示*/
                tooltip : {
                    trigger: 'item'
                },
                /*图例*/
                legend: {
                    orient: 'vertical', //竖排
                    left: 'left',   //位置
                    //data: ['海淀区','朝阳区','门头沟'],  //名称列表
                    textStyle:{
                        color: '#fff'
                    }
                },
                //大小边距调整
                grid:{
                    left: "12%",
                    right:"12%",
                    top:"30%",
                    bottom:"15%",
                    containLabel:false
                },
                series : [
                    {
                        name: '用户男女比例分布统计',
                        color:['#F5A623', '#B8E986','#50E3C2','#AAFFE2','#FF0000','#7B9966','#CC33CC','#3300FF'],
                        hoverAnimation:true,    //扇形打开效果
                        startAngle:150,         //起始角度
                        roseType: false,
                        type: 'pie',
                        radius: ['40%', '60%'],
                        center: ['50%', '60%'], //位置：x轴 y轴
                        data:data,
                        tooltip:{
                            formatter:'{b}:{c}人,占比{d}%'
                        },
                        labelLine:{
                            normal:{
                                lineStyle:{
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0, color: '#fff' // 0% 处的颜色
                                        }, {
                                            offset: 1, color: '#fff' // 100% 处的颜色
                                        }],
                                        globalCoord: false // 缺省为 false
                                    }
                                }
                            }
                        },
                        /*显示百分比*/
                        itemStyle: {
                            normal: {
                                borderWidth: 3,
                                borderColor: 'rgba(31,31,31,0.8)',
                                label:{
                                    show: true,
                                    formatter: '{b}({d}%)'
                                },
                                labelLine :{show:true}
                            }
                        }
                    }
                ]
            };
            userAreaPart.setOption(option);
        },
        /**
         * 获取时间函数
         * 获取时间 "yyyy-MM-dd HH:MM:SS"
         * */
        getNowFormatDate: function (timePart) {
            var date = new Date(new Date()-timePart*24*60*60*1000);
            var seperator1 = "/";
            var month = (date.getMonth() + 1) < 10? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);
            var day = date.getDate() < 10? ("0" + date.getDate()) : date.getDate();
            var currentdate = month + seperator1 + day;
            return currentdate;
        },
        /**
         * 点击切换合伙人
         * 显示该合伙人地图区域以及相应数据
         * */
        nameList: function () {
            var _this = this;
            $.ajax({
                url: global_path + '/Agent/BigShow/getAgentSimpleList',
                type: 'post',
                data: {
                    loginId: _this.loginId,
                    token: _this.token
                },
                dataType: 'json',
                success: function (res) {
                    checkToken(res);
                    if(res.code === 200){
                        _this.partnerList = res.data.list;
                    }else {
                        layer.msg(res.msg);
                    }
                }
            })
        },
        /**
         * 点击切换合伙人
         * 显示该合伙人地图区域以及相应数据
         * */
        changeMap: function () {
            var _this = this;
            _this.loginId = _this.selected.split('/')[0];
            _this.token = _this.selected.split('/')[1];
            _this.default();

        }
    }
});
