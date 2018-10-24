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
// if(obj.sign=='1'){
//     $('#sign').val('1');
// }else if(obj.sign=='2'){
//     $('#sign').val('2');
// }else if(obj.sign=='3'){
//     $('#sign').val('3');
// }

/**
 * showHisData();
 * */
$(document).ready(function () {
    showHisData();
    // bloodSugar();
});
// /**
//  *判断 sign  看客服操作 select的值
//  * */
// $('#sign').change(function () {
//     // if($('#sign').val()=='1'){
//     //     obj.sign='1';
//     // }else if($('#sign').val()=='2'){
//     //     obj.sign='2';
//     // }else if($('#sign').val()=='3'){
//     //     obj.sign='3';
//     // }
//     showHisData();
// });


/**
 * showHisData
 * */
function showHisData(){
    $('#hrTable').DataTable({
        "lengthMenu": [[10, 30, 50, 100], [10, 30, 50, 100]], //分页长度选项,   -1 "全部"  暂时取消
        "paging": false, //分页
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
        // "bServerSide": true, //服务端分页
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
        //"info": true, //通知
        ajax: function (data, callback, settings) {
            //封装请求参数
            var param = {};
            param.pageSize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.startRow = data.start;//开始的记录序号
            param.loginId = localStorage.loginId;
            param.token = localStorage.token;
            param.time = $('#time').val();
            param.wearUserId = obj.wearUserId;
            // param.sign = $('#sign').val();
            // param.sign = obj.sign;
            var sportSignArr = [];
            //ajax请求数据
            $.ajax({
                type: "post",
                url: global_path + "/cms/device/getDeviceDataList",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (res) {
                    checkToken(res);
                    if(res.code === 200){
                        $('#hrLength').text(res.data.countMap.hrDataCount);
                        $('#bpLength').text(res.data.countMap.bpDataCount);
                        $('#boLength').text(res.data.countMap.boDataCount);
                        // // 房颤
                        // if(res.data.cmsDeviceAfDataBeans != null){
                        //     houseProperty(res.data.cmsDeviceAfDataBeans);
                        //     console.log(res.data.cmsDeviceAfDataBeans);
                        // }
                        // 关于心率有氧运动
                        if (res.data.sportSign !== null && res.data.sportSign !== undefined && res.data.sportSign !== '') {
                            var sportSign = res.data.sportSign;
                            for (let i = 0; i < sportSign.length; i ++) {
                                if(sportSign[i].time >= 300) {
                                    sportSignArr.push([
                                        {
                                            coord: [sportSign[i].startTime,40]
                                        },
                                        {
                                            coord: [sportSign[i].endTime,200]
                                        }
                                    ])
                                }
                            }
                        }
                        if(res.data.cmsDeviceHrDataBeans != null){
                            heartRate(res.data.cmsDeviceHrDataBeans,sportSignArr);
                        }

                        var returnData = {};
                        returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                        returnData.recordsTotal = res.data.total;//返回数据全部记录
                        returnData.recordsFiltered = res.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                        returnData.data = res.data.cmsDeviceHrDataBeans.reverse();//返回的数据列表
                        callback(returnData);
                    }else {
                        layer.msg(res.msg,{
                            icon:2,
                            time:2000
                        })
                    }
                }
            });
        },
        columns: [
            //序号
            {
                "data": null,
                "bSortable": false,
                "bVisible":false//隐藏列
            },
            //时间
            {
                "data": "date",
                "bSortable": false
            },
            //心率/血压/血氧
            {
                "data": "",
                "bSortable": false,
                "render":function (data, type, full, meta) {
                    if(full.heartRate != ''){
                        return '<div>' + full.heartRate + '</div>';
                    }else {
                        var node = '<div class="text-red">'+full.abnormalHeartRate+'</div>';
                        return node;
                    }
                }
            },
            //删除
            {
                "data": "",
                "bSortable": false,
                "render":function (data, type, full, meta) {
                    var node = '<button class="btn btn-skyBlueSmall" onclick="deleteData(this,1)">删除</button>';
                    return node;
                }
            }
        ],
        "fnDrawCallback": function() { //序号
            this.api().column(0).nodes().each(function(cell, i) {
                cell.innerHTML = i + 1;
            });
        }
    });

    $('#bpTable').DataTable({
        "lengthMenu": [[10, 30, 50, 100], [10, 30, 50, 100]], //分页长度选项,   -1 "全部"  暂时取消
        "paging": false, //分页
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
        // "bServerSide": true, //服务端分页
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
        //"info": true, //通知
        ajax: function (data, callback, settings) {

            //封装请求参数
            var param = {};
            param.pageSize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.startRow = data.start;//开始的记录序号
            param.loginId = localStorage.loginId;
            param.token = localStorage.token;
            param.time = $('#time').val();
            param.wearUserId = obj.wearUserId;

            //ajax请求数据
            $.ajax({
                type: "post",
                url: global_path + "/cms/device/getDeviceDataList",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    checkToken(result);
                    if(result.code == 200){
                        if(result.data.cmsDeviceBpDataBeans != null){
                            bloodPress(result.data.cmsDeviceBpDataBeans);
                        }

                        var returnData = {};
                        returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                        returnData.recordsTotal = result.data.total;//返回数据全部记录
                        returnData.recordsFiltered = result.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                        returnData.data = result.data.cmsDeviceBpDataBeans.reverse();//返回的数据列表
                        callback(returnData);
                    }else {
                        layer.msg(result.msg,{
                            icon:2,
                            time:2000
                        })
                    }
                }
            });
        },
        columns: [
            //序号
            {
                "data": null,
                "bSortable": false,
                "bVisible":false//隐藏列
            },
            //时间
            {
                "data": "date",
                "bSortable": false
            },
            //心率/血压/血氧
            {
                "data": "",
                "bSortable": false,
                "render":function (data, type, full, meta) {
                    if(full.bloodPressure != ''){
                        return '<div>' + full.bloodPressure + '</div>';
                    }else {
                        var node = '<div class="text-red">'+full.abnormalBloodPressure+'</div>';
                        return node;
                    }
                }
            },
            //删除
            {
                "data": "",
                "bSortable": false,
                "render":function (data, type, full, meta) {
                    var node = '<button class="btn btn-skyBlueSmall" onclick="deleteData(this,2)">删除</button>';
                    return node;
                }
            }
        ],
        "fnDrawCallback": function() { //序号
            this.api().column(0).nodes().each(function(cell, i) {
                cell.innerHTML = i + 1;
            });
        }
    });

    $('#boTable').DataTable({
        "lengthMenu": [[10, 30, 50, 100], [10, 30, 50, 100]], //分页长度选项,   -1 "全部"  暂时取消
        "paging": false, //分页
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
        // "bServerSide": true, //服务端分页
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
        //"info": true, //通知
        ajax: function (data, callback, settings) {
            //封装请求参数
            var param = {};
            param.pageSize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.startRow = data.start;//开始的记录序号
            param.loginId = localStorage.loginId;
            param.token = localStorage.token;
            param.time = $('#time').val();
            param.wearUserId = obj.wearUserId;

            //ajax请求数据
            $.ajax({
                type: "post",
                url: global_path + "/cms/device/getDeviceDataList",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    checkToken(result);
                    if(result.code == 200){
                        if(result.data.cmsDeviceBoDataBeans != null){
                            bloodOxygen(result.data.cmsDeviceBoDataBeans);
                        }

                        var returnData = {};
                        returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                        returnData.recordsTotal = result.data.total;//返回数据全部记录
                        returnData.recordsFiltered = result.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                        returnData.data = result.data.cmsDeviceBoDataBeans.reverse();//返回的数据列表
                        callback(returnData);
                    }else {
                        layer.msg(result.msg,{
                            icon:2,
                            time:2000
                        })
                    }
                }
            });
        },
        columns: [
            //序号
            {
                "data": null,
                "bSortable": false,
                "bVisible":false  //隐藏列
            },
            //时间
            {
                "data": "date",
                "bSortable": false
            },
            //心率/血压/血氧
            {
                "data": "",
                "bSortable": false,
                "render":function (data, type, full, meta) {
                    if(full.oxyhemoglobinSaturation != ''){
                        return '<div>' + full.oxyhemoglobinSaturation + '</div>';
                    }else {
                        var node = '<div class="text-red">'+full.abnormalOxyhemoglobinSaturation+'</div>';
                        return node;
                    }
                }
            },
            //删除
            {
                "data": "",
                "bSortable": false,
                "render":function (data, type, full, meta) {
                    var node = '<button class="btn btn-skyBlueSmall" onclick="deleteData(this,3)">删除</button>';
                    return node;
                }
            }
        ],
        "fnDrawCallback": function() { //序号
            this.api().column(0).nodes().each(function(cell, i) {
                cell.innerHTML = i + 1;
            });
        }
    });
}

