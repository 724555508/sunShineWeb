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
        list:[],
        typeName:'',
        subjectName:'',
        id:'',
        loginId: localStorage.loginId,
        token: localStorage.token,
        typeId:'',
        selectList:[],
        zoom_n:1,
        erecordData:{},
        date1:'',
        date2:'',
        date3:'',
        date4:'',
        items:[]
    },
    mounted: function () {
        this.init();
    },
    methods: {
        /**
         * 初始化页面
         * */
        init: function () {
            var that = this;
            $.ajax({
                url: global_path + '/cms/wearUser/listErecordSubjects',
                type: 'post',
                dataType: 'json',
                data: {
                    loginId: localStorage.loginId,
                    token: localStorage.token
                },
                success: function (res) {
                    checkToken(res);
                    if(res.code === 200){
                        // debugger;
                        that.list = res.data.datas;
                        console.log($('#bgImg')[0].src)
                    }else {
                        layer.msg(res.msg);
                    }
                },
                error: function () {
                    layer.msg('网络异常');
                }
            })
        },
        // 关闭弹框
        closeModel:function(){
            $(".modal").modal("hide");
        },
        /*点击类别进行添加*/
        addClass:function(){
            $('#createClass').modal({backdrop: 'static', keyboard: false});
        },
        /*点击添加类别中的确定*/
        addClassSubmit:function(){
            var that = this;
            $.ajax({
                url: global_path + '/cms/wearUser/addErecordType',
                type: 'post',
                dataType: 'json',
                data: {
                    loginId: localStorage.loginId,
                    token: localStorage.token,
                    subjectName:that.subjectName
                },
                success: function (res) {
                    checkToken(res);
                    if(res.code === 200){
                        layer.msg(res.msg);
                      setTimeout(function(){
                          window.location.reload();
                      },1000)

                    }else {
                        layer.msg(res.msg);
                    }
                }
            })
        },
        /*点击添加科目进行添加*/
        addSubject:function(index){
            this.id = this.list[index].type.id;  //获取电击当前科目类别的id
            $('#createSubject').modal({backdrop: 'static', keyboard: false});
        },
        /*点击添加科目中的确定按钮*/
        addSubjectSubmit:function(){
            var that = this;
            $.ajax({
                url: global_path + '/cms/wearUser/addErecordSubject',
                type: 'post',
                dataType: 'json',
                data: {
                    loginId: localStorage.loginId,
                    token: localStorage.token,
                    subjectName:that.subjectName,
                    tyleId:that.id
                },
                success: function (res) {
                    checkToken(res);
                    if(res.code === 200){
                        layer.msg(res.msg);
                        setTimeout(function(){
                            window.location.reload();
                        },1000)

                    }else {
                        layer.msg(res.msg);
                    }
                }
            })
        },
        /*点击上传电子档案按钮*/
        upload:function(){
            $('#uploadElecRecord').modal({backdrop: 'static', keyboard: false});
        },
        // 点击化验单
        laboratory:function(){
            this.typeId = 1;
            this.getSelectContent(this.typeId);
            $("#laboratory").attr('class','active1');
            $("#videoReport").removeAttr('class','active1').attr('class','inActive1');
            $('#laboratoryContent').show();
            $('#videoReportContent').hide();
        },
        // 点击影响报告
        videoReport:function(){
            this.typeId = 2;
            this.getSelectContent(this.typeId);
            $("#videoReport").attr('class','active1');
            $("#laboratory").removeAttr('class','active1').attr('class','inActive1');
            $('#videoReportContent').show();
            $('#laboratoryContent').hide();
        },
        /*点击上传照片时*/
        uploadImg:function(){
            uploadImg1('newImg','img_show','imgs');
            $('.btn-file').text('重新上传');
            this.zoom_n = 1;
            $(".mask-layer-imgbox p img").css({
                "transform": "scale(" + this.zoom_n + ")"
            })
        },
        /*点击切换栏获取下拉框内容*/
        getSelectContent:function(id){
            var that = this;
            $.ajax({
                url: global_path + '/cms/wearUser/listErecordSubjectByType',
                type: 'post',
                dataType: 'json',
                data: {
                    loginId: localStorage.loginId,
                    token: localStorage.token,
                    tyleId:id
                },
                success: function (res) {
                    checkToken(res);
                    if(res.code === 200){
                        that.selectList = res.data.list;
                    }
                }
            })
        },
        getValue:function(){
            console.log(1);
        },
        /*点击开始识别*/
        stratIdentify:function(){
            var that = this;
            console.log(that.typeId);
            //加载层
            if($('#bgImg')[0].src !== ''){
                var index = layer.load(2, {shade: [0.1,'#fff']}); //0.1透明度的白色背景
                $.ajax({
                    url: global_path + '/cms/wearUser/discernErecordData',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        loginId: localStorage.loginId,
                        token: localStorage.token,
                        imgUrl:$('#bgImg')[0].src,
                        erecordType:that.typeId,
                        erecordSubject:$("#selectVal").val(),
                        wearUserId:obj.wearUserId
                    },
                    success: function (res) {
                        checkToken(res);
                        layer.closeAll('loading'); //关闭加载层
                        if(res.code === 200){
                            layer.msg(res.msg);

                            if(that.typeId === 1){
                                if(res.data.responseData !== "" ||res.data.responseData !== null || res.data.responseData !== undefined){
                                    var data = res.data.responseData;
                                    // that.hospital = data.hospital;
                                    $('.hospital').val(data.hospital);
                                    $('.checkCategory').val(data.checkCategory);
                                    $('.specimenSpecies').val(data.specimenSpecies);
                                    $('.samplingDate').val(data.samplingDate);
                                    $('.receivingDate').val(data.receivingDate);
                                    $('.reportDate').val(data.reportDate);
                                    $('.remark').val(data.remark);
                                    that.items = res.data.responseData.items;
                                    if(that.items !== "" || that.items !== null || that.items !== "undefined"){
                                        for(var i=0;i<that.items.length;i++){
                                            /*动态创建li以及input*/
                                            var lis = '<li>' +
                                                '<input type="text" class="">'+
                                            '</li>';
                                            /*追加删除按钮*/
                                            var liOpearte = '<li>' +
                                                '<img src="../../imgs/doctorImgs/delete.png" class="deleteMe" alt="" />'+
                                            '</li>';
                                            /*最后一个添加加按钮*/
                                            if(i === that.items.length-1){
                                                liOpearte = '<li>' +
                                                    '<img src="../../imgs/doctorImgs/delete.png" class="deleteMe" alt="" >'+
                                                    '<img src="../../imgs/doctorImgs/increase.png" onclick="createDom()" alt="">'+
                                                   '</li>';
                                            }
                                            $('.ul2').append(lis);
                                            $('.ul3').append(lis);
                                            $('.ul4').append(lis);
                                            $('.ul5').append(lis);
                                            $('.ul6').append(liOpearte);
                                            $('.ul2 li input')[i].value = that.items[i].projectName;
                                            $('.ul3 li input')[i].value = that.items[i].result;
                                            $('.ul4 li input')[i].value = that.items[i].unit;
                                            $('.ul5 li input')[i].value = that.items[i].referenceValue;
                                        }
                                        // //绑定单击事件
                                        // $('.ul6 li').click(function () {
                                        //     log($(this).index());
                                        //     deleteMe($(this).index());
                                        // })
                                    }

                                }
                            }else if(that.typeId === 2){
                                if(res.data.responseData !== "" ||res.data.responseData !== null || res.data.responseData !== undefined){
                                    var data = res.data.responseData;
                                    $('.hospital2').val(data.hospital);
                                    $('.checkCategory2').val(data.checkCategory);
                                    $('.checkNum').val(data.checkNum);
                                    $('.checkType').val(data.checkType);
                                    $('.checkDevice').val(data.checkDevice);
                                    $('.checkInfo').val(data.checkInfo);
                                    $('.checkHints').val(data.checkHints);
                                    $('.checkDate').val(data.checkDate);
                                }
                            }
                            /*根据文本自适应input框的宽度 */
                            var inputs = $('.inputVal');
                            for(var i=0;i<inputs.length;i++){
                                if(inputs[i].value !== ''){
                                    var firstWidth = 13;  //首字大小
                                    var h2 = 16;
                                    var text_length = inputs[i].value.length;//获取当前文本框的长度
                                    var current_width = (13 * text_length)+20;    //首字大小乘以文本框个数 ，获取文本框的总宽度
                                    var current_width2 = (16 * text_length) + 20; //当前文本框的长度
                                    inputs[i].style.width = current_width+"px";
                                    console.log(inputs[i].style.width);
                                    inputs[i].style.width = current_width2+"px";
                                }
                            }
                        }else {
                            layer.msg(res.msg);
                        }
                    }
                })
            }else{
                layer.msg('请先上传图片！');
            }
        },
        /*传的参数 数据*/
        transData:function(){
            /*传的数据*/
            this.erecordData = {};
            this.erecordData.resData = {};
            if(this.typeId === 1){
                this.erecordData.resData.hospital = $('.hospital').val();  //医院
                this.erecordData.resData.checkCategory = $('.checkCategory').val(); //检查类目
            }else if(this.typeId ===2){
                this.erecordData.resData.hospital = $('.hospital2').val();  //医院
                this.erecordData.resData.checkCategory = $('.checkCategory2').val(); //检查类目
            }
            this.erecordData.resData.specimenSpecies = $('.specimenSpecies').val(); //标本种类
            this.erecordData.resData.samplingDate = $('.samplingDate').val();  //采样日期
            this.erecordData.resData.receivingDate = $('.receivingDate').val();  //接受日期
            this.erecordData.resData.reportDate = $('.reportDate').val();    //报告日期
            this.erecordData.resData.remark = $('.remark').val();    //备注
            this.erecordData.resData.checkNum = $('.checkNum').val();    //超声号
            this.erecordData.resData.checkType = $('.checkType').val();    //检查类型
            this.erecordData.resData.checkDevice = $('.checkDevice').val();    //检查设备
            this.erecordData.resData.checkInfo = $('.checkInfo').val();    //超声所见
            this.erecordData.resData.checkHints = $('.checkHints').val();    //超声提示
            this.erecordData.resData.checkDate = $('.checkDate').val();    //检查日期
            this.erecordData.resData.items = [];
            var uls = $('.part2>div ul');
            var ul2Len = $('.part2>div .ul2').find("li input");
            var ul3Len = $('.part2>div .ul3').find("li input");
            var ul4Len = $('.part2>div .ul4').find("li input");
            var ul5Len = $('.part2>div .ul5').find("li input");
            for(var i=0;i<ul2Len.length;i++){
                var obj = {};
                obj.projectName = ul2Len[i].value;
                obj.result = ul3Len[i].value;
                obj.unit = ul4Len[i].value;
                obj.referenceValue = ul5Len[i].value;
                this.erecordData.resData.items.push(obj);
            }
            console.log(this.erecordData);
        },
        /*点击确定进行电子档案保存*/
        saveSubmit:function(){
            var that = this;
            that.transData();
            $.ajax({
                url: global_path + '/cms/wearUser/saveErecordData',
                type: 'post',
                dataType: 'json',
                data: {
                    loginId: localStorage.loginId,
                    token: localStorage.token,
                    imgUrl:$('#bgImg')[0].src,
                    erecordType:that.typeId,
                    erecordSubject:$("#selectVal").val(),
                    wearUserId:obj.wearUserId,
                    erecordData:JSON.stringify(that.erecordData.resData)
                },
                success: function (res) {
                    checkToken(res);
                    layer.closeAll('loading'); //关闭加载层
                    if(res.code === 200){
                        layer.msg(res.msg);


                    }else {
                        layer.msg(res.msg);
                    }
                }
            })
        }
    }}
    );
