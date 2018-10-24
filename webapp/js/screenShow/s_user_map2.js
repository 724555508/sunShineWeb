/**
 * Created by zxm01 on 2017/12/14.
 * author:zxm
 * Social account: 843631992
 * mail:zxm0146@163.com
 * weChat:xuan0146
 */
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
        addressName: '安顿',
        isOffLine: 0
    },
    mounted: function () {
        this.default();
    },
    methods:{
        default: function () {
            var _this = this;
            //本地时间
            setInterval(_this.nowTime,1000);
            //数据置零
            _this.green = 0;
            _this.brown = 0;
            _this.red = 0;
            _this.orange = 0;
            _this.gray = 0;
            //获取地图数据
            _this.getAllData();
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
         * 每隔5分钟刷新一次页面
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
                    token: _this.token,
                    by:obj.by
                },
                dataType: 'json',
                success: function(result){
                    checkToken(result);
                    if(result.code === 200){
                        _this.allNum = result.data.map.allNum;
                        _this.localNum = result.data.map.localNum;
                        _this.actualNum = result.data.map.actualNum;
                        _this.devicesInfo = result.data.deviceLocationVos; //data获取集合值
                        _this.zoom = result.data.agent.showZoom;
                        _this.center = result.data.agent.showLatlon.split(',');
                        _this.addressName = result.data.agent.showAreaname;
                        //地图
                        _this.map2(_this.zoom,_this.center,_this.devicesInfo);       //地图2
                    }else{
                        layer.msg(result.msg);
                    }
                }
            });
        },

        /**
         * 地图2
         * */
        map2: function (zoom,center,data){
            var _this = this;
            var level = parseInt(zoom);
            //初始化地图对象，加载地图
            var normalMap = new AMap.Map("normalMap", {
                zoom:5,
                zoomEnable:true,          //是否可滚轮缩放
                dragEnable: true,          //是否可拖拽
                resizeEnable: true,         //是否监控地图容器尺寸变化
                keyboardEnable: false,      //键盘控制  '↑' '→' '↓' '←'
                doubleClickZoom: false,     //地图是否可通过双击鼠标放大地图
                center: [108.431072,35.621885]
            });
            /*循环遍历添加markers*/
            for (var i = 0; i < data.length; i++) {
                var str2 = data[i].location;
                var arr2 = str2.split(',');
                /*图标判断*/
                var url;
                if(data[i].healthLevel == 1){       //健康
                    _this.green ++;//累加器
                    if(data[i].gender == '1'){                      //健康男
                        url = '../../imgs/mapImages/mGreen3.jpg';
                    }else if(data[i].gender == '2'){                //健康女
                        url = '../../imgs/mapImages/mGreen2.jpg';
                    }else{                                          //健康未知性别
                        url = '../../imgs/mapImages/mGreen1.png';
                    }
                }else if(data[i].healthLevel == 2){ //亚健康
                    _this.orange ++;//累加器
                    if(data[i].gender == '1'){                      //亚健康男
                        url = '../../imgs/mapImages/mOrange3.jpg';
                    }else if(data[i].gender == '2'){                //亚健康女
                        url = '../../imgs/mapImages/mOrange2.jpg';
                    }else{                                          //亚健康未知性别
                        url = '../../imgs/mapImages/mOrange1.png';
                    }
                }else if(data[i].healthLevel == 3){ //疾病
                    _this.brown ++;//累加器
                    if(data[i].gender == '1'){                      //疾病男
                        url = '../../imgs/mapImages/mRed3.jpg';
                    }else if(data[i].gender == '2'){                //疾病女
                        url = '../../imgs/mapImages/mRed2.jpg';
                    }else{                                          //疾病无性别
                        url = '../../imgs/mapImages/mRed1.png';
                    }
                }else {
                    _this.gray ++;//累加器
                    if(data[i].gender == '1'){//掉线男
                        url = '../../imgs/mapImages/mBlue3.jpg';
                    }else if(data[i].gender == '2'){//掉线女
                        url = '../../imgs/mapImages/mBlue2.jpg';
                    }else{//掉线未知性别
                        url = '../../imgs/mapImages/mBlue1.png';
                    }
                }
                //判断离线
                if(data[i].isOffLine === '1'){
                    _this.isOffLine ++;
                }

                _this.marker = new AMap.Marker({
                    position: arr2,
                    map: normalMap,
                    icon: new AMap.Icon({
                        size: new AMap.Size(38, 48),  //图标大小
                        image: url,   //图标url
                        imageOffset: new AMap.Pixel(0, 0)   //偏移量
                    })
                });
                // normalMap.setFitView();   //地图自适应
            }

            /**
             * 无锡老总吹牛逼临时需求需地图上无锡区域加人至一千七百多
             *判断账号，账号对上之后此代码生效
             * */
            if(localStorage.loginId == 18653186188){
                var url;
                for(var m = 0; m < 1600; m ++){
                    var x = Math.floor(Math.random() * data.length);
                    var arrx = data[x].location.split(',')[0];
                    var arry = data[x].location.split(',')[1];
                    if(Math.random() < 0.5){
                        var arr = [arrx - 1 + 1.05 * Math.random(),arry - 1 + 1.2 * Math.random()];
                    }else {
                        var arr = [arrx - 0.05 * Math.random(),arry - 0.2 * Math.random()];
                    }
                    var r = Math.random();
                    if( r< 0.5){
                        if(Math.random() < 0.5){
                            url = '../../imgs/mapImages/mGreen3.jpg';
                        }else {
                            url = '../../imgs/mapImages/mGreen2.jpg';
                        }
                    }else if(r < 0.7){
                        if(Math.random() < 0.5){
                            url = '../../imgs/mapImages/mOrange3.jpg';
                        }else {
                            url = '../../imgs/mapImages/mOrange2.jpg';
                        }
                    }else if(r < 0.75){
                        if(Math.random() < 0.5){
                            url = '../../imgs/mapImages/mRed3.jpg';
                        }else {
                            url = '../../imgs/mapImages/mRed2.jpg';
                        }
                    }else {
                        if(Math.random() < 0.5){
                            url = '../../imgs/mapImages/mBlue3.jpg';
                        }else {
                            url = '../../imgs/mapImages/mBlue2.jpg';
                        }
                    }
                    marker = new AMap.Marker({
                        position: arr,
                        map: normalMap,
                        icon: new AMap.Icon({
                            size: new AMap.Size(38, 48),  //图标大小
                            image: url,   //图标url
                            imageOffset: new AMap.Pixel(0, 0)   //偏移量
                        })
                    });
                }
            }
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

    }
});
