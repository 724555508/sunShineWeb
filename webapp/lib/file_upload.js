/**
 * Created by Administrator on 2017/7/25.
 */
var picsign = 0;
var PIC_SIZE_5 = 5242880; // 5M *1024 *1024

function piccheck (filename){
    reg = /([^\s]+(?=\.(bmp|jpg|png|jpeg|gif))\.\2)/gi;
    if (reg.test(filename)) {
        return 1; // true
    } else {
        return 2; // false
    }
}

function uploadImg(id,imgShow,imgs){
    var imglen = $("#"+id)[0].files.length;
    console.log(imglen);
    if(imglen > 5){
        alert("图片不能超过5张");
        return;
    }

    var pics = $("#" + id)[0].files;
    console.log(pics);
    for (var i=0; i<pics.length; i++) {
        var filename = pics[i].name;//
        console.log(pics[i].size);
        if(pics[i].size >= PIC_SIZE_5){
            alert("不能超过5M");
            return;
        }
        var ispic=piccheck (filename); //
        if(ispic == 2){
            layer.msg("文件格式不正确");
            return;
        }
    }
    //发送请求
    var option = {
        url : global_path + "/cms/index/uploadFileHtmlImg",
        type : "post",
        //dataType : "json",
        success : function(data) {
            $('#'+ imgs).val(data);         //将ajax调回成功返回值(一个img url)放入到隐藏域input的value中
            $('#imgShowBox').html('<img src="'+data+'" width="200">');  //这里放预览图
            return data;
        },
        error:function(){
            alert("上传失败");
            return;
        }
    };
    $("#uploadImg").ajaxSubmit(option);     //ajaxSubmit交互
}


//上传用户帮助图片时调用
function uploadUserHelpImg(id,imgShow,imgs){
    var imglen = $("#"+id)[0].files.length;
    if(imglen > 5){
        alert("图片不能超过5张");
        return;
    }

    var pics = $("#" + id)[0].files;

    for (var i=0; i<pics.length; i++) {
        var filename = pics[i].name;
        if(pics[i].size >= PIC_SIZE_5){
            alert("不能超过5M");
            return;
        }
        var ispic=piccheck (filename); //
        if(ispic == 2){
            alert("文件格式不正确");
            return;
        }
    }
    //发送请求
    var option = {
        url : global_path + "/cms/index/uploadFileHtmlImg",
        type : "post",
        success : function(data) {
            $('#imgs').removeAttr("type");
            $('#'+ imgs).val(data);         //将ajax调回成功返回值(一个img url)放入到隐藏域input的value中
            //$('#imgShowBox').html('<img src="'+data+'" width="200">');  //这里放预览图
            return data;
        },
        error:function(){
            alert("上传失败");
            return;
        }
    };
    $("#uploadUserHelpImg").ajaxSubmit(option);     //ajaxSubmit交互
}

//上传轮播图封面
function uploadAdvImg(id,imgShow,imgs,that){
    var imglen = $("#"+id)[0].files.length;
    if(imglen > 5){
        alert("图片不能超过5张");
        return;
    }

    var pics = $("#" + id)[0].files;

    for (var i=0; i<pics.length; i++) {
        var filename = pics[i].name;//
        console.log(pics[i].size);
        if(pics[i].size >= PIC_SIZE_5){
            alert("不能超过5M");
            return;
        }
        var ispic=piccheck (filename); //
        // if(ispic == 2){
        //     alert("文件格式不正确");
        //     return;
        // }
    }
    //发送请求
    var option = {
        url : global_path + "/cms/index/uploadFileHtmlImg",
        type : "post",
        //dataType : "json",
        success : function(data) {
            $('#img').val(data);         //将ajax调回成功返回值(一个img url)放入到隐藏域input的value中
            that.imgs = data;
            $('#imgShowBox').html('<img src="'+data+'" width="200" class="img1">');  //这里放预览图
            return data;
        },
        error:function(){
            alert("上传失败");
            return;
        }
    };
    $("#uploadImg").ajaxSubmit(option);     //ajaxSubmit交互
}

//资讯封面
function uploadImg1(id,imgShow,imgs){
    var imglen = $("#"+id)[0].files.length;
    console.log(imglen);
    if(imglen > 5){
        alert("图片不能超过5张");
        return;
    }

    var pics = $("#" + id)[0].files;
    console.log(pics);
    for (var i=0; i<pics.length; i++) {
        var filename = pics[i].name;//
        console.log(pics[i].size);
        if(pics[i].size >= PIC_SIZE_5){
            alert("不能超过5M");
            return;
        }
        var ispic = piccheck (filename);
        if(ispic === 2){
            layer.msg("文件格式不正确");
            return;
        }
    }
    //发送请求
    var option = {
        url : global_path + "/cms/index/uploadFileHtmlImg",
        type : "post",
        //dataType : "json",
        success : function(data) {
            $('#'+ imgs).val(data);         //将ajax调回成功返回值(一个img url)放入到隐藏域input的value中
            $('#bgImg').attr('src',data);  //这里放预览图
            return data;
        },
        error:function(){
            alert("上传失败");
            return;
        }
    };
    $("#uploadImg").ajaxSubmit(option);     //ajaxSubmit交互
}

//内容插图url
function uploadImg2(id,imgShow,imgs){
    var imglen = $("#"+id)[0].files.length;
    console.log(imglen);
    if(imglen > 5){
        alert("图片不能超过5张");
        return;
    }

    var pics = $("#" + id)[0].files;
    console.log(pics);
    for (var i=0; i<pics.length; i++) {
        var filename = pics[i].name;//
        console.log(pics[i].size);
        if(pics[i].size >= PIC_SIZE_5){
            alert("不能超过5M");
            return;
        }
        var ispic=piccheck (filename);
        if(ispic == 2){
            layer.msg("文件格式不正确");
            return;
        }
    }
    //发送请求
    var option = {
        url : global_path + "/cms/index/uploadFileHtmlImg",
        type : "post",
        //dataType : "json",
        success : function(data) {
            $('#'+ imgs).text(data);         //将ajax调回成功返回值(一个img url)放入到隐藏域input的value中
            $('#bgImg2').attr('src',data);  //这里放预览图
            return data;
        },
        error:function(){
            alert("上传失败");
            return;
        }
    };
    $("#uploadImg1").ajaxSubmit(option);     //ajaxSubmit交互
}

/*
电子档案上传图片*/
