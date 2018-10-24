
var app = new Vue({
    el: '#app',
    data: {
        pid: '',         //父级id
        loginId: localStorage.loginId,
        token: localStorage.token,
        fileName: '',    //新建文件名
        fileName1: '',
        fileSign: false, //创建文件夹模块的显示或隐藏
        pageArr: [],      //跳入下一级或者返回上一级
        levelSign: localStorage.sign, //0：超级管理员  1：客服   2：合伙人  判断，如果是合伙人则控制权限
        imgUrl:'',//预览图的url
        moment:'',//下载预览图临时id
        sign: localStorage.sign,
        arr:[],
        arr2:[],//
        singleArr:[]

    },
    /**
     * 页面加载完成要做的事
     * */
    mounted: function () {
        var _this = this;
        _this.init();
        //进度条
        function percent(i) {
            $('.progressbar').each(function(){
                let t = $(this);
                let dataperc = i,//t.attr('data-perc'),
                    barperc = Math.round(dataperc*5.56);

                t.find('.bar').animate({width:barperc}, 1);
                t.find('.label').html('<div class="perc"></div>');

                function perc() {
                    let length = t.find('.bar').css('width'),
                        perc = Math.round(parseInt(length)/5.56),
                        labelpos = (parseInt(length)-2);
                    t.find('.label').css('left', labelpos);
                    t.find('.perc').html(perc+'%');
                }
                perc();
                setInterval(perc, 0);
            });
        }
        //goEasy
        var goeasy = new GoEasy({
            appkey : 'BC-f8527a61678d424b98c170e4ff70ce37',
            onConnected: function () {
                console.log("成功连接GoEasy。");
            },
            onDisconnected: function () {
                console.log("与GoEasy连接断开。");
            },
            onConnectFailed: function (error) {
                console.log("与GoEasy连接失败，错误编码："+error.code+"错误信息："+error.content);
            }
        });
        goeasy.subscribe({
            channel : 'F464D6A2BF6E4CE4854F41D4E1A6DA5C-'+_this.loginId,
            onMessage : function(result) {
                $('.modalBox').fadeIn();
                percent(result.content);
                if(result.content == 100){
                    $('.modalBox').fadeOut();
                    _this.init();
                }

            }
        });

    },

    /**
     * methods
     * */
    methods: {
        /**
         * init方法（页面加载完毕做的事）
         * dataTables表格处理
         * */
        init: function () {
            var _this = this;
            var table = $('#fileTables').DataTable({
                "lengthMenu": [[5, 10, 25, 50], [5, 10, 25, 50]], //分页长度选项,   -1 "全部"  暂时取消
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
                "bServerSide": false, //服务端分页
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
                "info": false, //通知
                ajax: function (data, callback, settings) {
                    var that = this;
                    //封装请求参数
                    var param = {};
                    // param.pageSize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
                    // param.startRow = data.start;//开始的记录序号
                    param.loginId = localStorage.loginId;
                    param.token = localStorage.token;
                    param.pid = _this.pid;     //父级id
                    //ajax请求数据
                    $.ajax({
                        type: "post",
                        url: global_path + "/cms/file/getFileDir",
                        cache: false,  //禁用缓存
                        data: param,  //传入组装的参数
                        dataType: "json",
                        success: function (result) {
                            checkToken(result);
                            if(result.code == 200){
                                var returnData = {};
                                // returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                                // returnData.recordsTotal = result.data.total;//返回数据全部记录
                                // returnData.recordsFiltered = result.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                                returnData.data = result.data.dir;//返回的数据列表
                                callback(returnData);
                            }
                        }
                    });
                },
                columns: [
                    // 选择框
                    {//1选择框
                        createdCell: function(td, cellData, rowData, row, col) {
                            $(td).css("text-align", "center");
                        },
                        data: null,
                        searchable: false, //禁用搜索
                        orderable: false, //禁用排序
                        render: function(data, type, row, meta) {
                            if(row.fileName === null || row.fileName === undefined || row.fileName === ''){
                                return '<input type="checkbox" name="idList" value="' + row.id + '" />';
                            }
                            return '<input type="checkbox" name="idList2" value="' + row.id + '" />';
                        }
                    },
                    //序号
                   /* {
                        "data": null,
                        "bSortable": false,
                        "bVisible":false //隐藏列
                    },*/
                    //文件名
                    {
                        "data": '',
                        "bSortable": false,
                        "render":function (data, type, full, meta) {
                            var node = '';
                            if(full.fileName === null || full.fileName === undefined || full.fileName === ''){
                                node = '<div class="fileDiv text-primary" onclick="nextFile('+full.id+')"><img src="../../imgs/iframeImgs/fileIcon.png" alt="" width="20"><b class="padd">'+full.dirName+'</b></div>';
                            }else {
                                var url = '';
                                if(full.fileFormat === 'jpg' || full.fileFormat === 'jepg' || full.fileFormat === 'png'){
                                    url = 'https://i.iandun.com:8085/'+full.fileUrl;
                                    node = '<div class="fileDiv" onclick="seeBigImg(&quot;'+url+'&quot;,&quot;'+full.id+'&quot;)"><img src="'+url+'" alt="" width="20" class="img1"><span class="padd">'+full.fileName+'</span></div>';
                                }else {
                                    if(full.fileFormat === 'zip' || full.fileFormat === '7z' || full.fileFormat === 'rar'){
                                        url = '../../imgs/iframeImgs/zip.png';
                                    }else if(full.fileFormat === 'txt'){
                                        url = '../../imgs/iframeImgs/txt.png';
                                    }else if(full.fileFormat === 'doc' || full.fileFormat === 'docx'){
                                        url = '../../imgs/iframeImgs/doc.png';
                                    }else if(full.fileFormat === 'xls' || full.fileFormat === 'xlsx'){
                                        url = '../../imgs/iframeImgs/xls.png';
                                    }else if(full.fileFormat === 'pdf'){
                                        url = '../../imgs/iframeImgs/pdf.png';
                                    }else if(full.fileFormat === 'ppt' || full.fileFormat === 'pptx'){
                                        url = '../../imgs/iframeImgs/ppt.png';
                                    }else if(full.fileFormat === 'ai'){
                                        url = '../../imgs/iframeImgs/ai.png';
                                    }else if(full.fileFormat === 'mp3'){
                                        url = '../../imgs/iframeImgs/mp3.png';
                                    }else if(full.fileFormat === 'psd'){
                                        url = '../../imgs/iframeImgs/psd.png';
                                    }else if(full.fileFormat === 'mpg' || full.fileFormat === 'mp4' || full.fileFormat === 'mvn' || full.fileFormat === 'mov'){
                                        url = '../../imgs/iframeImgs/mpg.png';
                                    } else {
                                        url = '../../imgs/iframeImgs/fileOther.png';
                                    }
                                    node = '<div class="fileDiv"><img src="'+url+'" alt="" width="20" class="img1"><span class="padd">'+full.fileName+'</span></div>';
                                }


                            }
                            return node;
                        }
                    },
                    //类别
                    {
                        "data": '',
                        "bSortable": false,
                        "render":function (data, type, full, meta) {
                            var node = '';
                            if(full.fileFormat == null || full.fileFormat == undefined || full.fileFormat == ''){
                                node = '';
                            }else {
                                node = full.fileFormat;
                            }
                            return node;
                        }
                    },
                    //大小
                    {
                        "data": '',
                        "bSortable": false,
                        "render":function (data, type, full, meta) {
                            var node = '';
                            if(full.fileSize == null || full.fileSize == undefined || full.fileSize == ''){
                                node = '';
                            }else {
                                node = (full.fileSize / 1024).toFixed(1) + 'M';
                            }
                            return node;
                        }
                    },
                    //上传人
                    {
                        "data": '',
                        "bSortable": false,
                        "render":function (data, type, full, meta) {
                            var node = '';
                            if(full.uploadId == null || full.uploadId == undefined || full.uploadId == ''){
                                node = '';
                            }else {
                                node = full.uploadId;
                            }
                            return node;
                        }
                    },
                    //下载次数
                    {
                        "data": '',
                        "bSortable": false,
                        "render":function (data, type, full, meta) {
                            var node = '';
                            if(full.downCount === null || full.downCount === undefined || full.downCount === ''){
                                node = '';
                            }else {

                                node = full.downCount;
                            }
                            return node;
                        }
                    },
                    //更新时间
                    {
                        "data": '',
                        "bSortable": false,
                        "render":function (data, type, full, meta) {
                            var node = '';
                            if(full.uploadTime == null || full.uploadTime == undefined || full.uploadTime == ''){
                                node = '';
                            }else {
                                node = full.uploadTime;
                            }
                            return node;
                        }
                    },
                    //操作
                    {
                        "data": null,
                        "bSortable": false,
                        "render":function (data, type, full, meta) {
                            var node = '';
                            if(full.fileName == null || full.fileName == undefined || full.fileName == ''){
                                node = '';
                            }else {
                                if(_this.levelSign !== '2' && _this.levelSign !== '5'){
                                    node = '<div class="dis2">' +
                                            '<img src="../../imgs/edit.png" alt="" title="编辑" class="fileIcon" onclick="editMe(&quot;'+full.id+'&quot,&quot;'+full.dirId+'&quot)"><img src="../../imgs/delete.png" alt="" title="删除" class="fileIcon" onclick="deleteMe(&quot;'+full.id+'&quot;)"><img src="../../imgs/down.png" title="下载" alt=""  class="fileIcon" onclick="downloadFile(&quot;'+full.id+'&quot;)">'+
                                    //     '<button class="btn btn-skyBlueSmall" style="margin: 0 10px;" onclick="deleteMe(&quot;'+full.id+'&quot;)">删除</button><a class="btn btn-skyBlueSmall" onclick="downloadFile(&quot;'+full.id+'&quot;)">下载</a>' +
                                        '</div>';
                                }else {
                                    node = '<div>' +
                                        // '<a class="btn btn-skyBlueSmall" onclick="downloadFile(&quot;'+full.id+'&quot;)">下载</a>' +  <img src="../../imgs/edit.png" alt="" title="编辑" class="fileIcon" onclick="editMe(&quot;'+full.id+'&quot,&quot;'+full.dirId+'&quot)">
                                            '<img src="../../imgs/down.png" title="下载" alt=""  class="fileIcon" onclick="downloadFile(&quot;'+full.id+'&quot;)">'+
                                        '</div>';
                                }
                            }
                            return node;
                        }
                    }
                ],
                //行号重画
               /* "fnDrawCallback": function() { //序号
                    this.api().column(1).nodes().each(function(cell, i) {
                        cell.innerHTML = i + 1;
                    });
                },*/
            });
        },
        /**
         * 上传文件
         * */
        selectFile: function () {
            layer.load(1, {
                shade: [0.1,'#fff'] //0.1透明度的白色背景
            });
            var _this = this;
            var formData = new FormData($("#uploadFile")[0]);
            $.ajax({
                url: global_path+"/cms/file/uploadFile" ,
                type: 'post',
                dataType:'json',
                data: formData,
                async: true,
                cache: false,
                contentType: false,
                processData: false,
                success: function (result) {
                    layer.closeAll('loading'); //关闭加载层
                   if(result.code === 200){
                       layer.msg(result.msg,{icon:1,time:1000});
                       _this.init();
                   }else {
                       layer.msg(result.msg,{icon:2,time:1000});
                   }
                }
            });
        },
        /**
         * 返回上一级
         * */
        back:function () {
            this.pid = this.pageArr[this.pageArr.length - 1];
            this.pageArr.pop();
            this.init();
            if($('#checkall').hasClass('checkMe')){
                $('#checkall').prop("checked", false);
            }
        },
        /**
         * 创建文件夹
         * */
        buildFile:function () {
            // this.fileSign = true;
            $('#buildNewFile').modal({backdrop: 'static', keyboard: false});
        },
        // 点击取消弹框
        closeModel:function(){
            $(".modal").modal("hide");
        },
        // 点击编辑功能弹出弹框
        editFile:function(){
            var _this = this;
            for(var i = 0; i < $("input[name='idList']").length; i ++){
                if($("input[name='idList']")[i].checked === true){
                    _this.arr.push($("input[name='idList']")[i].value);
                }
            }
           for(var j = 0; j < $("input[name='idList2']").length; j ++){
                if($("input[name='idList2']")[j].checked === true){
                    _this.arr2.push($("input[name='idList2']")[j].value);
                }
            }
            if(_this.arr.length === 0) {
                if(_this.arr2.length === 0) {
                    layer.msg('请勾选要下载的文件夹或文件项目');
                }else if(_this.arr2.length > 1){
                    layer.msg('只能对一个文件进行编辑');
                }else{
                    $('#editFile').modal({backdrop: 'static', keyboard: false});
                }
            }else if(_this.arr.length > 1){
                layer.msg('只能对一个文件夹进行编辑');
            }else{
                $('#editFile').modal({backdrop: 'static', keyboard: false});
            }

        },
        // 点击编辑中保存功能对文件或者文件夹重命名
        saveRename:function(){
            var ids = '';
            // 判断文件夹是否有被选中  只能选中一个
            if(this.arr.length === 0){
                if(this.arr2.length === 0){
                    return;
                }else {
                    ids = this.arr2[0];
                }
            }else{
                ids = this.arr[0];
            }
            var _this = this;
            debugger;
            $.ajax({
                url: global_path+"/cms/file/updateDirName" ,
                type: 'post',
                dataType:'json',
                data: {
                    pid:_this.pid,
                    id: ids,
                    loginId: _this.loginId,
                    token: _this.token,
                    dirName: _this.fileName
                },
                success: function (result) {
                    if(result.code === 200){
                        layer.msg(result.msg,{icon:1,time:1000});
                        _this.init();
                        _this.closeModel();
                        _this.fileName = '';

                    }else {
                        layer.msg(result.msg,{icon:2,time:1000});
                    }
                    _this.arr = [];
                    _this.arr2 = [];
                }
            });
        },


        /**
         * 取消创建
         * */
        cancel:function () {
            this.fileSign = false;
        },
        /**
         * enterBuild
         * */
        enterBuild:function () {
            var _this = this;
            $.ajax({
                url: global_path+"/cms/file/addFileDir" ,
                type: 'post',
                dataType:'json',
                data: {
                    pid: _this.pid,
                    loginId: _this.loginId,
                    token: _this.token,
                    dirName: _this.fileName
                },
                success: function (result) {
                    if(result.code === 200){
                        layer.msg(result.msg,{icon:1,time:1000});
                        _this.init();
                        _this.fileSign = false
                        _this.closeModel();
                        _this.fileName = '';

                    }else {
                        layer.msg(result.msg,{icon:2,time:1000});
                    }
                }
            });
        },
        /**
         * 批量下载
         * */
        downloadMany: function () {
            var _this = this;
            var arr = [];
            var arr2 = [];
            for(var i = 0; i < $("input[name='idList']").length; i ++){
                if($("input[name='idList']")[i].checked === true){
                    arr.push($("input[name='idList']")[i].value);
                }
            }
            for(var j = 0; j < $("input[name='idList2']").length; j ++){
                if($("input[name='idList2']")[j].checked === true){
                    arr2.push($("input[name='idList2']")[j].value);
                }
            }
            if(arr2.length === 0){
                layer.msg('请勾选要下载的文件项目(非文件夹)');
            }else {
                layer.confirm('确定要打包下载这些文件吗？', {
                    btn: ['下载','取消'] //按钮
                }, function(){
                    console.log(arr2);
                    var needId = JSON.stringify(arr2);
                    window.location.href = global_path + '/cms/file/downFile?loginId='+localStorage.loginId+'&token='+localStorage.token+
                        '&fileId=' + needId;
                    layer.msg('下载中', {time: 1000});
                    app.init();
                }, function(){
                    layer.msg('已取消', {
                        time: 2000
                    });
                });
            }
        },

        /**
         * 批量删除
         * */
        deleteMany:function(){
                var _this = this;
                _this.arr = [];
                _this.arr2 = [];
                for(var i = 0; i < $("input[name='idList']").length; i ++){
                    if($("input[name='idList']")[i].checked === true){

                        _this.arr.push($("input[name='idList']")[i].value);
                    }
                }
                for(var j = 0; j < $("input[name='idList2']").length; j ++){
                    if($("input[name='idList2']")[j].checked === true){
                        _this.arr2.push($("input[name='idList2']")[j].value);
                    }
                }
                if(_this.arr.length === 0 && _this.arr2.length === 0 ) {
                    layer.msg('请勾选要删除的项目');
                }else{
                    $('#deleteFile').modal({backdrop: 'static', keyboard: false});
                    // _this.confirmDelete(arr,arr2);
                }

        },
        confirmDelete:function(){
            var _this = this;
            $.ajax({
                    url: global_path+"/cms/file/deleteFile" ,
                    type: 'post',
                    dataType:'json',
                    data: {
                        ids:JSON.stringify(_this.arr),
                        fileId: JSON.stringify(_this.arr2),
                        loginId: _this.loginId,
                        token: _this.token
                    },
                    success: function (result) {
                        if(result.code === 200){
                            layer.msg(result.msg,{icon:1,time:1000});
                            _this.init();
                            _this.closeModel();
                        }else {
                            layer.msg(result.msg,{icon:2,time:1000});
                        }
                    }
            });
        },
        // deleteMany: function () {
        //     var _this = this;
        //     var arr = [];
        //     var arr2 = [];
        //     for(var i = 0; i < $("input[name='idList']").length; i ++){
        //         if($("input[name='idList']")[i].checked === true){
        //
        //             arr.push($("input[name='idList']")[i].value);
        //         }
        //     }
        //     for(var j = 0; j < $("input[name='idList2']").length; j ++){
        //         if($("input[name='idList2']")[j].checked === true){
        //             arr2.push($("input[name='idList2']")[j].value);
        //         }
        //     }
        //     if(arr.length === 0 && arr2.length === 0 ){
        //         layer.msg('请勾选要删除的项目');
        //     }else {
        //         layer.confirm('确定要删除这些吗？', {
        //             btn: ['删除','取消'] //按钮
        //         }, function(){
        //             console.log(arr);
        //             console.log(arr2);
        //             $.ajax({
        //                 url: global_path+"/cms/file/deleteFile" ,
        //                 type: 'post',
        //                 dataType:'json',
        //                 data: {
        //                     ids:JSON.stringify(arr),
        //                     fileId: JSON.stringify(arr2),
        //                     loginId: _this.loginId,
        //                     token: _this.token
        //                 },
        //                 success: function (result) {
        //                     if(result.code === 200){
        //                         layer.msg(result.msg,{icon:1,time:1000});
        //                         _this.init();
        //                     }else {
        //                         layer.msg(result.msg,{icon:2,time:1000});
        //                     }
        //                 }
        //             });
        //         }, function(){
        //             layer.msg('已取消', {
        //                 time: 2000
        //             });
        //         });
        //     }
        // }
    }
});
/**
 * 点击下载
 * */
