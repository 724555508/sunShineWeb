/*****************************************************************************获取当前地址*/
var zoom;
var center;
function getThisIdArea(){
    if(localStorage.areaSign == 110000){//北京市
        zoom = 9;
        center = [117.003912,40.203936];
        $('.addressName').text('北京市');
    }else if(localStorage.areaSign == 130100){//石家庄
        zoom = 9;
        center = [114.866284,38.065478];
        $('.addressName').text('石家庄');
    }else if(localStorage.areaSign == 130600){//保定
        zoom = 9;
        center = [115.601135,39.064197];
        $('.addressName').text('保定');
    }else if(localStorage.areaSign == 130500){//邢台
        zoom = 9;
        center = [115.492294,37.3270248];
        $('.addressName').text('邢台');
    }else if(localStorage.areaSign == 370000){//山东
        zoom = 7;
        center = [119.978941,36.655051];
        $('.addressName').text('山东');
    }else if(localStorage.areaSign == 410000){//河南
        zoom = 7;
        center = [116.225169,33.960175];
        $('.addressName').text('河南');
    }else if(localStorage.areaSign == 320000){//江苏
        zoom = 7;
        center = [120.178787,33.280532];
        $('.addressName').text('江苏');
    }else if(localStorage.areaSign == 210200){//大连
        zoom = 9;
        center = [122.630374,39.523056];
        $('.addressName').text('大连');
    }else if(localStorage.areaSign == 141000){//临汾市
        zoom = 9;
        center = [111.837795,36.387777];
        $('.addressName').text('临汾市');
    }else if(localStorage.areaSign == 370600){//烟台市
        zoom = 9;
        center = [121.482867,37.248632];
        $('.addressName').text('烟台市');
    }else if(localStorage.areaSign == 130200){//  唐山市
        zoom = 9;
        center = [118.817636,39.825621];
        $('.addressName').text('唐山市');
    }else if(localStorage.areaSign == 370200){//青岛市
        zoom = 9;
        center = [120.682686,36.466871];
        $('.addressName').text('青岛市');
    }else if(localStorage.areaSign == 371700){//菏泽市
        zoom = 9;
        center = [116.506324,35.230286];
        $('.addressName').text('菏泽市');
    }else if(localStorage.areaSign == 370700){//潍坊市
        zoom = 9;
        center = [119.898854,36.59775];
        $('.addressName').text('潍坊市');
    }else if(localStorage.areaSign == 370983){//肥城市
        zoom = 10;
        center = [119.898854,36.59775];
        $('.addressName').text('肥城市');
    }else if(localStorage.areaSign == 140800){//运城市
        zoom = 9;
        center = [111.589026,35.326381];
        $('.addressName').text('运城市');
    }else if(localStorage.areaSign == 131000){//廊坊市
        zoom = 9;
        center = [116.993351,39.437904];
        $('.addressName').text('廊坊市');
    }else if(localStorage.areaSign == 130900){//沧州市
        zoom = 9;
        center = [117.146306,38.312165];
        $('.addressName').text('沧州市');
    }else if(localStorage.areaSign == 210300){//鞍山市
        zoom = 9;
        center = [122.994222,41.108663];
        $('.addressName').text('鞍山市');
    }else if(localStorage.areaSign == 542647){//常州市;焦作市
        zoom = 7;
        center = [116.912802,33.80837];
        $('.addressName').text('常州/焦作');
    }else if(localStorage.areaSign == 320500){//苏州市
        zoom = 10;
        center = [120.810348,31.330805];
        $('.addressName').text('苏州市');
    }else if(localStorage.areaSign == 320700){//连云港市
        zoom = 10;
        center = [119.221765,34.596053];
        $('.addressName').text('连云港市');
    }else if(localStorage.areaSign == 131200){//雄安新区
        zoom = 11;
        center = [116.286926,39.0947764];
        $('.addressName').text('雄安新区');
    }else if(localStorage.areaSign == 370100){//济南市
        zoom = 9;
        center = [117.528647,36.882507];
        $('.addressName').text('济南市');
    }else{                                    //其他
        zoom = 5;
        center = [108.431072,35.621885];
        $('.addressName').text('中国');
    }
}