/*创建input*/
// function createDom(){
//     var li1 = '<li>' +
//         '<input type="text" class="">'+
//         '</li>';
//     /*追加删除按钮*/
//     var liOpearte1 = '<li>' +
//             '<img src="../../imgs/doctorImgs/delete.png" onclick="deleteMe()" alt="" />'+
//             '<img src="../../imgs/doctorImgs/increase.png" onclick="createDom()" alt="">'+
//         '</li>';
//     $('.ul2').append(li1);
//     $('.ul3').append(li1);
//     $('.ul4').append(li1);
//     $('.ul5').append(li1);
//     $('.ul6').append(liOpearte1);
//     console.log($('.ul6 li'));
// }
// /*删除当前*/
// function deleteMe(index){
//     if(index === app.items.length){
//         var liOpearte = '<li>' +
//                 '<img src="../../imgs/doctorImgs/delete.png" onclick="deleteMe()" alt="" />'+
//                 '<img src="../../imgs/doctorImgs/increase.png" onclick="createDom()" alt="">'+
//             '</li>';
//         $(".ul6 li")[index].append(liOpearte);
//     }
//     $(".ul2 li")[index].remove();
//     $(".ul3 li")[index].remove();
//     $(".ul4 li")[index].remove();
//     $(".ul5 li")[index].remove();
//     $(".ul6 li")[index].remove();
//
//     // deleteMe($(this).index());
// }
//