function downloadFile(id) {
   /* alert(global_path + '/cms/file/downFile?loginId='+localStorage.loginId+'&token='+localStorage.token+
        '&fileId=' + needId);*/
    var needArr = [];
    needArr.push(id);
    var needId = JSON.stringify(needArr);
    needId = encodeURI(needId);
/*    debugger;*/
   window.location.href = global_path + '/cms/file/downFile?loginId='+localStorage.loginId+'&token='+localStorage.token+
       '&fileId=' + needId;
   app.init();
}
/**
 * 进入选中的目录
 * */
function nextFile(id) {
    app.pageArr.push(app.pid);
    app.pid = id;
    app.init();
    if($('#checkall').hasClass('checkMe')){
        $('#checkall').prop("checked", false);
    }
}
/**
 * 删除文件
 * */
function deleteMe(id) {
    var arr = [];
    arr.push(id);
    console.log(arr);
    layer.confirm('确定要删除此文件吗？', {
        btn: ['删除','取消'] //按钮
    }, function(){
        $.ajax({
            url: global_path+"/cms/file/deleteFile" ,
            type: 'post',
            dataType:'json',
            data: {
                fileId: JSON.stringify(arr),
                loginId: app.loginId,
                token: app.token
            },
            success: function (result) {
                if(result.code === 200){
                    layer.msg(result.msg,{icon:1,time:1000});
                    app.init();
                }else {
                    layer.msg(result.msg,{icon:2,time:1000});
                }
            }
        });
    }, function(){
        layer.msg('已取消', {
            time: 2000
        });
    });

}