/**
 *搜索
 * */
$('#search').on('click',function () {
    showHisData();
});

/**
 * boxPart5
 * 实时房颤监控
 * */
// function houseProperty(dataStr){
//
//     var arr= [];
//     for(var i = 0;i<dataStr.length;i++){
//         var k = [];
//         var time = dataStr[i].date;
//         k[0] = time.slice(0,4) + '/' + time.slice(5,7) + '/' + time.slice(8,10) + ' '+ time.slice(11,13) + ':' + time.slice(14,16) + ':' + time.slice(17,19);
//         k[1] = dataStr[i].atrialFibrillcationdata;
//         arr.push(k);
//     }
//     // for (var key in dataStr)
//     // {
//     //     var k = [];
//     //     k[0] = key;
//     //     k[0] = k[0].slice(0,4) + '/' + k[0].slice(4,6) +'/' + k[0].slice(6,8) + ' ' + k[0].slice(8,10) + ':' +
//     //         k[0].slice(10,12) + ':' + k[0].slice(12,14);
//     //     k[1] = dataStr[key];
//     //     arr.push(k);
//     // }
//     var arrRate = arr;
//     //展示长度
//     var start = 0;
//     if(arrRate.length <= 50){
//         start = 0;
//     }else if(arrRate.length <= 100){
//         start = 50;
//     }else if(arrRate.length <= 200){
//         start = 75;
//     }else if(arrRate.length <= 300){
//         start = 87;
//     }else if(arrRate.length <= 500){
//         start = 93;
//     }else if(arrRate.length > 500){
//         start = 95;
//     }
//     var healDays = echarts.init(document.getElementById('housePropertyCanvas'));//对应容器
//     //配置项
//     var option = {
//         title: {
//             text: '房颤（）次/分',
//             textStyle:{
//                 color:"#464646",
//                 fontSize:15,
//                 fontFamily:'PingFangSC-Medium'
//             }
//         },
//         //tooltip
//         tooltip: {
//             trigger: 'axis'
//         },
//         //x轴
//         xAxis:{
//             type: 'time',
// //          boundaryGap: false,    折线不是从起点位置
//             splitLine:{
//                 show:false
//             },
//             axisLabel :{//标签设置
//                 color:"#000",
//                 fontSize: "12"
//             },
//             axisLine: { //x轴颜色
//                 show: true,
//                 lineStyle: {
//                     color: "#F7FCFF"
//                 }
//             },
//             nameGap:30
//         },
//         //x轴分割
//         // dataZoom:[
//         //     {
//         //         type: 'inside',
//         //         start: start,
//         //         end: 100
//         //     }
//         // ],
//         //y轴
//         yAxis:{
//             type: 'value',
//             show:true,
//             min: 0,
//             max: 100,
//             splitNumber: 5,
//             splitLine:{
//                 show:true,
//                 lineStyle:{
//                     color:'#ddd',
//                     width: 1
//                 }
//             },
//             axisLine: { //y轴颜色
//                 lineStyle: {
//                     color: "#F7FCFF"
//                 }
//             },
//             axisTick: {
//                 show: false//是否显示y轴刻度
//             },
//             axisLabel: { //强制显示
//                 interval: 0,
//                 textStyle: { //y轴标签颜色
//                     color: "#000"
//                 }
//             }
//         },
//         //大小边距调整
//         grid:{
//             left: "10%",
//             right:"10%",
//             top:"10%",
//             bottom:"20%",
//             containLabel:false
//         },
//         //数据
//         series:[
//             //心率
//             {
//                 name:'房颤',
//                 type:'line',            //折线图
//                 symbol: 'none', //去掉每个点的小圆点标记
//                 data:arrRate,      //动态data
// //              areaStyle: {
// //                  normal: {
// //                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
// //                          offset: 0,
// //                          color: 'rgba(11,120,227,0.54)'
// //                      }, {
// //                          offset: 1,
// //                          color: 'rgba(11,120,227,0.1)'
// //                      }])
// //                  }
// //              },
//                 itemStyle: {
//                     normal: {
//                         //颜色设置
//                         color: "#EE595A"
//                     }
//                 }
//             }
//         ]
//     };
//     //配置项生成统计图
//     healDays.clear();
//     healDays.setOption(option);
// }

