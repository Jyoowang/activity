window.share = {}
window.share = {
	title : '怡思丁西班牙国民药妆在育儿商城开售啦！',
	desc : '西班牙皮肤科医师推荐，有效呵护孕妈肌肤，滋润宝宝皮肤！',
	link : 'http://www.yuer24h.com/dys/index.html',
	imgUrl : 'http://www.yuer24h.com/dys/images/LOGO.jpg'
}


//alert(window.location.origin + window.location.pathname + window.location.search)
$.ajax({
	url : "http://api.yuer24h.com/wxapi/GetWXJSConfig",
	type : "GET",
	dataType : "jsonp",
	data : {
		url : window.location.origin  + window.location.pathname + encodeURIComponent(window.location.search)
	},
	success : function(response) {
		//alert(response.url)
		//alert(response.url)
		wx.config({
			debug : false,
			appId : response.appid,
			timestamp : response.timestamp,
			nonceStr : response.nonce,
			signature : response.signature,
			jsApiList : ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'showOptionMenu','chooseImage','previewImage','startRecord','stopRecord','uploadVoice','downloadVoice']
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
	}
});
window.share_wx_api = function(fun) {

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
			if(fun){
				fun()
			}
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
		title : window.share.title,
		link : window.share.link,
		imgUrl : window.share.imgUrl,
		trigger : function(res) {
			console.log('用户点击分享到朋友圈');
		},
		success : function(res) {
			if(fun){
				fun()
			}

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
		title : window.share.title,
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
			if(fun){
				fun()
			}
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
	//	};

	// 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
	//document.querySelector('#onMenuShareWeibo').onclick = function() {
	wx.onMenuShareWeibo({
		title : window.share.title,
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
			if(fun){
				fun()
			}
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


	//wx.onMenuShareAppMessage(shareData);
	//wx.onMenuShareTimeline(shareData);
	wx.showOptionMenu();
}