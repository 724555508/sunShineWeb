var obj = {};
var url = window.location.search; //截取"?"以及之后的所有字符串
var str = url.substring(1, url.length); //去除"?"
var arr = str.split('&'); //根据&分割成数组   ["key=value","name=zxm"]
for(var i = 0; i < arr.length; i++) {
    obj[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
}
obj.loginId = localStorage.loginId;
obj.token = localStorage.token;
//隐藏部分数据
var app = new Vue({
    el: '#app',
    data: {
        arrData:[],   //起点  终点  value权重值
        fromCity:'',
        endCity:'',
        geoCoordMap:[],
        fleeGoodsMap:{},
        beFleeGoodsMap:{},
        fleeGoodsMapSum:'0',
        beFleeGoodsMapSum:'0',
        getNowTime:''
    },
    mounted: function() {
        this.init();

    },
    computed: {

    },
    methods: {
        init:function(){
            var that = this;
            $.ajax({
                type: "post",
                url: global_path + "/cms/transregionalAnalysis/mapOfTransregional",
                cache: false,  //禁用缓存
                //传入组装的参数
                data:{
                    loginId: localStorage.loginId,
                    token: localStorage.token,
                    areaName:$('#selectVal1').val(),
                    searchSign:$('#selectVal2').val()
                },
                dataType: "json",
                success: function (res) {
                    if(res.code === 200){
                        var transregionalMaps = res.data.transregionalMaps;
                        // 当selectVal为下拉框时初始化数据  初始化时
                        if(($('#selectVal1').val()) === ''){
                            var node = '';
                            that.geoCoordMap = {};
                            // 把返回来的城市渲染到下拉框中
                            for(var i=0;i<transregionalMaps.length;i++){
                                var areaName = transregionalMaps[i].areaName;
                                node = '<option value="'+areaName+'">'+areaName+'</option>';
                                $("#selectVal1>option").eq(0).after(node);
                                // 把各个城市的坐标放入geoCoordMap
                                var key = transregionalMaps[i].areaName;
                                var value = transregionalMaps[i].location;
                                value = value.split(',');
                                value[0] = parseFloat([value[0]]);
                                value[1] = parseFloat([value[1]]);
                                that.geoCoordMap[key] = value;       //上海市:[121.381318, 31.223717]
                            }
                        }else{
                            that.fromCity = $('#selectVal1 option:selected').text();   //起点城市
                            var list = res.data.list;  //终点城市数组
                            that.arrData = []; //放窜货数据的数组
                            // 判断窜货还是被窜
                            // console.log(typeof($('#selectVal2').val()));
                            if($('#selectVal2').val() === '1'){   //窜货
                                for(var i=0;i<list.length;i++) {
                                    // 窜货数据
                                    var arr = []
                                    that.endCity = list[i]; //终点城市
                                    var obj = {};
                                    obj.name = that.fromCity;  //起点城市
                                     //终点城市
                                    var obj1 = {};
                                    obj1.name = that.endCity;
                                    obj1.value = that.randomNumber();   //value权重值
                                    arr.push(obj, obj1);
                                    that.arrData.push(arr);
                                    console.log(that.arrData);
                                }
                                that.crossRegionMap();
                            }else{   // 被窜
                                for(var i=0;i<list.length;i++) {
                                    // 窜货数据
                                    var arr = []
                                    that.endCity = list[i]; //终点城市
                                    var obj = {};
                                    obj.name = that.endCity;  //终点城市
                                    var obj1 = {};
                                    obj1.name = that.fromCity;  //起点城市

                                    obj1.value = that.randomNumber();   //value权重值
                                    arr.push(obj, obj1);
                                    that.arrData.push(arr);
                                    console.log(that.arrData);
                                }
                                that.crossRegionMap2();
                            }
                            that.fleeGoodsMap = res.data.fleeGoodsMap;   //窜向其他城市市场   窜货数量
                            // 窜货市场数量累加
                            that.fleeGoodsMapSum = 0;
                            for(key in that.fleeGoodsMap){
                                that.fleeGoodsMapSum = that.fleeGoodsMapSum + that.fleeGoodsMap[key];
                            }
                            //窜向其他城市市场   窜货数量
                            that.beFleeGoodsMap = res.data.beFleeGoodsMap;
                            // 被窜货市场数量累加
                            that.beFleeGoodsMapSum = 0;
                            for(key in that.beFleeGoodsMap){
                                that.beFleeGoodsMapSum = that.beFleeGoodsMapSum + that.beFleeGoodsMap[key];
                            }
                        }
                        that.crossRegionMap();
                        that.nowTime();
                    }
                },
                error:function(){

                }
            });
        },
        // 窜货市场加载地图
        crossRegionMap:function(){
            var _this = this;
            //容器
            var map = echarts.init(document.getElementById('container'));
            /* 图中相关城市经纬度,根据你的需求添加数据 关于国家的经纬度，*/
            var geoCoordMap = {
                '上海': [121.4648,31.2891],
                '东莞': [113.8953,22.901],
                '东营': [118.7073,37.5513],
                '中山': [113.4229,22.478],
                '临汾': [111.4783,36.1615],
                '临沂': [118.3118,35.2936],
                '丹东': [124.541,40.4242],
                '丽水': [119.5642,28.1854],
                '乌鲁木齐': [87.9236,43.5883],
                '佛山': [112.8955,23.1097],
                '保定': [115.0488,39.0948],
                '兰州': [103.5901,36.3043],
                '包头': [110.3467,41.4899],
                '北京': [116.4551,40.2539],
                '北海': [109.314,21.6211],
                '南京': [118.8062,31.9208],
                '南宁': [108.479,23.1152],
                '南昌': [116.0046,28.6633],
                '南通': [121.1023,32.1625],
                '厦门': [118.1689,24.6478],
                '台州': [121.1353,28.6688],
                '合肥': [117.29,32.0581],
                '呼和浩特': [111.4124,40.4901],
                '咸阳': [108.4131,34.8706],
                '哈尔滨': [127.9688,45.368],
                '唐山': [118.4766,39.6826],
                '嘉兴': [120.9155,30.6354],
                '大同': [113.7854,39.8035],
                '大连': [122.2229,39.4409],
                '天津': [117.4219,39.4189],
                '太原': [112.3352,37.9413],
                '威海': [121.9482,37.1393],
                '宁波': [121.5967,29.6466],
                '宝鸡': [107.1826,34.3433],
                '宿迁': [118.5535,33.7775],
                '常州': [119.4543,31.5582],
                '广州': [113.5107,23.2196],
                '廊坊': [116.521,39.0509],
                '延安': [109.1052,36.4252],
                '张家口': [115.1477,40.8527],
                '徐州': [117.5208,34.3268],
                '德州': [116.6858,37.2107],
                '惠州': [114.6204,23.1647],
                '成都': [103.9526,30.7617],
                '扬州': [119.4653,32.8162],
                '承德': [117.5757,41.4075],
                '拉萨': [91.1865,30.1465],
                '无锡': [120.3442,31.5527],
                '日照': [119.2786,35.5023],
                '昆明': [102.9199,25.4663],
                '杭州': [119.5313,29.8773],
                '枣庄': [117.323,34.8926],
                '柳州': [109.3799,24.9774],
                '株洲': [113.5327,27.0319],
                '武汉': [114.3896,30.6628],
                '汕头': [117.1692,23.3405],
                '江门': [112.6318,22.1484],
                '沈阳': [123.1238,42.1216],
                '沧州': [116.8286,38.2104],
                '河源': [114.917,23.9722],
                '泉州': [118.3228,25.1147],
                '泰安': [117.0264,36.0516],
                '泰州': [120.0586,32.5525],
                '济南': [117.1582,36.8701],
                '济宁': [116.8286,35.3375],
                '海口': [110.3893,19.8516],
                '淄博': [118.0371,36.6064],
                '淮安': [118.927,33.4039],
                '深圳': [114.5435,22.5439],
                '清远': [112.9175,24.3292],
                '温州': [120.498,27.8119],
                '渭南': [109.7864,35.0299],
                '湖州': [119.8608,30.7782],
                '湘潭': [112.5439,27.7075],
                '滨州': [117.8174,37.4963],
                '潍坊': [119.0918,36.524],
                '烟台': [120.7397,37.5128],
                '玉溪': [101.9312,23.8898],
                '珠海': [113.7305,22.1155],
                '盐城': [120.2234,33.5577],
                '盘锦': [121.9482,41.0449],
                '石家庄': [114.4995,38.1006],
                '福州': [119.4543,25.9222],
                '秦皇岛': [119.2126,40.0232],
                '绍兴': [120.564,29.7565],
                '聊城': [115.9167,36.4032],
                '肇庆': [112.1265,23.5822],
                '舟山': [122.2559,30.2234],
                '苏州': [120.6519,31.3989],
                '莱芜': [117.6526,36.2714],
                '菏泽': [115.6201,35.2057],
                '营口': [122.4316,40.4297],
                '葫芦岛': [120.1575,40.578],
                '衡水': [115.8838,37.7161],
                '衢州': [118.6853,28.8666],
                '西宁': [101.4038,36.8207],
                '西安': [109.1162,34.2004],
                '贵阳': [106.6992,26.7682],
                '连云港': [119.1248,34.552],
                '邢台': [114.8071,37.2821],
                '邯郸': [114.4775,36.535],
                '郑州': [113.4668,34.6234],
                '鄂尔多斯': [108.9734,39.2487],
                '重庆': [107.7539,30.1904],
                '金华': [120.0037,29.1028],
                '铜川': [109.0393,35.1947],
                '银川': [106.3586,38.1775],
                '镇江': [119.4763,31.9702],
                '长春': [125.8154,44.2584],
                '长沙': [113.0823,28.2568],
                '长治': [112.8625,36.4746],
                '阳泉': [113.4778,38.0951],
                '青岛': [120.4651,36.3373],
                '韶关': [113.7964,24.7028]
            };
             /*
            记录下起点城市和终点城市的名称，以及权重
            数组第一位为终点城市，数组第二位为起点城市，以及该城市的权重，就是图上圆圈的大小
            */
            var BJData = [
                [{name:'北京'}, {name:'上海',value:95}],
                [{name:'北京'}, {name:'广州',value:90}],
                [{name:'北京'}, {name:'大连',value:80}],
                [{name:'北京'}, {name:'南宁',value:70}],
                [{name:'北京'}, {name:'南昌',value:60}],
                [{name:'北京'}, {name:'拉萨',value:50}],
                [{name:'北京'}, {name:'长春',value:40}],
                [{name:'北京'}, {name:'包头',value:30}],
                [{name:'北京'}, {name:'重庆',value:20}],
                [{name:'北京'}, {name:'常州',value:10}]
            ];

            var SHData = [
                [{name:'上海'},{name:'包头',value:95}],
                [{name:'上海'},{name:'昆明',value:90}],
                [{name:'上海'},{name:'广州',value:80}],
                [{name:'上海'},{name:'郑州',value:70}],
                [{name:'上海'},{name:'长春',value:60}],
                [{name:'上海'},{name:'重庆',value:50}],
                [{name:'上海'},{name:'长沙',value:40}],
                [{name:'上海'},{name:'北京',value:30}],
                [{name:'上海'},{name:'丹东',value:20}],
                [{name:'上海'},{name:'大连',value:10}]
            ];

            var GZData = [
                [{name:'广州'},{name:'福州',value:95}],
                [{name:'广州'},{name:'太原',value:90}],
                [{name:'广州'},{name:'长春',value:80}],
                [{name:'广州'},{name:'重庆',value:70}],
                [{name:'广州'},{name:'西安',value:60}],
                [{name:'广州'},{name:'成都',value:50}],
                [{name:'广州'},{name:'常州',value:40}],
                [{name:'广州'},{name:'北京',value:30}],
                [{name:'广州'},{name:'北海',value:20}],
                [{name:'广州'},{name:'海口',value:10}]
            ];
            var CDData = [
                [{name:'成都'},{name:'福州',value:95}],
            ];
            // 小飞机的图标，可以用其他图形替换
            var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
            // 获取地图中起点和终点的坐标，以数组形式保存下来

            var convertData = function (data) {
                console.log(data);
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];    //[{name:'北京'}, {name:'上海',value:95}],
                    console.log(dataItem);
                    var fromCoord = _this.geoCoordMap[dataItem[0].name];  //起点
                    var toCoord = _this.geoCoordMap[dataItem[1].name];  //终点
                    if (fromCoord && toCoord) {
                        res.push({
                            fromName: dataItem[0].name,
                            toName: dataItem[1].name,
                            coords: [fromCoord, toCoord],
                            value: dataItem[1].value  //权重的值
                        });
                    }
                }
                return res;
            };
            /*每条线的颜色值*/
            var color = ['#FF4447', '#ffa022', '#46bee9','red','yellow'];
            var series = [];
            // ['上海', SHData], ['广州', GZData],['成都', CDData]
            [[_this.fromCity,_this.arrData]].forEach(function (item, i) {
                console.log(convertData(item[1]));   //[{name:'北京'}, {name:'上海',value:95}]
                series.push({
                        type: 'lines',
                        zlevel: 1,   // 用于分层，z-index的效果
                        effect: {
                            show: true,    // 动效是否显示
                            period: 6,      // 特效动画时间
                            trailLength: 0.7,    // 特效尾迹的长度
                            color: '#fff',    // 特效颜色
                            symbolSize: 3     // 特效大小
                        },
                        lineStyle: {
                            normal: {
                                color: color[i],     // 正常情况下的线条颜色
                                width: 0,             //因为是叠加效果，要是有宽度，线条会变粗，白色航线特效不明显
                                curveness: 0.2         // 线条曲度
                            }
                        },
                        data: convertData(item[1])       // [{name:'广州'},{name:'福州',value:95}],        特效的起始、终点位置                        data:convertData(item[1])
                    },
                    {
                        // name: _this.fromCity + ' Top10',
                        type: 'lines',
                        zlevel: 2,
                        symbol: ['none', 'arrow'],
                        symbolSize: 10,   //设置小飞机图标大小
                        effect: {
                            show: true,
                            period: 6,
                            trailLength: 0,       // 特效动画时间
                            symbol: planePath,     // 特效形状，可以用其他svg pathdata路径代替
                            symbolSize: 15
                        },
                        lineStyle: {
                            normal: {
                                color: color[i],
                                width: 1,
                                opacity: 0.6,
                                curveness: 0.2
                            }
                        },
                        data: convertData(item[1])
                        // data:i
                    },
                    {
                        // name: _this.fromCity + ' Top10',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',     // 表示使用的坐标系为地理坐标系
                        zlevel: 2,
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',        // 标签显示的位置
                                formatter: '{b}'          // 标签内容格式器
                            }
                        },
                        // symbolSize: function (val) {
                        //     return val[2] / 8;
                        // },
                        itemStyle: {
                            normal: {
                                color: color[i]
                            }
                        },
                        data: item[1].map(function (dataItem) {    //[{name:'北京'}, {name:'上海',value:95}]
                            console.log(_this.geoCoordMap[dataItem[1].name])
                            return {
                                name: dataItem[1].name,   //终点位置
                                // value: _this.geoCoordMap[dataItem[1].name].concat([dataItem[1].value]) , // 起点的位置
                                // symbolSize: dataItem[1].value / 8
                            };
                        })
                    });
            });
            // console.log(series)

            option = {
                // layoutCenter: ['50%', '100%'],
                // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
                layoutSize: 500,
                backgroundColor: '#0D1D2D',
                textStyle: {
                    fontSize: 12
                },
                title : {
                    text: '',
                    // subtext: '数据纯属虚构',
                    left: 'center',
                    textStyle : {
                        color: '#fff'
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter:function(params, ticket, callback){
                        console.log(params);
                        if(params.seriesType=="effectScatter") {
                            return "线路："+params.data.name+""+params.data.value[2];
                        }else if(params.seriesType=="lines"){
                            return params.data.fromName+">"+params.data.toName+"<br />"+params.data.value;
                        }else{
                            return params.name;
                        }
                    }
                },
                legend: {
                    orient: 'vertical',
                    top: 'bottom',
                    left: 'right',
                    // data:['北京 Top10', '上海 Top10', '广州 Top10','成都 Top10'],
                    textStyle: {
                        color: '#fff'
                    },
                    selectedMode: 'multiple',
                },
                geo: {
                    map: 'china',
                    label: {  //显示地图省市成分
                        normal: {
                            show: true,
                            color:'#fff'
                        },
                        emphasis: {   //高亮时显示省份颜色
                            show: false,
                            color:'#fff'
                        }
                    },
                    roam: false,   //改false去掉地图伸缩
                    zoom:1.3,   //设置地图大小
                    itemStyle: {    // 普通状态下的样式
                        normal: {
                            areaColor: '#3A4A5A',   //区域颜色
                            borderColor: '#324152'   //区域border

                        },
                        emphasis: {    // 高亮状态下的样式
                            areaColor: '#2a333d'   //区域颜色
                        }
                    }
                },
                series: series
            };
            // 作图
            map.setOption(option);
        },
        // 被窜货市场加载地图
        crossRegionMap2:function(){
            var _this = this;
            //容器
            var map = echarts.init(document.getElementById('container'));
            /* 图中相关城市经纬度,根据你的需求添加数据 关于国家的经纬度，*/
            var geoCoordMap = {
                '上海': [121.4648,31.2891],
                '东莞': [113.8953,22.901],
                '东营': [118.7073,37.5513],
                '中山': [113.4229,22.478],
                '临汾': [111.4783,36.1615],
                '临沂': [118.3118,35.2936],
                '丹东': [124.541,40.4242],
                '丽水': [119.5642,28.1854],
                '乌鲁木齐': [87.9236,43.5883],
                '佛山': [112.8955,23.1097],
                '保定': [115.0488,39.0948],
                '兰州': [103.5901,36.3043],
                '包头': [110.3467,41.4899],
                '北京': [116.4551,40.2539],
                '北海': [109.314,21.6211],
                '南京': [118.8062,31.9208],
                '南宁': [108.479,23.1152],
                '南昌': [116.0046,28.6633],
                '南通': [121.1023,32.1625],
                '厦门': [118.1689,24.6478],
                '台州': [121.1353,28.6688],
                '合肥': [117.29,32.0581],
                '呼和浩特': [111.4124,40.4901],
                '咸阳': [108.4131,34.8706],
                '哈尔滨': [127.9688,45.368],
                '唐山': [118.4766,39.6826],
                '嘉兴': [120.9155,30.6354],
                '大同': [113.7854,39.8035],
                '大连': [122.2229,39.4409],
                '天津': [117.4219,39.4189],
                '太原': [112.3352,37.9413],
                '威海': [121.9482,37.1393],
                '宁波': [121.5967,29.6466],
                '宝鸡': [107.1826,34.3433],
                '宿迁': [118.5535,33.7775],
                '常州': [119.4543,31.5582],
                '广州': [113.5107,23.2196],
                '廊坊': [116.521,39.0509],
                '延安': [109.1052,36.4252],
                '张家口': [115.1477,40.8527],
                '徐州': [117.5208,34.3268],
                '德州': [116.6858,37.2107],
                '惠州': [114.6204,23.1647],
                '成都': [103.9526,30.7617],
                '扬州': [119.4653,32.8162],
                '承德': [117.5757,41.4075],
                '拉萨': [91.1865,30.1465],
                '无锡': [120.3442,31.5527],
                '日照': [119.2786,35.5023],
                '昆明': [102.9199,25.4663],
                '杭州': [119.5313,29.8773],
                '枣庄': [117.323,34.8926],
                '柳州': [109.3799,24.9774],
                '株洲': [113.5327,27.0319],
                '武汉': [114.3896,30.6628],
                '汕头': [117.1692,23.3405],
                '江门': [112.6318,22.1484],
                '沈阳': [123.1238,42.1216],
                '沧州': [116.8286,38.2104],
                '河源': [114.917,23.9722],
                '泉州': [118.3228,25.1147],
                '泰安': [117.0264,36.0516],
                '泰州': [120.0586,32.5525],
                '济南': [117.1582,36.8701],
                '济宁': [116.8286,35.3375],
                '海口': [110.3893,19.8516],
                '淄博': [118.0371,36.6064],
                '淮安': [118.927,33.4039],
                '深圳': [114.5435,22.5439],
                '清远': [112.9175,24.3292],
                '温州': [120.498,27.8119],
                '渭南': [109.7864,35.0299],
                '湖州': [119.8608,30.7782],
                '湘潭': [112.5439,27.7075],
                '滨州': [117.8174,37.4963],
                '潍坊': [119.0918,36.524],
                '烟台': [120.7397,37.5128],
                '玉溪': [101.9312,23.8898],
                '珠海': [113.7305,22.1155],
                '盐城': [120.2234,33.5577],
                '盘锦': [121.9482,41.0449],
                '石家庄': [114.4995,38.1006],
                '福州': [119.4543,25.9222],
                '秦皇岛': [119.2126,40.0232],
                '绍兴': [120.564,29.7565],
                '聊城': [115.9167,36.4032],
                '肇庆': [112.1265,23.5822],
                '舟山': [122.2559,30.2234],
                '苏州': [120.6519,31.3989],
                '莱芜': [117.6526,36.2714],
                '菏泽': [115.6201,35.2057],
                '营口': [122.4316,40.4297],
                '葫芦岛': [120.1575,40.578],
                '衡水': [115.8838,37.7161],
                '衢州': [118.6853,28.8666],
                '西宁': [101.4038,36.8207],
                '西安': [109.1162,34.2004],
                '贵阳': [106.6992,26.7682],
                '连云港': [119.1248,34.552],
                '邢台': [114.8071,37.2821],
                '邯郸': [114.4775,36.535],
                '郑州': [113.4668,34.6234],
                '鄂尔多斯': [108.9734,39.2487],
                '重庆': [107.7539,30.1904],
                '金华': [120.0037,29.1028],
                '铜川': [109.0393,35.1947],
                '银川': [106.3586,38.1775],
                '镇江': [119.4763,31.9702],
                '长春': [125.8154,44.2584],
                '长沙': [113.0823,28.2568],
                '长治': [112.8625,36.4746],
                '阳泉': [113.4778,38.0951],
                '青岛': [120.4651,36.3373],
                '韶关': [113.7964,24.7028]
            };
            /*
           记录下起点城市和终点城市的名称，以及权重
           数组第一位为终点城市，数组第二位为起点城市，以及该城市的权重，就是图上圆圈的大小
           */
            var BJData = [
                [{name:'北京'}, {name:'上海',value:95}],
                [{name:'北京'}, {name:'广州',value:90}],
                [{name:'北京'}, {name:'大连',value:80}],
                [{name:'北京'}, {name:'南宁',value:70}],
                [{name:'北京'}, {name:'南昌',value:60}],
                [{name:'北京'}, {name:'拉萨',value:50}],
                [{name:'北京'}, {name:'长春',value:40}],
                [{name:'北京'}, {name:'包头',value:30}],
                [{name:'北京'}, {name:'重庆',value:20}],
                [{name:'北京'}, {name:'常州',value:10}]
            ];

            var SHData = [
                [{name:'上海'},{name:'包头',value:95}],
                [{name:'上海'},{name:'昆明',value:90}],
                [{name:'上海'},{name:'广州',value:80}],
                [{name:'上海'},{name:'郑州',value:70}],
                [{name:'上海'},{name:'长春',value:60}],
                [{name:'上海'},{name:'重庆',value:50}],
                [{name:'上海'},{name:'长沙',value:40}],
                [{name:'上海'},{name:'北京',value:30}],
                [{name:'上海'},{name:'丹东',value:20}],
                [{name:'上海'},{name:'大连',value:10}]
            ];

            var GZData = [
                [{name:'广州'},{name:'福州',value:95}],
                [{name:'广州'},{name:'太原',value:90}],
                [{name:'广州'},{name:'长春',value:80}],
                [{name:'广州'},{name:'重庆',value:70}],
                [{name:'广州'},{name:'西安',value:60}],
                [{name:'广州'},{name:'成都',value:50}],
                [{name:'广州'},{name:'常州',value:40}],
                [{name:'广州'},{name:'北京',value:30}],
                [{name:'广州'},{name:'北海',value:20}],
                [{name:'广州'},{name:'海口',value:10}]
            ];
            var CDData = [
                [{name:'成都'},{name:'福州',value:95}],
            ];
            // 小飞机的图标，可以用其他图形替换
            var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
            // 获取地图中起点和终点的坐标，以数组形式保存下来

            var convertData = function (data) {
                console.log(data);
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];    //[{name:'北京'}, {name:'上海',value:95}],
                    console.log(dataItem);
                    var fromCoord = _this.geoCoordMap[dataItem[0].name];  //终点
                    var toCoord = _this.geoCoordMap[dataItem[1].name];  //起点
                    if (fromCoord && toCoord) {
                        res.push({
                            fromName: dataItem[0].name,
                            toName: dataItem[1].name,
                            coords: [fromCoord, toCoord],
                            value: dataItem[1].value  //权重的值
                        });
                    }
                }
                return res;
            };
            /*每条线的颜色值*/
            var color = ['#FF4447', '#ffa022', '#46bee9','red','yellow'];
            var series = [];
            // ['上海', SHData], ['广州', GZData],['成都', CDData]
            [[_this.endCity,_this.arrData]].forEach(function (item, i) {
                console.log(convertData(item[1]));   //[{name:'北京'}, {name:'上海',value:95}]
                series.push({
                        type: 'lines',
                        zlevel: 1,   // 用于分层，z-index的效果
                        effect: {
                            show: true,    // 动效是否显示
                            period: 6,      // 特效动画时间
                            trailLength: 0.7,    // 特效尾迹的长度
                            color: '#fff',    // 特效颜色
                            symbolSize: 3     // 特效大小
                        },
                        lineStyle: {
                            normal: {
                                color: color[i],     // 正常情况下的线条颜色
                                width: 0,             //因为是叠加效果，要是有宽度，线条会变粗，白色航线特效不明显
                                curveness: 0.2         // 线条曲度
                            }
                        },
                        data: convertData(item[1])       // [{name:'广州'},{name:'福州',value:95}],        特效的起始、终点位置                        data:convertData(item[1])
                    },
                    {
                        // name: _this.fromCity + ' Top10',
                        type: 'lines',
                        zlevel: 2,
                        symbol: ['none', 'arrow'],
                        symbolSize: 10,   //设置小飞机图标大小
                        effect: {
                            show: true,
                            period: 6,
                            trailLength: 0,       // 特效动画时间
                            symbol: planePath,     // 特效形状，可以用其他svg pathdata路径代替
                            symbolSize: 15
                        },
                        lineStyle: {
                            normal: {
                                color: color[i],
                                width: 1,
                                opacity: 0.6,
                                curveness: 0.2
                            }
                        },
                        data: convertData(item[1])
                        // data:i
                    },
                    {
                        // name: _this.fromCity + ' Top10',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',     // 表示使用的坐标系为地理坐标系
                        zlevel: 2,
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',        // 标签显示的位置
                                formatter: '{b}'          // 标签内容格式器
                            }
                        },
                        // symbolSize: function (val) {
                        //     return val[2] / 8;
                        // },
                        itemStyle: {
                            normal: {
                                color: color[i]
                            }
                        },
                        data: item[1].map(function (dataItem) {    //[{name:'北京'}, {name:'上海',value:95}]
                            console.log(_this.geoCoordMap[dataItem[1].name])
                            return {
                                name: dataItem[1].name,   //终点位置
                                // value: _this.geoCoordMap[dataItem[1].name].concat([dataItem[1].value]), // 起点的位置
                                // symbolSize: dataItem[1].value / 8
                            };
                        })
                    });
            });
            option = {
                // layoutCenter: ['50%', '100%'],
                // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
                layoutSize: 500,
                backgroundColor: '#0D1D2D',
                textStyle: {
                    fontSize: 12
                },
                title : {
                    text: '',
                    // subtext: '数据纯属虚构',
                    left: 'center',
                    textStyle : {
                        color: '#fff'
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter:function(params, ticket, callback){
                        console.log(params);
                        if(params.seriesType=="effectScatter") {
                            return "线路："+params.data.name+""+params.data.value[2];
                        }else if(params.seriesType=="lines"){
                            return params.data.fromName+">"+params.data.toName+"<br />"+params.data.value;
                        }else{
                            return params.name;
                        }
                    }
                },
                legend: {
                    orient: 'vertical',
                    top: 'bottom',
                    left: 'right',
                    // data:['北京 Top10', '上海 Top10', '广州 Top10','成都 Top10'],
                    textStyle: {
                        color: '#fff'
                    },
                    selectedMode: 'multiple',
                },
                geo: {
                    map: 'china',
                    label: {  //显示地图省市成分
                        normal: {
                            show: true,
                            color:'#fff'
                        },
                        emphasis: {   //高亮时显示省份颜色
                            show: false,
                            color:'#fff'
                        }
                    },
                    roam: false,   //改false去掉地图伸缩
                    zoom:1.3,   //设置地图大小
                    itemStyle: {    // 普通状态下的样式
                        normal: {
                            areaColor: '#3A4A5A',   //区域颜色
                            borderColor: '#324152'   //区域border

                        },
                        emphasis: {    // 高亮状态下的样式
                            areaColor: '#2a333d'   //区域颜色
                        }
                    }
                },
                series: series
            };
            // 作图
            map.setOption(option);
        },
        // 随机数
        randomNumber() {
            return Math.round(Math.random()*300);
        },
        // 获取当前时间
        nowTime: function () {
            var that = this;
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
    },


});
$("#selectVal1").change(function(){
    app.init();
});
$("#selectVal2").change(function(){
    app.init();
});
