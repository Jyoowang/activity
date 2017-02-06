$(function () {
    $("body").hide();
    $.post('/api/UPersonalCenterMessageApp/PostUShareSystemNotice', { bid: $.query.get("bid") }, function (data) {
        window.share = {
            title: data.ShareContent,
            desc: data.ShareTitle,
            imgUrl: data.SharePic,
            link: data.ShareLink
        }

        window.share_wx_api()


        $("#bigTitle").text(data.Title);
        $("#title").text(data.Title);
        $("#author").text(data.Author);
        $("#publishedTime").text(data.Time);
        $("#content").html(data.Content);
        $("body").show();
        var info = locationObject()
        if (info) {
                if (info['isShare']) {
                    
                }else{
                    $('.footer-erwei').hide()
                }
        }

      $(".gotoWeb").each(function(index){

        var attr = $(this).attr("data-href");
        console.log(attr)
        if (attr) {
            var data = JSON.parse(attr.split('//')[1]);
            console.log(data)
            var UserID = 0;
            var info = locationObject()
            if (info) {
                if (info['UserID']) {
                    UserID = info['UserID'];
                }
            }
            if (wechatBrowse()) {

                var url=''
                switch(parseInt(data.Type)){
                    case  28:   //活动
                        url = 'http://api.yuer24h.com/app/Share/GetCode?target=9_'+ data.TypeName;
                    break;
                    case  11:   //产品详情
                        url = 'http://api.yuer24h.com/app/Share/GetCode?target=4_0_'+data.TypeName;
                    break;
                    case  14:   //医生列表
                        url = 'http://api.yuer24h.com/app/Share/GetCode?target=9_'+data.TypeName;
                    break;
                    case  8:   //微课堂
                        url = 'http://api.yuer24h.com/app/Share/GetCode?target=6_0_'+ data.TypeName +'_0_0' ;
                    break;
                    case  9:   //礼包详情
                        url = 'http://api.yuer24h.com/app/Share/GetCode?target=3_0_' + data.TypeName;
                    break;
                    case  2:   //礼包详情
                        url = 'http://api.yuer24h.com/app/Share/GetCode?target=1_0_'+ data.TypeName  +'_0' 
                    break;
                    case 1:   //url
                        url =  data.TypeName 
                        break;
                    case  3:   //医生详情
                        url = 'http://api.yuer24h.com/app/Share/GetCode?target=2_594628_'+ data.TypeName  +'_0' 
                    break;
                    case 999: //强医荟萃
                        url = 'http://api.yuer24h.com/app/Share/GetCode?target=freeclinic-s/index.html?uid=0*couponid=' + data.TypeName
                    break;
                }

                
                $(this).attr('href',url)
                console.log(url)
            }

        }

    });

    });

    
    var wechatBrowse = function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            //alert('请在浏览器当中打开页面')
            return true;
        } else {
            return false;
        }
    }
    var locationObject = function () {
        if (window.location.search) {
            var tt = String(window.location.search).replace('?', '')
            var arr = tt.split('&')
            var retu = {}
            for (var i = 0; i < arr.length; i++) {
                var newp = arr[i].split('=')
                retu[newp[0]] = newp[1]
            }
            return retu
        } else {
            return null
        }
    }

});