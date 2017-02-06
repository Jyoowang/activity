//window.share = {}
window.share = {
    title : '圣诞来袭！你买我就送！！',
    desc : '圣诞惊喜享不停！19日下单前五名，实付金额满150就送土鸡蛋一盒（30枚装），还有活动专场满减包邮！一起健康过圣诞Merry Christmas！',
    link : 'http://www.yuer24h.com/Christmas/index.html?v2016',
    imgUrl : 'http://www.yuer24h.com/Christmas/images/LOGO.jpg?v2016'
}
//alert(window.location.origin + window.location.pathname + window.location.search)
//var href = window.location.href;
var href = window.location.href;
$.ajax({
    url : "http://api.yuer24h.com/wxapi/GetWXJSConfig",
    type : "GET",
    dataType : "jsonp",
    data : {
        url :href
    },
    success : function(response) {
    	console.log(response);
         //alert(response.url)
        if(response.ResultCode>0){

            wx.config({
                debug : false,
                appId : response.appid,
                timestamp : response.timestamp,
                nonceStr : response.nonce,
                signature : response.signature,
                jsApiList : ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'showOptionMenu','chooseImage','previewImage','startRecord','stopRecord','uploadVoice','downloadVoice','hideAllNonBaseMenuItem']
            });
            wx.ready(function() {
                // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
                //document.querySelector('#checkJsApi').onclick = function() {
                wx.checkJsApi({
                    jsApiList : ['getNetworkType', 'previewImage'],
                    success : function(res) {
                        console.log(JSON.stringify(res));
                    }
                });
                //};

                window.share_wx_api()
                // 2. 分享接口
                // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
                //document.querySelector('#onMenuShareAppMessage').onclick = function () {

            });

            wx.error(function(res) {
                console.log(res.errMsg);
            });
        }else{
            console.log(response)
        }
    }
});


window.share_wx_api = function() {
    wx.onMenuShareAppMessage({
        title : window.share.title,
        desc : window.share.desc,
        link : window.share.link,
        imgUrl : window.share.imgUrl,
        trigger : function(res) {
            console.log('用户点击发送给朋友');
        },
        success : function(res) {
            //alert(window.share.imgUrl.match(/(Wechat_share_){1,}\w/g)[0])
            console.log('已分享');
        },
        cancel : function(res) {
            console.log('已取消');
        },
        fail : function(res) {
            console.log(JSON.stringify(res));
        }
    });
    //console.log('已注册获取“发送给朋友”状态事件');
    // };

    // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
    //document.querySelector('#onMenuShareTimeline').onclick = function() {
    wx.onMenuShareTimeline({
        title : window.share.desc,
        link : window.share.link,
        imgUrl : window.share.imgUrl,
        trigger : function(res) {
            console.log('用户点击分享到朋友圈');
        },
        success : function(res) {
            console.log('已分享');
        },
        cancel : function(res) {
            console.log('已取消');
        },
        fail : function(res) {
            console.log(JSON.stringify(res));
        }
    });
    //console.log('已注册获取“分享到朋友圈”状态事件');
    //};

    // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
    //document.querySelector('#onMenuShareQQ').onclick = function() {
    wx.onMenuShareQQ({
        title : window.share.desc,
        desc : window.share.desc,
        link : window.share.link,
        imgUrl : window.share.imgUrl,
        trigger : function(res) {
            console.log('用户点击分享到QQ');
        },
        complete : function(res) {
            console.log(JSON.stringify(res));
        },
        success : function(res) {
            console.log('已分享');
        },
        cancel : function(res) {
            console.log('已取消');
        },
        fail : function(res) {
            console.log(JSON.stringify(res));
        }
    });
    ////console.log('已注册获取“分享到 QQ”状态事件');
    //  };

    // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
    //document.querySelector('#onMenuShareWeibo').onclick = function() {
    wx.onMenuShareWeibo({
        title : window.share.desc,
        desc : window.share.desc,
        link : window.share.link,
        imgUrl : window.share.imgUrl,
        trigger : function(res) {
            console.log('用户点击分享到微博');
        },
        complete : function(res) {
            console.log(JSON.stringify(res));
        },
        success : function(res) {
            console.log('已分享');
        },
        cancel : function(res) {
            console.log('已取消');
        },
        fail : function(res) {
            console.log(JSON.stringify(res));
        }
    });
    //console.log('已注册获取“分享到微博”状态事件');
    //};

    wx.showOptionMenu();
}