//放大
app.zoom_n = 1;
$(".mask-out").click(function () {
    console.log(1);
    app.zoom_n += 0.1;
    $(".mask-layer-imgbox p img").css({
        "transform": "scale(" + app.zoom_n + ")",
        "-moz-transform": "scale(" + app.zoom_n + ")",
        "-ms-transform": "scale(" + app.zoom_n + ")",
        "-o-transform": "scale(" + app.zoom_n + ")",
        "-webkit-": "scale(" + app.zoom_n + ")"
    });
});
//    缩小
$(".mask-in").click(function () {
    app.zoom_n -= 0.1;
    if (app.zoom_n <= 0.1) {
        app.zoom_n = 0.1;
        $(".mask-layer-imgbox p img").css({
            "transform":"scale(.1)",
            "-moz-transform":"scale(.1)",
            "-ms-transform":"scale(.1)",
            "-o-transform":"scale(.1)",
            "-webkit-transform":"scale(.1)"
        });
    } else {
        $(".mask-layer-imgbox p img").css({
            "transform": "scale(" + app.zoom_n + ")",
            "-moz-transform": "scale(" + app.zoom_n + ")",
            "-ms-transform": "scale(" + app.zoom_n + ")",
            "-o-transform": "scale(" + app.zoom_n + ")",
            "-webkit-transform": "scale(" + app.zoom_n + ")"
        });
    }
});
//图片拖拽
var $div_img = $(".mask-layer-imgbox p");
//绑定鼠标左键按住事件
$div_img.bind("mousedown", function (event) {
    event.preventDefault && event.preventDefault(); //去掉图片拖动响应
    //获取需要拖动节点的坐标
    var offset_x = $(this)[0].offsetLeft;//x坐标
    console.log(offset_x);
    var offset_y = $(this)[0].offsetTop;//y坐标
    //获取当前鼠标的坐标
    var mouse_x = event.pageX;
    var mouse_y = event.pageY;
    //绑定拖动事件
    //由于拖动时，可能鼠标会移出元素，所以应该使用全局（document）元素
    $(".mask-layer-imgbox").bind("mousemove", function (ev) {
        // 计算鼠标移动了的位置
        var _x = ev.pageX - mouse_x;
        var _y = ev.pageY - mouse_y;

        //设置移动后的元素坐标
        var now_x = (offset_x + _x ) + "px";
        var now_y = (offset_y + _y ) + "px";
        // if(_x <= 0){
        //     now_x = 0 + 'px';
        // }else if(_y <= 0) {
        //     now_y = 0 + 'px';
        // }else if(_x >= 400) {
        //     now_x = 400 + 'px';
        // }else if(_y >= 350) {
        //     now_y = 350 + 'px';
        // }
        //改变目标元素的位置
        $div_img.css({
            top: now_y,
            left: now_x
        });
    });
});
//当鼠标左键松开，接触事件绑定
$(".mask-layer-imgbox").bind("mouseup", function () {
    $(this).unbind("mousemove");
});