/**
 * boxPart5
 * 实时心率监控
 * */
function heartRate(dataStr,sportSignArr){

    var arr= [];
    for(var i = 0;i<dataStr.length;i++){
        var k = [];
        var time = dataStr[i].date;
        k[0] = time.slice(0,4) + '/' + time.slice(5,7) + '/' + time.slice(8,10) + ' '+ time.slice(11,13) + ':' + time.slice(14,16) + ':' + time.slice(17,19);
        k[1] = dataStr[i].heartRate;
        arr.push(k);
    }
    // for (var key in dataStr)
    // {
    //     var k = [];
    //     k[0] = key;
    //     k[0] = k[0].slice(0,4) + '/' + k[0].slice(4,6) +'/' + k[0].slice(6,8) + ' ' + k[0].slice(8,10) + ':' +
    //         k[0].slice(10,12) + ':' + k[0].slice(12,14);
    //     k[1] = dataStr[key];
    //     arr.push(k);
    // }
    var arrRate = arr;
    //展示长度
    var start = 0;
    if(arrRate.length <= 50){
        start = 0;
    }else if(arrRate.length <= 100){
        start = 50;
    }else if(arrRate.length <= 200){
        start = 75;
    }else if(arrRate.length <= 300){
        start = 87;
    }else if(arrRate.length <= 500){
        start = 93;
    }else if(arrRate.length > 500){
        start = 95;
    }
    var healDays = echarts.init(document.getElementById('heartRateCanvas'));//对应容器
    //配置项
    var option = {
    	title: {
           text: '心率（次/分）',
           left:"20px",
           textStyle:{
           	color:"#464646",
           	fontSize:15,
           	fontFamily:'PingFangSC-Medium'
           }
        },
        //tooltip
        tooltip: {
            trigger: 'axis'
        },
        //x轴
        xAxis:{
            type: 'time',
//          boundaryGap: false,    折线不是从起点位置
            splitLine:{
                show:false
            },
            axisLabel :{//标签设置
                color:"#000",
                fontSize: "12"
            },
            axisLine: { //x轴颜色
                show: true,
                lineStyle: {
                    color: "#F7FCFF"
                }
            },
            nameGap:30
        },
        //x轴分割
        // dataZoom:[
        //     {
        //         type: 'inside',
        //         start: start,
        //         end: 100
        //     }
        // ],
        //y轴
        yAxis:{
            type: 'value',
            show:true,
            min: 40,
            max: 200,
            splitNumber: 4,
            splitLine:{
                show:true,
                lineStyle:{
                    color:'#ddd',
                    width: 1
                }
            },
            axisLine: { //y轴颜色
                lineStyle: {
                    color: "#F7FCFF"
                }
            },
            axisTick: {
                show: false//是否显示y轴刻度
            },
            axisLabel: { //强制显示
                interval: 0,
                textStyle: { //y轴标签颜色
                    color: "#000"
                }
            }
        },
        //大小边距调整
        grid:{
            left: "5%",
            right:"3%",
            top:"50px",
            bottom:"20%",
            containLabel:false
        },
        //数据
        series:[
            //心率
            {
                name:'心率',
                type:'line',            //折线图
                symbol: 'none', //去掉每个点的小圆点标记
                data:arrRate,      //动态data
//              areaStyle: {
//                  normal: {
//                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//                          offset: 0,
//                          color: 'rgba(11,120,227,0.54)'
//                      }, {
//                          offset: 1,
//                          color: 'rgba(11,120,227,0.1)'
//                      }])
//                  }
//              },
                itemStyle: {
                    normal: {
                        //颜色设置
                        color: "#EE595A"
                    }
                },
                // 有氧运动区域标记
                markArea: {
                    silent:true,
                    itemStyle: {
                        normal: {
                            color: 'rgba(183,235,143,0.5)'   //背景区域颜色
                        },
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            backgroundColor: '#4d67ff',
                        },
                    },
                    data: sportSignArr
                }
            }
        ]
    };
    //配置项生成统计图
    healDays.clear();
    healDays.setOption(option);
}