/**
 * 编辑文件时出现弹框
 * */
var editId = '';
var pid = '';
function editMe(id,dirId) {
    editId = id;
    pid = dirId;

    $('#editFile2').modal({backdrop: 'static', keyboard: false});
}
// 点击编辑中的确定请求接口 （对每行所在的文件进行编辑）
function saveRename1(){
    var _this = this;
    $.ajax({
        url: global_path+"/cms/file/updateDirName" ,
        type: 'post',
        dataType:'json',
        data: {
            pid:pid,
            id: editId,
            loginId: app.loginId,
            token: app.token,
            dirName:app.fileName1
        },
        success: function (result) {
            if(result.code === 200){
                layer.msg(result.msg,{icon:1,time:1000});
                app.init();
                app.closeModel();
                app.fileName1 = '';

            }else {
                layer.msg(result.msg,{icon:2,time:1000});
            }
            editId = '';
        }
    });
}

/**
 *复选框检查
 * */
function check_checkbox() {
    var unCheckedBoxs = $("input[name='idList']").not("input:checked");//所有复选框都要有name='idList'
    if(unCheckedBoxs.length > 0) {
        $("#checkall").prop("checked", false);//最顶上那个复选框
    } else {
        $("#checkall").prop("checked", true);//最顶上那个复选框
    }
}
/**
 * 点击全选/取消
 * */