/*时间插件*/
jeDate("#samplingDate",{
    skinCell:"jedateblue",
    isinitVal:false,   ///是否初始化时间，默认不初始化时间
    initDate:[{YYYY:2017,MM:10,DD:10,hh:16,mm:59,ss:59},false],  //初始化时间，加减 天 时 分
    format:"YYYY-MM-DD hh:mm:ss",
    zIndex:3000,
    donefun:function(obj){   //点击确定后的回调,obj包含{ elem当前输入框ID, val当前选择的值, date当前的日期值}
        app.date1 = obj.val;
        app.erecordData.resData.samplingDate = app.date1;
        console.log(obj.val);   //时间值
    }
});
jeDate("#receivingDate",{
    isinitVal:false,   ///是否初始化时间，默认不初始化时间
    initDate:[{YYYY:2017,MM:10,DD:10,hh:16,mm:59,ss:59},false],  //初始化时间，加减 天 时 分
    format:"YYYY-MM-DD hh:mm:ss",
    zIndex:3000,
    donefun:function(obj){   //点击确定后的回调,obj包含{ elem当前输入框ID, val当前选择的值, date当前的日期值}
        app.date2 = obj.val;
        app.erecordData.resData.receivingDate = app.date2;
        console.log(obj.val);   //时间值
    }
});
jeDate("#reportDate",{
    isinitVal:false,   ///是否初始化时间，默认不初始化时间
    initDate:[{YYYY:2017,MM:10,DD:10,hh:16,mm:59,ss:59},false],  //初始化时间，加减 天 时 分
    format:"YYYY-MM-DD hh:mm:ss",
    zIndex:3000,
    donefun:function(obj){   //点击确定后的回调,obj包含{ elem当前输入框ID, val当前选择的值, date当前的日期值}
        app.date3 = obj.val;
        app.erecordData.resData.reportDate = app.date3;
//      	obj.date = {YYYY: 2017, MM: 08, DD: 18, hh: 10, mm: 25, ss: 10}
        console.log(obj.val);   //时间值
    }
});
/*检查日期*/
jeDate("#checkDate",{
    isinitVal:false,   ///是否初始化时间，默认不初始化时间
    initDate:[{YYYY:2017,MM:10,DD:10,hh:16,mm:59,ss:59},false],  //初始化时间，加减 天 时 分
    format:"YYYY-MM-DD hh:mm:ss",
    zIndex:3000,
    donefun:function(obj){   //点击确定后的回调,obj包含{ elem当前输入框ID, val当前选择的值, date当前的日期值}
        app.date4 = obj.val;
        app.erecordData.resData.reportDate = app.date4;
        console.log(obj.val);   //时间值
    }
});
