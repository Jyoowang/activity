

var Whole={
    apiUrl:'https://www.yuer24h.com',
    publicSrc:'../js/build/',//页面js路径
    versions:'?v20160302'   //版本
}



var LocalAttr={
    local: window.localStorage,
    setAttr: function(attr, value) {
        this.local[attr] = value
    },
    getAttr: function(attr) {
        return this.local.getItem(attr)
    },
    removeAttr: function(attr) {
        this.local.removeItem(attr)
    },
    removeAllAttr: function(){
        this.local.clear();
    },
    showAllAttr: function() { 
        
    }
}

var SessionAttr={
    session: window.sessionStorage,
    setSwssionAttr: function(attr, value) {
        this.session[attr] = value
    },
    getSwssionAttr: function(attr) {
        return this.session.getItem(attr)
    },
    removeSwssionAttr: function(attr) {
        this.session.removeItem(attr)
    },
    removeSwssionAllAttr: function(){
        this.session.clear();
    },
    showSwssionAllAttr: function() {
        
    }
}


var Tool = {
    // 本地存储
    LocalAttr: LocalAttr,
    SessionAttr: SessionAttr,
    //处理图片宽高
    ImgOnload: function(str, id, url) {
        var ww = new Image();
        ww.did = id;
        ww.onload = function () {
            if (this.width > this.height) {
                $(this).attr('height', '100%')
            } else {
                $(this).attr('width', '100%')
            }
            $(str + this.did).html(this)
        }
        ww.src = url;
    },
    //地址传递的参数
    locationObject: function() {
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
    //判断是否为微信
    wechatBrowse: function() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            //alert('请在浏览器当中打开页面')
            return true;
        } else {
            return false;
        }
    },
    //判断设备
    iosBrowse: function() {
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
    },
    //字符串截取
    addPoint : function(value, length) {
        if (value.length > length) {
            return value.substr(0, length - 1) + '...'
        } else {
            return value
        }
    },


    //获取对象
    getModel : function(obj,key){
        if (obj && obj[key]) {
            if (obj[key] instanceof Object) {
                return obj[key];
            }else{
                return null;
            }
        }else{
            return null;
        }
    },
    //获取数组
    getArray : function(obj,key){
        if (obj && obj[key]) {
            if (obj[key] instanceof Array) {
                return obj[key];
            }else{
                return new Array(obj[key]);
            }
        }else{
            return new Array();
        }
    },
    //获取字符串直接用来页面展示
    getString : function(obj,key){
        if (obj&&obj[key]) {
            if (typeof(obj[key]) == 'string') {
                return obj[key];
            }else{
                return obj[key] + '';
            }
        }else{
            return '';
        }
    },
    //获取Int值进行数据判断
    getInt : function(obj,key){
        if (obj&&obj[key]) {
            if (typeof(obj[key]) == 'number') {
                return obj[key];
            }else{
                var temp = parseInt(obj[key]); 
                if (temp == 'NaN') {
                    return 0;
                }
                return temp;
            }
        }else{
            return 0;
        }
    },
    //获取价格进行直接显示
    getPrice : function (obj,key) {
        var returnValue = 0;
        if (obj&&obj[key]) {
            if (typeof(obj[key]) == 'number') {
                returnValue = obj[key];
            }else{
                var temp = parseFloat(obj[key]); 
                if (temp == 'NaN') {
                    returnValue = 0;
                }
                returnValue = temp;
            }
            return this.getPriceValue(returnValue);
        }else{
            return '0';
        }
    },
    getPriceValue : function (value) {
        if (value) {
            
            value = value.toFixed(2) + '';

            var endStr = value.substr(value.length-3,value.length);
            if (endStr == '.00') {
                value = value.substr(0,value.length-3);
            }
            endStr = value.substr(value.length-1,value.length);
            if (endStr == '0') {
                var pos = value.lastIndexOf('.');
                if (pos>0&&pos+3 == value.length) {
                    value = value.substr(0,value.length-1);
                }  
            }
            return value;
        }else{
            return '0';
        }
    },
    //加载图片方法，对链接进行了裁剪封装
    getPicUrl : function (url,width,height) {
        var returnUrl = url
        if (url.indexOf("?")<0) {
            if(width && !height)
            returnUrl+="?imageView2/0/w/"+(width*2);

            if(!width && height)
            returnUrl+="?imageView2/0/h/"+(height*2);

            if(width && height)
            returnUrl+="?imageView2/1/w/"+(width*2)+"/h/"+(height*2)+"/interlace/1";
        }
        return returnUrl;
    },
    //下面这个函数用来转换数组到json格式
    arrayToJson: function(o) { 
        var r = []; 
        if (typeof o == "string") return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\""; 
        if (typeof o == "object") { 
        if (!o.sort) { 
        for (var i in o) 
        r.push(i + ":" + this.arrayToJson(o[i])); 
        if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) { 
        r.push("toString:" + o.toString.toString()); 
        } 
        r = "{" + r.join() + "}"; 
        } else { 
        for (var i = 0; i < o.length; i++) { 
        r.push(this.arrayToJson(o[i])); 
        } 
        r = "[" + r.join() + "]"; 
        } 
        return r; 
        } 
        return o.toString(); 
    },
    //这个是调用微信图片浏览器的函数 
    imagePreview:function (curSrc,srcList) {
        //这个检测是否参数为空
        if(!curSrc || !srcList || srcList.length == 0) {
            return;
        }
        //这个使用了微信浏览器提供的JsAPI 调用微信图片浏览器
        WeixinJSBridge.invoke('imagePreview', { 
            'current' : curSrc,
            'urls' : srcList
        });
    },
    //刷新页面
    refresh:function(){
        window.location.reload()
    },
    yuer24hGoto : function(option){
        var urls

        switch(Tool.getInt(option,'type')){

            case 1: //跳转url网页
                urls = '{"Type": "' + Tool.getString(option,'type') + '","TypeName": "' + Tool.getString(option,'typeName') + '","ShortSummary":"'+ Tool.getString(option,'title') +'"}'

            break;
            case 9: //育儿福利详情
                urls = '{"Type": "' + Tool.getString(option,'type') + '","Href": "' + Tool.getString(option,'typeName') + '","ShortSummary":"'+ Tool.getString(option,'title') +'"}'

            break;

            case 12: //不跳转

            break;
            case 14: //医生列表(不做任何参数)
            case 15: //解决方案列表
            case 16: //育儿钱包
            case 17: //充值页
            case 18: //会员服务
            case 19: //我的医生
            case 20: //代金券
            case 21: //个人资料
            case 22: //购物车
            case 23: //一键求助
            case 55: //我的福利
            case 76: //登录

                urls = '{"Type": "' + Tool.getString(option,'type') + '"}'

            break;
            case 10: //商品列表(aid 活动)
            case 13: //解决方案详情
            case 24: //健康评测
            case 28: //商品列表(cid 类别)
            case 29: //商品列表(bid 品牌)
            case 30: //商品列表(pid 顶级)
            case 72: //新品推荐
                urls = '{"Type": "' + Tool.getString(option,'type') + '","TypeName":"'+ Tool.getString(option,'typeName') +'","ShortSummary":"'+ Tool.getString(option,'title') +'"}'
            break;
            case 39: //去订单
                urls = '{"Type": "' + Tool.getString(option,'type') + '","TypeName":"'+ Tool.getString(option,'typeName') +'","Custom":"'+ Tool.getString(option,'title') +'"}'
            break;

            case 43: //图片预览
                urls = '{"Type": '+ Tool.getString(option,'type') +',"TypeName": "'+ Tool.getString(option,'typeName') + '","ShortSummary":"'+ Tool.getString(option,'picdomain') +'","Custom":"'+ Tool.getString(option,'index') +'"}'
            break;
            case 48: //商品客服
                urls = '{"Type": "' + Tool.getString(option,'type') + '","DOpenIMUserID":"'+ Tool.getString(option,'typeName') +'","Custom":"'+ Tool.getString(option,'title') +'"}'
            break;
            case 75: //商品筛选
                urls = '{"Type": "' + Tool.getString(option,'type') + '","TypeName":"'+ Tool.getString(option,'typeName') +'","Custom":"'+ Tool.getString(option,'title') +'","Custom1":"'+ Tool.getString(option,'typeValue') +'"}'
            break;
            case 77: //支付
                //urls = '{"Type": "' + Tool.getString(option,'type') + '","TypeName": "' + Tool.getModel(option,'typeName') + '","Custom":"'+ Tool.getString(option,'custom') +'"}'
                urls={"Type":Tool.getString(option,'type'), "TypeName":Tool.getArray(option,'typeName'),"Custom":Tool.getString(option,'custom')};
                
                urls=JSON.stringify(urls);

            break;
            default:
                urls = '{"Type": "' + Tool.getString(option,'type') + '","TypeName": "' + Tool.getString(option,'typeName') + '"}'
        }


        window.location.href="yuer24hGoto://" + encodeURIComponent(urls)
    },

    yuer24hshare : function(option){
        var urls = '{"title": "'+ Tool.getString(option,'title') +'","desc": "' + Tool.getString(option,'desc') + '","imgUrl":"'+ Tool.getString(option,'imgUrl') +'","link":"'+ Tool.getString(option,'link') +'","Custom":"'+ Tool.getString(option,'SharePrice') +'","Custom1":"'+ Tool.getString(option,'ShareText') +'"}'

        window.location.href = "yuer24hshare://" + encodeURIComponent(urls)
    },

    replaceAll : function(str,replaced,replacement){
        var reg=new RegExp(replaced,"g");
        str=str.replace(reg,replacement);
        return str;
    },

    loadShow:function(can){  //显示是控制loading 
        var oLoad = document.getElementsByClassName('loadbox')[0];
        if(can){
            if(can.loadText){ //loadText load文本 默认false
                oLoad.getElementsByTagName('p')[0].innerHTML = can.loadText
            }
            if(can.isTransparent){ //isTransparent 布尔值 背景透明
                // console.log(oDiv.style)
                oLoad.style.background="none"
            }
        }else{
            oLoad.getElementsByTagName('p')[0].innerHTML = '加载中...'
        }
        
        oLoad.style.display="block"
        // console.log(oDiv)
    },
    loadHide:function(){
        var oLoad = document.getElementsByClassName('loadbox')[0];
        oLoad.style.display="none"
        // console.log(1)
    },

    //接口调用
    firstAjax:function(params){

        var defaults = {   //默认值

            isload:true,  //页面菊花 默认调用接口需要load
            url:'',     //接口地址
            value:{}, //接口参数
            success:function(value){
                console.log(value)
            },
            error:function(value){
                console.log(value)
            },
            errorError:function(xhr, status, err){
                console.log(value)
            },

        }

        function initTransfer(){

            if (defaults.isload.loadVal) {
                Tool.loadShow(defaults.isload.loadView);
            };

            $.ajax({
                url: Whole.apiUrl + defaults.url ,
                type: "POST",
                dataType: "jsonp",
                data: defaults.value,
                success: function(response) {
                    //TOTO 整体接口返回判断
                    //关闭菊花
                    if (defaults.isload) {
                        Tool.loadHide();
                    };

                    if(response.ResultCode>0){
                        defaults.success(response);
                    }else{
                        // ResultMessage
                        if(response.ResultCode){
                            if(defaults.error){
                                defaults.error();
                            }
                            popups.init(response.ResultMessage,'系统提示',1,function(){
                                return
                            })
                            // alert(data.message);
                        }else{
                            // alert('系统错误！');
                            popups.init('系统错误！','系统提示',1,function(){
                                return
                            })
                        }
                    }
                },
                error:function(xhr, status, err){
                    if(defaults.errorError){
                        defaults.errorError(xhr, status, err);
                    }
                    if (err) {
                        console.log(err.toString());    
                    };
                    //弹出系统异常
                }
            });
        }

        if(typeof params != 'object'){
            console.error("参数类型错误 not object");
            return;
        }

        for (var def in params) {
            if (typeof params[def] != 'undefined') {
                defaults[def] = params[def];
            }else if (typeof params[def] === 'object') {
                for (var deepDef in defaults[def]) {
                    if (typeof params[def][deepDef] === 'undefined') {
                        defaults[def][deepDef] = params[def][deepDef];
                    }
                }
            }
        }

        // console.log(defaults)
        initTransfer();


    },
    sendTrack : function (userid,trackelement,trackevent,tracktype,trackcode,trackvalue,params,appid) {
        try {
            if(!userid || userid==null || userid=='null')userid=0;
            if(!appid) {
                appid=3;
                if(Whole.isApp)
                {
                    var bro = Tool.iosBrowse();
                    console.log(bro);
                    if(bro && bro=="ios")
                    {
                        appid=2;
                    }
                    else if(bro && bro=="android")
                    {
                        appid=1;
                    }
                }
                else
                {
                    var iswx = Tool.wechatBrowse();
                    if(iswx)
                    {
                        appid =3;
                    }
                    else
                    {
                        appid =5;
                    }

                }
            }

            if(!params)params={};
            if(!trackvalue||trackvalue==null)trackvalue="";
            var senddata={
                method:"QuickSoft.AppService.TrackService.TrackReceive",
                userid:userid,
                usertype:1,
                trackelement:trackelement,//填写PageID页面编号
                trackevent:trackevent,//add,click,view等，表示是点击，还是打开页面等
                tracktype:tracktype,//app,button,a,page等,触发元素的类型
                trackcode:trackcode,//跟踪编码，判断是哪种跟踪
                trackvalue:trackvalue,//当前页面的主键，如：商品详情，就是商品的ID，课程详情，就是课程编号
                params:JSON.stringify(params),//其他扩展参数，key：value，如：课程详情中点击产品广告，保存产品的编号进扩展参数
                pageurl:window.location.href,
                appid:appid,//来源：1,安卓,2.IOS，3.微信,4 后台,5其他浏览器
                sign:"",
                timestamp:""
            }

            $.ajax({
                url: TrackApiUrl,
                type: "post",
                dataType: "text",
                async:false,
                data: senddata,
                success: function (response) {

                }
            });
        }catch(e){
            console.log("error",e);

        }

       },


    //页面跳转
    goToUrl:function(UrlVale){

        this.isApp(function(){
            var temp = Tool.getModel(UrlVale,'appUrl');
            if(temp){
                Tool.yuer24hGoto(temp)  
            }
        },function(){
            var temp = Tool.getString(UrlVale,'h5Url');
            if(temp){
                window.location='' + UrlVale.h5Url
            }

        })
    },
    isApp : function(fun1,fun2){
        if(Whole.isApp){
            //app
            if(fun1){
                fun1();
            }
        }else{
            if(fun2){
                fun2();
            }
        }
    },
}