$("#checkall").click(function() {//复选框功能//复选框3
    if($(this).prop('checked')) {
        $("#checkall").addClass('checkMe');
        $("input[name='idList']").prop("checked", true);
        $("input[name='idList2']").prop("checked", true);
        // $('#fileTables tbody tr').addClass('selected');
    } else {
        $("#checkall").removeClass('checkMe');
        $("input[name='idList']").prop("checked", false);
        $("input[name='idList2']").prop("checked", false);
        // $('#fileTables tbody tr').removeClass('selected');
    }
});
/**
 * 预览图
 * seeBigImg
 * */
function seeBigImg(url,id) {
    app.imgUrl = '';
    app.moment = id;
    app.imgUrl = url;
    $('.bigImg').fadeIn(1000);
}
/**
 * 关闭预览图
 * */
$('.closeBigImg').on('click',function () {
    $('.bigImg').fadeOut(1000);
});
// 点击进行左旋转右旋转
var current = 0;
function tranImg(trun){
    current = (current+trun)%360;
    $('#imgTest').css({transform:'rotate('+current+'deg)'},'slow')
}
// 点击图片进行删除
function deleteImg(){
    var needArr = [];
    needArr.push(app.moment);
    var needId = JSON.stringify(needArr);
    layer.confirm('确定要删除此文件吗？', {
        btn: ['删除','取消'] //按钮
    }, function(){
        $.ajax({
            url: global_path+"/cms/file/deleteFile" ,
            type: 'post',
            dataType:'json',
            data: {
                fileId: needId,
                loginId: app.loginId,
                token: app.token
            },
            success: function (result) {
                if(result.code === 200){
                    layer.msg(result.msg,{icon:1,time:1000});
                    $('#bigImg').fadeOut();
                    app.init();
                }else {
                    layer.msg(result.msg,{icon:2,time:1000});
                }
            }
        });
    }, function(){
        layer.msg('已取消', {
            time: 2000
        });
    });
}
// 点击预览图片进行下载
function downloadImg() {
    var needArr = [];
    needArr.push(app.moment);
    var needId = JSON.stringify(needArr);
    window.location.href = global_path + '/cms/file/downFile?loginId='+localStorage.loginId+'&token='+localStorage.token+
        '&fileId=' + needId;
}