/**
 * boxPart6
 * 实时血压监控
 * */
function bloodPress(dataStr){
    var bp = [];
    for(var i = 0;i<dataStr.length;i++){
        var k = [];
        var time = dataStr[i].date;
        k[0] = time.slice(0,4) + '/' + time.slice(5,7) + '/' + time.slice(8,10) + ' '+ time.slice(11,13) + ':' + time.slice(14,16) + ':' + time.slice(17,19);
        k[1] = dataStr[i].bloodPressure.split(',');
        bp.push(k);
    }
    // for (var key in dataStr)
    // {
    //     var k = [];
    //     k[0] = key;
    //     k[0] = k[0].slice(0,4) + '/' + k[0].slice(4,6) +'/' + k[0].slice(6,8) + ' ' + k[0].slice(8,10) + ':' +
    //         k[0].slice(10,12) + ':' + k[0].slice(12,14);
    //     k[1] = str[key].split(',');
    //
    //     bp.push(k);
    // }
    var spNeed = [];//高压
    var bpNeed = [];//低压
    for(var i = 0; i < bp.length; i ++){
        spNeed.push([bp[i][0],bp[i][1][0]]);
        bpNeed.push([bp[i][0],bp[i][1][1]]);
    }
    //展示长度
    var l = 0;
    if(bp.length <= 50){
        l = 0;
    }else if(bp.length <= 100){
        l = 50;
    }else if(bp.length <= 200){
        l = 75;
    }else if(bp.length <= 300){
        l = 87;
    }else if(bp.length <= 500){
        l = 93;
    }
    //对应容器
    var bloodPress = echarts.init(document.getElementById('bloodPressCanvas'));
    //配置项
    var option = {
    	title: {
           text: '血压（mmHg）',
            left:"20px",
           textStyle:{
           	color:"#464646",
           	fontSize:15,
           	fontFamily:'PingFangSC-Medium'
           }
        },
        //tooltip
        tooltip: {
            trigger: 'axis'
        },
        //x轴
        xAxis:{
            type: 'time',
            boundaryGap: false,
            splitLine:{
                show:false
            },
            axisLabel :{//标签设置
                color:"#000",
                fontSize: "12"
            },
            axisLine: { //x轴颜色
                show: true,
                lineStyle: {
                    color: "#F7FCFF"
                }
            }
        },
        //x轴分割
        // dataZoom:[
        //     {
        //         type: 'inside',
        //         start: l,
        //         end: 100
        //     }
        // ],
        //y轴
        yAxis:{
            type: 'value',
            show:true,
            min: 40,
            max: 200,
            splitNumber: 4,
            splitLine:{
                show:true,
                lineStyle:{
                    color:'#ddd',
                    width: 1
                }
            },
            axisLine: { //y轴颜色
                lineStyle: {
                    color: "#F7FCFF"
                }
            },
            axisTick: {
                show: false//是否显示y轴刻度
            },
            axisLabel: { //强制显示
                interval: 0,
                textStyle: { //y轴标签颜色
                    color: "#000"
                }
            }
        },
        //大小边距调整
        grid:{
            left: "5%",
            right:"3%",
            top:"50px",
            bottom:"20%",
            containLabel:false
        },
        //数据
        series:[
            //高压
            {
                name:'高压',
                type:'line',            //折线图
                symbol: 'none', //去掉每个点的小圆点标记
                data:spNeed,      //动态data
//              areaStyle: {
//                  normal: {
//                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//                          offset: 0,
//                          color: 'rgba(233,44,129,0.54)'
//                      }, {
//                          offset: 1,
//                          color: 'rgba(233,44,129,0.1)'
//                      }])
//                  }
//              },
                itemStyle: {
                    normal: {
                        //颜色设置
                        color: "#9013FE"
                    }
                }
            },
            //低压
            {
                name:'低压',
                type:'line',            //折线图
                symbol: 'none', //去掉每个点的小圆点标记
                data:bpNeed,      //动态data
//              areaStyle: {
//                  normal: {
//                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//                          offset: 0,
//                          color: 'rgba(254,97,48,0.54)'
//                      }, {
//                          offset: 1,
//                          color: 'rgba(254,97,48,0.1)'
//                      }])
//                  }
//              },
                itemStyle: {
                    normal: {
                        //颜色设置
                        color: "#F5A623 "
                    }
                }
            }

        ]
    };
    bloodPress.clear();
    //配置项生成统计图
    bloodPress.setOption(option);
}

