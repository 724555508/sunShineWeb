	var cookie = {
		set: function(name, value) {
			var Days = 30;
			var exp = new Date();
			exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
			document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
		},
		get: function(name) {
			var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
			if(arr = document.cookie.match(reg)) {
				return unescape(arr[2]);
			} else {
				return null;
			}
		},
		del: function(name) {
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval = getCookie(name);
			if(cval != null) {
				document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
			}
		}
	};
	var cookieTime = cookie.get('time_' + huiid);
	//console.log(cookieTime);
	if(!cookieTime || cookieTime == undefined) {
		cookieTime = 0;
	}
	var isiPad = navigator.userAgent.match(/iPhone|Linux|Android|iPad|iPod|ios|iOS|Windows Phone|Phone|WebOS/i) != null; 	
	if (isiPad){
    var videoObject = {
		container: '.huiv',
		variable: 'player',
		loaded:'loadHandler',
		poster:'parse/loadingwap.gif',
		video: huiid
	};
	}else{
	var videoObject = {
		container: '.huiv',
		variable: 'player',
		loaded:'loadHandler',
		autoplay:true,
		video: huiid
	};
	var totalTime = parseM3u8TotalTime(huiid);
	setTimeout(function () {
        console.log(totalTime);
    },2000);
	}
	if(cookieTime > 0) {
        layer.msg('本地缓存'+cookieTimeSe/60+'分');
        videoObject['seek'] = cookieTime;
	}
    var player = new ckplayer(videoObject);

        function loadHandler() {
            player.addListener('time', timeHandler);
            // player.addListener('duration', durationHandler); //监听播放时间
        }

    // function durationHandler(duration) {
		// console.log(duration);
    //     totalTime = duration;
    // }


    function timeHandler(t) {
        if(Math.round(t)%30 == 0){
            $.ajax({
                url:'http://ceshi.vshidai.top/sunShine/wx/updateCookieTime',
                data:{
                    'mvId':movieId,
                    'openId':openId,
                    'mvIndex':'1',
                    'cookieTime':t,
					'totalTime':totalTime
                },
                success:function () {

                }
            });
        }
        cookie.set('time_' + huiid, t);
    }

	if ((navigator.userAgent.indexOf('MSIE') >= 0)
			|| (navigator.userAgent.indexOf('Trident') >= 0)) {
		alert("\u517c\u5bb9\u6a21\u5f0f\u0020\u6613\u4ea7\u751f\u64ad\u653e\u95ee\u9898\uff0c\u8bf7\u5c06\u6d4f\u89c8\u5668\u8bbe\u7f6e\u4e3a\u0020\u6781\u901f\u6a21\u5f0f\uff01");
     }

    function parseM3u8TotalTime(url){
        var num = 0;
        fetch(url).then(function(res){
            return res.blob().then(function(blob){
                var reader = new FileReader()
                reader.addEventListener("loadend", function(e) {
                    reader.result.split("\n").forEach(function(line){

                        if(line.indexOf('#EXTINF:') != -1){
                            var val = parseFloat(line.replace('#EXTINF:','').replace(',',''));
                            num = num + val;
                        }
                        if(line.indexOf('#EXT-X-ENDLIST') != -1){
                        	console.log(num);
                            totalTime = num;
                            // return;
                        }
                        if(line.match(/\.ts$/)){

                        }else if(line.match(/\.m3u8$/) && line.indexOf('/')==0){
                            var u = GetUrlRelativePath(url);
                            parseM3u8TotalTime(u+line);
                        }else if(line.match(/\.m3u8$/)){
                            parseM3u8TotalTime(url.replace(/\/[^\/]+?$/, '/'+line));
                        }
                    })
                });
                // return num;
                reader.readAsText(blob)
            })})
    }

    function GetUrlRelativePath(url)
    {
        var arrUrl = url.split("//");

        var start = arrUrl[1].indexOf("/");
        var relUrl = url.substring(0,start+arrUrl[0].length+2);

        return relUrl;
    }