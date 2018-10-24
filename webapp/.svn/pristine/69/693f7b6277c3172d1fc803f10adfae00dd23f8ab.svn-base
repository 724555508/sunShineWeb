var obj = {};
var url = window.location.search;
var str = url.substring(1,url.length);
var arr = str.split('&');
for(var i = 0; i < arr.length; i ++){
    obj[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
}
obj.loginId = localStorage.loginId;
obj.token = localStorage.token;

var app = new Vue({
    el:'#app',
    data:{
        date:[],
        VideoReportModel:{},//化验单model
        LaboratorySheetModel:{},//影响报告model
    },
    mounted:function(){
        this.init();
    },
    methods:{
        init:function(){
            var that = this;
            $.ajax({
                url:global_path + '/cms/wearUser/listErecordByDate',
                type:'post',
                dataType:'json',
                data:obj,
                success: function (result) {
                    checkToken(result);
                    if(result.code == 200){
                        that.date = result.data.data;
                    }else{
                        layer.msg(result.msg, {
                            icon: 5,time:2000
                        });
                    }
                }
            });

        },
        showInfo:function (e) {
            var that = this;
            obj.erecordId = e;
            $.ajax({
                url:global_path + '/cms/wearUser/getErecordDataInfo',
                type:'post',
                dataType:'json',
                data:obj,
                success: function (result) {
                    checkToken(result);
                    if(result.code == 200){
                        if (result.data.subjectType == 2){
                            that.VideoReportModel = result.data.resData;
                            $('#VideoReportModel').modal({ keyboard: false});
                        }else if(result.data.subjectType == 1){
                            that.LaboratorySheetModel = result.data.resData;
                            $('#LaboratorySheetModel').modal({ keyboard: false});
                        }
                    }else{
                        layer.msg(result.msg, {
                            icon: 5,time:2000
                        });
                    }
                }
            });
        }
    }


});