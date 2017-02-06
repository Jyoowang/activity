window.share = {}
window.share = {
    title : '姑苏儿童论坛暨儿童呼吸及过敏性疾病诊治进展学习班(第二轮通知)',
    desc : '经全国继续医学教育委员会批准，诚邀您参加11月10日-14日由苏州大学附属儿童医院承办的2016年国家级继续教育项目“2016姑苏儿科论坛暨儿童呼吸及过敏性疾病诊治进展学习班”',
    link : 'http://www.yuer24h.com/invite/?rewrerter',
    imgUrl : 'http://www.yuer24h.com/invite/images/21212.png'
}
//alert(window.location.origin + window.location.pathname + window.location.search)
$.ajax({
    url : "http://api.yuer24h.com/wxapi/GetWXJSConfig",
    type : "POST",
    dataType : "jsonp",
    data : {
        url : window.location.origin + window.location.pathname + encodeURIComponent(window.location.search)
    },
    success : function(response) {
        //alert(response.url)
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
    var shareData = {
        title : window.share.desc,
        desc : window.share.desc,
        link : window.share.link,
        imgUrl : window.share.imgUrl
    };
    //wx.onMenuShareAppMessage(shareData);
    //wx.onMenuShareTimeline(shareData);
    wx.showOptionMenu();
}