/**
 * boxPart7
 * 实时血氧监控
 * */
function bloodOxygen(dataStr){
    var oxArr = [];
    for(var i = 0;i<dataStr.length;i++){
        var k = [];
        var time = dataStr[i].date;
        k[0] = time.slice(0,4) + '/' + time.slice(5,7) + '/' + time.slice(8,10) + ' '+ time.slice(11,13) + ':' + time.slice(14,16) + ':' + time.slice(17,19);
        k[1] = dataStr[i].oxyhemoglobinSaturation;
        oxArr.push(k);
    }
    // for (var key in str)
    // {
    //     var k = [];
    //     k[0] = key;
    //     k[0] = k[0].slice(0,4) + '/' + k[0].slice(4,6) +'/' + k[0].slice(6,8) + ' ' + k[0].slice(8,10) + ':' +
    //         k[0].slice(10,12) + ':' + k[0].slice(12,14);
    //     k[1] = str[key];
    //     oxArr.push(k);
    // }
    //展示长度
    var l = 0;
    if(oxArr.length <= 50){
        l = 0;
    }else if(oxArr.length <= 100){
        l = 50;
    }else if(oxArr.length <= 200){
        l = 75;
    }else if(oxArr.length <= 300){
        l = 87;
    }else if(oxArr.length <= 500){
        l = 93;
    }
    //对应容器
    var bloodOxygen = echarts.init(document.getElementById('bloodOxygenCanvas'));
    //配置项
    var option = {
    	title: {
           text: '血氧（SpO2)',
            left:"20px",
           textStyle:{
           	color:"#464646",
           	fontSize:15,
           	fontFamily:'PingFangSC-Medium'
           }
        },
        //tooltip
        tooltip: {
            trigger: 'axis'
        },
        //x轴
        xAxis:{
            type: 'time',
            boundaryGap: false,
            splitLine:{
                show:false
            },
            axisLabel :{//标签设置
                color:"#000",
                fontSize: "12"
            },
            axisLine: { //x轴颜色
                show: true,
                lineStyle: {
                    color: "#F7FCFF"
                }
            }
        },
        //x轴分割
        // dataZoom:[
        //     {
        //         type: 'inside',
        //         start: l,
        //         end: 100
        //     }
        // ],
        //y轴
        yAxis:{
            type: 'value',
            show:true,
            min: 50,
            max: 100,
            splitNumber: 4,
            splitLine:{
                show:true,
                lineStyle:{
                    color:'#ddd',
                    width: 1
                }
            },
            axisLine: { //y轴颜色
                lineStyle: {
                    color: "#F7FCFF"
                }
            },
            axisTick: {
                show: false//是否显示y轴刻度
            },
            axisLabel: { //强制显示
                interval: 0,
                textStyle: { //y轴标签颜色
                    color: "#000"
                }
            }
        },
        //大小边距调整
        grid:{
            left: "5%",
            right:"3%",
            top:"50px",
            bottom:"20%",
            containLabel:false
        },
        //数据
        series:[
            //血氧浓度
            {
                name:'血氧浓度(%)',
                type:'line',            //折线图
                symbol: 'none', //去掉每个点的小圆点标记
                data:oxArr,      //动态data
                smooth: true,       //平滑显示
//              areaStyle: {
//                  normal: {
//                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//                          offset: 0,
//                          color: 'rgba(86,178,186,0.54)'
//                      }, {
//                          offset: 1,
//                          color: 'rgba(86,178,186,0.1)'
//                      }])
//                  }
//              },
                itemStyle: {
                    normal: {
                        //颜色设置
                        color: "#0096FF"  //折线颜色
                    }
                }
            }

        ]
    };
    bloodOxygen.clear();
    //配置项生成统计图
    bloodOxygen.setOption(option);
}
// 实时血糖监控
// function bloodSugar(){
//
//     // var oxArr = [];
// //     // for(var i = 0;i<dataStr.length;i++){
// //     //     var k = [];
// //     //     var time = dataStr[i].date;
// //     //     k[0] = time.slice(0,4) + '/' + time.slice(5,7) + '/' + time.slice(8,10) + ' '+ time.slice(11,13) + ':' + time.slice(14,16) + ':' + time.slice(17,19);
// //     //     k[1] = dataStr[i].oxyhemoglobinSaturation;
// //     //     oxArr.push(k);
// //     // }
// //     // // for (var key in str)
// //     // // {
// //     // //     var k = [];
// //     // //     k[0] = key;
// //     // //     k[0] = k[0].slice(0,4) + '/' + k[0].slice(4,6) +'/' + k[0].slice(6,8) + ' ' + k[0].slice(8,10) + ':' +
// //     // //         k[0].slice(10,12) + ':' + k[0].slice(12,14);
// //     // //     k[1] = str[key];
// //     // //     oxArr.push(k);
// //     // // }
// //     // //展示长度
// //     // var l = 0;
// //     // if(oxArr.length <= 50){
// //     //     l = 0;
// //     // }else if(oxArr.length <= 100){
// //     //     l = 50;
// //     // }else if(oxArr.length <= 200){
// //     //     l = 75;
// //     // }else if(oxArr.length <= 300){
// //     //     l = 87;
// //     // }else if(oxArr.length <= 500){
// //     //     l = 93;
// //     // }
//
//     var bloodSugar = echarts.init(document.getElementById('bloodSugar'));
//     option = {
//         title: {
//             text: '血糖（mmol/L)',
//             left:"20px",
//             textStyle:{
//                 color:"#464646",
//                 fontSize:15,
//                 fontFamily:'PingFangSC-Medium'
//             }
//         },
//         color: ['#3398DB'],
//         tooltip : {
//             trigger: 'axis',
//             axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//                 type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//             }
//         },
//         grid: {
//             left: '3%',
//             right: '4%',
//             bottom: '3%',
//             containLabel: true
//         },
//         xAxis : [
//             {
//                 type : 'category',
//                 data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//                 axisTick: {
//                     alignWithLabel: true,
//                     show:false  //去掉x轴刻度线
//                 },
//                 splitLine:{
//                     show:false
//                 },
//                 axisLabel :{//标签设置
//                     color:"#000",
//                     fontSize: "12"
//                 },
//                 axisLine: { //x轴颜色
//                     show: false,
//                     lineStyle: {
//                         color: "red"
//                     }
//                 }
//             }
//         ],
//         yAxis : [
//             {
//                 type : 'value',
//                 axisLine: { //y轴颜色
//                     lineStyle: {
//                         color: "#F7FCFF"
//                     }
//                 },
//                 axisTick: {
//                     show: false//是否显示y轴刻度
//                 },
//                 axisLabel: { //强制显示
//                     interval: 0,
//                     textStyle: { //y轴标签颜色
//                         color: "#000"
//                     }
//                 }
//
//             }
//         ],
//         series : [
//             {
//                 name:'直接访问',
//                 type:'bar',
//                 barWidth: '60%',
//                 data:[10, 52, 200, 334, 390, 330, 220]
//             }
//         ]
//     };
//
//     bloodSugar.clear();
//     //配置项生成统计图
//     bloodSugar.setOption(option);
// }
/**
 * 删除指定数据
 * */
