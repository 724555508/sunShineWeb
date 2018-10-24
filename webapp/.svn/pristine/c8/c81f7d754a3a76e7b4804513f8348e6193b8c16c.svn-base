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
        projectNames:[],
        results:{}
    },
    mounted:function(){
        this.init();
    },
    methods:{
        init:function(){
            var that = this;
            $.ajax({
                url:global_path + '/cms/wearUser/listLaboratorySheetItems',
                type:'get',
                dataType:'json',
                data:obj,
                success: function (result) {
                    checkToken(result);
                    if(result.code == 200){
                        that.projectNames = result.data.projectNames;
                        that.results = result.data.results;
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