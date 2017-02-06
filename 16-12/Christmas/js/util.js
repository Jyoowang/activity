
var Whole={
	apiUrl:'http://api.yuer24h.com',
	publicSrc:'../js/build/',//页面js路径
	versions:'?v20160302'	//版本
}

var Util={

	getUrl:function(url){
		return apiUrl+url;
	},
	Ajax:function(url,data,success,isPro,error){
		if(isPro){
			//加菊花
			document.getElementById('loading').style.display='block';
		}
		if (Model.getSwssionAttr('userId') && data) {
			data['Userid']=Model.getSwssionAttr('userId')
		}
		$.ajax({
	 			url:url,
	 			dataType:'jsonp',
	 			type:'GET',
	 			data:data,
	 			success: function(data){
	 				//TOTO 整体接口返回判断
	 				if(isPro){
						//关闭菊花
						document.getElementById('loading').style.display='none';
					}
	 				if (data.Code > 0 || data.ResultCode > 0) {
	 					success(data);
	 				}else{
	 					if(data.Message){
	 						alert(data.Message)
	 					}else{
	 						alert('系统错误！')
	 					}
	 					
	 					//弹出窗口
	 				}
	 			},
	 			error:function(xhr, status, err){
	 				if(error){
						error();
					}
					if (err) {
						console.log(err.toString());	
					};
					//弹出系统异常
	 			}
 			})
	},
    locationObject : function() {
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
    },
    wechatBrowse : function() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            //alert('请在浏览器当中打开页面')
            return true;
        } else {
            return false;
        }
    },
    iosBrowse : function() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs) {
            return 'ios';
        } else if (bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            return 'android';
        } else {
            return 'cao'
        }
    }
 
}


var storage = window.localStorage;
var session=window.sessionStorage;
var Model={
	setSwssionAttr : function(attr, value) {
		session[attr] = value
	},
	getSwssionAttr : function(attr) {
		return session.getItem(attr)
	},
	removeSwssionAttr : function(attr) {
		session.removeItem(attr)
	},
	removeSwssionAllAttr:function(){
		session.clear();
	},
	showSwssionAllAttr : function() {
		
	},
	//////
	setAttr : function(attr, value) {
		storage[attr] = value
	},
	getAttr : function(attr) {
		return storage.getItem(attr)
	},
	removeAttr : function(attr) {
		storage.removeItem(attr)
	},
	removeAllAttr:function(){
		storage.clear();
	},
	showAllAttr : function() {
		
	}

}