function deleteData(that,sign) {
    var time = $(that).parents('tr').children().get(0).innerHTML;
    var data1 = $(that).parents('tr').children().children().get(0).innerHTML;
    var data = {
        loginId:localStorage.loginId,
        token:localStorage.token,
        wearUserId:obj.wearUserId,
        time:time,
        data:data1,
        flag:sign
    };
    layer.confirm('确认删除吗？', {
        btn: ['确定','取消'] //按钮
    }, function(){
        $.ajax({
            url:global_path + '/cms/wearUser/deleteHistoryData',
            type:'post',
            dataType:'json',
            data:data,
            success:function (res) {
                if(res.code === 200){
                    layer.msg(res.msg, {
                        icon:1,
                        time: 2000
                    });
                    showHisData();
                }else {
                    layer.msg(res.msg, {
                        icon:2,
                        time: 2000
                    });
                }
            }
        })
    }, function(){
        layer.msg('已取消', {
            time: 2000
        });
    });

}
// 点击时间表获取时间
$("#time").change(function(){
    $("#time").attr("value",$(this).val()); //赋值
    var timeVal = $('#time').val();
    time = new Date(timeVal).getTime();  //把时间字符串转化为毫秒数
});
var time = new Date().getTime();  //获取当前时间毫秒数
//点击前一天
$('#prevDay').click(function(){
	time = time - 1000*24*60*60;  //获取 当前  - 一天    的毫秒数
	var difference = new Date(time).toLocaleDateString(); //获取时间
    var time1 = difference.replace(/\//g,'-');
    $('#time').val(format(time1,'-'));
    showHisData();
})
//点击后一天
$('#nextDay').click(function(){
	time = time + 1000*24*60*60;
	var difference = new Date(time).toLocaleDateString();
    var time1 = difference.replace(/\//g,'-')
    $('#time').val(format(time1,'-'));
    showHisData();
})
//判0
function format(str,fuhao){
	var arr = str.split(fuhao);
	for(var i in arr){
		arr[i] < 10 ? arr[i] = '0' + arr[i] : arr[i];
	}
	return arr.join(fuhao);
}


